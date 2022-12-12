import pic from "./img1.jpg";
import axios from "axios";
import "./Dashboard.css";
// import { response } from "express";
import react, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [array, setArray] = useState([]);
  const [course,setCourse]=useState();
  const [generate,setGenerate]=useState(false);
  const navigate = useNavigate();
  const {state} = useLocation();
  const {courseDetails} = state;
  const {semVal} = state;
  const {courseVal} = state
  const generatedata = async () => {
    setGenerate(true);
    await axios.post("http://localhost:1999/courseCoordinator").then((res) => {
      console.log(res.data.data);
      setArray(res.data);
    });
  };
  const navigateDugc = () =>{
    navigate('/Dashboard1', {state:{details: courseDetails}});
  }
  return (
    <div class="container2">
      <div>
        <img src={pic} className="dashimg" />
      </div>
      <div>
      <h3 class='ineligible'>Ineligibility list</h3>
      <h4>Semester: <p>{semVal}</p></h4>
      <h4>Course: <p>{courseVal}</p></h4>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>SL</th>
              <th>NAME</th>
              <th>USN</th>
              <th>RollNo</th>
              <th>DIVISION</th>
              <th>ATTENDANCE</th>
              <th>CIE</th>
            </tr>
          </thead>
          <tbody className="tableContent">
            {array.map((data, key) => {
              if (data.CIE < 40 || data.Attendance < 75) {
                return (
                  <tr>
                    <td style={{color:"black"}}>{data.Sl}</td>
                    <td style={{color:"black"}}>{data.Name}</td>
                    <td style={{color:"black"}}>{data.USN}</td>
                    <td style={{color:"black"}}>{data.Rollno}</td>
                    <td style={{color:"black"}}>{data.Division}</td>
                    <td style={{color:"black"}}>{data.Attendance}</td>
                    <td style={{color:"black"}}>{data.CIE}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <button onClick={() => generatedata()} className="btn btn-primary" style={{margin: "1rem"}}>
        Generate the Ineligibility list
      </button>
    </div>
  );
};
export default Dashboard;
