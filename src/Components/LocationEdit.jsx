import { Box, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Head from './Head';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import ServerConnector from '../Api/ServerConnector';




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
const LocationEdit = () => {
    
    const navigate = useNavigate();
   
    // const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({
       
        location: '',
        description: '',
      });
      const [errors, setErrors] = useState({
        
        location: '',
        description: '',
      }); 

      // const { location_seq } = useParams();
      const locationSudiptaData= useLocation();
      useEffect(() => {
        console.log("Location",locationSudiptaData.state.sudipta_location)
        fetchData(locationSudiptaData.state.sudipta_location)
      }, [])
      
      const fetchData = async (locationValue) => {
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
    //   useEffect(() => {
    //   fetchData();
    // }, [location_seq]);



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
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          console.log("Form Data:",formData);
          // const updatedLocationData = {
          //   location_seq: location_seq,
          //   location_name: formData.location,
          //   description: formData.description,
          // };
          navigate('/location');
        }
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
   <>
  
  <div>
    <Head/>
    <h1 style={{color:"blue",margin:"25px" ,fontSize:"45px",marginLeft:"32px"}}>Edit Location</h1>
<h1 style={{color:"gray",fontWeight:"520",marginLeft:"42px"}}>Location Management / Edit Location</h1>
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
       
    
    </Box>
<ButtonContainer>
          <Button type='submit' variant='contained' color='primary'>
          UPDATE LOCATION
          </Button>
          <Button type='button' variant='outlined' color='secondary' onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
    </div>





   
   
   </>
  )
}

export default LocationEdit