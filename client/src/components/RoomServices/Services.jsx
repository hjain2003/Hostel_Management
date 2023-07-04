import React from 'react';
import './Services.css';
import SideNavbar from '../SideNavbar/SideNavbar';
import { FaUser, FaClipboardList, FaBell } from 'react-icons/fa';
import RCard from './Rcard/Rcard';

const Services = () => {
  return (
    <div className="entire_page_div">
      <div className="sideBar_Profile">
        <SideNavbar />
        <div className='req_contain'>
          <div className='row112'>
              <div className="ircard">
                REQUESTS
                <br />
                <h2>300</h2>
              </div>
              <div className="ircard">
                RESOLVED
                <br />
                <h2>200</h2>
              </div>
              <div className="reqCard">
                <span className='rhead'>REQUEST</span>
                <div>
                <button className='rclean'><FaUser/>&ensp; Room Cleaning</button>
                <button className='other'><FaUser/>&ensp; Others</button>
                </div>
              </div>
          </div>
        <div className='nextRow'>
        <div className='cHead'>CURRENT REQUESTS</div>
        <div className='reqDisplay'>
        <RCard/>
        <RCard/>
        <RCard/>
        <RCard/>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Services
