import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@mui/material/Chip';
import axios from "axios";
import Stack from '@mui/material/Stack';
import "./navbar.css";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const drawerWidth = 220;
const useStyles = makeStyles((theme) => ({
  loader:{
      margin:'9rem auto'
  },
  border :{
    height:"100%",
    backgroundColor: "#d0efff",
  },
    }));
  

function ResponsiveDrawer(props) {
const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [role, setRole] = useState("");
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    props.history.push("/login");
   
  };
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


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.border} style={{"backgroundColor":"#f1efed"}}>
      <Toolbar/>
      <Divider />
      <List>
      <ListItem key="Profile" disablePadding className ="listbutton">
      <NavLink to ="/profile">            
        <ListItemButton >
              <ListItemText primary="Profile" />
            </ListItemButton>
            </NavLink>
          </ListItem>
          {(role === "Admin")?
      <ListItem key="Register Member" disablePadding className ="listbutton">
        <NavLink to ="/register">            
        <ListItemButton >
              <ListItemText primary="Register Member" />
            </ListItemButton>
            </NavLink>

          </ListItem>
          :null}
                    {(role === "Admin")?
      <ListItem key="Study Material" disablePadding className ="listbutton">
        <NavLink to ="/studyMaterial">            
        <ListItemButton >
              <ListItemText primary="Study Material" />
            </ListItemButton>
            </NavLink>

          </ListItem>
          :null}
                  <ListItem key="Courses" disablePadding className ="listbutton">
                  <NavLink to ="/course">            
        <ListItemButton >
              <ListItemText primary="Courses" />
            </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem key="LogOut" disablePadding className ="listbutton">          
        <ListItemButton onClick={logoutHandler} >
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>

      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        className = {classes.appbar}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:"#4aed88"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"  sx={{ mr: 1 }}>
            Learning Management System
          </Typography>
          <Stack direction="row" spacing={1} >
      <Chip label={role} variant="outlined" />
    </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
