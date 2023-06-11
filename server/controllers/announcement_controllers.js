import Announcement from "../models/Announcement.js";
// import User from "../models/User";

//getAllAnnouncements
export const getAllAnnouncements = async(req,res)=>{
    let announcements

    try {
        announcements = await Announcement.find();

    } catch (err) {
        console.log(err);
    }

    if (announcements) {
        res.status(200).json({ announcements });
    }
    else {
        res.status(500).json({ error: "unexpected error" });
    }
};

//addAnnouncement
export const addAnnouncement = async(req,res) =>{
    const { title, description, date} = req.body;
    if (!title || !description) {
        return res.status(422).json({ error: "fields empty" });
    }


    try {
        const announcement = new Announcement({ title, description, date : new Date()});
        const announcementAdd = await announcement.save();
        if (announcementAdd) {
            return res.status(201).json({ message: "announcement added successfully" });
        }
        else {
            return res.status(422).json({ message: "announcement not added" });
        }
    } catch (err) {
        console.log(err);
    }
}

//removeAnnouncement
export const removeAnnouncement = async(req,res) =>{
    const id =req.params.id;

    let announcement;
    try {
        announcement = await Announcement.findByIdAndRemove(id);

        if (announcement) {
            res.status(201).json({ message : "announcement deleted successfully" });
        }
        else {
            res.status(422).json({ message: "unable to delete announcement" });
        }

    } catch (error) {
        return console.log(error);
    }
}