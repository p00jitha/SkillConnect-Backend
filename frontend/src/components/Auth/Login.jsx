import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { authActions } from '../Store';

const Login = () => {
  const divStyle={
         display:'flex',
         justifyContent:'center',
         alignItems:'center',
         minHeight:'90vh',
        color:'white'
       }
       const loginStyle={
         width:'450px',
         height:'450px',
        display:'flex',
         flexDirection:'column',
         padding:'30px 25px 30px 25px',
         boxShadow:'5px 5px 5px 5px white'
      }
  const navigate = useNavigate(); 
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispath = useDispatch();
  const sendRequest = async () => {
    const res = await axios
      .post('http://localhost:5000/api/auth/login', {
        email: email,
        password: password
      })
      .catch((err) => {
        throw err.response.data.message;
      });

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
    sendRequest()
      .then((data) => 
      localStorage.setItem("userId",data.user._id))
      .then(() => dispath(authActions.login()))
      .then(()=>navigate('/display'))
}
catch (error) {
  console.error("Login Error:", error);
  toast.error(error); 
}
  };

  return (
    <>
     <div className='container'>
         <div className='container' style={divStyle}>
          <div className='box' style={loginStyle}>
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="form-outline mb-4"></div>
            <div className="form-outline mb-4"></div>
        <div className="form-outline mb-4">
             <label className="form-label" for="form2Example1">Email</label>
            <input type="email" id="form2Example1" className="form-control" placeholder='enter email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}  autoComplete="off" />
          </div>
          <div className="form-outline mb-4">
           <label className="form-label" for="form2Example2">Password</label>
           <input type="password" id="form2Example2" className="form-control" placeholder='enter password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
         </div>
         <button type="submit" className="btn btn-primary btn-block mb-4">Login</button>
           <div className="row mb-4">
           <div className="row">
             <p>Already Registered?<a href="/signup" style={{ color: 'white' }}>Signup</a></p>
           </div>
        </div>
            </form>
          </div>
         </div>
     </div>
    </>
  )
}

export default Login

