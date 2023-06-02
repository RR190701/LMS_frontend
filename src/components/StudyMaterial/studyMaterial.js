import  React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ResponsiveDrawer from './../../components/Navbar/navbar';
import CardMedia from '@mui/material/CardMedia';
import axios from "axios";
import UploadFile from '../UploadFile/uploadFile';

const drawerWidth = 220;
const StudyMaterial = ({history}) => {
    const[files, setfiles] = useState([]);


    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login");
        } 
        const fetchAllCourses = async() => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
        try {
              const { data } = await axios.get(`https://lms-backend-iw67.onrender.com/api/upload/getAllFile`, config);
              console.log("pdfs",data);   
              setfiles(data.res);
            
            } 
            catch (error) {
              console.log(error.response.data.error);
            }
          };
          
          fetchAllCourses();
        },[history]);
    return (
        
        <Box sx={{ display: 'flex' }} >
        <ResponsiveDrawer></ResponsiveDrawer> 
        <Box
        component="main"
        sx = {{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
    <Box component="div"
    sx={{display:"flex"}}>
      {(true)?(<>
<UploadFile></UploadFile>
              </>

      ):null}


    </Box>
    <div style={{"display":"flex", "justifyContent":"space-evenly", "flexWrap":"wrap"}}>
      
    {files.map(({fileName}) => (
    <div style={{"width":"30%", "display":"flex", "border":"solid .5px black", "flexDirection":"column", "borderRadius":"5px", "margin":".5rem"}}>
              <CardMedia
                  sx={{
                    backgroundImage: 'url(data:image/jpeg;base64,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)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width:"100%"
                  }}
          component="img"
          height="160"
        />
      <a  target = "_blank" href ={`http://localhost:8080/public/images/${fileName}`}>{fileName}</a>
    </div> 
    ))}
       
    </div>
      </Box>
      </Box>
     );
}
 
export default StudyMaterial;