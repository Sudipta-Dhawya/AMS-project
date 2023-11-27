import React from 'react'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import styles from "./UperBody.module.css";
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';

const UperBodyLocation = () => {

    const [showForm, setShowForm] = useState(false);



    const navigate = useNavigate();
  
    const handleAddUserClick = () => {
  
      setShowForm(true)
      
      navigate('/add-location',{
        state:{
          sudipta_location:-1,
        }
      });
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


  return (
    <div>



<div className={styles["head"]}>
      <div className={styles["left-side"]}>
        <div className={styles["push-to-shopify-products"]}>
          <h1 style={{ fontSize: "59px" }}>Location Management</h1>
        </div>
      </div>

      <div className={styles["adjust"]}>
        <div className={styles["right-side"]}>
         
          <div className='tableButton' onClick={handleAddUserClick}>
            <div className='buttonText'>
              <h3>Add Location</h3>
              
              </div>
              <div className='buttonIcon'>
              <Icon  >add_circle</Icon>
                
                
                </div> 

          </div>
          {showForm && <AddUserForm />}
        </div>

        <div className={styles["search-bar"]}>
          <input type="text" placeholder="Search..."  />
          <FaSearch id="search-icon" style={{ marginLeft: '199px' }}/>
        </div>
      </div>
    </div>





    </div>
  )
}

export default UperBodyLocation