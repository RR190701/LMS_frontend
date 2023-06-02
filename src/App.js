import React from 'react';
import './App.css';
import SignInSide from './components/login/login';
import {Route, Switch} from 'react-router-dom';
import Profile from './containers/Profile/profile';
import Private from './routes/private';
import RegisterMember from './components/register/register';
import Courses from './components/Courses/course'
import CourseInfo from './components/courseInfo/courseInfo';
import StudyMaterial from './components/StudyMaterial/studyMaterial';
import AssignmentInfo from './components/AssignmentInfo/assignmentInfo';


function App() {

  return (
    
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignInSide}></Route>
        <Private exact path="/profile" component ={Profile}></Private>
        <Private exact path="/course" component ={Courses}></Private>
        <Private exact path="/register" component ={RegisterMember}></Private>
        <Private exact path="/course/:courseId" component ={CourseInfo}></Private>
        <Private exact path="/studyMaterial" component ={StudyMaterial}></Private>
        <Private exact path ="/assignment/:assId" component={AssignmentInfo}></Private>
        </Switch>
    </div>
  );
}

export default App;
