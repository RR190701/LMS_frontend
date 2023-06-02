import  React, {useEffect, useState} from 'react';
import axios from "axios";
import CodeLabCard from '../../containers/CodeLabCard/codeLabCard';
import './style.css';
import ScheduleCodeLab from '../ScheduleLab/scheduleLab';

const drawerWidth = 220;
const CodeLab = ({history, courseId, role, courseName}) => {
    const[codelabs, setCodeLabs] = useState([]);


    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login");
        } 
        const fetchAllCodeLabs = async() => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
        try {
              const { data } = await axios.get(`https://lms-backend-iw67.onrender.com/api/codelab/getAllCodeLabs/${courseId}`, config);
              console.log("codelabs",data);   
              setCodeLabs(data.res);  
            
            } 
            catch (error) {
              console.log(error.response.data.error);
            }
          };
          
          fetchAllCodeLabs();
        },[history]);
    return (
        <>
        <ScheduleCodeLab courseId ={courseId} courseName ={courseName}></ScheduleCodeLab>
<div className='codelabs-div'>
    
    {codelabs && codelabs.map(({_id,courseId, courseName, startTime, endTime, codeLabId, date}) =>(

    <CodeLabCard key ={_id} courseId ={courseId}
    courseName = {courseName}
    date = {date}
    startTime= {startTime}
    role = {role}
    username={ localStorage.getItem("username")}
    endTime = {endTime}
    codeLabId = {codeLabId}>
    </CodeLabCard>
    ))}
</div>
</>

     );
}
 
export default CodeLab;