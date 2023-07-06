import Complaint from "../models/Complaint.js";
import mongoose from "mongoose";
import User from "../models/User.js";

//getAllComplaints
export const getAllComplaints = async(req,res)=>{
    let complaints;

    try {
        complaints = await Complaint.find();

    } catch (err) {
        console.log(err);
    }

    if (complaints) {
        res.status(200).json({ complaints });
    }
    else {
        res.status(500).json({ error: "unexpected error" });
    }
};

//AddComplaint //need changes
export const addComplaint = async(req,res)=>{
    const { title, description, date, user} = req.body;
    if (!title || !description) {
        return res.status(422).json({ error: "fields empty" });
    }
    
    const userId = req.rootUser._id;
    let existingUser;
    try{
        existingUser = await User.findById(userId);
    }catch(err){    
        console.log(err);
    }
    if (!existingUser) {
        return res.status(422).json({ message: "user not found" });
    }


    try {
        const complaint = new Complaint({ title, description, date : new Date(), user: userId });

        //create session to save post in both collections
        const session = await mongoose.startSession(); //starts a session
        session.startTransaction();

        existingUser.complaints.push(complaint); //pushing to posts array in user schema
        existingUser.complaintCount +=1;
        await existingUser.save({session}); //saving user
        const complaintAdd = await complaint.save({session}); //saving post
        session.commitTransaction(); //finishing transaction

        if (complaintAdd) {
            return res.status(201).json({ message: "complaint added successfully" });
        }
        else {
            return res.status(422).json({ message: "complaint  not added" });
        }
    } catch (err) {
        console.log(err);
    }
}

//RemoveComplaint
export const removeComplaint = async(req,res) =>{
    const id =req.params.id;

    let complaint;
    try {

        const session = await mongoose.startSession();
        session.startTransaction();
        
        complaint = await Complaint.findById(id).populate("user");
        complaint.user.complaintsResolved +=1;
        complaint.user.complaints.pull(complaint);
        await complaint.user.save({session});
        complaint = await Complaint.findByIdAndRemove(id);
        session.commitTransaction();

        if (complaint) {
            res.status(201).json({ message : "complaint deleted successfully" });
        }
        else {
            res.status(422).json({ message: "unable to delete complaint" });
        }

    } catch (error) {
        return console.log(error);
    }
}