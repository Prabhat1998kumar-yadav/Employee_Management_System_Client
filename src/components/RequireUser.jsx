import React from 'react'
import { getItem } from '../utils/localStorageManager'
import { Navigate, Outlet } from 'react-router-dom'

function RequireUser() {    
    const user=getItem("username")    
  return (
     user?<Outlet/>:<Navigate to="/login"/>
  )
}

export default RequireUser