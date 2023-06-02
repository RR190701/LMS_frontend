import React ,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function AddCourse() {
  const [open, setOpen] = React.useState(false);  
  const [errors, setErrors] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseInfo, setCourseInfo] = useState("");
  const popError = (errorMessage) => {

    toast.error(errorMessage, {
      className :"error-toast",
      position:toast.POSITION.BOTTOM_RIGHT
    });
  }
  const addNewCourse = async (e) => {
    e.preventDefault();

    //validation
    if(!courseName || !courseInfo ){
      setErrors("Please enter required details");
      return;
    }
    
    setErrors("");

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

    try {
      const { data } = await axios.post(
        "https://lms-backend-iw67.onrender.com/api/course/addCourses",
        {courseName, courseInfo },
        config
      );
     console.log("data",data);
    } catch (error) {
      popError(error.response.data.error);
      setCourseName("");
      setCourseInfo("");
      return;
    }
    setCourseName("");
    setCourseInfo("");

    toast.success("Course Added", {
        className :"success-toast",
        position:toast.POSITION.BOTTOM_RIGHT
      });
      
    handleClose();
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
        <Button variant="outlined" sx={{marginBottom:"1rem", marginRight:"1rem"}} onClick={handleClickOpen}>
        Add Course
      </Button>
      <Dialog open={open}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new course into this website, please enter course name and course info here.
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
    id="courseName"
    label="Course Name"
    name="courseName"
    autoComplete="courseName"
    autoFocus
    value={courseName} onChange={(e)=>setCourseName(e.target.value)}
  />
      <TextField
    margin="normal"
    required
    fullWidth
    id="courseInfo"
    label="Course Info"
    name="courseInfo"
    autoComplete="courseInfo"
    autoFocus
    value={courseInfo} onChange={(e)=>setCourseInfo(e.target.value)}
  />
    </Box>
    
  {errors && <span>{errors}</span>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addNewCourse}>Add Course</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}