import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from 'bcryptjs';
import jwt from 'jsonwebtoken'
const { hashSync } = pkg;

//getAllUsers
export const getAllUsers=async(req,res)=>{
    let users;
    try {
        users = await User.find(); //get all results
    } catch (err) {
        console.log(err);
    }

    if (!users) {
        res.status(500).json({ error: 'unexpected error' });
    }
    else {
        res.status(200).json({ users });
    }
};

//RegisterUser
export const signup = async (req, res) => {

    // console.log(req.body);
    const {username, email, rollno, hostel, roomno, password ,cpassword} = req.body;

    if (!username || !email || !rollno || !hostel || !roomno || !password || !cpassword) {
        res.status(422).json({ error: "empty fields !" });
    }

    try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(422).json({ error: "Email already exists !" });
        }

        //hashing
        const hashedPassword = pkg.hashSync(password);

        const user = new User({ username, email, rollno, hostel, roomno, password : hashedPassword, cpassword});
        const userRegister = await user.save();

        if (userRegister) {
            res.status(201).json({ message: "user registered successfully !" });
        }
        else {
            res.status(422).json({ error: "Registration failed" });
        }
    } catch (err) {
        console.log(err);
    }
};

//userLogin
export const login = async(req, res)=>{
    try{
        const {username, password}=req.body;

        if(!username || !password){
            res.status(400).json({message:"fields empty!"});
        }

        const userLogin=await User.findOne({username:username}) //has entire document

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if(isMatch){
                console.log(userLogin);
                
                const token = await userLogin.generateAuthToken();
                console.log(token);
                res.cookie("jwtoken",token,{
                    expires : new Date(Date.now()+25892000000),
                    httpOnly:true
                });
                // res.cookie("test",'val');
                res.status(201).json({message: "user successfully logged in!", userId : userLogin._id});
            }
            else{
                res.status(400).json({message:"pwd incorrect!"});
            }
        }
        else{
            return res.status(400).json({message : "user does not exist !"});
        }

    }catch(err){
        console.log(err);
    }
}

//homePage
export const homeit = async(req,res)=>{
    res.send(req.rootUser);
};

//userLogOut
export const logout = async(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).json({message : "user logged out"});
}


