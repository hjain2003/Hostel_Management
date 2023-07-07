import React, { useEffect, useState } from 'react';
import './other.css';
import SideNavbar from '../SideNavbar/SideNavbar';
import Cardd from './oc/oc'
import { NavLink, useNavigate } from 'react-router-dom';

const Services = () => {

  const navigate = useNavigate();

  let hostels = [
    { label: "A", value: "1" },
    { label: "B", value: "2" },
    { label: "C", value: "3" },
    { label: "D", value: "4" },
    { label: "E", value: "5" },
    { label: "H", value: "6" },
    { label: "I", value: "7" },
    { label: "J", value: "8" },
    { label: "K", value: "9" },
    { label: "L", value: "10" },
    { label: "M", value: "11" },
    { label: "N", value: "12" },
    { label: "O", value: "13" },
    { label: "Q", value: "14" }
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
      const selectedHostels = hostels.find((hostel) => hostel.value === value);
      if (selectedHostels) {
        setComplaintDetails(prevDetails => ({
          ...prevDetails,
          title: selectedHostels.label
        }));
      }
    } else {
      setComplaintDetails(prevDetails => ({
        ...prevDetails,
        [name]: value
      }));
    }
  };

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
        <div className='cHead'>OTHER REQUESTS ({complaintStatus.complaintCount - complaintStatus.complaintsResolved})</div>
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
                <select name="title" onChange={handleInputChange} className='hostel'>
                <option value=""> -- Select Hostel -- </option>
                {hostels.map((hostel) => (
                    <option key={hostel.value} value={hostel.value}>{hostel.label}</option>
                ))}
                </select>
              </div>
          </div>
          <div className='col-head'>
            <p>HOSTEL</p>
            <p>ROOM</p>
            <p>DATE</p>
            <p>TIME</p>
          </div>
        <div className='reqDisplay'>
        <Cardd/>
        <Cardd/>
        <Cardd/>
        <Cardd/>
        <Cardd/>
        <Cardd/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Services
