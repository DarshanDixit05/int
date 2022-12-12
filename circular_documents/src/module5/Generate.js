import React, { useState } from 'react';
import pic from "./img1.jpg";
import { useNavigate } from 'react-router-dom';
import "./Generate.css"
import Select from 'react-select';
import axios from 'axios';

//options for sem 
const Sem = [
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];

const Course13 = [
  {
    label: 'GRAPH THEORY AND LINEAR ALGEBRA',
    value: 'GRAPH THEORY AND LINEAR ALGEBRA',
  },
  { label: 'DATABASE MANAGEMENT SYSTEM', value: 'DATABASE MANAGEMENT SYSTEM' },
  {
    label: 'DISCRETE MATHEMATICAL STRUCTURES',
    value: 'DISCRETE MATHEMATICAL STRUCTURES',
  },
  {
    label: 'DATA STRUCTURES AND ALGORITHMS',
    value: 'DATA STRUCTURES AND ALGORITHMS',
  },
  {
    label: 'C PROGRAMMING FOR PROBLEM SOLVING',
    value: 'C PROGRAMMING FOR PROBLEM SOLVING',
  }
]
const Course14 = [
  {
    label: 'OBJECT ORIENTED PROGRAMMING',
    value: 'OBJECT ORIENTED PROGRAMMING',
  },
  {
    label: 'PRINCIPLES OF COMPILER DESIGN',
    value: 'PRINCIPLES OF COMPILER DESIGN',
  },
  {
    label: 'OPERATING SYSTEM PRINCIPLES AND PROGRAMMING',
    value: 'OPERATING SYSTEM PRINCIPLES AND PROGRAMMING',
  },
  {
    label: 'MICROCONTROLLER: PROGRAMMING AND INTERFACING',
    value: 'MICROCONTROLLER: PROGRAMMING AND INTERFACING',
  },
  {
    label: 'EXPLORATORY DATA ANALYSIS',
    value: 'EXPLORATORY DATA ANALYSIS',
  },
]
const Course15 = [
  {
    label: 'SYSTEM SOFTWARE',
    value: 'SYSTEM SOFTWARE',
  },
  {
    label: 'MACHINE LEARNING',
    value: 'MACHINE LEARNING',
  },
  {
    label: 'INTERNET OF THINGS',
    value: 'INTERNET OF THINGS',
  },
  {
    label: 'COMUPUTER NETWORKING',
    value: 'COMUPUTER NETWORKING',
  },
  {
    label: 'SYSTEM SOFTWARE LAB',
    value: 'SYSTEM SOFTWARE LAB',
  }
]


const courseArray = [
  Course13,
  Course14,
  Course15,
]
const Generate = props => {
  const [semester, setSemester] = useState();
  const [course, setCourse] = useState(" ");

  const [file,setFile] =useState();

  const handleChange1 = (value) => {
    setSemester(value)
    localStorage.setItem("sem", value);
  }
  const handleChange2 = (value) => {
    setCourse(value)
  }
  
  function handleChange(event) {
    setFile(event.target.files[0])
  }
  const navigate=useNavigate();
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('profile', file);
    formData.append('course',course);
    // formData.append('fileName', file?.name);
    var config = {
      method: 'post',
      url: 'http://localhost:1999/xyz/uploadfile',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data : formData
    };
    axios(config).then((response) => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    });

    // var config1 = {
    //   method: 'post',
    //   url: 'http://localhost:1999/courseCoordinator',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   data : {
    //     courseData : course,
    //     semData:semester
    //   }
    // };

    // axios(config1).then((response)=>{
    //   console.log(response);
    // }).catch(err=>{
    //   console.log(err);
    // })
    navigate("/Dashboard", {state:{courseDetails: courseArray[semester-3], semVal: semester, courseVal: course}});
  }

  const getRole = () => {
    return localStorage.getItem("role") ? localStorage.getItem("role") : "coordinator" 
  }

  function handleSubmit1(e){
    e.preventDefault();
    localStorage.setItem("sem", semester);
    navigate("/Dashboard1")
  }

  const [role, setRole] = useState(getRole())

  return (
    <div id="abc">
      <div className='img'>
        <img className="" src={pic} />
      </div>
      <div className="select2" style={{display:"flex"}}>
        <div className="courses">
          <h3 className="component">Sem</h3>
          <Select className="sem" placeholder="Sem" options={Sem} onChange={(item) =>{
            handleChange1(item.value)
          }}/>
        </div>
        {
          role && role !== "dugc" ? <div className='courses'>
          <h3 class="component">Course</h3>
          <Select className="course" placeholder="Course" options={courseArray[semester - 3]} 
          onChange={(item) => {
            handleChange2(item.value)
          }
          }
           />
        </div> : null
        }
        
      </div>
      <div className='submitform'>
      <form>
      {
        role && role !=="dugc"?<div class="container">
      <h3 style={{padding:"25px"}}>Please Select a file to Upload</h3>
          <input type="file" onChange={handleChange}/>
          <button onClick={handleSubmit} className="btn btn-primary">Upload</button>
      </div>: <div class="conainer">
        <button onClick={handleSubmit1} className="btn btn-primary">Next</button>
      </div>
      }

        </form>
        </div>
    </div>
  );
};

export default Generate;