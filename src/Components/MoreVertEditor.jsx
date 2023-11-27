import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import AdjustIcon from '@mui/icons-material/Adjust';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';

const MoreVertEditor = ({moreVerticalClick = null,locationSeq,status,onStatusChange}) => {// function,23
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [newStatus, setNewStatus] = useState(status);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const [confirmationOpen, setConfirmationOpen] = useState(false);

      const handleConfirmOpen = () => {
        setConfirmationOpen(true);
        console.log('Location Data from MIDBODY',locationSeq);
        console.log('Location Data from MIDBODY',newStatus);
      };
    
      const handleConfirmClose = () => {
        setConfirmationOpen(false);
      };
    

      const handleStatusUpdate = () => {
        onStatusChange(locationSeq, newStatus);
        setAnchorEl(null);
      }




    const navigate = useNavigate();


  
    const handleAddUserClick = (newStatus) => { 
      moreVerticalClick("SUDIPTA",{sudipta:locationSeq})     
      // navigate('/LocationEdit',{
      //   state:{
      //     id:2
      //   }
      // });
      setConfirmationOpen(false);
      setAnchorEl(null);
    };


  return (
  <>
  
  <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
  <MoreVertIcon/>
  </IconButton>
  <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}>
      <MenuItem onClick={handleAddUserClick} disableRipple>
          <EditIcon />
          Edit Location 
        </MenuItem>
        {status === 'ACTIVE' ? (
        <MenuItem onClick={handleConfirmOpen} disableRipple>
        <AdjustIcon />
        Inactivate Location
      </MenuItem>
    ) : (
      <MenuItem onClick={() => setNewStatus('ACTIVE')} disableRipple>
        <AdjustIcon />
        Activate Location
      </MenuItem>
    )}
    </Menu>
    {confirmationOpen && (
        <div>
          {status === 'ACTIVE' ? (
       <Dialog  open={open} onClose={handleConfirmClose}>
            <DialogTitle>Do you want to Inactivate this location?</DialogTitle>
            <DialogActions>
              <button onClick={() => handleStatusUpdate}  type='submit' variant='contained' color='primary'>Yes</button>
              <button onClick={handleConfirmClose} type='button' variant='outlined' color='secondary'>No</button>
              </DialogActions>
            </Dialog>
          ) : (
            <Dialog  open={open} onClose={handleConfirmClose}>
             <DialogTitle>Do you want to activate this location?</DialogTitle>
             <DialogActions>
              <button onClick={() =>handleStatusUpdate} type='submit' variant='contained' color='primary'>Yes</button>
              <button onClick={handleConfirmClose} type='button' variant='outlined' color='secondary'>No</button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      )}
  
  </>
  )
}

export default MoreVertEditor