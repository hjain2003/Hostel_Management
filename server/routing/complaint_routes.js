import express from "express";
import { addComplaint, getAllComplaints, removeComplaint } from "../controllers/complaint_controller.js";
import { Authenticate } from "../middleware/authenticate.js";

const complaintRouter = express.Router();

complaintRouter.get('/',getAllComplaints);
complaintRouter.post('/addComplaint',Authenticate,addComplaint);
complaintRouter.put('/:id',removeComplaint );

export default complaintRouter;