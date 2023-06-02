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
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import uuid from 'react-uuid';

export default function ScheduleCodeLab({courseId, courseName}) {
  const [open, setOpen] = React.useState(false);  
  const [errors, setErrors] = useState("");
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('10:00');
  const [date, setDate] = useState("");

  const popError = (errorMessage) => {

    toast.error(errorMessage, {
      className :"error-toast",
      position:toast.POSITION.BOTTOM_RIGHT
    });
  }
  const addNewLab = async (e) => {
    e.preventDefault();
      console.log(date, startTime, endTime, courseId, courseName);
      
    //validation
    if(!date || !startTime ||!endTime ){
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
        "/api/codelab/addCodeLab",
        {codeLabId:uuid(),date, courseName, courseId, startTime, endTime },
        config
      );
     console.log("data",data);
    } catch (error) {
      popError(error.response.data.error);
      setStartTime("");
      setEndTime("");
      setDate("");
      return;
    }
    setStartTime("");
    setEndTime("");
    setDate("");

    toast.success("Lab Sceduled", {
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
    Schedule Lab
      </Button>
      <Dialog open={open} >
        <DialogTitle 
        >Schedule Lab</DialogTitle>
        <DialogContent>
              <div className="lab-schedule">
         <p>Schedule Date :</p>       
         <DatePicker selected={date} onChange={(date) => setDate(date)}></DatePicker>
         
         <p>Start Time :</p>    
         <TimePicker onChange={setStartTime} value={startTime} />
         
         <p>End Time :</p>    
         <TimePicker onChange={setEndTime} value={endTime} />
              </div>
    
  {errors && <span>{errors}</span>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addNewLab}>Schedule Lab</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}