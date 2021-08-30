import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import { Route, useParams } from 'react-router-dom';
import { IMessages } from '../interface/Login';
import Conversation from './Conversation';
import Input from './Input';




const Chatting: FC = () => {
    const  {id}  = useParams<{ id?: string | undefined }>();
let i =false;


    const[messages3,setMessages3] = useState([{
        name: "",
        text: "No message",
        timestamp: ""
    }
    ]);
    const[name,setName] = useState<string>("");
    useEffect(() => {

        var tokenString = sessionStorage.getItem('token');
        var userToken = JSON.parse(tokenString || "{}");
        const str = "Bearer " + userToken.token;
        // console.log("Bearer " + userToken.token)
        axios.get<IMessages>(`https://localhost:44369/api/Home/${id}`,
            {
                headers: {
                    'Authorization': str,
                }
            }).then((res) => {

                console.log("mess",res.data.messages);

                  let tmpArray = [{
                    name: "",
                    text: "Conversation Started",
                    timestamp: ""
                  }];
               
                for (let index = 0; index < res.data.messages.length; index++) {
                    tmpArray.push(res.data.messages[index]);
               
                }
                setMessages3(tmpArray);
                

  i = true;

  
               

            });
        


        axios.get("https://localhost:44369/api/Home/Test",
        {
            headers: {
                'Authorization': str,
            }
        }).then((res) => {
            console.log(res.data);
            setName(res.data);
            console.log("Name", name);

            
    
        });

    },[i])

    return (

        <div className="message-layout">

            {
                messages3.map((doc) => {
                    if(name == doc.name){
                     return(   
                    <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{doc.name}</p>
                    <div className="messageBox backgroundBlue" >
                        <p className="messageText colorWhite">{doc.text}</p>
                    </div>
                </div>    )
                    }
                    
                    else{
                        return(
                        <div className="messageContainer justifyStart">
                     <p className="sentText pl-10 ">{doc.name}</p>
                     <div className="messageBox backgroundLight">
                         <p className="messageText colorDark">{doc.text}</p>
                     </div>
                 </div>)
                    }
                }
                )
            }

                 <Input id = {id}  />
            </div>

    );
}

export default Chatting
