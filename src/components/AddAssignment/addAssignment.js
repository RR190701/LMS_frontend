import React ,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TimePicker from 'react-time-picker';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import uuid from 'react-uuid';
import "./style.css";

export default function AddAssignment({courseId}) {
  const [open, setOpen] = React.useState(false);  
  const [errors, setErrors] = useState("");
  const [lastSubmissionDate, setLastSubmissionDate] = useState();
  const [title, setTitle] =useState("");
  const [info, setInfo] = useState("");
  const [marks, setMarks] = useState(0);

  const popError = (errorMessage) => {

    toast.error(errorMessage, {
      className :"error-toast",
      position:toast.POSITION.BOTTOM_RIGHT
    });
  }
  const addNewLab = async (e) => {
    e.preventDefault();
     // console.log(date, datePosted, lastSubmissionDate, courseId, courseName);
      
    //validation
    if(!info|| !lastSubmissionDate||!title||!marks ){
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
        "https://lms-backend-iw67.onrender.com/api/assignment/addAssignment",
        {info, title, courseId, datePosted:Date(), lastSubmissionDate, marks, courseId},
        config
      );
     console.log("data",data);
    } catch (error) {
      popError(error.response.data.error);
      setLastSubmissionDate("");
      setInfo("");
      setTitle("");
      setMarks("");
      return;
    }
    setLastSubmissionDate("");
    setInfo("");
    setTitle("");
    setMarks("");

    toast.success("Assignment Added", {
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
  const newdate = new Date();

  return (
    <div>
        <ToastContainer></ToastContainer>
        <Button variant="outlined" sx={{marginBottom:"1rem", marginRight:"1rem"}} onClick={handleClickOpen}>
         Add Assignment
      </Button>
      <Dialog open={open} >
        <DialogTitle 
        >Add New Assigment</DialogTitle>
        <DialogContent>
              <div className="add-aasignmnet">
                <label for="title">Title :</label>
                <input value={title} onChange = {(e) => setTitle(e.target.value)}  type="text" label="title"></input>
                
                <label for="title">Assigment details :</label>
                <textarea value={info} onChange = {(e) => setInfo(e.target.value)} label="title"></textarea>
                
         <label for="title">Maximum marks :</label>
                <input value={marks} onChange = {(e) => setMarks(e.target.value)} type="number" label="title"></input>

         <label>Last date for submission :</label>       
         <DatePicker selected={lastSubmissionDate} onChange={(lastSubmissionDate) => setLastSubmissionDate(lastSubmissionDate)}></DatePicker>

         
              </div>
    
  {errors && <span>{errors}</span>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addNewLab}>Add Assignment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}