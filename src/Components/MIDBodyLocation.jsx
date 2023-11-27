import React from 'react'
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import ServerConnector from '../Api/ServerConnector';
import MoreVertEditor from './MoreVertEditor';
import { useLocation, useNavigate } from 'react-router-dom';

const MIDBodyLocation = () => {


    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
  
      const fetchData = async () => {
        const hashMap = {
          _action_code: "GET_LOCATIONS",
          _start_row: 0,
          _rows_page: 10,
          user_type: "FIELD_STAFF"
        };
  
        const connector = new ServerConnector();
        connector.postData(hashMap, (data) => {
          console.log("Location Data",data.data)
          
          setUserData(data.data);
        }, (errorCode, errorMessage, data) => {
          console.error('Error fetching user data:', errorMessage);
        });
      } ;
  

      useEffect(()=>{
        fetchData();
      },[])

     
  

const moreVerticalClick=(clickID,obj)=>{
  console.log("clickID",clickID)
  console.log("obj",obj)
  if(clickID == "SUDIPTA"){
    // navigate('/LocationEdit',{
    //   state:{
    //     sudipta_location:obj.sudipta
    //   }
    // });
    navigate('/add-location',{
      state:{
        sudipta_location:obj.sudipta
      }
      
    });
  }
 
}




// const acceptLocationSeqSudipta = useLocation()
// console.log('Location Data from morevertxx',acceptLocationSeqSudipta );
const handleStatusChange = (locationSeq, newStatus) => {
  console.log('Location Data from morevert',locationSeq );
  console.log('newStatus from morevert',newStatus );
  const hashMap = {
    _action_code: 'SET_LOCATION_STATUS',
    location_seq: locationSeq,
    status: newStatus,
  };

  const connector = new ServerConnector();
  connector.postData(
    hashMap,
    (data) => {
      console.log('Location Data', data.data);
    
      fetchData();
    },
    (errorCode, errorMessage, data) => {
      console.error('Error updating location status:', errorMessage);
    }
  );
};




  return (
    <div>
         <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ background: 'blue',  }}>
            <TableRow>
            <TableCell style={{ fontSize: '25px' }}>Sl No</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Location Name</TableCell>
              <TableCell   style={{ fontSize:"25px",color: 'white' }}>Description</TableCell>
              <TableCell style={{ fontSize:"25px",color: 'white' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {userData.map((row, index) => (
    <TableRow key={index}>
      <TableCell style={{ fontSize: '25px' }}>{index + 1}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.location_name}</TableCell>
      {/* <TableCell style={{ fontSize: "25px" }}>{row.description} {row.location_seq}</TableCell> */}
      <TableCell style={{ fontSize: "25px" }}>{row.description}</TableCell>
  <TableCell>
        {row.status === 'ACTIVE' ? (
          <Button variant="contained" color="success">
            {row.status}
          </Button>
        ) : (
          <Button variant="contained" color="error">
        {row.status}
        </Button>
        )}
       <MoreVertEditor moreVerticalClick={moreVerticalClick}  locationSeq={row.location_seq}   status={row.status}  
        onStatusChange={handleStatusChange}/>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
    </div>

    </div>
  )
}

export default MIDBodyLocation