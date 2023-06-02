import  React, {useEffect, useState} from 'react';
import axios from "axios";
import ScheduleCodeLab from '../ScheduleLab/scheduleLab';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddAssignment from '../AddAssignment/addAssignment';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const drawerWidth = 220;
const Assignment = ({history, courseId, role, courseName}) => {
    const[assignments, setAssignments] = useState([]);
    const [sceDate, setSceDate] = useState("");
    const [subDate, setSubDate] =useState(""); 


    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login");
        } 
        const fetchAllAssignments = async() => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
        try {
              const { data } = await axios.get(`/api/assignment/getAllAssignments/${courseId}`, config);
              console.log("assignments",data);   
              setAssignments(data.res);  
              setSceDate(data.res.datePosted);
              setSubDate(data.res.lastSubmissionDate);
              console.log(data.res.datePosted, data.res.lastSubmissionDate)
            
            } 
            catch (error) {
              console.log(error.response.data.error);
            }
          };
          
          fetchAllAssignments();
        },[history]);

    return (
        <>
        <AddAssignment courseId ={courseId} courseName ={courseName}></AddAssignment>
<div className='codelabs-div'>
    
    {assignments && assignments.map(({_id, marks, title,datePosted, lastSubmissionDate,info}) =>{
   
        
   const sceDate = new Date(datePosted);
   const subDate = new Date(lastSubmissionDate);
   console.log(sceDate, subDate);
   return(
    <Paper key ={_id} className ="codelab-card">
            
    <h3 style={{"margin":"0 5px 2px 0"}}>{title}</h3>
    <p style={{"margin":"0 5px 5px 0", "fontSize":"14px"}}><b>scheduled at :</b>{`${sceDate.getDay()}/${sceDate.getMonth()+1}/${sceDate.getFullYear()}`}</p>
    <div>
     <p style={{"margin":"0 5px 5px 0", "fontSize":"14px"}}><b>Max marks :</b>{marks}</p> 
     <p style={{"margin":"0 5px 5px 0", "fontSize":"14px"}}><b>  Last date of submission :</b>{`${subDate.getDay()}/${subDate.getMonth()+1}/${subDate.getFullYear()}`}</p>
    </div>    
    <div style={{"display":"flex","flex-direction":"row-reverse","width":"100%"}}>
    <Button variant="contained" size="small"> 
    <NavLink style={{"color":"white", "textDecoration":"none"}} to = {`/assignment/${_id}`}>Open</NavLink></Button>

    </div>
</Paper>
   );
    }

    )}

</div>
</>

     );
}
 
export default Assignment;