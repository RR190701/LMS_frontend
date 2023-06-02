import React ,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);  
  const [role, setRole] = React.useState('');
  const [errors, setErrors] = useState("");
  const [username, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const popError = (errorMessage) => {

    toast.error(errorMessage, {
      className :"error-toast",
      position:toast.POSITION.BOTTOM_RIGHT
    });
  }
  const registerSubmit = async (e) => {
    e.preventDefault();

    //validation
    if(!username || !password ||!role){
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
    setpassword("");
    setuserName("");
    setRole("");

    toast.success("Member Registered", {
        className :"success-toast",
        position:toast.POSITION.BOTTOM_RIGHT
      });
      
    handleClose();
  };

  const handleChange = (event) => {
    setRole(event.target.value);
    console.log(role);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <ToastContainer></ToastContainer>
      <Dialog open={open}>
        <DialogTitle>Register Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To register new member to this website, please enter username and password here and select 
            suitable role.
          </DialogContentText>
          <Box
      component="form"
      sx={{
        'display':'flex',
        'boxSizing':'border-box',
        'width':'100%',
        'justifyContent':'space-between',
        'flexWrap':'wrap',
        '& > :not(style)': { m: 1, width: '45%' },

      }}
      noValidate
      autoComplete="off"
    >              
    <TextField
    margin="normal"
    required
    fullWidth
    id="username"
    label="Username"
    name="username"
    autoComplete="username"
    autoFocus
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Staff">Staff</MenuItem>
        </Select>
      </FormControl>
    </Box>
    
  {errors && <span>{errors}</span>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={registerSubmit}>Register</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}