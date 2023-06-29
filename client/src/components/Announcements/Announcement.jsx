import React from 'react'
import './Announcement.css';
import SideNavbar from '../SideNavbar/SideNavbar';
import ACard from './AnnouncementCard/ACard';

const Announcement = () => {
  return (
    <div className="full_page_div">
      <div className="sideBar_Profile">
        <SideNavbar />
        <div className="ann_container">
          <div className="row11">
            <div className="heading"><h3>HOSTEL ANNOUNCEMENTS</h3></div>
          </div>
          <br />
          <div className="ann_disp">
            <ACard/>
            <ACard/>
            <ACard/>
            <ACard/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Announcement
