import React, { useState } from 'react';
import SideNavbar from '../SideNavbar/SideNavbar';
import './Form.css';
import { useNavigate } from 'react-router-dom';

function RequestForm() {
  const navigate = useNavigate();

  let problems = [
    { label: "Fell in Love", value: "1" },
    { label: "Missed my exam because I overslept", value: "2" },
    { label: "Was dancing with my roomate and realised I was a lesbian", value: "3" },
    { label: "Wanted to kill myself after watching the ending of Game of Thrones", value: "4" },
    { label: "The toilet is blocked like my crush's heart", value: "5" }
  ];

  const [complaint_details, setComplaintDetails] = useState({
    title: "",
    description: "Enter additional info..."
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
      const selectedProblem = problems.find((problem) => problem.value === value);
      if (selectedProblem) {
        setComplaintDetails(prevDetails => ({
          ...prevDetails,
          title: selectedProblem.label
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
          <h1><u>REGISTER REQUESTS</u></h1>
          <form onSubmit={handleSubmit}>
            <select name="title" onChange={handleInputChange} className='problem'>
              <option value=""> -- Select Your Problem -- </option>
              {problems.map((problem) => (
                <option key={problem.value} value={problem.value}>{problem.label}</option>
              ))}
            </select>
            <textarea name="description" value={complaint_details.description} onChange={handleInputChange} className='textArea' />
            <button className='cancelling' onClick={cancelComplaint}>Cancel</button>
            <input type="submit" className='submitting' />
          </form>
        </div>

      </div>
    </div>
  );
}

export default RequestForm;
