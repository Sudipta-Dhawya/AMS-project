import React, { useState ,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Head from './Head';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ServerConnector from '../Api/ServerConnector';
import { useNavigate } from 'react-router-dom';
import { checkValueLength, dbTimeHoursFormat } from '../util/utils';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';




const FormContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'colum',
    gap: "7",
    padding: 16,
    // border: '1px solid #1976d2',
    borderRadius: 8,
    margin: '25px 12px',
    backgroundColor: 'aliceblue'
  });
  const ButtonContainer = styled('div')({
   padding:"5px",
    display: 'flex',
    flexDirection: 'row-reverse',
    margin:"12",
  });
  function AddUserForm() {
    const [formData, setFormData] = useState({
      employee_id: '',
      employee_name: '',
      mobile_number: '',
      email_id: '',
      location: '',
      login_time: null,
      logout_time: null,
      is_privileged: '',
    });
    const [locations, setLocations] = useState([]);
    const [errors, setErrors] = useState({
      employee_id: '',
      employee_name: '',
      mobile_number: '',
      email_id: '',
      location: '',
      is_privileged: '',
    }); 
    const [loginTimeError, setLoginTimeError] = useState('');
    const [logoutTimeError, setLogoutTimeError] = useState('');
    const navigate = useNavigate();
      const fetchData = async () => {
        const hashMap = {
          _action_code: "11:GET_LOCATIONS",
        };
        let connector = new ServerConnector();
        connector.postData(hashMap, (data) => { // success method
          // console.log("Location Data",data.data)
          let dataArr = [];
          data.data.map(obj=>{
              let datarow = {};
              datarow.label = obj.location_name;
              datarow.value  = obj.location_seq;
              dataArr.push(datarow);
          });
          setLocations(dataArr);
        }, (errorCode, errorMessage, data) => { // failure method
        setLocations([]);
        });
      }
      useEffect(() => {
      fetchData();
    }, []);

    const [apiError, setApiError] = useState('');
    // const [employeeIdError, setEmployeeIdError] = useState('');
    // const [employeeNameError, setEmployeeNameError] = useState('');
    // const [mobileNumberError, setMobileNumberError] = useState('');
    // const [emailIdError, setEmailIdError] = useState('');
    // const [locationError, setLocationError] = useState('');
    // const [isPrivilegedError, setIsPrivilegedError] = useState('');


    const fetchDataFromAddUser = async () => {
      const hashMap = {
        _action_code: "ADD_USER",
      
        employee_id: formData.employee_id,
        full_name: formData.employee_name,
        email_id:formData.email_id,
        mobile_number_user: formData.mobile_number,
        location_seq: formData.location,
        login_time: dbTimeHoursFormat(formData.login_time),
        logout_time:dbTimeHoursFormat(formData.logout_time),
        is_privileged: formData.is_privileged ? "YES" : "NO",
        user_type: "FIELD_STAFF",
      


  
      };
    
      let connector = new ServerConnector();
      connector.postData(hashMap, (data) => {


      
        console.log("Add User Data", data);
        navigate('/Users'); 
      }, (errorCode, errorMessage, data) => {
       
        console.error("Add User Error:", errorCode, errorMessage);
        // if (errorCode === 'EMPLOYEE_ID_ERROR') {
        //   setEmployeeIdError(errorMessage);
        // } else if (errorCode === 'EMPLOYEE_NAME_ERROR') {
        //   setEmployeeNameError(errorMessage);
        // } else if (errorCode === 'MOBILE_NUMBER_ERROR') {
        //   setMobileNumberError(errorMessage);
        // } else if (errorCode === 'EMAIL_ID_ERROR') {
        //   setEmailIdError(errorMessage);
        // } else if (errorCode === 'LOCATION_ERROR') {
        //   setLocationError(errorMessage);
        // } else if (errorCode === 'IS_PRIVILEGED_ERROR') {
        //   setIsPrivilegedError(errorMessage);
        // } else {
        //   setApiError(errorMessage);
        // }

        setApiError(errorMessage);
      });
    };
    
    const handleChange = (e) => {
      const { name, value } =  e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      // console.log(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    };
    const handleChange1 = ( value,name) => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      console.log(new Date(value));
      if (name === 'login_time') {
        setLoginTimeError('');
      } else if (name === 'logout_time') {
        setLogoutTimeError('');
      }
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        console.log("Form Data:",formData);
        console.log("Form Data:",dbTimeHoursFormat(formData.login_time));
        console.log("Form Data:",dbTimeHoursFormat(formData.logout_time));
        fetchDataFromAddUser();
      }
    };
    const validateForm = () => {
      let isValid = true;
      const newErrors = {};
  
      // Validate each field
      if (formData.employee_id === '') {
        newErrors.employee_id = 'required';
        isValid = false;
      }
      if (formData.employee_name.trim() === '') {
        newErrors.employee_name = 'required';
        isValid = false;
      }
      if (formData.mobile_number === '') {
        newErrors.mobile_number = 'required';
        isValid = false;
      }
      if (formData.email_id.trim() === '') {
        newErrors.email_id = 'required';
        isValid = false;
      }
      if (formData.location === '') {
        newErrors.location = 'required';
        isValid = false;
      }
      // if (formData.login_time === '') {
      //   newErrors.login_time = 'required';
      //   isValid = false;
      // }
      // if (formData.logout_time === '') {
      //   newErrors.logout_time = 'required';
      //   isValid = false;
      // }
      if (formData.is_privileged === '') {
        newErrors.is_privileged = 'required';
        isValid = false;
      }
  
      // Update the errors state
      setErrors(newErrors);
  
      return isValid;
    };
    const handleCancel = () => {
      setFormData({
        employee_id: '',
        employee_name: '',
        mobile_number: '',
        email_id: '',
        location: '',
        login_time: '',
        logout_time: '',
        is_privileged: false,
      });
      setTimeout(() => {
       navigate('/Users');  
      }, 1000);
    };
  return (
<div>
    <Head/>
    <h1 style={{color:"blue",margin:"25px" ,fontSize:"45px",marginLeft:"32px"}}>Add Field User</h1>
<h1 style={{color:"gray",fontWeight:"520",marginLeft:"42px"}}>Field User Management / Add Field User</h1>
    <FormContainer >
    <form onSubmit={handleSubmit}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 5, width: '55ch'},
      }}
      noValidate
      autoComplete="off"
    > 
        {/* <Stack sx={{ width: '100%' }} >
        <Alert variant="filled" severity="error">
    {apiError && <div >{apiError}</div>} 
    </Alert>
    </Stack> */}
      <TextField
        label='Employee ID'
        required
        name='employee_id'
        value={formData.employee_id}
        onChange={handleChange}
        error={!!errors.employee_id}
        helperText={errors.employee_id && '[required]'}
      />
        <TextField
          label='Employee Name'
          required
          name='employee_name'
          value={formData.employee_name}
          onChange={handleChange}
          error={!!errors.employee_name}
              helperText={errors.employee_name&& '[required]'}
        />
        <TextField
          label='Mobile Number'
          required
          name='mobile_number'
          value={formData.mobile_number}
          onChange={handleChange}
          error={!!errors.mobile_number}
              helperText={errors.mobile_number && '[required]'}
        />
        <TextField
          label='Email Id'
          
          name='email_id'
          value={formData.email_id}
          onChange={handleChange}
        />
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
      <TextField
        label='Select location'
        required
        name='location'
        select
        value={formData.location}
        onChange={handleChange}
        error={!!errors.location}
              helperText={errors.location && '[required]'}
      >
        {locations && locations.length > 0 ? (
          locations.map((location) => (
            <MenuItem key={location.value} value={location.value}>
              {location.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No locations available</MenuItem>
        )}
      </TextField>
        <TimePicker   label="Login Time"
                  required
                  name="login_time"
                  value={formData.login_time}
                  onChange={(newValue)=>handleChange1(newValue,"login_time")}
                  // defaultValue={new Date('2023-08-24T15:30')}
                  error={!!loginTimeError.login_time}
                  helperText={loginTimeError.login_time && '[required]'}   
                  />
        <TimePicker  label="Logout Time"
                  required
                  name="logout_time"
                  value={formData.logout_time}
                  // defaultValue={new Date('2023-08-24T15:30')}
                  onChange={(newValue)=>handleChange1(newValue,"logout_time")}
                  error={!!logoutTimeError.logout_time}
                  helperText={logoutTimeError.logout_time && '[required]'}  
                  />
        <TextField
        label='Is Privileged'
        required
        name='is_privileged'
        select 
        value={formData.is_privileged}
        onChange={handleChange}
        error={!!errors.is_privileged}
              helperText={errors.is_privileged && '[required]'}
      >
        <MenuItem value={true}>Yes</MenuItem>
        <MenuItem value={false}>No</MenuItem>
      </TextField>
      </DemoContainer>
    </LocalizationProvider>
      {/* <InputTime/> */}
    </Box>
<ButtonContainer>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
          <Button type='button' variant='outlined' color='secondary' onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
    </div>
  );
}
export default AddUserForm;
