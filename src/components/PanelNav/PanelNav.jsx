import React from 'react'
import "./PanelNav.css"
import { removeItem } from '../../utils/localStorageManager';
import { Outlet, useNavigate } from 'react-router-dom';
function PanelNav({username}) {
  const navigate=useNavigate();
   function handleLogout(){
         removeItem("username");
         navigate("/login")
      }
  return (
    <div>
      <div className="dasNav">
        <ul>
          <li>Home</li>
          <li>EmployeeList</li>
          <li>{username}</li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
        </div>
        <Outlet/>
      </div>
  )
}

export default PanelNav