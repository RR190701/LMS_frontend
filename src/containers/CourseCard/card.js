import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

export default function CourseCard({courseName, courseInfo, courseId, history}) {

  return (
    <Card sx={{width: 245 ,
    m:1}}>
      <CardActionArea>
        <CardMedia
                  sx={{
                    backgroundImage: 'url(https://media.istockphoto.com/id/1267814463/vector/graduation-cap-and-diploma-scroll-icon.jpg?s=612x612&w=0&k=20&c=rgloy0hCuYhYZazMoFBMgzf5JakCs-0iUJMTWGivD1Y=)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
          component="img"
          height="160"
        />
        <CardContent >
          <NavLink to ={`/course/${courseId}`} >
          <Typography gutterBottom variant="h5" component="div">
            {courseName}
          </Typography>
          </NavLink>
          <Typography variant="body2" color="text.secondary">
           {courseInfo}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
