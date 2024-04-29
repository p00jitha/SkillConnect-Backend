import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../Home/Header';
import { useDispatch } from 'react-redux'
import { authActions } from '../Store';
import { useNavigate } from "react-router-dom";

const PostSkill = () => {
  const divStyle={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    minHeight:'90vh',
   color:'blue'
  }
  const loginStyle={
    width:'450px',
    height:'450px',
   display:'flex',
    flexDirection:'column',
    padding:'30px 25px 30px 25px',
    boxShadow:'5px 5px 5px 5px blue'
 }
 const navigate = useNavigate(); 
 const dispath = useDispatch();
  const [formData, setFormData] = useState({
    userId: '',
    skillName: '',
    description: '',
    credentialsphoto: null
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log(userId)
    if (userId) {
      setFormData({ ...formData, userId });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      credentialsphoto: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append('userId', formData.userId);
    postData.append('skillName', formData.skillName);
    postData.append('description', formData.description);
    postData.append('credentials', formData.credentialsphoto);

    try {
      const response = await axios.post('http://localhost:5000/api/skill/skills', postData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => dispath(authActions.login()))
      .then(()=>navigate('/display'))
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <>
   <Header/>
   <div className='container'>
         <div className='container' style={divStyle}>
          <div className='box' style={loginStyle}>
            <form onSubmit={handleSubmit}>
            <h1>ADD SKILLS</h1>
            <div className="form-outline mb-4"></div>
            <div className="form-outline mb-4"></div>
        <div className="form-outline mb-4">
             <label className="form-label" for="form2Example1">SkillName</label>
            <input type="text" name="skillName" className="form-control" placeholder="Skill Name"   value={formData.skillName} onChange={handleChange}  required />
          </div>
          <div className="form-outline mb-4">
           <label className="form-label" for="form2Example2">Description</label>
           <textarea name="description" className="form-control" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
         </div>
         <div className="form-outline mb-4">
           <label className="form-label" for="form2Example2">Credentials</label>
           <input type="file" name="credentials"  onChange={handleFileChange} required />
         </div>
         <button type="submit" className="btn btn-primary btn-block mb-4">Post Skill</button>
            </form>
          </div>
         </div>
     </div>
   </>
  );
}

export default PostSkill;

