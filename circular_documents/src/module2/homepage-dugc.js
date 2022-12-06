import {
    BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title,
    Tooltip
} from 'chart.js';
import React from "react";
import { Bar } from 'react-chartjs-2';
import './homepage-dugc.css';

var fileID;
var dataID1;
var dataID2;
var dataIDS;
var tableData;
var data1 = [0, 0, 0, 0, 0];
var data2 = [0, 0, 0, 0, 0];
var dataGrad = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]

class HomepageDugc extends React.Component {
    choice;
    state;
    year;
    sem;
    course
    div;
    assets;
    constructor() {
        super();
        this.state = {
            name: "React",
            showChart: false,
            showDownload: false,
            showTable: false,
        }
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
        this.assets = e.target.value
    };

    getChoice = async (e) => {
        this.choice = e.target.value;
        console.log(this.choice);
    }
    check = async (e) => {
        e.preventDefault();

        if (this.choice === "graf") {
            var jsonres;
            console.log(this.choice);
            dataID1 = this.year + '-' + this.sem + '-' + this.course + '-' + this.assets
            var prevYear = parseInt(this.year) - 1
            dataID2 = prevYear + '-' + this.sem + '-' + this.course + '-' + this.assets

            dataIDS = [
                { id1: dataID1, id2: dataID2 }
            ]

            await fetch("/api7", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataIDS)
            }).then(
                response => response.json()
            ).then(
                data => {
                    jsonres = data;
                    for (var i = 0; i < jsonres.length; i++) {
                        if (i < 5) {
                            data1[i] = jsonres[i]['class_avg']
                            dataGrad[i][0] = jsonres[i]['S_count']
                            dataGrad[i][1] = jsonres[i]['A_count']
                            dataGrad[i][2] = jsonres[i]['B_count']
                            dataGrad[i][3] = jsonres[i]['C_count']
                            dataGrad[i][4] = jsonres[i]['D_count']
                        }
                        else
                            data2[i - 5] = jsonres[i]['class_avg']
                    }
                    if (this.state.showChart === true) {
                        this.setState({ showTable: false })
                        this.setState({ showDownload: false })
                    }
                    else {
                        this.setState({ showTable: false })
                        this.setState({ showDownload: false });
                        this.setState({ showChart: !this.state.showChart });
                    }
                    console.log(data1)
                    console.log(jsonres);
                }
            )
            // window.location.href = 'analysis'
        }
        else if (this.choice === "xlxs") {
            if (this.state.showDownload === true) {
                this.setState({ showTable: false })
                this.setState({ showChart: false });
            }
            else {
                this.setState({ showTable: false })
                this.setState({ showChart: false });
                this.setState({ showDownload: !this.state.showDownload });
            }

        }
        else if (this.choice === "tabl") {
            console.log(this.choice);
            dataID1 = this.year + '-' + this.sem + '-' + this.course + '-' + this.assets
            var prevYear2 = parseInt(this.year) - 1
            dataID2 = prevYear2 + '-' + this.sem + '-' + this.course + '-' + this.assets

            dataIDS = [
                { id1: dataID1, id2: dataID2 }
            ]

            await fetch("/api7", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataIDS)
            }).then(
                response => response.json()
            ).then(
                data => {
                    tableData = data;
                    // for(var i=0; i<jsonres2.length; i++) {
                    //     if(i<5)
                    //         data1[i] = jsonres2[i]['class_avg']
                    //     else 
                    //         data2[i-5] = jsonres2[i]['class_avg']
                    // }
                    if (this.state.showTable === true) {
                        this.setState({ showChart: false })
                        this.setState({ showDownload: false });
                    }
                    else {
                        this.setState({ showChart: false })
                        this.setState({ showDownload: false });
                        this.setState({ showTable: !this.state.showTable });
                    }
                    console.log(tableData);
                }
            )

        }
    }
    download = async (e) => {
        fileID = this.year + '-' + this.sem + '-' + this.course + '-' + this.assets + '-' + this.div

        console.log(fileID)
        var abc = [
            { id: fileID }
        ]
        console.log('download');
        await fetch("/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(abc)
        }).then(
            response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'sample.xls';
                    a.click();
                });
            }
        );
    }
    render() {
        return (
            <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /><div id="main-box">
                <img alt="kletech-logo" src="https://learn.kletech.ac.in/theme/image.php/university/theme/1665590115/logo" id="page-logo" />
                {/* <nav id="nav-bar">
      <a class="nav-bar-items" href="">DUGC </a> |
      <a class="nav-bar-items" href="">Analysis</a> |
      <a class="nav-bar-items" href="">Reports </a> |
      <a class="nav-bar-items" href="">Extra</a>
  </nav> */}
                <h1>DUGC Dashboard</h1>
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
                <div id="contents">
                    <div id="selections">
                        <section>
                            <p id='message'>Select Options to View Analysis</p>
                            <form name="options" onSubmit={this.check}>
                                <select id="year" onChange={(e) => this.getYear(e)} className="select-option">
                                    <option disabled selected>Year</option>
                                    <option value={2022}>2022</option>
                                    <option value={2021}>2021</option>
                                    <option value={2020}>2020</option>
                                    <option value={2019}>2019</option>
                                    <option value={2018}>2018</option>
                                </select>
                                <select className="select-option" onChange={(e) => this.getSem(e)} id="sem" required>
                                    <option disabled selected>Semester</option>
                                    <option value={3}>3rd</option>
                                    <option value={4}>4th</option>
                                    <option value={5}>5th</option>
                                    <option value={6}>6th</option>
                                    <option value={7}>7th</option>
                                    <option value={8}>8th</option>
                                </select>
                                {/* <select className="select-option" id="sec" required>
                <option disabled selected>Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select> */}
                                <select className="select-option" onChange={(e) => this.getAssess(e)} id="acti" required>
                                    <option disabled selected>Assessment</option>
                                    <option value={"M1"}>Minor-1</option>
                                    <option value={"M2"}>Minor-2</option>
                                    <option value={"Act"}>Activity</option>
                                    <option value={"CIE"}>C.I.E</option>
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
                                <select className="select-option" onChange={(e) => this.getChoice(e)} id="misc-options">
                                    <option disabled selected>Choose Option</option>
                                    <option value="xlxs">Export Excel Sheet</option>
                                    {/* <option value="comp">Compare Results</option> */}
                                    <option value="graf">Graphical Analysis</option>
                                    <option value="tabl">View Table</option>
                                </select>
                                <button id="options-btn" type="submit">Analyse</button>
                            </form>
                        </section>
                    </div>
                    <div id="analysis">
                        {this.state.showChart && <Chart />}
                        {this.state.showDownload && (<><select className='select-option' id='select-division' onChange={(e) => this.getDiv(e)}>
                            <option disabled selected>Choose Division</option>
                            <option value={"A"}>A</option>
                            <option value={"B"}>B</option>
                            <option value={"C"}>C</option>
                            <option value={"D"}>D</option>
                            <option value={"E"}>E</option>
                        </select>
                            <button id="download-excel" type="submit" onClick={(e) => this.download(e)}>Download Excel</button></>)}
                        {this.state.showTable && <Table />}
                    </div>
                </div>
            </div></>
        );
    }
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.avgdata = {
            label: ["Class Avg of Current Year"],
            data: data1,
            backgroundColor: 'rgba(0, 99, 132, 0.6)',
            borderColor: 'rgba(0, 99, 132, 1)',
        }

        this.avgdata2 = {
            label: ["Class Avg of Previous Year"],
            data: data2,
            backgroundColor: 'rgba(99, 132, 0, 0.6)',
            borderColor: 'rgba(99, 132, 0, 1)'
        }

        this.state = {
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 100,
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'EDA Class Average Analysis',
                }

            },

            avgdata: {
                label: ["Class Avg of Current Year"],
                data: data1,
                backgroundColor: 'rgba(0, 99, 132, 0.6)',
                borderColor: 'rgba(0, 99, 132, 1)',
            },

            avgdata2: {
                label: ["Class Avg of Previous Year"],
                data: data2,
                backgroundColor: 'rgba(99, 132, 0, 0.6)',
                borderColor: 'rgba(99, 132, 0, 1)'
            },


            dataAnalysis: {
                labels: ["A", "B", "C", "D", "E"],
                datasets: [this.avgdata, this.avgdata2]
            }
        }

    }
    classAverage = () => {
        const optionsChange = { ...this.state.options };
        const dataAvg = { ...this.state.avgdata };
        const dataAvg2 = { ...this.state.avgdata2 };
        const dataAlys = { ...this.state.dataAnalysis };
        optionsChange.title.text = 'EDA Class Average Analysis';


        dataAvg.label = ["Class Avg of Current Year"];
        dataAvg.data = data1;
        dataAvg.backgroundColor = 'rgba(0, 99, 132, 0.6)'


        dataAvg2.label = ["Class Avg of Previous Year"];
        dataAvg2.data = data2;

        dataAlys.labels = ["A", "B", "C", "D", "E"]

        dataAlys.datasets = [dataAvg, dataAvg2]

        this.setState({ options: optionsChange, avgdata: dataAvg, avgdata2: dataAvg2, dataAnalysis: dataAlys })
    }

    divA = () => {
        const optionsChange = { ...this.state.options };
        const dataAvg = { ...this.state.avgdata };
        const dataAlys = { ...this.state.dataAnalysis };
        optionsChange.title.text = 'Division A Grade Analysis';


        dataAvg.label = ["Grade Count of Division A"];
        dataAvg.data = dataGrad[0];
        dataAvg.backgroundColor = 'rgba(227, 127, 64, 0.8)'


        dataAlys.labels = ["S", "A", "B", "C", "D"]

        dataAlys.datasets = [dataAvg]

        this.setState({ options: optionsChange, avgdata: dataAvg, dataAnalysis: dataAlys })

    }

    divB = () => {
        const optionsChange = { ...this.state.options };
        const dataAvg = { ...this.state.avgdata };
        const dataAlys = { ...this.state.dataAnalysis };
        optionsChange.title.text = 'Division B Grade Analysis';


        dataAvg.label = ["Grade Count of Division B"];
        dataAvg.data = dataGrad[1];
        dataAvg.backgroundColor = 'rgba(227, 127, 64, 0.8)'



        dataAlys.labels = ["S", "A", "B", "C", "D"]

        dataAlys.datasets = [dataAvg]

        this.setState({ options: optionsChange, avgdata: dataAvg, dataAnalysis: dataAlys })

    }

    divC = () => {
        const optionsChange = { ...this.state.options };
        const dataAvg = { ...this.state.avgdata };
        const dataAlys = { ...this.state.dataAnalysis };
        optionsChange.title.text = 'Division C Grade Analysis';


        dataAvg.label = ["Grade Count of Division C"];
        dataAvg.data = dataGrad[2];
        dataAvg.backgroundColor = 'rgba(227, 127, 64, 0.8)'



        dataAlys.labels = ["S", "A", "B", "C", "D"]

        dataAlys.datasets = [dataAvg]

        this.setState({ options: optionsChange, avgdata: dataAvg, dataAnalysis: dataAlys })

    }

    divD = () => {
        const optionsChange = { ...this.state.options };
        const dataAvg = { ...this.state.avgdata };
        const dataAlys = { ...this.state.dataAnalysis };
        optionsChange.title.text = 'Division D Grade Analysis';


        dataAvg.label = ["Grade Count of Division D"];
        dataAvg.data = dataGrad[3];
        dataAvg.backgroundColor = 'rgba(227, 127, 64, 0.8)'



        dataAlys.labels = ["S", "A", "B", "C", "D"]

        dataAlys.datasets = [dataAvg]

        this.setState({ options: optionsChange, avgdata: dataAvg, dataAnalysis: dataAlys })

    }

    divE = () => {
        const optionsChange = { ...this.state.options };
        const dataAvg = { ...this.state.avgdata };
        const dataAlys = { ...this.state.dataAnalysis };
        optionsChange.title.text = 'Division E Grade Analysis';


        dataAvg.label = ["Grade Count of Division E"];
        dataAvg.data = dataGrad[4];
        dataAvg.backgroundColor = 'rgba(227, 127, 64, 0.8)'

        dataAlys.labels = ["S", "A", "B", "C", "D"]

        dataAlys.datasets = [dataAvg]

        this.setState({ options: optionsChange, avgdata: dataAvg, dataAnalysis: dataAlys })
    }
    render() {
        return (
            <div className='wrapper'><div id="options-list">
                Analysis:
                <button className='division-btn' onClick={() => this.classAverage()}>Class Average</button>
                <button className='division-btn' onClick={() => this.divA()}>Division A</button>
                <button className='division-btn' onClick={() => this.divB()}>Divison B</button>
                <button className='division-btn' onClick={() => this.divC()}>Division C</button>
                <button className='division-btn' onClick={() => this.divD()}>Division D</button>
                <button className='division-btn' onClick={() => this.divE()}>Division E</button>
            </div>
                <div id='chart-container'>
                    <Bar width={"1150%"} height={"520%"} options={this.state.options} data={this.state.dataAnalysis} />;
                </div></div>
        )
    }
}

function Table() {
    return (
        <div>
            <tr>
                <th>Division</th>
                <th>S-Grade</th>
                <th>A-Grade</th>
                <th>B-Grade</th>
                <th>C-Grade</th>
                <th>D-Grade</th>
                <th>Class Average</th>
                <th>Previous Class Average</th>
            </tr>
            <tr>
                <td>A</td>
                <td>{tableData[0]['S_count']}</td>
                <td>{tableData[0]['A_count']}</td>
                <td>{tableData[0]['B_count']}</td>
                <td>{tableData[0]['C_count']}</td>
                <td>{tableData[0]['D_count']}</td>
                <td>{tableData[0]['class_avg']}</td>
                <td>{tableData[5]['class_avg']}</td>
            </tr>
            <tr>
                <td>B</td>
                <td>{tableData[1]['S_count']}</td>
                <td>{tableData[1]['A_count']}</td>
                <td>{tableData[1]['B_count']}</td>
                <td>{tableData[1]['C_count']}</td>
                <td>{tableData[1]['D_count']}</td>
                <td>{tableData[1]['class_avg']}</td>
                <td>{tableData[6]['class_avg']}</td>
            </tr>
            <tr>
                <td>C</td>
                <td>{tableData[2]['S_count']}</td>
                <td>{tableData[2]['A_count']}</td>
                <td>{tableData[2]['B_count']}</td>
                <td>{tableData[2]['C_count']}</td>
                <td>{tableData[2]['D_count']}</td>
                <td>{tableData[2]['class_avg']}</td>
                <td>{tableData[7]['class_avg']}</td>
            </tr>
            <tr>
                <td>D</td>
                <td>{tableData[3]['S_count']}</td>
                <td>{tableData[3]['A_count']}</td>
                <td>{tableData[3]['B_count']}</td>
                <td>{tableData[3]['C_count']}</td>
                <td>{tableData[3]['D_count']}</td>
                <td>{tableData[3]['class_avg']}</td>
                <td>{tableData[8]['class_avg']}</td>
            </tr>
            <tr>
                <td>E</td>
                <td>{tableData[4]['S_count']}</td>
                <td>{tableData[4]['A_count']}</td>
                <td>{tableData[4]['B_count']}</td>
                <td>{tableData[4]['C_count']}</td>
                <td>{tableData[4]['D_count']}</td>
                <td>{tableData[4]['class_avg']}</td>
                <td>{tableData[9]['class_avg']}</td>
            </tr>
        </div>
    )
}



export default HomepageDugc;
