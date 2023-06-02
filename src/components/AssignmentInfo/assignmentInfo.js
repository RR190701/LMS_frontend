import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import ResponsiveDrawer from '../Navbar/navbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { Button } from '@mui/material';

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
const AssignmentInfo = ({history, match}) => {
    const [value, setValue] = React.useState(0);
    const [ass, setAss] = React.useState(0);
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
            const { data } = await axios.get(`https://lms-backend-iw67.onrender.com/api/assignment/getSingleAssignment/${match.params.assId}`, config);
              setAss(data.res);  

            
            } 
            catch (error) {
              console.log(error.response.data.error);
            }
          };
          
          fetchCourseInfo();
        },[history,  match.params]);
        const sceDate = new Date(ass.datePosted);
        const subDate = new Date(ass.lastSubmissionDate);
    
    return (
        
        <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer></ResponsiveDrawer> 
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div>
        <h3>
             {ass.title}
        </h3>
        <div><b>Date posted :</b>{`${sceDate.getDay()}/${sceDate.getMonth()+1}/${sceDate.getFullYear()}`}</div>
        <div><b>Last Date of submission :</b>{`${subDate.getDay()}/${subDate.getMonth()+1}/${subDate.getFullYear()}`}</div>
        <div><b>Max marks :</b>{ass.marks}</div>
        <p>
{ass.info}
        </p>
        <div className='submit-ass'>
          {/* <div style={{"backgroundColor":"#95f695","padding":"1rem","borderRadius":"5px"}}>
              <b>Sbumitted :</b>
              filename
          </div> */}
<div>
<p>Submit files for assigment (pdf/png/docx) :</p>
        <input style={{"border":"black .2px solid", "width":"300px", "borderRadius":"5px"}} type = "file"></input>
        <Button  size='small'>Submit</Button>
        
</div>
        </div>
      </div>
      </Box>
      </Box>
     );
}
 
export default AssignmentInfo;