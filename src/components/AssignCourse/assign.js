import React ,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";

export default function AssignCourse() {
  const [open, setOpen] = React.useState(false);  
  const [errors, setErrors] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [course, setCourse] = useState("");
  const [courseName, setCourseName] = useState("");
  const[courses, setCourses] = useState([]);
  const popError = (errorMessage) => {

    toast.error(errorMessage, {
      className :"error-toast",
      position:toast.POSITION.BOTTOM_RIGHT
    });
  }
  useEffect(() => {
    const fetchUsername = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
      try {
      //  console.log(Url)
            const { data } = await axios.get(`https://lms-backend-iw67.onrender.com/api/assignCourse/getAllUsers`, config);
            console.log("hello",data);  
            setUsers(data.res);   
            console.log(users);  
          
          } catch (error) {
            console.log(error.response.data.error);
          }
        };
        fetchUsername();
        const fetchCourses = async () => {
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
          try {
                const { data } = await axios.get(`https://lms-backend-iw67.onrender.com/api/course/getAllCourses`, config);
                console.log(data);   
                setCourses(data.res);  
              
              } catch (error) {
                console.log(error.response.data.error);
              }
            };
            fetchCourses();
  },[]);

 const assignCourseHandle = async(e)=> {
  e.preventDefault();

    //validation
    if(!username || !course ||!courseName){
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
        "https://lms-backend-iw67.onrender.com/api/assignCourse/assign",
        {userId: username, courseId: course ,user_courseId:`${username}&${course}`, courseName },
        config
      );
     console.log("data",data);
     toast.success("Course added to user successfully", {
        className :"success-toast",
        position:toast.POSITION.BOTTOM_RIGHT
      });

    } catch (error) {
      popError(error.response.data.error);
      setCourse("");
      setUsername("");
      return;
    }
    
 }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangeCourse = (event) => {
    setCourse(event.target.value);
  };
  const handleChangeCourseName = (courseName) =>{
    setCourseName(courseName);
  }
  return (
    <div>
        <ToastContainer></ToastContainer>
        <Button variant="outlined" sx={{marginBottom:"1rem"}} onClick={handleClickOpen}>
        Assign Course
      </Button>
      <Dialog open={open}>
        <DialogTitle>Assign Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To assign a course to a student or instructor, please select suitable username and course title.
          </DialogContentText>
          <Box
      component="form"
      sx={{
        'display':'flex',
        'boxSizing':'border-box',
        'width':'100%',
        'justifyContent':'space-between',
        'flexWrap':'wrap',
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >              
      <FormControl fullWidth variant="filled">
<InputLabel id="demo-simple-select-filled-label">Select Instructor/ Student</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={username}
          label="Username"
          onChange={handleChangeUsername}
        >
            {users && users.map(({_id,username}) => (
          <MenuItem key ={_id} value={_id}>{username}</MenuItem>))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="filled">
<InputLabel id="demo-simple-select-filled-label">Select Course</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={course}
          label="Course"
          onChange={handleChangeCourse}
        >
            {courses && courses.map(({_id,courseName}) => (
          <MenuItem key ={_id} value={_id}  onClick={() => handleChangeCourseName(courseName)}>{courseName}</MenuItem>))}
        </Select>
      </FormControl>
    </Box>
   
  {errors && <span>{errors}</span>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={assignCourseHandle}>Assign Course</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}