import React from 'react'
import {  Routes, Route } from 'react-router-dom';

import Home from "../Page/Home"
import Location from "../Page/Location"

import Login from "../Page/Login"
import AddUserForm from '../Components/AddUserForm';
import AttendanceReport from '../Page/AttendanceReport';
import AddLocationForm from '../Components/AddLocationForm';
import LocationEdit from '../Components/LocationEdit';


function PageRouting() {
  return (
    <div>

     
     <Routes>
       <Route path="/" element={  <Login/>} />
       <Route path="/Users" element={<Home />} />
       <Route path="/AttendanceReport" element={< AttendanceReport/>} />
       <Route path='/add-user' element={<AddUserForm />} />
       <Route path='/location' element={<Location/>} />
       <Route path='/add-location' element={<AddLocationForm/>} />
       <Route path='/LocationEdit' element={<LocationEdit/>} />
     
     </Routes>
 
 




    </div>
  )
}

export default PageRouting