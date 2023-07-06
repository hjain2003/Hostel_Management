import * as React from 'react';
import './Rcard.css';

const RCard = () => {
   return (
      <div className='Thecard'>
         <span>DATE</span>

         <div className="heading_button">
            <span><span className='aTitle'>THIS IS THE HEADING</span> &nbsp;&nbsp;&nbsp;&nbsp;
               <button className='done'>Done</button></span>
         </div>

         {/* <button className='cancle'>Cancle</button>  */}
      </div>
   )
}

export default RCard;
