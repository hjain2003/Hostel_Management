import React, { useState } from 'react';
import SideNavbar from '../SideNavbar/SideNavbar';
import './AdminAddAnn.css';
import { useNavigate } from 'react-router-dom';

function RequestForm() {
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

  const [complaint_details, setComplaintDetails] = useState({
    title: "",
    description: ""
  });

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

  const cancelComplaint = ()=>{
    navigate('/services');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description } = complaint_details;

    try {
      const res = await fetch('http://localhost:5000/complaints/addComplaint', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description
        }),
      });

      const data = await res.json();

      if (res.status === 422) {
        window.alert('Complaint Addition failed!');
        console.log(res.status);
        console.log(data);
      } else if (res.status !== 422) {
        window.alert('Complaint successfully registered!');
        navigate('/services');
        console.log(res.status);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      navigate('/');
    }
    console.log(complaint_details);
  };

  return (
    <div className="full_page_div">
      <div className="sideBar_Profile">
        <SideNavbar />
        <div className='reg_req_container'>
          <h1><u>ADD ANNOUNCEMENT</u></h1>
          <form onSubmit={handleSubmit}>
            <select name="title" onChange={handleInputChange} className='hostel'>
              <option value=""> -- Select Hostel -- </option>
              {hostels.map((hostel) => (
                <option key={hostel.value} value={hostel.value}>{hostel.label}</option>
              ))}
            </select>
            <textarea onChange={handleInputChange} className='titleAr' placeholder='TITLE' value={complaint_details.description}/>
            <textarea name="description" placeholder="DETAILS" value={complaint_details.description} onChange={handleInputChange} className='textArea' />
            <div className='bForm'>
            <input type="submit" className='submitting' placeholder='ADD' value={("ADD")}/>
            <button className='cancelling' onClick={cancelComplaint}>Cancel</button>
            
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default RequestForm;
