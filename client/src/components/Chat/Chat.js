import React, { useEffect, useState } from 'react';
import './Chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import ChatScreen from '../ChatScreen/ChatScreen';


let socket;
var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};
const Chat = ({location}) =>{
    const [name,setName] = useState("");
    const [room,setRoom] = useState("");
    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';
    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        socket = io(ENDPOINT, connectionOptions) //connect + get socketio Id
        setName(name); 
        setRoom(room);
        socket.emit('join', {name,room},()=>{ //emit joinRoom + send data to server
           //handleError
        })
        return () =>{
            socket.emit('disconnect'); //disconnect when component unmount
            socket.off();
        }
    },[ENDPOINT,location.search ])
    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages,message])
        })
    },[messages])/// why dependencies is messages not  [] or ()

    const sendMessage = (e) =>{
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, ()=>{
                setMessage("");
            });
        }
    }
    console.log(message, messages)
    return(
        <div className="outerContainer">
            <div className="container">
            <InfoBar roomName={room}/>
            <ChatScreen messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}
export default Chat;