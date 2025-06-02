import React, { useEffect, useState } from 'react'
import {axiosClient} from "../../utils/axiosClient"
import {useNavigate } from 'react-router-dom';
import "./EmployeeList.css"
function EmployeeList() {
  const navigate=useNavigate();
    const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getEmployees = async () => {
    const res = await axiosClient.get(`/employee/list?search=${search}&page=${page}`);
      
    setEmployees(res.data.employees);
    setTotal(res.data.total);
  };

  useEffect(() => {
    getEmployees();
  }, [search, page]);

 

  const handleDelete = async (id) => {
    
    if (window.confirm("Delete this employee?")) {
      await axiosClient.delete(`/employee/delete/${id}`);
      getEmployees();
    }
  };

  const totalPages = Math.ceil(total / 5);
  return (
      <div>
      <h2 className='heading'>Employee List</h2>
      <div className="subHeading">
         <div>Total Count: {total}</div>
         <button onClick={()=>{
          navigate("/add-employee")
         }}>CreateEmployee</button>
      </div>
       
      <div className='searchContainer'>
        <button onClick={() => setPage(1)}>Search</button>
        <input
          type="text"
          placeholder="Search by name/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        
      </div>

      

      <table border="1" cellPadding="5" cellSpacing="0" className='tableList'>
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {employees.map((emp, i) => (
            
            <tr key={emp._id}>
              <td>{i + 1 + (page - 1) * 5}</td>
              <td>
                <img
                  src={`http://localhost:3001/uploads/${emp.f_Image}`}
                  width="50"
                  alt="profile"
                />
              </td>
              <td>{emp.f_Name}</td>
              <td>{emp.f_Email}</td>
              <td>{emp.f_Mobile}</td>
              <td>{emp.f_Designation}</td>
              <td>{emp.f_gender}</td>
              <td>{emp.f_Course}</td>
              <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={()=>navigate(`/edit-employee/${emp._id}`)}>Edit</button>
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='tableList'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} disabled={page === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default EmployeeList