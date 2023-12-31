// import React from 'react'
// import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';
import logo from "../Img/logo.png"
import { Avatar } from '@mui/material';
import { CenterFocusStrong } from '@mui/icons-material';


const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})
(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
 
  // ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Sidebar() {


//  const [showForm, setShowForm] = useState(false);



  const navigate = useNavigate();
    const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAddUserClick1 = () => {

    // setShowForm(true)
    
    navigate('/Users');
  };
  const handleAddUserClick2 = () => {

    // setShowForm(true)
    
    navigate('/AttendanceReport');
  };
  const handleAddUserClick3 = () => {

    // setShowForm(true)
    
    navigate('/location');
  };
  return (
    <Box >
      <CssBaseline />
   
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
         
        </Toolbar>

     
       
  
      <Drawer
        sx={{
          width: "0px",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width:"340px",
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{textAlign:'center',position:'relative',minHeight:'85px'}}>
          <IconButton onClick={handleDrawerClose} style={{position:'absolute',top:"50%",left:"50%",transform:'translate(-50%,-50%)'}}>
           
          <Avatar
        alt="Remy Sharp"
        src={logo}
      
        sx={{ width: 56, height: 56,}}
      />
            
          </IconButton>
          <IconButton onClick={handleDrawerClose} style={{border:"1px soild black"}}>           
         
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Users', ].map((text, index) => (
            <ListItem key={text} disablePadding onClick={handleAddUserClick1} >
              <ListItemButton>
                <ListItemIcon>
                  { <PersonIcon /> }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
            {[ 'Attendance  Report', ].map((text, index) => (
            <ListItem key={text} disablePadding  onClick={handleAddUserClick2}>
              <ListItemButton>
                <ListItemIcon>
                  {<AssessmentIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          {[ 'Location', ].map((text, index) => (
            <ListItem key={text} disablePadding  onClick={handleAddUserClick3}>
              <ListItemButton>
                <ListItemIcon>
                  {<AssessmentIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
   
       
      </Drawer>
     
    </Box>
  )
}

export default Sidebar