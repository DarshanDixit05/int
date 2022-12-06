// import axios from 'axios'; 
// import { useEffect, useState } from 'react'; 
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home.components';

export default class withdraw extends Component {
    render(){
  return(
    <div>
            <nav className="navbar navbar-dark bg-dark text-dark navbar-expand-lg"> 
                <Link to = "/withdraw" className="navbar-brand text-dark">Withdrawal</Link> 
                <div className="collpase navbar-collapse text-dark"> 
                    <ul className="navbar-nav mr-auto text-dark"> 
                        <li className="navbar-item text-dark"> 
                            <Link to='/withdraw' className="nav-link text-dark">Application</Link> 
                        </li> 
                        <li>
                            <Link to='/update' className="nav-link text-dark">Approve</Link>
                        </li>
                        <li>
                            <Link to='/Print' className="nav-link text-dark">Display</Link>
                        </li>
                    </ul> 
                </div> 
            </nav> 
            <Home />
            </div>
  );}
}

// return (
  //   <Router>
  //     <div className='container'>
  //       <Navbar />
  //       <Routes>
  //         <Route path="/" exact element={<Home />} />
  //         <Route path="/update" exact element={< Approve />}></Route>
  //         <Route path="/Print" exact element={<Display/>}></Route>
  //       </Routes>
  //     </div>
  //   </Router>
  // );