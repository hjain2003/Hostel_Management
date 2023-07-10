// ADMIN: CleanReq, AdminAddAnn, AdimAnnouncements, other
import './App.css';
import React, { useState } from "react";
import Profile from './components/Profile/Profile';
import Announcement from './components/Announcements/Announcement';
import Services from './components/RoomServices/Services'
import RequestForm from './components/RequesForm/Form'
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginCard/Login';
import Logout from './components/LoginCard/Logout';
import AdminAnnouncements from './components/AdminAnnouncements/AdminAnnouncements'
import AdminAddAnn from './components/AdminAddAnn/AdminAddAnn'
import CleanReq from './components/CleanReq/CleanReq'
import Other from './components/AdminOther/other'

function App() {

  return (
    <>
    <Routes>
      <Route path ='/' element ={<Login/>} />
      <Route path ='/profile' element = {<Profile/>}/>
      <Route path = '/announcements' element={<Announcement/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/reqform' element={<RequestForm/>}/>
      <Route path='/logout' element={<Logout/>}/>
    </Routes>

    {/* <AdminAnnouncements/> */}
    {/* <AdminAddAnn/> */}
    {/* <CleanReq/> */}
     {/* <Other/>   */}
    </>
  );  
}

export default App;
