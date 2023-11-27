
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import logo from "../Img/logo.png"
import TimePeaker from '../Components/TimePeaker';
import UperBody from '../Components/UperBody';
import MIdBody from '../Components/MIdBody';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

function Home() {
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate('/');
  };




  return (
    <div>


<Box sx={{ flexGrow: 1 }}>

<AppBar position="static">
  <Toolbar>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 112 }}
    >
      <Sidebar/>
      {/* <MenuIcon  sx={{ width: 56, height: 56 ,mr:2}}/> */}
      <Avatar
        alt="Remy Sharp"
        src={logo}
        sx={{ width: 56, height: 56 }}
      />
    </IconButton>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,fontSize:35}}>
    Admin Console 
    </Typography>
    <TimePeaker   sx={{fontSize:35}}  />
      <div>
      
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle sx={{ width: 56, height: 56 }}/>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
          <MenuItem onClick={handleClose}>log out</MenuItem>
        </Menu>
      </div>
  
  </Toolbar>
</AppBar>
</Box>
<UperBody/>


<MIdBody/>
        
    </div>
  )
}

export default Home