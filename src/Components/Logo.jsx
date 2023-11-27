import React from 'react'
import '../App.css';
import logo from "../Img/logo.png"

function Logo() {
  return (
    <div>
<div className='logo-holder'>
<div className='logo'>
   <img src={logo} alt="logo"  /> 

</div>
<br /><br /><br /><br />

</div>
<div className='title'> 
    <h3 style={{color:"gray",
fontWeight:"520"}}>Sign In Admin</h3>
</div>



    </div>
  )
}

export default Logo