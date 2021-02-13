import React, { useEffect, useRef, useState } from 'react';
import './ChatScreen.css';

const ChatScreen = ({messages, name}) =>{
    const inputEl = useRef(null);
 
    useEffect(()=>{
        inputEl.current.scrollIntoView({ behavior: "smooth" });
    },[messages])
    return(
        <div className="chatScreen"> 
            {messages.map((message,key)=>{
                if (message.user === name || message.user === "admin"){
                    return(
                    <div key={key} style={{fontSize:'13px',width:"100%", display:'flex'}} className="mt-1">
                    <div className="col-6"></div>
                    <div className="col-6 card bg-primary text-white">
                        <div className="card-body">
                            {message.user === "admin" 
                            ? (<span>{message.text}</span>)
                            : (<div><span>{message.user}</span>: <span>{message.text}</span></div>)
                            }
                        </div>
                    </div>
                    </div>
                    )
                }
                else{
                    return(
                        <div key={key} style={{fontSize:'13px',width:"100%", display:'flex'}} className="mt-1">
                        <div className="col-6 card bg-dark text-white">
                            <div className="card-body">
                            <span>{message.user}</span>: {message.text}
                            </div>
                        </div>
                        <div className="col-6"></div>
                        </div>
                        )
                }       
            })
        }
        <div style={{ float:"left", clear: "both" }}
             ref={inputEl} >
        </div>
        </div>
    )
}
export default ChatScreen;