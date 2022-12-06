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
        const {details} = state;

const getData = () => {
  var config = {
    method: 'get',
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


useEffect(() => {
  getData()
}, [])

        return (
          <div class="container">
          <img className="" src={pic} />
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
                    details && details?.map((item, key)=>{
                      return <th scope="col">{item?.label}</th>
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
                  <td style={{color:"black"}}>{item[0]?.Cie}</td>
                  <td style={{color:"black"}}>{item[1]?.Cie}</td>
                  <td style={{color:"black"}}>{item[2]?.Cie}</td>
                  <td style={{color:"black"}}>{item[3]?.Cie}</td>
                  <td style={{color:"black"}}>{item[4]?.Cie}</td>
                  <td style={{color:"black"}}>{item[5]?.Cie}</td>
                </tr>
                })
              }
                
               
              </tbody>
            </table>
          </div>
        )
      };
export default Dashboard1;