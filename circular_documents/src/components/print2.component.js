import React, { Component} from "react";
import { Link } from "react-router-dom";
import Display from "./printApproved.component";

export default class Display2 extends Component{ 
    render(){ 
        return( 
            <div>

                <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <img src="https://firebasestorage.googleapis.com/v0/b/dugc7-caf3d.appspot.com/o/ref_img%2Fkle_logo.png?alt=media&token=77f3a631-91a5-40f1-9fca-16001e566cd2"alt="Scholarship"class="img-fluid mx-auto d-block float-xl-left float-lg-left float-md-left logoleft"/>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <b><h4 class="text-center1">Departmental Under Graduate Committee</h4></b>
                <h6 class="text-center2">School of Computer Science and Engineering</h6>
                <b><h7 class="text-center3">(For Academic Year 2022-23)</h7></b>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <img src="https://firebasestorage.googleapis.com/v0/b/dugc7-caf3d.appspot.com/o/ref_img%2FKLES-Centenary-LOGO-PNG.png?alt=media&token=13cfe0d3-7384-4cfa-81e0-28f6395accdd" alt="" class="img-fluid mx-auto d-block float-xl-right float-lg-right float-md-right logoright"/>
            </div>
        </div>
    </div>
                
            <nav className="navbar navbar-dark bg-info  navbar-expand-lg" id="navbarResponsive"> 
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
            <Display />
            </div>
        ); 
    } 
}