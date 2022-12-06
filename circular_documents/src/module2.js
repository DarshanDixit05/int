import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";



import CourseCoordinator from "./components/course-coordinator";
import HomepageDugc from "./components/homepage-dugc";

function Module2() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path='/coordinator' element={<CourseCoordinator />} />
                <Route path="/dugc-home" element={<HomepageDugc />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}



export default App;
