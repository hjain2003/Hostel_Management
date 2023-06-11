import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        // unique : true
    },
    rollno: {
        type: Number,
        required : true
    },
    hostel: {
        type: String,
        required: true,
    },
    roomno: {
        type: String,
        required : true
    },

    password: {
        type: String,
        required: true
    },

    cpassword: {
        type: String,
        required: true
    },
    complaints : [{
        type: mongoose.Types.ObjectId, 
        ref: "Complaint"
    }],

});

export default model("User", userSchema);
