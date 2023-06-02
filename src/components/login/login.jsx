import React, {useState} from 'react';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const theme = createTheme();

export default function SignInSide({history}) {
  const [errors, setErrors] = useState("");
  const [username, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const popError = (errorMessage) => {

    toast.error(errorMessage, {
      className :"error-toast",
      position:toast.POSITION.BOTTOM_RIGHT
    });
  }
  const LoginSubmit = async (e) => {
    e.preventDefault();

    //validation
    if(!username || !password){
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
        "/api/auth/login",
        {username, password },
        config
      );
     console.log("data",data);
     localStorage.setItem("authToken", data.token)
     localStorage.setItem("username", username)
    } catch (error) {
      popError(error.response.data.error);
      setpassword("");
      setuserName("");
      return;
    }
    
    history.push("/profile");
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer></ToastContainer>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://uploads-ssl.webflow.com/5e38f1a8e654dab96f303972/5ef91f78ff905f397e8ba066__main-education-during-quarantine.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                LMS
            </Avatar> */}
            <Typography component="h1" variant="h5" sx={{fontWeight:"600", mb:2, fontSize:"30px"}}>
              LearnGo
            </Typography>
            <Box component="form" noValidate onSubmit={LoginSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                type='text'
                value={username} onChange={(e)=>setuserName(e.target.value)}
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
                sx={{ mt: 3, mb: 2 , backgroundColor:"#4aed88", color:"black"}}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}