import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ResponsiveDrawer from './../../components/Navbar/navbar';
import axios from 'axios';
import './style.css';

const drawerWidth = 220;


const Profile = (props) => {
  const[role, setRole] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
    try {
    //  console.log(Url)
          const { data } = await axios.get(`https://lms-backend-iw67.onrender.com/api/private/profile/${localStorage.getItem("username")}`, config);
          console.log(data);  
          setRole(data.user.role);     
        
        } catch (error) {
          console.log(error.response.data.error);
        }
      };
      fetchData();
    },[]);
    return (
        
        <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer></ResponsiveDrawer> 
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div className="profile-page">

          <div className='avatar'>
          {localStorage.getItem("username")[0].toUpperCase()}
          </div>
               
               <div  className = "username">{localStorage.getItem("username")}</div>
               <div className = "role">{role}</div>

        </div>
      </Box>
      </Box>
     );
}
 
export default Profile;