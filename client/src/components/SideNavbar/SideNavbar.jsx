import React from 'react';
import './SideNavbar.css';
import { FaUser, FaClipboardList, FaBell } from 'react-icons/fa';

const SideNavbar = () => {
  return (
    <div className="side_nav">
      <span id="top_icon">
        <a href="/">
          <FaUser className="nav_icon" />
          <span className="nav_label">Profile</span>
        </a>
      </span>
      <hr /><br />
      <span>
        <a href="/">
          <FaClipboardList className="nav_icon" />
          <span className="nav_label">Room Services</span>
        </a>
      </span>
      <hr /><br />
      <span>
        <a href="/">
          <FaBell className="nav_icon" />
          <span className="nav_label">Announcements</span>
        </a>
      </span>
    </div>
  );
};

export default SideNavbar;
