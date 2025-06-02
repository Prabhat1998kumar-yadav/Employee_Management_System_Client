import react from "react"
import {Route, Routes} from "react-router-dom"
import Login from "./pages/login/Login"
import RequireUser from "./components/RequireUser"
import Dashboard from "./pages/dashboard/Dashboard"
import AddEmployee from "./pages/addEmployee/AddEmployee"
import EmployeeList from "./pages/employeeList/EmployeeList"
import EditEmployee from "./pages/editEmployee/EditEmployee"
import Navbar from "./components/navbar/Navbar"
import PanelNav from "./components/PanelNav/PanelNav"
import { getItem } from "./utils/localStorageManager"


function App() {
   const admin=getItem("username")

  return (
    <>
    <Navbar/>   
     <Routes> 

      <Route element={<RequireUser/>}>  
      
        <Route element={<PanelNav username={admin}/>}>     
        <Route path="/" element={<Dashboard/>}/> 
        <Route path="/add-employee" element={<AddEmployee/>} />
        <Route path="/employee-list" element={<EmployeeList/>} /> 
        <Route path="/edit-employee/:id" element={<EditEmployee/>} />
        </Route>      
        
      </Route>

      <Route path="/login" element={<Login/>} />
      
     </Routes>
      
    </>
  )
}

export default App
