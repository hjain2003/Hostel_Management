import React from 'react'
import './AdminAnnouncements.css';
import SideNavbar from '../SideNavbar/SideNavbar';
import ACard from './AACard/AdminAnnouncementCard';
import { NavLink, Navigate } from 'react-router-dom';

const AdminAnnouncements = () => {
  return (
    <div className="full_page_div">
      <span className='logout'><b><u><NavLink to='/logout'>LOGOUT</NavLink></u></b></span>
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
        <button className='addAnn'>
          ADD ANNOUNCEMENT
        </button>
        </div>
      </div>
    </div>
  )
}

export default AdminAnnouncements;