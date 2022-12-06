import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router';
import Coordinator from './Coordinator';
import Chairman from './Chairman';
import Login from './login';
import Navbar from './components/navbar.components';
import Approval2 from './components/approval2.components'
import CourseCoordinator from './module2/course-coordinator';
import Display2 from './components/print2.component'
import HomepageDugc from './module2/homepage-dugc'
import Shreyas from './module5/Login'
import Dashboard from './module5/Dashboard'
import Dashboard1 from './module5/Dashboard1'
import Generate from './module5/Generate'

import { BrowserRouter, Route,Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<App/>}/>
      <Route path="/login" element ={<login/>}/>
      <Route path="/Chairman" element ={<Chairman/>}/>
      <Route path="/Coordinator" element ={<Coordinator/>}/>
      {/* <Route exact path="/mail" render={() => {window.location.href="/mail.html"}} /> 
      */}
      <Route path='/withdraw' element={<Navbar />}></Route>
        <Route path='/update' element={<Approval2 />}></Route>
        <Route path='/Print' element={<Display2 />}></Route>
        <Route path = '/theory-upload' element = {<CourseCoordinator/>}></Route>
        <Route path='/theory-analysis' element={<HomepageDugc/>}></Route>
        <Route path='/login321' element={<Shreyas/>}></Route>
        <Route path='/Dashboard' element={<Dashboard/>}></Route>
        <Route path='/Dashboard1' element={<Dashboard1/>}></Route>
        <Route path='/Generate' element={<Generate/>}></Route>
      </Routes></BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
