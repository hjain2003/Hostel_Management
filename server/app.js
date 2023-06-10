import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import { connectDB } from "./db/dbconn.js";

const app=express();
dotenv.config({path:'./config.env'});

//DB
connectDB();

app.get('/',(req,res)=>{
    res.send(`Hello world`);
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server up and running  at ${PORT}`);
});