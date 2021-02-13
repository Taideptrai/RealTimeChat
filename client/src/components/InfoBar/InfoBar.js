import React, { useState } from 'react';
import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
const InfoBar = ({roomName}) =>{
   
    return(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className=" ml-2 onineIcon" src={onlineIcon}/>
                <h3 className="ml-1">{roomName}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close image"/></a>
            </div>
        </div>
    )
}
export default InfoBar;