import React from 'react';
import Form from '../Components/From'; 
import Logo from '../Components/Logo';
import '../App.css';
import './Login.module.css';
import backgroundImage from '../img.jpg'; 

function Login() {
  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', 
      fontFamily: 'sans-serif',
      color: '#000',
      height: '100vh', 
      overflow: 'hidden', 
    }}>
      <div className='App'>
        <Logo />
        <br />
        <Form />
      </div>
    </div>
  );
}

export default Login;
