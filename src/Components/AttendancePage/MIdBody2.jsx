import React from 'react'
import  { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import ServerConnector from '../../Api/ServerConnector';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { dateDbFormat } from '../../util/utils';
import ImageListItem from '@mui/material/ImageListItem';




function MIdBody2(  { date, to_date,  error, userData=[]}) {    

    const formattedStartDate = date && dateDbFormat(date);
    const formattedEndDate = date && dateDbFormat(to_date);
  
    // const formattedStartDate = date && dateDbFormat(date); // Check if date is not empty before formatting
    // const formattedEndDate = date && dateDbFormat(to_date); 


    // const fetchData = async () => {
    //   const hashMap = {
    //     _action_code: "GET_ATTENDANCE_REPORT",
    //     ...(formattedStartDate && { date: formattedStartDate }), // Include date if not empty
    //     ...(formattedEndDate && { to_date: formattedEndDate }),
    //     _start_row: 0,
    //     _rows_page: 10,
    //     user_type: "FIELD_STAFF"
    //   };

    //   const connector = new ServerConnector();
    //   connector.postData(hashMap, (data) => {
    //     const sortedData = data.data.sort((a, b) => a.user_seq - b.user_seq); 
    //     setUserData(sortedData);
    //     console.log(sortedData);
       
    //   }, (errorCode, errorMessage, data) => {
    //     console.error('Error fetching user data:', errorMessage);
    //     setError(errorMessage);
    //   });
    // };
    useEffect(() => {
       
      // onFetchData()
console.log("User data",userData);
console.log("Error message",error);
       
      },[userData]);


  return (
    <div>
      
        {error && (
                <Stack sx={{ width: '100%' }} >
                <Alert variant="filled" severity="error" >
            {error && <div >{error}</div>} 
            </Alert>
            </Stack>
        ) }
       {!error && userData.length > 0 && (
          <TableContainer component={Paper} >
        <Table>
        {/* ref={tableref} */}
          <TableHead style={{ background: 'blue',  }}>
            <TableRow>
            <TableCell style={{ fontSize: '25px' }}>Sl No</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Image </TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Employee ID</TableCell>
              <TableCell   style={{ fontSize:"25px",color: 'white' }}>Full Name</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Client</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Site</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Type</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Marked At</TableCell>
              <TableCell style={{ fontSize:"25px",color: 'white' }}>Late</TableCell>
              <TableCell style={{ fontSize:"25px",color: 'white' }}>Lat/Lng</TableCell>
           
            </TableRow>
          </TableHead>

      
          <TableBody>
          
          
  {userData.map((row, index) => (      
    <TableRow key={index}>
      <TableCell style={{ fontSize: '25px' }}>{index + 1}</TableCell>

      <TableCell style={{height: '2px',width: '2px' }}><img src={row.file_name} style={{height: '200px',width: '200px' }}/></TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.employee_id}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.full_name}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.client_name}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.site_name}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.type}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.marked_at}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.is_late}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.latitude},{row.longitude}</TableCell>
  
      
      </TableRow>
      ))}
</TableBody>
    
          </Table>
          </TableContainer>

)}



    </div>
  )
}

export default MIdBody2