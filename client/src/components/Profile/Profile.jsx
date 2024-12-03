import React, { useEffect, useState } from 'react';
import './Profile.css';
import SideNavbar from '../SideNavbar/SideNavbar';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

const Profile = () => {

  const navigate = useNavigate();
  const [userData,setUserData] = useState('');

  const callProfilePage = async () => {
    try {
      const res = await fetch('http://15.207.54.199:5000/users/dashboard', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (res.status !== 200) {
        navigate('/');
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  };

  useEffect(() => {
    callProfilePage();
  }, []);

  return (
    <div className="entire_page_div">
      <span className='logout'><b><u><NavLink to='/logout'>LOGOUT</NavLink></u></b></span>
      <div className="sideBar_Profile">
        <SideNavbar />
        <div className="profile_container">
          <div className="row1">
            <div className="profile_img_container">IMG</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="name_rollno">
              <span id="stud_name">{userData.username}</span>
              <br />
              <span id="stud_rollno">{userData.rollno}</span>
            </div>
          </div>
          <br />
          <div className="row2">
            <div className="hostel_card">
              HOSTEL
              <br />
              <h2>{userData.hostel}</h2>
            </div>
            <div className="room_card">
              ROOM
              <br />
              <h2>{userData.roomno}</h2>
            </div>
            <div className="semester_branch_card">
              <span>Semester: 5</span>
              <span>Branch: COE</span>
              <span>Dhinchak</span>
              <span>Pinchak</span>
            </div>
          </div>
          <br />
          <div className="row3">
            <h3>IMPORTANT CONTACTS</h3>
            <div className="row3_content">
              <div className="col1">
                <u>CARETAKER</u>
                <span>Ph: +91 9958959666</span>
                <span>Email: abc@thapar.edu</span>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="col2">
                <span>
                  <u>Dispensary</u>: +91 9009993333
                </span>
                <span>
                  <u>Warden</u>: +91 9009993333
                </span>
                <span>
                  <u>Security</u>: +91 9009993333
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
