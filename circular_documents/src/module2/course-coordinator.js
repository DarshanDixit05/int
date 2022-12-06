import axios from 'axios';
import React, { Component } from "react";
import * as XLSX from 'xlsx';
import './course-coordinator.css';



class CourseCoordinator extends Component {
    myfile;
    jsonFile;
    year;
    sem;
    course
    div;
    asses;
    myfilef = async (e) => {
        this.myfile = e.target.files[0];
        const data = await this.myfile.arrayBuffer();
        const workbook = XLSX.readFile(data, {});

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        this.jsonFile = jsonData;

    }

    getYear = (e) => {
        this.year = e.target.value
    };

    getSem = (e) => {
        this.sem = e.target.value
    };

    getCourse = (e) => {
        this.course = e.target.value
    };

    getDiv = (e) => {
        this.div = e.target.value
    };

    getAssess = (e) => {
        this.asses = e.target.value
    };

    handlefile = async (e) => {
        alert("File was successfully uploaded")
        var id = this.year + '-' + this.sem + '-' + this.course + '-' + this.asses + '-' + this.div
        const formData = new FormData();
        formData.append('title', id);
        formData.append('file', this.myfile);

        axios.post("fileUpload", formData).then(res => {
            console.log(res.statusText)
        })
        this.jsonFile[1]["__EMPTY_2"] = id;

        await fetch("/api2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.jsonFile)
        }).then(() => {
            console.log("Request sent")

        })

    }
    render() {
        return (

            <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" /><div id="main-box">
                <img alt="kletech-logo" src="https://learn.kletech.ac.in/theme/image.php/university/theme/1665590115/logo" id="page-logo" />
                <h1>Course Co-ordinator</h1>
                <div>
                    {/* <button id="user">Profile <i className="fa fa-user" /></button>
        <button id="logout">Logout <i className="fa fa-sign-out" /></button> */}
                </div>
                <div className="modal-container">
                    <div id="modal">
                        <fieldset id="user-credential">
                            <legend>Your Details</legend>
                            <p id="name">Name: </p>
                            <p id="role">Role: </p>
                        </fieldset>
                        <button id="close">
                            Close<i className="fa fa-close" />
                        </button>
                    </div>
                </div>
                <div id="contents1">
                    <div id="selections1">
                        <section>
                            <p id='message'>Select Options to Upload Files</p>
                            <form name="options">
                                {/* <select name="semester" class="select-option">
                <option value="Even">Even</option>
                <option value="Odd">Odd</option>
            </select> */}
                                <select id="year" onChange={(e) => this.getYear(e)} className="select-option">
                                    <option disabled selected>Year</option>
                                    <option value={2022}>2022</option>
                                    <option value={2021}>2021</option>
                                    <option value={2020}>2020</option>
                                    <option value={2019}>2019</option>
                                    <option value={2018}>2018</option>
                                </select>
                                <select id="semester" onChange={(e) => this.getSem(e)} className="select-option">
                                    <option disabled selected>Semester</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                </select>
                                <select id="division" onChange={(e) => this.getDiv(e)} className="select-option">
                                    <option disabled selected>Division</option>
                                    <option value={'A'}>A</option>
                                    <option value={'B'}>B</option>
                                    <option value={'C'}>C</option>
                                    <option value={'D'}>D</option>
                                    <option value={'E'}>E</option>
                                </select>
                                <select id="courses" onChange={(e) => this.getCourse(e)} className="select-option">
                                    <option disabled selected>Course</option>
                                    <option value={'Computer Networks - 1'}>Computer Networks - 1</option>
                                    <option value={'Machine Learning'}>Machine Learning</option>
                                    <option value={'Natural Language Processing(NLP)'}>Natural Language Processing(NLP)</option>
                                    <option value={'Internet of Things(IoT)'}>Internet of Things(IoT)</option>
                                    <option value={'Software Engineering'}>Software Engineering</option>
                                    <option value={'System Software'}>System Software</option>
                                </select>
                                <select className="select-option" onChange={(e) => this.getAssess(e)} id="acti" required>
                                    <option disabled selected>Assessment</option>
                                    <option value={"M1"}>Minor-1</option>
                                    <option value={"M2"}>Minor-2</option>
                                    <option value={"Act"}>Activity</option>
                                    <option value={"CIE"}>C.I.E</option>
                                </select>
                                <input type="file" id="upload-file" className="btn xls select-option" onChange={(e) => this.myfilef(e)} />
                                <input type="button" id="options-btn" defaultValue="Submit" onClick={(e) => this.handlefile(e)} />
                                <p id="test" />
                            </form>
                        </section>
                    </div>
                </div>
            </div></>
        );
    }
}

export default CourseCoordinator;
