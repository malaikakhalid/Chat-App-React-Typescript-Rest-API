import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'
import { IPersonal, IRoom } from '../interface/Login';
import './style.css'

const Conversation: FC = () =>  {

    

    
const defaultRoom: IRoom[] = [];
const defaultPersonal: IPersonal[] = [];

// const[personal, setPersonal]: [IPersonal[], (personal: IPersonal[]) => void] = useState(defaultPersonal);

const [room, setRoom]: [IRoom[], (room: IRoom[]) => void] = React.useState(defaultRoom);
const [personal, setPersonal]: [IPersonal[], (personal: IPersonal[]) => void] = React.useState(defaultPersonal);
const[name,setName] = useState<string>("");
useEffect(() => {
    var token =  sessionStorage.getItem('token' );
    var userToken = JSON.parse(token || '{}');
    var str = "Bearer " + userToken.token;
    //  console.log(str);
        axios
        .get<IRoom[]>("https://localhost:44369/api/Home/GroupChat", {
            headers: {
                'Authorization': str,
            }
        })
        .then((res) => {console.log("running")
            console.log(res.data);
            setRoom(res.data)
            // this.setState({ docs: res.data })

        })
        .catch(err => {console.log(err)});
    
},[] )


useEffect(() => {
    var token =  sessionStorage.getItem('token' );
    var userToken = JSON.parse(token || '{}');
    var str = "Bearer " + userToken.token;
    //  console.log(str);

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

        axios
        .get<IPersonal[]>("https://localhost:44369/api/Home/Find", {
            headers: {
                'Authorization': str,
            }
        })
        .then((res) => {console.log("running")
            console.log("run",res.data);
            setPersonal(res.data)
            // console.log("personal",personal);

            personal.map((doc) => {
                // console.log(doc.id)
            })
            // this.setState({ docs: res.data })

        })
        .catch(err => {console.log(err)});
}, [])


    return (
        <div className="main-convo">
            <h2> LOGIN IN :  {name}</h2>
            <h2>Group Chats </h2>
            <div className="chat-room">
                {
                    room.map((room) => (
                        <div className="group-convo">
                        <div className="room-text"><a href={`/messages/${room.id}`}>{room.name}</a></div>
                        <div className="room-date"> 23-12-2021</div>
                    </div> 
                    ))
                }
                
            </div>


            <h2>Personal Chats</h2>
            <div className="personal-convo">
                {
                    personal.map((doc) => (
                        <div className="group-convo">
                    <div className="room-text"><a href={`/messages/${doc.id}`}>{doc.userName}</a> </div>
                    <div className="room-date"> 23-12-2021</div>
                </div>
                        
                    ))
                   
                }
                
                
            </div>

        </div>
    )
}

export default Conversation;
