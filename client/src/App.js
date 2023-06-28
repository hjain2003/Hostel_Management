import './App.css';
import React, { useState } from "react";
import './components/styles.css';
import { Login } from "./components/loginCard";
import { Register } from "./components/Register";
import TopTitle from "./components/TopTitle";
import HostelBanner from './components/HostelBanner/HostelBanner';
import SideNavbar from './components/SideNavbar/SideNavbar';
import Profile from './components/Profile/Profile';

function App() {
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

  return (
    <>
    {/* <HostelBanner/> */}
    {/* <SideNavbar/> */}
    <Profile/>
    </>
    // <div className='App'>
    //   <div className="Head">
    //     <TopTitle/>
    //     </div>
    //     <div className="AppMain">
    //     {
    //       currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
    //     }
    //     </div>
    // </div>
    
  );  
}

export default App;
