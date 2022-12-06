
import './App.css';

import {BrowserRouter as Router} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Login from './login';
import Coordinator from './Coordinator';
import {  useNavigate } from "react-router-dom";
import Chairman from './Chairman';
import Test from './test';




const App=()=>
 {
  return (
    <div>
        <Login/>
    </div>
  
         )
}

 export default App;
         
