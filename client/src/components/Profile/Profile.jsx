import React from 'react';
import './Profile.css';
import SideNavbar from '../SideNavbar/SideNavbar';

const Profile = () => {
  return (
    <div className="entire_page_div">
      <div className="sideBar_Profile">
        <SideNavbar />
        <div className="profile_container">
          <div className="row1">
            <div className="profile_img_container">IMG</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="name_rollno">
              <span id="stud_name">JANE DOE</span>
              <br />
              <span id="stud_rollno">102103420</span>
            </div>
          </div>
          <br />
          <div className="row2">
            <div className="hostel_card">
              HOSTEL
              <br />
              <h2>J</h2>
            </div>
            <div className="room_card">
              ROOM
              <br />
              <h2>EB-207</h2>
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
