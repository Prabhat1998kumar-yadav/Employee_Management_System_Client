import React from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.png"
function Navbar() {
  return (
    <div className='navContainer'>
        <img className='logoImg' src={logo} alt="logo" />
    </div>
  )
}

export default Navbar