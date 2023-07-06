import React, { useEffect, useState } from 'react';
import './Services.css';
import SideNavbar from '../SideNavbar/SideNavbar';
import { FaUser, FaClipboardList, FaBell } from 'react-icons/fa';
import RCard from './Rcard/Rcard';
import { NavLink, useNavigate } from 'react-router-dom';

const Services = () => {

  const navigate = useNavigate();

  const handleOthersbutton = ()=>{
    navigate('/reqform');
  }
  const [complaintStatus,setComplaintStatus] = useState('');

  const callComplaintStatus = async () => {
    try {
      const res = await fetch('http://localhost:5000/users/dashboard', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await res.json();
      console.log(data);
      setComplaintStatus(data);

      if (res.status !== 200) {
        navigate('/login');
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  };

  useEffect(() => {
    callComplaintStatus();
  }, []);

  
  return (
    <div className="entire_page_div">
      <span className='logout'><b><u><NavLink to='/logout'>LOGOUT</NavLink></u></b></span>
      <div className="sideBar_Profile">
        <SideNavbar />
        <div className='req_contain'>
          <div className='row112'>
              <div className="ircard">
                REQUESTS
                <br />
                <h2>{complaintStatus.complaintCount}</h2>
              </div>
              <div className="ircard">
                RESOLVED
                <br />
                <h2>{complaintStatus.complaintsResolved}</h2>
              </div>
              <div className="reqCard">
                <span className='rhead'>REQUEST</span>
                <div>
                <button className='rclean'><FaUser/>&ensp; Room Cleaning</button>
                <button className='other' onClick={handleOthersbutton}><FaUser/>&ensp; Others</button>
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
        <RCard/>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Services
