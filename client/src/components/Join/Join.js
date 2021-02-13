import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Join.css';
const Join = () =>{
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    return(
        <div className="joinOuterContaier row" style={{marginTop:"20vh"}}>
            <div className="joinInnerContaier col-4 mx-auto">
                <h1 className="heading" style={{textAlign:"center", borderBottom:"2px solid black"}}>Join</h1>
                <div className="mt-3">
                    <input placeholder="Name" className="joinInput form-control" type="text" onChange={(e) => setName(e.target.value)}></input>
                </div>
                
                <div className="mt-3"><input placeholder="Room" className="joinInput form-control" type="text" onChange={(e) =>setRoom(e.target.value)}>
                    </input>
                </div>
                
                <div style={{textAlign:"center"}}>
                    <Link onClick={e => {
                        if (!name  || !room) {
                            e.preventDefault();
                        } 
                        else{
                            localStorage.setItem('name', name);
                            localStorage.setItem('rooom', room);
                            return null
                        } 
                        }} to={`/chat?name=${name}&room=${room}`}>
                        <button className="btn btn-primary my-3" type="submit">Sign In</button>
                    </Link>
                
                </div>
                
            </div>
        </div>
    )
}
export default Join;