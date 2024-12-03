import * as React from 'react';
import './Rcard.css';

const RCard = (props) => {

   // console.log("COMPLAINT ID : ", props.complaintId);
   const handleDelete = async()=>{
      try {
         const response = await fetch(`http://15.207.54.199:5000/complaints/${props.complaintId}`, {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${localStorage.getItem('jwtoken')}`
           }
         });
   
         if (response.status === 200) {
           window.alert("Complained resolved! Please refresh the page");
         } else {
           console.log('Error:', response.status);
         }
       } catch (err) {
         console.log(err);
       }
   }
   
   return (
      <div className='Thecard'>
         <span><i>{props.date}</i></span>

         <div className="heading_button">
            <span><span className='aTitle'>{props.title}</span> &nbsp;&nbsp;&nbsp;&nbsp;
               <button className='done' onClick={handleDelete}>Done</button></span>
         </div>

         {/* <button className='cancle'>Cancle</button>  */}
      </div>
   )
}

export default RCard;
