import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, IconButton, Menu } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import ServerConnector from '../Api/ServerConnector';
import EditIcon from '@mui/icons-material/Edit';

function MIdBody() {
  const [userData, setUserData] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
 
  
    const handleAddUserClick = () => { 
      // moreVerticalClick("SUDIPTA",{sudipta:locationSeq})     
      // navigate('/LocationEdit',{
      //   state:{
      //     id:2
      //   }
      // });
      setAnchorEl(null);
    };






  useEffect(() => {
    const fetchData = async () => {
      const hashMap = {
        _action_code: "11:GET_USERS",
        _start_row: 0,
        _rows_page: 10,
        user_type: "FIELD_STAFF"
      };

      const connector = new ServerConnector();
      connector.postData(hashMap, (data) => {
        const sortedData = data.data.sort((a, b) => a.user_seq - b.user_seq); 
        setUserData(sortedData);
      }, (errorCode, errorMessage, data) => {
        console.error('Error fetching user data:', errorMessage);
      });
    } ;

    fetchData();
  }, []);





  

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ background: 'blue',  }}>
            <TableRow>
            <TableCell style={{ fontSize: '25px' }}>Sl No</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>user </TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Full Name</TableCell>
              <TableCell   style={{ fontSize:"25px",color: 'white' }}>Mobile Number</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Email Id</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Employee Id</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Login Time</TableCell>
              <TableCell  style={{ fontSize:"25px",color: 'white' }}>Logout Time</TableCell>
              <TableCell style={{ fontSize:"25px",color: 'white' }}>Location Name</TableCell>
             
     
              <TableCell style={{ fontSize:"25px",color: 'white' }}>Is Privileged</TableCell>
           
              <TableCell style={{ fontSize:"25px",color: 'white' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {userData.map((row, index) => (
    <TableRow key={index}>
      <TableCell style={{ fontSize: '25px' }}>{index + 1}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.user_seq}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.full_name}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.mobile_number}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.email_id}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.employee_id}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.login_time}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.logout_time}</TableCell>
      <TableCell style={{ fontSize: "25px" }}>{row.location_name}</TableCell>
  
      
      <TableCell style={{ fontSize: "25px" }}>{row.is_privileged}</TableCell>
     

      <TableCell>
        {row.status === 'ACTIVE' ? (
          <Button variant="contained" color="success">
            {row.status}
          </Button>
        ) : (
        row.status
        )}
         <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
  <MoreVert/>
  </IconButton>
  <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}>
      <MenuItem onClick={handleAddUserClick} disableRipple>
          <EditIcon />
          Edit Location 
        </MenuItem>
    </Menu>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}

export default MIdBody;
