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
  //complaint status
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

  //comlaintCards
  const userId = localStorage.getItem("userId");
  const [complaintCards,setComplaintCards] = useState([1,2,3,4,5]);
  
  const showComplaintCards = async()=>{
    try {
      const res = await fetch(
        `http://localhost:5000/complaints/myComplaints?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        setComplaintCards(data.complaints);
      } else {
        console.log('Error:', res.status);
      }
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }

  useEffect(() => {
    callComplaintStatus();
    showComplaintCards();
  }, []);


  const [complaintDetails,setComplaintDetails] = useState({
    title: "Room Cleaning",
    description: ""
  })

  //handleRoomCleaning
  const handleRoomCleaning = async()=>{
    try {
      const res = await fetch('http://localhost:5000/complaints/addComplaint', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: complaintDetails.title,
          description: complaintDetails.description
        }),
      });
  
      const data = await res.json();
  
      if (res.status === 422) {
        window.alert('Complaint Addition failed!');
        console.log(res.status);
        console.log(data);
      } else if (res.status !== 422) {
        window.alert('Complaint successfully registered!');
        console.log(res.status);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      navigate('/');
    }
  }
  
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
                <button className='rclean' onClick={handleRoomCleaning}><FaUser/>&ensp; Room Cleaning</button>
                <button className='other' onClick={handleOthersbutton}><FaUser/>&ensp; Others</button>
                </div>
              </div>
          </div>
        <div className='nextRow'>
        <div className='cHead'>CURRENT REQUESTS ({complaintStatus.complaintCount - complaintStatus.complaintsResolved})</div>
        <div className='reqDisplay'>
        {
          complaintCards.map((item,index) =>(
            <RCard 
            key= {item._id}
            complaintId= {item._id} 
            title={item.title}
            date = {item.date}
            />
          ))
        }
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Services
