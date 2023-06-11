import express from "express";
import { addComplaint, getAllComplaints, removeComplaint } from "../controllers/complaint_controller.js";

const complaintRouter = express.Router();

complaintRouter.get('/',getAllComplaints);
complaintRouter.post('/addComplaint',addComplaint);
complaintRouter.put('/:id',removeComplaint );

export default complaintRouter;