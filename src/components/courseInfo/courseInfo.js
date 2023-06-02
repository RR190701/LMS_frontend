import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import ResponsiveDrawer from './../../components/Navbar/navbar';
import CodeLabs from './../../components/CodeLabs/codeLabs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import axios from "axios";
import TrainingMaterial from '../TrainingMaterial/trainingMaterial';
import Assignment from '../Assignment/assignment';

const drawerWidth = 220;
function TabPanel(props) {
    const { children, value, index, ...other } = props;

  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component ="span">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const CourseInfo = ({history, match}) => {
    const [value, setValue] = React.useState(0);
    const [course, setCourse] = React.useState(0);
    const [role, setRole] = React.useState("");
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login");
        } 
        const fetchCourseInfo = async() => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
        try {
            console.log("param",match.params.courseId)
            const { data } = await axios.get(`/api/course/getSingleCourse/${match.params.courseId}/${localStorage.getItem("username")}`, config);
              setCourse(data.res); 
              setRole(data.role);
              console.log(course);   

            
            } 
            catch (error) {
              console.log(error.response.data.error);
            }
          };
          
          fetchCourseInfo();
        },[history,  match.params]);
    
    return (
        
        <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer></ResponsiveDrawer> 
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <h3>
             {course.courseName}
        </h3>
        <div>
        {course.courseInfo}
        </div>
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Code Labs" {...a11yProps(0)} />
          <Tab label="Study Material" {...a11yProps(1)} />
          <Tab label = "Assignments" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <CodeLabs role ={role} courseId = {match.params.courseId} courseName ={course.courseName}></CodeLabs>      </TabPanel>
      <TabPanel value={value} index={1}>
        <TrainingMaterial courseId={match.params.courseId}></TrainingMaterial>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Assignment courseId = {match.params.courseId}></Assignment>
      </TabPanel>
    </Box>
      </Box>
      </Box>
     );
}
 
export default CourseInfo;