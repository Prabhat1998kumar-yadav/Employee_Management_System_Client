import React, { useEffect, useState } from 'react'
import { getItem, removeItem } from '../../utils/localStorageManager';
import { useNavigate } from 'react-router-dom';
import {axiosClient} from '../../utils/axiosClient';
import "./AddEmployee.css"
function AddEmployee() {
  const user = getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;  
    
    if (type === "file") {
      const file = files[0];
      if (file && !["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPG/PNG files are allowed");
        return;
      }
      setForm({ ...form, image: file });
    } else if (type === "checkbox") {
      setForm((prev) => {
        const updatedCourses = checked
          ? [...prev.course, value]
          : prev.course.filter((c) => c !== value);
        return { ...prev, course: updatedCourses };
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!form.name || !form.email || !form.mobile || !form.designation || !form.gender || form.course.length === 0 || !form.image) {
      alert("Please fill all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Invalid email");
      return;
    }

    if (!/^\d+$/.test(form.mobile)) {
      alert("Mobile number must be numeric");
      return;
    }

    const data = new FormData();
    data.append("f_Name", form.name);
    data.append("f_Email", form.email);
    data.append("f_Mobile", form.mobile);
    data.append("f_Designation", form.designation);
    data.append("f_gender", form.gender);
    data.append("f_Course", form.course.join(","));
    data.append("f_Image", form.image);

   try {
    const res = await axiosClient.post("/user/employees", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    if (res.status === 200 || res.status === 201) {
      alert("Employee Created Successfully");
      navigate("/employee-list");
    } else {
      alert(res.data.message || "Failed to add employee");
    }
  } catch (err) {
    console.error(err);
    alert("Server error, please try again later.");
  }
  };
  return (
     <div>      
      <h2 className='heading'>Create Employee</h2>      
    <form onSubmit={handleSubmit} encType="multipart/form-data" className='createContainer flex'>     
     <label htmlFor="name">Name:
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        value={form.name}
        onChange={handleChange}
      />
    </label>
      <label htmlFor="email">Email:
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
      />
    </label>
      <label htmlFor="mobile">Mobile No:
      <input
        type="tel"
        id="mobile"
        name="mobile"
        placeholder="Enter your mobile number"
        value={form.mobile}
        onChange={handleChange}
      />
    </label>
    <label htmlFor="designation">Designation:
      <select name="designation" id='designation' value={form.designation} onChange={handleChange}>
        <option value="">Select Designation</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select><br />
     </label>
      <label> Gender:
        <input type="radio" name="gender" value="Male" checked={form.gender === "Male"} onChange={handleChange} /> Male
        <input type="radio" name="gender" value="Female" checked={form.gender === "Female"} onChange={handleChange} /> Female
      </label><br />
      <label htmlFor="course">course:
      <label><input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA</label>
      <label><input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA</label>
      <label><input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC</label><br />
      </label>
      <input type="file" name="image" accept=".jpg,.jpeg,.png" onChange={handleChange} /><br /><br />

      <button type="submit" style={{padding:'10px' ,fontSize:'20px',width:'150px',border:'none',backgroundColor:"lightgreen"}}>Submit</button>
    </form>
    
    </div>
  )
}

export default AddEmployee