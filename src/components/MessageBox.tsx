import React from 'react'
import Input from './Input'
import './style.css'


const Message = () => {
    let isSentByCurrentUser = true;
    
    return (   
            isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">Malaika</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">Hi this is Malaika</p>
      
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">hi This is kainat</p>
            </div>
            <p className="sentText pl-10 ">Kainat</p>
          </div>
        )
  );
            
           
   
}

export default Message;
