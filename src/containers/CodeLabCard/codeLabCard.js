import React from 'react';
import Paper from '@mui/material/Paper';
import './style.css';
import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
const CodeLabCard = ({courseId, courseName, startTime, endTime, codeLabId, username, role, date}) => {
     const labDate = new Date(date);
     console.log(role);
    return (  
        <Paper className ="codelab-card">
            <h3 style={{"margin":"0 5px 2px 0"}}>{courseName} Code Lab</h3>
            <p style={{"margin":"0 5px 1rem 0"}}>scheduled at {`${labDate.getDay()}/${labDate.getMonth()+1}/${labDate.getFullYear()}`}</p>
            <div>
            <Chip label={`${startTime} - ${endTime}`} variant="outlined" />
            </div>    
            <div style={{"display":"flex","flex-direction":"row-reverse","width":"100%"}}>
            <Button variant="contained"> 
            <a style={{"color":"white", "textDecoration":"none"}}  href={`https://codinglabs.netlify.app/?roomid=${codeLabId}&username=${username}&role=${role}`} target = "_blank">Join</a></Button>

            </div>
        </Paper>
        
    );
}
 
export default CodeLabCard;