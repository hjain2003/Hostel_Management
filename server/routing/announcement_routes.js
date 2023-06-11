import express from "express";
import { addAnnouncement, getAllAnnouncements, removeAnnouncement } from "../controllers/announcement_controllers.js";

const AnnouncementRouter = express.Router();

AnnouncementRouter.get('/',getAllAnnouncements);
AnnouncementRouter.post('/addAnnouncement',addAnnouncement);
AnnouncementRouter.put('/:id',removeAnnouncement);

export default AnnouncementRouter;