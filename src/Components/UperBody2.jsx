import React, { useEffect, useRef } from 'react'
import  { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import styles from "./UperBody.module.css";
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

import { styled } from '@mui/material/styles';
import AddUserForm from './AddUserForm';
import { useNavigate } from 'react-router-dom';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { dateDbFormat } from '../util/utils';
import MIdBody2 from "../Components/AttendancePage/MIdBody2"
import ServerConnector from '../Api/ServerConnector';
import { Dialog, DialogActions, DialogTitle, MenuItem, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useDownloadExcel } from 'react-export-table-to-excel';


function UperBody2() {

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
      date: null,
      to_date: null,
      sites:"",
      client:"",
      
  

})
// const SITES =[
//   { value: 'sitapur', label: 'sitapur' },
//   { value: 'Bengalore', label: 'Bengalore' }
// ]

const [clients, setclients] = useState([]);
const [sites, setSites] = useState([]);

    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState('');
    const refValue = useRef(null);
    const sudiptaRef = useRef(null);
    const [downloadUrl, setDownloadUrl] = useState('');
    


  
    // const handleAddUserClick = () => {
    //   console.log("Export XLS button clicked");
    //   // setShowForm(true)
    //   setIsPopupOpen(true);
      
    // };
    // const handleYesClick = () => {
    //   console.log('Submit'); 
    //   setIsPopupOpen(false); 
    // };
  
    // const handleNoClick = () => {
    //   console.log('Cancel'); 
    //   setIsPopupOpen(false);
    // };


    const [open, setOpen] = React.useState(false);
    // const tableref=useRef(null)

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    // const handleCloseYes = useDownloadExcel({
     
    //   currentTableRef:tableref.current,
    //  filename:'user_info',
    //  sheet:'UserData',
         
      
    //  }
    
     
    //  )

    // const handleDownload = () => {
    //   refValue.current.click();
    //   setOpen(false);
    // };
    

    const handleCloseNo = () => {
      console.log('Cancel'); 
      setOpen(false);
    };


  
  
    const StyledButton = styled(Button)(({ theme }) => ({
      background: 'linear-gradient(to right, gray 70%,blue 30% )',
      color: 'white', 
      border: 'none', 
      width: '315px',
      height:'50px', 
      '&:hover': {
        background: 'linear-gradient(to right, gray 70%,blue 30% )', 
      },
    }));

    const handleChange = ( value,name) => {
   
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    

    
     
    };

    const fetchData = () => {
      const formattedStartDate = formData.date && dateDbFormat(formData.date);
      const formattedEndDate = formData.to_date && dateDbFormat(formData.to_date);

     
  
      const hashMap = {
        _action_code: "GET_ATTENDANCE_REPORT",
        ...(formattedStartDate && { date: formattedStartDate }),
        ...(formattedEndDate && { to_date: formattedEndDate }),
        // sites: formData.sites||null, 
        // clients: formData.client||null,
        
        _start_row: 0,
        _rows_page: 10,
        user_type: "FIELD_STAFF"
      };


      
  // if (formData.sites !== null) {
  //   hashMap.sites = formData.sites;
  // }
  // if (formData.client !== null) {
  //   hashMap.clients = formData.client;
  // }

  if(formData.sites.length !=0){
    hashMap.site_seq = formData.sites;
 }
 if(formData.client.length !=0){
  hashMap.client_seq = formData.client;
}
      const connector = new ServerConnector();
      connector.postData(hashMap,(data) => {
        
          console.log("this is data1",data)
          setError("");
          setUserData(data.data)
          console.log("this is data",userData)
         
        },
        (errorCode, errorMessage, data) => {          
          setError(errorMessage);
          setUserData([])
         
        }
      );
    };


    const fetchDataToSite = async () => {
    
      const hashMap = {
        _action_code: "GET_SITES",      
      };
  
      const connector = new ServerConnector();
      connector.postData( hashMap,(data) => {
        console.log(data.data)

        let dataArr = [];
        data.data.map(obj=>{
            let datarow = {};
            datarow.label1 = obj.site_name;
            datarow.value1  = obj.site_seq;
            dataArr.push(datarow);
        });
        setSites(dataArr);
        
        },
        (errorCode, errorMessage, data) => {
          console.error('Error fetching user data:', errorMessage);
          setError(errorMessage);
          setSites([]);
         
        }
      );
    };

    const fetchClients = async () => {
      const hashMap = {
        _action_code: "GET_CLIENTS",
       
      };
  
      const connector = new ServerConnector();
      connector.postData(
        hashMap,(data) => {


          
          console.log("Clients data:", data);

          let dataArr = [];
          data.data.map(obj=>{
              let datarow = {};
              datarow.label2 = obj.client_name;
              datarow.value2 = obj.client_seq;
              dataArr.push(datarow);
          });
          setclients(dataArr);
 
        },
        (errorCode, errorMessage, data) => {
          console.error('Error fetching clients:', errorMessage);
          setclients([]);
     
        }
      );
    };


    useEffect(() => {
       
      // onFetchData()
 
      fetchData();
      // console.log("this is data",fetchData())
      fetchDataToSite();
      fetchClients();
 
       
      },[]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("FormData",formData.date)
      console.log("FormData",formData.to_date)

      // if (typeof onFetchData === 'function') {
      //   onFetchData();
      // }
      // if (typeof  fetchData === 'function') {
      //   fetchData();
      //  }

      // fetchData ();
    


      // if (!formData.date || !formData.to_date) {

      //   setError("Please select both 'From Date' and 'To Date'.");
      //   return;
      // }
    
    
      // if (!formData.sites && !formData.client) {
    
      //   setError("Please select either 'Site' or 'Client', or both.");
      //   return;
      // }
    
    
      // setError("");
      const formattedStartDate = formData.date && dateDbFormat(formData.date);
      const formattedEndDate = formData.to_date && dateDbFormat(formData.to_date);
      if (!formattedStartDate || !formattedEndDate || (!formData.sites && !formData.client)) {
        setValidationError("Please select both date range and either site or client.");
        return;
      }
      setValidationError('');
    

      fetchData();
      // console.log("this is data",fetchData())
   
      
    }

    const handleDownload = () => {
      const formattedStartDate = formData.date && dateDbFormat(formData.date);
      const formattedEndDate = formData.to_date && dateDbFormat(formData.to_date);
    
      const hashMap = {
        _action_code: 'GET_ATTENDANCE_REPORT_XLS',
        ...(formattedStartDate && { date: formattedStartDate }),
        ...(formattedEndDate && { to_date: formattedEndDate }),
        user_type: 'FIELD_STAFF',
      };
    
      
      const connector = new ServerConnector();
      connector.postData(
        hashMap,
        (data) => {
          console.log("Data Value",data)
          sudiptaRef.current.href = data.data[0].file_path;
          sudiptaRef.current.click();
        },
        (errorCode, errorMessage, data) => {
          setOpen(false); 
        }
      );
    };
    
    
const yesButtonPress=()=>{
  handleDownload();
  // sudiptaRef.current.href = "http://www.cmu.edu/blackboard/files/evaluate/tests-example.xls";
  // sudiptaRef.current.click();
  
}

  return (
    <div className={styles["head"]}>
      <div className={styles["left-side"]}>
        <div className={styles["push-to-shopify-products"]}>
          <h1 style={{ fontSize: "59px" }}>Attendance Report</h1>
        </div>
      </div>

      <div className={styles["adjust"]}>
        <div className={styles["right-side"]}>
        <div>
        {/* <a href="Create a dummy button and download this xls from Url:
http://www.cmu.edu/blackboard/files/evaluate/tests-example.xls" target="_blank">This is a link</a> */}

        <div>
      <Button variant="outlined" onClick = {()=> handleClickOpen()}>
       <div >
              <h3>Export XLS</h3>
              
              </div>
              
              <div className='buttonIcon'>
              <Icon  ><NoteAddIcon/></Icon>
                </div>
      </Button>
      <Dialog
        open={open}
     
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to submit?"}
        </DialogTitle>
      
        <DialogActions>
          <Button onClick={()=>yesButtonPress()} >Yes</Button>
          <Button onClick={handleCloseNo} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <a href="#" target="_blank" download ref={sudiptaRef} style={{ display: 'none' }} />
    </div>
    </div>
        </div>

        <div className={styles["left-side"]} >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
          <DatePicker   label=" From Date"
                  required
                  name="date"
                  value={formData.date}
                  onChange={(newValue)=>handleChange(newValue,"date")}
                  />
        <DatePicker label=" TO Date"
                  required
                  name="to_date"
                  value={formData.to_date}
                  onChange={(newValue)=>handleChange(newValue,"to_date")}
                  
                  />

                  <TextField
        label='Select  site'
        required
        name='SITES'
        select
        value={formData.sites}
        onChange={(event)=>handleChange(event.target.value,"sites")}
        // error={!!error.sites}
        //       helperText={error.SITES && '[required]'}
      >
        {sites && sites.length > 0 ? (
          sites.map((site) => (
            <MenuItem key={site.value1} value={site.value1}>
              {site.label1}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No SITES available</MenuItem>
        )}
      </TextField>
      <TextField
        label='Select client'
        required
        name='client'
        select
        value={formData.client}
        onChange={(event)=>handleChange(event.target.value,"client")}
        // error={!!error.client}
        //       helperText={error.client && '[required]'}
      >
        {clients && clients.length > 0 ? (
          clients.map((site) => (
            <MenuItem key={site.value2} value={site.value2}>
              {site.label2}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No client available</MenuItem>
        )}
      </TextField>


                 <div   style={{paddingTop:"15px"}}>
                 <Button type='submit' variant='contained' color='primary' onClick={handleSubmit}>
                  Serach
                 </Button>
              </div>
              </DemoContainer>
                 </LocalizationProvider>

        </div>
      </div>
      <div >
      {validationError && <Stack sx={{ width: '100%' }} >
                <Alert variant="filled" severity="error" >
            <div >{validationError}</div> 
            </Alert>
            </Stack> }
      </div>
      <div>
         <MIdBody2 date={formData.date} to_date={formData.to_date} userData={userData} error={error}/>
      </div>
    </div>
  );  
}
 
// tableref={tableref}

export default UperBody2