import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

const announcementSchema = new mongoose.Schema({

    title: {
        type: String,
        required:true
    },
    description:{
        type:String,
        required: true,
    },
    // user :{
    //     type : mongoose.Types.ObjectId,
    //     ref: "User",
    // }
});


export default model("Announcement", announcementSchema);
//users