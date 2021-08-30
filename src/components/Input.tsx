import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';
import { connect } from 'http2';
import { stringify } from 'querystring';
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { ChildProps, IAddMessage } from '../interface/Login';

import './style.css'


 const Input: FC<ChildProps> =(props) => {
  console.log("id", props.id)
  let id:string | undefined = props.id
  
  
  
  
  // const [input, setInput] = useState<string>("");
  const [chatId, setchatId] = useState<string | undefined>("" || undefined);
  const [Text,setText] = useState<string>("");
  const [Name,setName] = useState<string>("")
  const [addMess, setaddMess] = useState<IAddMessage[]>([]);
 
    const handleClick = (event: ChangeEvent<HTMLInputElement>): void => {

        if (event.target.name == "input") {
          setText(event.target.value)
        }
      }
      
        var tokenString = sessionStorage.getItem('token');
        var userToken = JSON.parse(tokenString || "{}");
        const str = "Bearer " + userToken.token;

      useEffect(() => {
        setchatId(id);
        // console.log(chatId)
        // console.log("Bearer " + userToken.token)
        
        axios.get("https://localhost:44369/api/Home/Test",
        {
            headers: {
                'Authorization': str,
            }
        }).then((res) => {
            // console.log("Name",res.data);
            setName(res.data );
           
    
        });
        // console.log(addMess);
        
      }, [])
    

      const SendMessage = async() => {
        // const token  = await addMessage(newDatas)
        // props.setToken(token);
        
        // setaddMess([...addMess, token]);
        
        var newDatas = {
          name: Name , text: Text, chatId: chatId
        }
          axios.post('https://localhost:44369/Chat/SendMessage', newDatas, {
            headers: {
                'Authorization': str,
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                console.log("Message Sent!", res)
                console.log(res.data);
                
            })
            .catch(err => {
                console.log("error Message", err)
            })

        }
      useEffect(() => {
       
        var _connectionId = '';
        var connection = new HubConnectionBuilder()
            .withUrl("https://localhost:44369/chatHub"
                , {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets
                })
            .configureLogging(LogLevel.Information)
            .build()

        //     connection
        // .start()
        // .then(() => console.log("Connected"))
        // .catch((err) => console.log("error while starting the connection",err))



        connection.start()
            .then(function () {
                connection.invoke('getconnectionId')
                    .then(function (connectionId) {
                        // const {id} = this.state
                        // console.log(id)
                        _connectionId = connectionId;
                      

                        axios.post("https://localhost:44369/Chat/joinRoom/" + _connectionId + `/${props.id}`,
                            {
                                headers: {
                                    'Authorization': str,
                                    'Content-Type': 'application/json',
                                }
                            }).then((res) => {
                                console.log("Room Joined!", res)

                            });
                    })
            })
            .catch(function (err) {
                console.log("Failed to Join Room !", err);

                console.log(err);
            })


          

              connection.on("RecieveMessage", (newDatas) => {
          console.log("data",newDatas)
            // console.log("testing", addMess)
            console.log("running")

            console.log(newDatas.name);




          });
         
              
            
        

      }, [])
        

      


        return (


        <div className="main-message">
        <div className="chat__input">
            <form >
            <input type="text" placeholder="Enter Text" name = "input" onChange={handleClick}/>
            <input type="hidden" name="chatId" value={props.id} />
            <input type="hidden" name="roomName" value={Name} />
           
            <div className="button-div">
            <button className="input-button" onClick={SendMessage} name="input" type="submit">Send</button>
            </div>
            </form>
            </div>
        </div>
    )
}

export default Input
