import React, { Component, Fragment } from "react";
import axios from 'axios';
import ReactToPrint from 'react-to-print'

export default class Display extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            semOptions: 0,
            approvedStudents: [],
            course: []
        });
    }

    onChangeSemOptions = (e) => {

        // console.log(sem)
        this.setState({ semOptions: e.target.value });
        axios.get(`/api/course?&sem=${e.target.value}`)
            .then((res) => {
                this.setState({ course: res.data.data })
                // console.log(res.data.data)
            })
            .catch(err => console.log(err))


        // console.log(this.state.semOptions)
        axios.get(`/api/user/appr?&year=${(new Date()).getFullYear()}&sem=${(e.target.value)}`)
            .then(Response => {
                // console.log(Response.data.data)
                this.setState({ approvedStudents: Response.data.data })
                // console.log(students);
            })
            .catch(error => {
                console.log("Error" + error);
            })
    }


    render() {

        return (

            <div>
                <div className="form-group">
                    <label>Sem</label>
                    <input type={"number"} value={this.state.semOptions} required className="form-control" onChange={this.onChangeSemOptions} placeholder="Sem" min={3} max={8}></input>
            </div>

            <div ref={el => (this.componentRef = el)}>
                <h3 align='center'>Approved Students</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th rowSpan={2}>Name</th>
                            <th rowSpan={2}>USN</th>
                            {/* <th>Course</th> */}
                            {this.state.course.map((cou, index) => {
                                return (
                                    <th colSpan={2}>{cou.code}</th>
                                    
                                )
                            })}
                        </tr>
                        <tr>
                            {this.state.course.map((cou, index) => {
                            return(
                                < Fragment>
                                <th>ATT</th>
                                <th>CEI</th>
                                </Fragment>  
                            )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.approvedStudents.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <td>{student.studentName}</td>
                                    <td>{student.usn}</td>
                                    {this.state.course.map((cours) => {
                                        let flag = 0;
                                        for(let i = 0; i<student.courses.length;i++){
                                            flag = 0;
                                            if(cours.code === student.courses[i].code){
                                                flag = 1;
                                                return (<Fragment>
                                                    <td>
                                                        {student.courses[i].attendence}
                                                    </td>
                                                    <td>
                                                        {student.courses[i].ISA_marks}
                                                    </td>
                                                </Fragment>)
                                            }
                                        }
                                        if(flag === 0){
                                            return(
                                                <Fragment>
                                                    <td>
                                                        _
                                                    </td>
                                                    <td>
                                                        _
                                                    </td>
                                                </Fragment>)
                                        }
                                        else{return null}
                                    }
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Course name</th>
                        <th>Code</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.course.map((cou,id)=>{
                            return(
                                <tr key={id}>
                                    <td>{cou.code}</td>
                                    <td>{cou.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <ReactToPrint trigger={() => {
                return <button className="btn btn-secondary">Print</button>
            }}
                content={() => this.componentRef}
                pageStyle="print"
            />
            </div>
        );
    }
}
