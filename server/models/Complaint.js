import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

const complaintSchema = new mongoose.Schema({

    title: {
        type: String,
        required:true
    },
    description:{
        type:String,
        // required: true
    },
    date :{
        type: String,
    },
    user :{
        type : mongoose.Types.ObjectId,
        ref: "User",
    }
});


export default model("Complaint", complaintSchema);
//users