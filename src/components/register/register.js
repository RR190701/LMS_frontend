import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveDrawer from '../Navbar/navbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const drawerWidth = 220;

const theme = createTheme();

export default function RegisterMember({history}) {
    const [errors, setErrors] = useState("");
    const [username, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [role, setRole] = React.useState('');
    const popError = (errorMessage) => {
  
      toast.error(errorMessage, {
        className :"error-toast",
        position:toast.POSITION.BOTTOM_RIGHT
      });
    }
    const popSuccess = (successMessage) => {
  
        toast.success(successMessage, {
          className :"success-toast",
          position:toast.POSITION.BOTTOM_RIGHT
        });
      }
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      //validation
      if(!username || !password || !role){
        setErrors("Please enter required details");
        return;
      }
      
      setErrors("");
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          "https://lms-backend-iw67.onrender.com/api/auth/register",
          {username, password , role},
          config
        );
       console.log("data",data);
      } catch (error) {
        popError(error.response.data.error);
        setpassword("");
        setuserName("");
        setRole("");
        return;
      }
      
      popSuccess("Member registered successfully");
      setpassword("");
      setuserName("");
      setRole("");
    };
  
  return (
    <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer></ResponsiveDrawer> 
        <ToastContainer></ToastContainer>
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Register New Memeber
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={role}
    label="Role"
    fullWidth
    onChange={(e) => setRole(e.target.value)}
  >
    <MenuItem value ={"Student"} >Student</MenuItem>
    <MenuItem value = {"Instuctor"}>Instructor</MenuItem>
  </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username} onChange={(e)=>setuserName(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value = {password}
              onChange = {(e) => setpassword(e.target.value)}
            />
            {errors && <span>{errors}</span>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
              </Container>
    </ThemeProvider>
    </Box>
      </Box>
  );
}