import Complaint from "../models/Complaint.js";
import mongoose from "mongoose";
import User from "../models/User.js";

//getAllComplaints
export const getAllComplaints = async (req, res) => {
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

//getMyComplaints
export const getMyComplaints = async (req, res) => {
    try {
        const userId = req.query.userId;

        console.log(userId);
        const complaints = await Complaint.find({ user: userId });

        if (complaints) {
            res.status(200).json({ complaints });
        } else {
            res.status(500).json({ error: 'Unexpected error' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Unexpected error' });
    }
}

//AddComplaint
export const addComplaint = async (req, res) => {
    const { title, description, date, user } = req.body;
    if (!title) {
        return res.status(422).json({ error: "fields empty" });
    }

    const userId = req.rootUser._id;
    let existingUser;
    try {
        existingUser = await User.findById(userId);
    } catch (err) {
        console.log(err);
    }
    if (!existingUser) {
        return res.status(422).json({ message: "user not found" });
    }


    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        const complaint = new Complaint({ title, description, date: formattedDate, user: userId });

        //create session to save post in both collections
        const session = await mongoose.startSession(); //starts a session
        session.startTransaction();

        existingUser.complaints.push(complaint); //pushing to posts array in user schema
        existingUser.complaintCount += 1;
        await existingUser.save({ session }); //saving user
        const complaintAdd = await complaint.save({ session }); //saving post
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
export const removeComplaint = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedComplaint = await Complaint.findByIdAndDelete(id);
        if (deletedComplaint) {
            const userId = deletedComplaint.user;
            const user = await User.findById(userId);
            user.complaintsResolved += 1;
            if (user) {
                user.complaints.pull(id);
                await user.save();
            }
            res.status(200).json({ message: "complaint removed successfully !" });
        } else {
            res.status(404).json({ message: "complaint not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "unexpected internal error" });
    }
}