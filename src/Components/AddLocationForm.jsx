import React from 'react'
import  { useState ,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Head from './Head';
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ServerConnector from '../Api/ServerConnector';
import { useLocation, useNavigate } from 'react-router-dom';



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

const AddLocationForm = () => {

    const [formData, setFormData] = useState({
       
        location: '',
        description:"",
       
      });
      const [locationParamValue, setLocationParamValue] = useState(-1)
      const [locations, setLocations] = useState([]);
      const [errors, setErrors] = useState({
        
        location: '',
        description:"",
        
      }); 
const locationSudipta = useLocation()
console.log("uselocation accepte value",locationSudipta)
useEffect(() => {
  console.log("locationSudipta",locationSudipta.state.sudipta_location)
  const locationValue = locationSudipta.state.sudipta_location;
  setLocationParamValue(locationValue)
  if(locationValue!=-1){
    fetchLocationDetails(locationValue)
  }
}, [])
const fetchLocationDetails = async (locationValue) => {
  const hashMap = {
    _action_code: "GET_LOCATION_DETAILS",
    location_seq: locationValue,

  };
  let connector = new ServerConnector();
  connector.postData(hashMap, (data) => { // success method           
    setFormData({
      location: data.data[0].location_name,
      description:data.data[0].description,
    });
  }, (errorCode, errorMessage, data) => { // failure method
    setFormData({
      location: '', 
      description: '',
    });
    console.error('Error fetching location data:', errorMessage);

  });
}


           const navigate = useNavigate();
        const fetchData = async () => {
          const hashMap = {
            _action_code: "ADD_LOCATION",
            location_name: formData.location,
            description:formData.description,
            user_type: "FIELD_STAFF",
          };
          let connector = new ServerConnector();
          connector.postData(hashMap, (data) => { // success method
            console.log("Location Data",data.data)
           
          
            navigate('/location'); 
          }, (errorCode, errorMessage, data) => { // failure method
            console.error("Add User Error:", errorCode, errorMessage);
          });
        }
      



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
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          console.log("Form Data:",formData);
         
          fetchData();
        }
      };

      const validateForm = () => {
        let isValid = true;
        const newErrors = {};
    
        // Validate each field
       
        if (formData.location === '') {
          newErrors.location = 'required';
          isValid = false;
        }
       
        // Update the errors state
        setErrors(newErrors);
    
        return isValid;
      };
      const handleCancel = () => {
        setFormData({
          
          location: '',
         
        });
        setTimeout(() => {
         navigate('/location');  
        }, 1000);
      };



  return (
    <div>


<div>
    <Head/>
    <h1 style={{color:"blue",margin:"25px" ,fontSize:"45px",marginLeft:"32px"}}>{locationParamValue!=-1?"Edit":"Add"} Location</h1>
<h1 style={{color:"gray",fontWeight:"520",marginLeft:"42px"}}>Location Management / {locationParamValue!=-1?"Edit":"Add"} Location</h1>
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

    
      <TextField
        label='Select location'
        required
        name='location'
        value={formData.location}
        onChange={handleChange}
        error={!!errors.location}
        helperText={errors.location && '[required]'}
      />
       
       
   
  
    <TextField
          label='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
              helperText={errors.description && '[required]'}
        />
       
      {/* <InputTime/> */}
    </Box>
<ButtonContainer>
          <Button type='submit' variant='contained' color='primary'>
            {locationParamValue!=-1?"Update":"Submit"}
          </Button>
          <Button type='button' variant='outlined' color='secondary' onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
    </div>





    </div>
  )
}

export default AddLocationForm