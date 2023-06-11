import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { connectDB } from "./db/dbconn.js";
import userRouter from "./routing/user_routes.js";
import complaintRouter from "./routing/complaint_routes.js";
import AnnouncementRouter from "./routing/announcement_routes.js";

const app=express();
dotenv.config({path:'./config.env'});

//DB
connectDB();

//middlewares
app.use(express.json());
app.use('/users',userRouter);
app.use('/complaints',complaintRouter);
app.use('/announcements',AnnouncementRouter);

app.get('/',(req,res)=>{
    res.send(`Hello world app`);
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server up and running  at ${PORT}`);
});