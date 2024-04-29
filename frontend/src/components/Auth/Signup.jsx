import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../Home/Header'

const Signup = () => {
  const divStyle={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    minHeight:'100vh',
    color:'blue'
  }
  const loginStyle={
    width:'500px',
    height:'650px',
    display:'flex',
    flexDirection:'column',
    padding:'30px 30px 30px 30px',
    boxShadow:'5px 5px 5px 5px blue'
  }
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneno: '',
        location: '',
        district: '',
        state: '',
        profilePic: null
      });
    
      const navigate = useNavigate(); 

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleFileChange = (e) => {
        setFormData({
          ...formData,
          profilePic: e.target.files[0]
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword, phoneno, location, district, state, profilePic } = formData;
    
        const formDatasend = new FormData();
        formDatasend.append('username', username);
        formDatasend.append('email', email);
        formDatasend.append('password', password);
        formDatasend.append('confirmPassword', confirmPassword);
        formDatasend.append('phoneno', phoneno);
        formDatasend.append('location', location);
        formDatasend.append('district', district);
        formDatasend.append('state', state);
        formDatasend.append('profilePic', profilePic);
    
        try {
          const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(()=>navigate('/login'))
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
  return (
    <>
    <Header/>
<div className='container'>
<div className='container' style={divStyle}>
        <div className='box' style={loginStyle}>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" >Email address</label>
            <input type="email"  className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} autoComplete="off" required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" >Username</label>
            <input type="text"  className="form-control" name="username" placeholder="Username" value={formData.username} onChange={handleChange} autoComplete="off" required />
          </div>
          <div style={{display:"flex",flexDirection:"row",gap:"50px"}}>
          <div className="form-outline mb-4">
            <label className="form-label" >Password</label>
            <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" >confirmPassword</label>
            <input type="password"  className="form-control" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          </div>
          <div style={{display:"flex",flexDirection:"row",gap:"50px"}}>
          <div className="form-outline mb-4">
            <label className="form-label" >Phone no:</label>
            <input type="text" name="phoneno" className="form-control"  placeholder="Phone Number" value={formData.phoneno} onChange={handleChange} required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" >City Name:</label>
            <input type="text" name="location" className="form-control" placeholder="City Name" value={formData.location} onChange={handleChange} required />
          </div>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" >Profile Pic:</label>
            <input type="file" name="profilePic" onChange={handleFileChange} required />
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
          <div className="row mb-4">
            <div className="row">
              <p>Already Registered?<a href="/login" style={{ color: 'blue' }}>Login</a></p>
            </div>
          </div>
        </form>
        </div>
        </div>
</div>
    </>
  )
}

export default Signup

{/* <div style={{display:"flex",flexDirection:"row",gap:"50px"}}>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example2">District</label>
            <input type="text" name="district" className="form-control" placeholder="District" value={formData.district} onChange={handleChange} required />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example2">State</label>
            <input type="text" name="state" className="form-control" placeholder="State" value={formData.state} onChange={handleChange} required />
          </div>
          </div>
 */}