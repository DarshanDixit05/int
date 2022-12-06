import React, { Component } from "react";
import axios from 'axios';
// import { Link } from 'react-router-dom';


export default class Home extends Component{

    constructor(props) {
        super(props);

        const year = (new Date()).getFullYear();
        const maxyear =  50;
        
        this.state = {
            studentName: '',
            usn: '',
            sems: [],
            session: '',
            flag: ["Odd", "Even"],
            totalCredit: 0,
            academicSession: new Date(),
            yearList: [],
            semOptions : 0,
            course: [],
            course_1: {
                course: '',
                code: '',
                credit: 0,
                attendence: 0,
                ISA_marks: 0
            },
            course_2: {
                course: '',
                code: '',
                credit: 0,
                attendence: 0,
                ISA_marks: 0
            },
            course_3: {
                course: '',
                code: '',
                credit: 0,
                attendence: 0,
                ISA_marks: 0
            },
            course_4: {
                course: '',
                code: '',
                credit: 0,
                attendence: 0,
                ISA_marks: 0
            },
            courseSelected: [],
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            reason: ['Health', 'Low attendence', 'Low marks'],
            selectReason: ''
        }

        for(let x=0; x<maxyear; x++){
            this.state.yearList.push(year - x)
        }
    }

    onChangeStudentName = (e) =>{
        this.setState({
            studentName: e.target.value
        });
    }

    onChangeUSN = (e) =>{
        this.setState({
            usn: e.target.value
        });
    }

    onChangeSession = (e)=>{
        this.setState({session : e.target.value });
        const oddSems = [3,5,7];
        const evenSems = [4,6,8];
        if(e.target.value === "Odd")
        this.setState({sems : oddSems});
        else if(e.target.value === "Even")
        this.setState({sems : evenSems});
    }

    onChangeSemOptions = (e) =>{
        this.setState({semOptions: e.target.value});
        axios.get(`/api/course?&sem=${e.target.value}`)
        .then((res) => {
            this.setState({course: res.data.data})
            // console.log(res.data.data)
        })
        .catch(err => console.log(err))
    }

    onChangeCoures_1Name = (e) =>{
        const course_1 = {...this.state.course_1}
        course_1.course = e.target.value
        for (let i = 0; i < this.state.course.length; i++) {
            if(this.state.course[i].name === e.target.value){
                course_1.code = this.state.course[i].code;
                course_1.credit = this.state.course[i].credit;
                break;
            }
        }
        this.setState({course_1});
    }

    onChangeCourse_1Attendence = (e) =>{
        const course_1 = {...this.state.course_1}
        course_1.attendence = e.target.value
        this.setState({course_1})
    }
    
    onChangeCourse_1Marks = (e) =>{
        const course_1 = {...this.state.course_1}
        course_1.ISA_marks = e.target.value
        this.setState({course_1})
    }

    onChangeCheck1 = (e) =>{
        this.setState({checkbox1: e.target.checked})
    }

    onChangeCoures_2Name = (e) =>{
        const course_2 = {...this.state.course_2}
        course_2.course = e.target.value
        for (let i = 0; i < this.state.course.length; i++) {
            if(this.state.course[i].name === e.target.value){
                course_2.code = this.state.course[i].code;
                course_2.credit = this.state.course[i].credit;
                break;
            }
        }
        this.setState({course_2});
    }

    onChangeCourse_2Attendence = (e) =>{
        const course_2 = {...this.state.course_2}
        course_2.attendence = e.target.value
        this.setState({course_2})
    }
    
    onChangeCourse_2Marks = (e) =>{
        const course_2 = {...this.state.course_2}
        course_2.ISA_marks = e.target.value
        this.setState({course_2})
    }

    onChangeCheck2 = (e) =>{
        this.setState({checkbox2: e.target.checked})
    }

    onChangeCoures_3Name = (e) =>{
        const course_3 = {...this.state.course_3}
        course_3.course = e.target.value
        for (let i = 0; i < this.state.course.length; i++) {
            if(this.state.course[i].name === e.target.value){
                course_3.code = this.state.course[i].code;
                course_3.credit = this.state.course[i].credit;
                break;
            }
        }
        this.setState({course_3});
    }

    onChangeCourse_3Attendence = (e) =>{
        const course_3 = {...this.state.course_3}
        course_3.attendence = e.target.value
        this.setState({course_3});
    }
    
    onChangeCourse_3Marks = (e) =>{
        const course_3 = {...this.state.course_3}
        course_3.ISA_marks = e.target.value
        this.setState({course_3});
    }

    onChangeCheck3 = (e) =>{
        this.setState({checkbox3: e.target.checked})
    }

    onChangeCoures_4Name = (e) =>{
        const course_4 = {...this.state.course_4}
        course_4.course = e.target.value
        for (let i = 0; i < this.state.course.length; i++) {
            if(this.state.course[i].name === e.target.value){
                course_4.code = this.state.course[i].code;
                course_4.credit = this.state.course[i].credit;
                break;
            }
        }
        this.setState({course_4});
    }

    onChangeCourse_4Attendence = (e) =>{
        const course_4 = {...this.state.course_4}
        course_4.attendence = e.target.value
        this.setState({course_4});
    }
    
    onChangeCourse_4Marks = (e) =>{
        const course_4 = {...this.state.course_4}
        course_4.ISA_marks = e.target.value
        this.setState({course_4});
    }

    onChangeCheck4 = (e) =>{
        this.setState({checkbox4: e.target.checked})
    }

    onChangeTotalCredit = (e) =>{
        this.setState({
            totalCredit: e.target.value
        });
    }

    onChangeAcademicSession = (e) =>{
        this.setState({
            academicSession: e.target.value
        });
    }

    onChangeSelectReason = (e) =>{
        this.setState({
            selectReason: e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        
        if(this.state.course_1.name !== ''  &&  this.state.checkbox1 === true){
            this.state.courseSelected.push(this.state.course_1)
        }else{
            return;
        }

        if(this.state.course_2.name !== ''  &&  this.state.checkbox2 === true)
        {this.state.courseSelected.push(this.state.course_2)}

        if(this.state.course_3.name !== ''  &&  this.state.checkbox3 === true)
        {this.state.courseSelected.push(this.state.course_3)}

        if(this.state.course_4.name !== ''  &&  this.state.checkbox4 === true)
        {this.state.courseSelected.push(this.state.course_4)}

        let sumCredit = 0;
        for (let index = 0; index < this.state.courseSelected.length; index++) {
            sumCredit += this.state.courseSelected[index].credit;
        }

        if((this.state.totalCredit - sumCredit) < 16){
            alert("Total course less than 16");
            this.setState({courseSelected: []})
            return
        }

        const user = {
            studentName: this.state.studentName,
            usn: this.state.usn,
            sem: this.state.semOptions,
            courses: this.state.courseSelected,
            totalCredit: this.state.totalCredit,
            academicSession: this.state.academicSession,
            reason: this.state.selectReason
        }
        // console.log(user);
        axios.post(`/api/user`, user);

        window.location = '/';
    }
    render(){
        return(  
            <div>
                <h3 align='center' >Add new withdrawal application</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Student Name</label>
                        <input type = {"text"} value={this.state.studentName} required className="form-control" onChange={this.onChangeStudentName} placeholder="Full name"></input>
                    </div>
                    <div className="form-group">
                        <label>USN</label>
                        <input type={"text"} value={this.state.usn} required className="form-control"  onChange={this.onChangeUSN} placeholder="SRN"></input>
                    </div>
                    <div className="form-group">
                        <label>Session</label>
                        <select type={"text"} value={this.state.session} onChange={this.onChangeSession} required className="form-control">
                            <option className="form-control">Select Session</option>
                            {this.state.flag.map(function(x){return <option className="form-control" key={x}>{x}</option>})}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Sem</label>
                        <select type={"number"} value={this.state.semOptions} className="form-control"  onChange={this.onChangeSemOptions} required>
                            <option>Select sem</option>
                            {this.state.sems.map(function (x){return <option key={x}>{x}</option>})}
                        </select>
                    </div>
                    <div className="form-group">
                        <table>
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Course Code</th>
                                    <th>Course credit</th>
                                    <th>Attendence</th>
                                    <th>ISA marks</th>
                                    <th>Faculty Approval</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <select type={"text"} value={this.state.course_1.name} className="form-control" onChange={this.onChangeCoures_1Name} required>
                                            <option>Select course</option>
                                            {this.state.course.map((x,id) => <option key={id}>{x.name}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <input type={"text"} value={this.state.course_1.code} readOnly required className="form-control" placeholder="Select course"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_1.credit} readOnly required className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_1.attendence} onChange={this.onChangeCourse_1Attendence} className="form-control" required placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_1.ISA_marks} onChange={this.onChangeCourse_1Marks} required className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"checkbox"} value={this.state.checkbox1} onChange={this.onChangeCheck1}/> Approved
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select type={"text"} value={this.state.course_2.name} onChange={this.onChangeCoures_2Name} className="form-control">
                                            <option>Select course</option>
                                            {this.state.course.map((x,id) => <option key={id}>{x.name}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <input type={"text"} value={this.state.course_2.code} readOnly className="form-control" placeholder="Select course"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_2.credit} readOnly className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_2.attendence} onChange={this.onChangeCourse_2Attendence} className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_2.ISA_marks} onChange={this.onChangeCourse_2Marks} className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"checkbox"} value={this.state.checkbox2} onChange={this.onChangeCheck2}/> Approved
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select type={"text"} value={this.state.course_3.name} onChange={this.onChangeCoures_3Name} className="form-control">
                                            <option>Select course</option>
                                            {this.state.course.map((x,id) => <option key={id}>{x.name}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <input type={"text"} value={this.state.course_3.code} readOnly className="form-control" placeholder="Select course"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_3.credit} readOnly className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_3.attendence} onChange={this.onChangeCourse_3Attendence} className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_3.ISA_marks} onChange={this.onChangeCourse_3Marks} className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"checkbox"} value={this.state.checkbox3} onChange={this.onChangeCheck3}/> Approved
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <select type={"text"} value={this.state.course_4.name} onChange={this.onChangeCoures_4Name} className="form-control">
                                            <option>Select course</option>
                                            {this.state.course.map((x,id) => <option key={id}>{x.name}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <input type={"text"} value={this.state.course_4.code} readOnly className="form-control" placeholder="Select course"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_4.credit} readOnly className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_4.attendence} onChange={this.onChangeCourse_4Attendence} className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"number"} value={this.state.course_4.ISA_marks} onChange={this.onChangeCourse_4Marks} className="form-control" placeholder="0"></input>
                                    </td>
                                    <td>
                                        <input type={"checkbox"} value={this.state.checkbox4} onChange={this.onChangeCheck4}/> Approved
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="form-group">
                        <label>Total credit</label>
                        <input type={"number"} value={this.state.totalCredit} required className="form-control"  onChange={this.onChangeTotalCredit} min={1} max={100} placeholder="0"></input>
                    </div>
                    <div className="form-group">
                        <label>Academic Year</label>
                        <select type={"Date"} value={this.state.academicSession} required className="form-control"  onChange={this.onChangeAcademicSession}>
                            <option>Select year</option>
                            {this.state.yearList.map(function(x){return <option key={x}>{x}</option>})}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Reason</label>
                        <select type={"text"} className="form-control" value={this.state.selectReason} onChange={this.onChangeSelectReason} required>
                            <option>Select reason</option>
                            {this.state.reason.map(function(x) {return <option key={x}>{x}</option>})}
                        </select>
                    </div>
                    <div className="form-group">
                        <br></br><input type={"submit"} value="Add new application" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}