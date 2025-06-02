import React, { useEffect } from 'react'
import { getItem,} from '../../utils/localStorageManager';
import { Link,useNavigate } from 'react-router-dom';
import "./Dashboard.css"
function Dashboard() { 
    const navigate=useNavigate(); 
    const username =getItem('username');
   
    useEffect(() => {
    if (!username) navigate("/login");
    }, [username]);
  return (
    <div>      
      <div className='dashPanel'>
      <h2>Welcome {username}</h2>
      <nav>
        <Link to="/add-employee" className='link'>Create Employee</Link> 
        <Link to="/employee-list" className='link'>Employee List</Link> 
        
      </nav>
      </div>
      
    </div>
  )
}

export default Dashboard