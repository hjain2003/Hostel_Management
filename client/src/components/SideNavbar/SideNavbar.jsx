import React from 'react';
import './SideNavbar.css';
import { FaUser, FaClipboardList, FaBell } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const SideNavbar = () => {
  return (
    <>
    <div className="side_nav">
      <span id="top_icon">
        <NavLink to="/profile">
          <FaUser className="nav_icon" />
          <span className="nav_label">Profile</span>
        </NavLink>
      </span>
      <hr /><br />
      <span>
        <NavLink to="/services">
          <FaClipboardList className="nav_icon" />
          <span className="nav_label">Room Service</span>
        </NavLink>
      </span>
      <hr /><br />
      <span>
        <NavLink to ="/announcements">
          <FaBell className="nav_icon" />
          <span className="nav_label">Announcements</span>
        </NavLink>
      </span>
    </div>
    </>
  );
};

export default SideNavbar;
