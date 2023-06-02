import  React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveDrawer from './../../components/Navbar/navbar';
import CourseCard from '../../containers/CourseCard/card';
import axios from "axios";
import './style.css';
import  AddCourse from './../addCourse/addCourse';
import  AssignCourse from '../AssignCourse/assign';

const drawerWidth = 220;
const Courses = ({history}) => {
    const[courses, setCourses] = useState([]);
    const [role, setRole] =useState("");


    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login");
        } 
        const fetchAllCourses = async() => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
        try {
              const { data } = await axios.get(`https://lms-backend-iw67.onrender.com/api/course/getUsersAllCourses/${localStorage.getItem("username")}`, config);
              console.log("courses",data);   
              setCourses(data.res);  
              setRole(data.role);
            
            } 
            catch (error) {
              console.log(error.response.data.error);
            }
          };
          
          fetchAllCourses();
        },[history]);
    return (
        
        <Box sx={{ display: 'flex' }} >
        <ResponsiveDrawer></ResponsiveDrawer> 
        <Box
        component="main"
        sx = {{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
    <Box component="div"
    sx={{display:"flex"}}>
      {(role === "Admin")?(<>
        <AddCourse></AddCourse>
              <AssignCourse></AssignCourse></>

      ):null}


    </Box>
        <div 
        className = "course-div">
          {
            (role === "Admin")?
            (courses && courses.map(({_id, courseInfo, courseName}) => (

              <CourseCard key = {_id}
              courseId = {_id}
              courseInfo = {courseInfo}
              courseName = {courseName}
              ></CourseCard>
                  ))):
            (
              courses && courses.map(({_id, courseId, courseName}) => (

                <CourseCard key = {_id}
                courseId = {courseId} 
                courseName = {courseName}
                ></CourseCard>
                    ))
            )
          }
        </div>
        
      </Box>
      </Box>
     );
}
 
export default Courses;