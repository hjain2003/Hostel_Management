import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import SideNavbar from '../SideNavbar/SideNavbar';
import './Form.css'

function RequestForm() {

    let problems = [
        { label: "Fell in Love", value: "1"},
        { label: "Missed my exam because I overslept" , value: "2"},
        { label: "Was dancing with my roomate and realised I was a lesbian", value: "3"},
        { label: "Wanted to kill myself after watching the ending of Game of Thrones", value: "4"},
        { label: "The toilet is blocked like my crush's heart", value: "5"}
    ]
    
    let [problem, setProblem] = useState("Select a problem")

    let handleProblemChange = (e) => {
      setProblem(e.target.value)
    }

  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );

  const handleChange = (event) => {
    setTextarea(event.target.value)
  }

  return (
    <div className="full_page_div">
    <div className="sideBar_Profile">
      <SideNavbar />
      <div className='reg_req_container'>
        <h1><u>REGISTER REQUESTS</u></h1>
        <form >
        <select onChange={handleProblemChange} className='problem'> 
            <option value="Select Problem"> -- Select Your Problem -- </option>
            {problems.map((problem) => <option value={problem.value}>{problem.label}</option>)}
        </select>
        <textarea value={textarea} onChange={handleChange} className='textArea'/>
        <button className='cancelling'>Cancel</button>
        <input type="submit" className='submitting'/>
        </form>
      </div>
      
    </div>
  </div>
  )
}

export default RequestForm;