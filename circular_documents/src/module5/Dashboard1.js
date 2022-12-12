import pic from "./img1.jpg";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import axios from "axios"
import "./Dashboard1.css"
      const Dashboard1 = () => {

        const [data, setData] = useState([])
        const {state} = useLocation();
        const {details} = state ? state : [];

const getData = () => {
  var config = {
    method: 'post',
    url: 'http://localhost:1999/dugcCoordinator',
    headers: {
    },
  };
  axios(config).then((response) => {
console.log(response.data)
    setData(response.data)
  }).catch(err => {
    console.log(err);
  });
}


const Course11 = [
  {
    label: 'BASIC ELECTRICAL ENGINEERING',
    value: 'BASIC ELECTRICAL ENGINEERING',
  },
  { label: 'ENGINEERING MECHANICS', value: 'ENGINEERING MECHANICS' },
  { label: 'SINGLE VARIABLE CALCULUS', value: 'SINGLE VARIABLE CALCULUS' },
  {
    label: 'ENGINEERING PHYSICS',
    value: 'ENGINEERING PHYSICS',
  },
  {
    label: 'DESIGN THINKING FOR SOCIAL INNOVATION',
    value: 'DESIGN THINKING FOR SOCIAL INNOVATION',
  },
  {
    label: 'C PROGRAMMING FOR PROBLEM SOLVING',
    value: 'C PROGRAMMING FOR PROBLEM SOLVING',
  }
]
const Course12 = [
  {
    label: 'PROBLEM SOLVING WITH DATA STRUCTURES',
    value: 'PROBLEM SOLVING WITH DATA STRUCTURES',
  },
  { label: 'MULTIVARIABLE CALCULUS', value: 'MULTIVARIABLE CALCULUS' },
  {
    label: 'BASIC MECHANICAL ENGINEERING  ',
    value: 'BASIC MECHANICAL ENGINEERING  ',
  },
  {
    label: 'PROFESSIONAL COMMUNICATION',
    value: 'PROFESSIONAL COMMUNICATION',
  },
  {
    label: 'BASIC ELECTRONICS',
    value: 'BASIC ELECTRONICS',
  },
  {
    label: 'ENGINEERING CHEMISTRY',
    value: 'ENGINEERING CHEMISTRY',
  },
  {
    label: 'ENGINEERING EXPLORATION',
    value: 'ENGINEERING EXPLORATION',
  },
]
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
  Course11,
  Course12,
  Course13,
  Course14,
  Course15,
]
const getSem = () => {
  return localStorage.getItem("sem") ? localStorage.getItem("sem") : null 
}

const [sem, setSem] = useState(getSem())



////////////////////////////////// TABLE DOWNLOAD CSV /////////////////////////////////

function tableToCSV() {
 
  var csv_data = [];

  var rows = document.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {

      var cols = rows[i].querySelectorAll('td,th');

      var csvrow = [];
      for (var j = 0; j < cols.length; j++) {
          csvrow.push(cols[j].innerHTML);
      }

      csv_data.push(csvrow.join(","));
  }

  csv_data = csv_data.join('\n');

  downloadCSVFile(csv_data);

}

function downloadCSVFile(csv_data) {

  let CSVFile = new Blob([csv_data], {
      type: "text/csv"
  });

  var temp_link = document.createElement('a');

  temp_link.download = "Consolidated.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  temp_link.click();
  document.body.removeChild(temp_link);
}


useEffect(() => {
  getData()
}, [])

        return (
          <div class="container" style={{maxWidth:"100vw",marginLeft:"5rem"}}>
          <img className="" src={pic} style={{marginLeft:"27rem"}} />
            <table class="table" style={{maxHeight: "500px", maxWidth: "1100px", width:"1100px", height: "500px", overflow: "scroll", display: 'block', color:"black", backgroundColor:"white"
            }}>
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Sl.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">USN</th>
                  <th scope="col">Division</th>
                  {/* <th scope="col">Course 1</th>
                  <th scope="col">Course 2</th>
                  <th scope="col">Course 3</th>
                  <th scope="col">Course 4</th>
                  <th scope="col">Course 5</th>
                  <th scope="col">Course 6</th> */}
                  {
                    courseArray[sem-1] && courseArray[sem-1]?.map((item, key)=>{
                      return <th colSpan={2} scope="col">{item?.label}</th>
                    })
                  }
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  {
                    courseArray[sem-1] && courseArray[sem-1]?.map((item, key)=>{
                      return(
                        <>
                        <th scope="col">CIE</th>
                        <th scope="col">Attendance</th>
                        </>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
              {
                data && data?.map((item, key) => {
                  return <tr>
                  <th scope="row" style={{color:"black"}}>{item[0]?.SL}</th>
                  <td style={{color:"black"}}>{item[0]?.Name}</td>
                  <td style={{color:"black"}}>{item[0]?.Usn}</td>
                  <td style={{color:"black"}}>{item[0]?.Division}</td>
                  <td style={{color:"black"}}>{
                    item[0]?.Cie
                    }</td>
                  <td style={{color:"black"}}>{item[0]?.Attendance}</td>
                  <td style={{color:"black"}}>{item[1]?.Cie}</td>
                  <td style={{color:"black"}}>{item[1]?.Attendance}</td>
                  <td style={{color:"black"}}>{item[2]?.Cie}</td>
                  <td style={{color:"black"}}>{item[2]?.Attendance}</td>
                  <td style={{color:"black"}}>{item[3]?.Cie}</td>
                  <td style={{color:"black"}}>{item[3]?.Attendance}</td>
                  <td style={{color:"black"}}>{item[4]?.Cie}</td>
                  <td style={{color:"black"}}>{item[4]?.Attendance}</td>
                </tr>            
                })
                
              }
                
               
              </tbody>
            </table>

            <div class="container">
            <button type="button" onClick={() => tableToCSV()}>
              download CSV
            </button>
            </div>
          </div>
        )
      };
export default Dashboard1;