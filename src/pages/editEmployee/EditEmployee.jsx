import React, { useEffect, useState } from 'react';
import {axiosClient} from "../../utils/axiosClient";
import { useParams, useNavigate } from 'react-router-dom';
import "./EditEmployee.css"

function EditEmployee() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: [],
    f_Image: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

 
  useEffect(() => {
    axiosClient.get(`/employee/${id}`)
      .then(res => {
        const emp = res.data;
        
        setForm({
          f_Name: emp.f_Name,
          f_Email: emp.f_Email,
          f_Mobile: emp.f_Mobile,
          f_Designation: emp.f_Designation,
          f_gender: emp.f_gender,
          f_Course: emp.f_Course,
          f_Image: null,
        });
        setPreview(emp.f_Image); 
      })
      .catch(err => console.error(err));
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      let updatedCourses = [...form.f_Course];
      if (checked) updatedCourses.push(value);
      else updatedCourses = updatedCourses.filter(course => course !== value);
      setForm({ ...form, f_Course: updatedCourses });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];   
    setForm({ ...form, f_Image: file });  
    setPreview(URL.createObjectURL(file))
  };

  
  const validate = () => {
    const err = {};
    if (!form.f_Name) err.f_Name = 'Name is required';
    if (!form.f_Email || !/\S+@\S+\.\S+/.test(form.f_Email)) err.f_Email = 'Valid email required';
    if (!form.f_Mobile || !/^\d{10}$/.test(form.f_Mobile)) err.f_Mobile = 'Valid 10-digit mobile required';
    if (!form.f_Designation) err.f_Designation = 'Select designation';
    if (!form.f_gender) err.f_gender = 'Select gender';
    if (form.f_Course.length === 0) err.f_Course = 'Select at least one course';
    return err;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const data = new FormData();
      data.append('f_Name', form.f_Name);
      data.append('f_Email', form.f_Email);
      data.append('f_Mobile', form.f_Mobile);
      data.append('f_Designation', form.f_Designation);
      data.append('f_gender', form.f_gender);
      data.append('f_Course', JSON.stringify(form.f_Course));
      if (form.f_Image) data.append('f_Image', form.f_Image);

      try {
        await axiosClient.put(`/employee/edit/${id}`, data);
        alert("Employee Updated Successfully");
        navigate('/employee-list');
      } catch (err) {
        console.error(err);
        alert("Update failed");
      }
    }
  };
  return (    
     <div>      
      <h2 className='heading'>Edit Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className='editContainer flex'>
        <label >Name: <input type="text" name="f_Name" value={form.f_Name} onChange={handleChange} /></label>
        {errors.f_Name && <p>{errors.f_Name}</p>}

        <label>Email: <input type="email" name="f_Email" value={form.f_Email} onChange={handleChange} /></label>
        {errors.f_Email && <p>{errors.f_Email}</p>}

        <label>Mobile: <input type="text" name="f_Mobile" value={form.f_Mobile} onChange={handleChange} /></label>
        {errors.f_Mobile && <p>{errors.f_Mobile}</p>}

        <label>Designation:
          <select name="f_Designation" value={form.f_Designation} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </label>
        {errors.f_Designation && <p>{errors.f_Designation}</p>}

        <label>Gender:
          <input type="radio" name="f_gender" value="Male" checked={form.f_gender === "Male"} onChange={handleChange} /> Male
          <input type="radio" name="f_gender" value="Female" checked={form.f_gender === "Female"} onChange={handleChange} /> Female
        </label>
        {errors.f_gender && <p>{errors.f_gender}</p>}

        <label>Course:
          <input type="checkbox" value="MCA" checked={form.f_Course.includes("MCA")} onChange={handleChange} /> MCA
          <input type="checkbox" value="BCA" checked={form.f_Course.includes("BCA")} onChange={handleChange} /> BCA
          <input type="checkbox" value="BSC" checked={form.f_Course.includes("BSC")} onChange={handleChange} /> BSC
        </label>
        {errors.f_Course && <p>{errors.f_Course}</p>}

        <label>Upload Image:
          <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
        </label>
        
        {preview ? (
            preview.startsWith("blob:")
              ? <img src={preview} alt="preview" width="40" />
              : <img src={`http://localhost:3001/uploads/${preview}`} alt="preview" width="40" />
          ) : null}
        <button type="submit" className='updateButton'>Update</button>
      </form>
    </div>
  )
}

export default EditEmployee