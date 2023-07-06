import express from "express";
import { addComplaint, getAllComplaints, getMyComplaints, removeComplaint } from "../controllers/complaint_controller.js";
import { Authenticate } from "../middleware/authenticate.js";

const complaintRouter = express.Router();

complaintRouter.get('/',getAllComplaints);
complaintRouter.get('/myComplaints',getMyComplaints);
complaintRouter.post('/addComplaint',Authenticate,addComplaint);
complaintRouter.delete('/:id',removeComplaint );

export default complaintRouter;