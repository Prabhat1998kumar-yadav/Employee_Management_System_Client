import React, { useState } from 'react'
import { axiosClient } from '../../utils/axiosClient';
import { setItem } from '../../utils/localStorageManager';
import {useNavigate } from 'react-router-dom';
import "./Login.css"
function Login() {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!username.trim() || !password) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      const res= await axiosClient.post("/auth/login",{
        username,
        password
      })     
      
      if (res.data.msg === "Login successful") {                
        setItem("username",res.data.username)
        alert('Login successful!');
        navigate("/")
      } else {
        const err =res.data.msg;
        alert(err.msg || 'Invalid login details.');
      }
    } 
    catch (err) {
     if (err.response && err.response.data && err.response.data.msg) {
     alert(err.response.data.msg); 
    } else {
     alert("Server error, please try again later.");
    }
    }
  };
  return (
      <div className='logoContainer'>
      <h2 className='logoNav'>Login Page</h2>
      <form onSubmit={handleSubmit} className='logoForm'>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={{ marginTop: '20px',fontSize:"30px" }} type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
