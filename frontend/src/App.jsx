import React from 'react'
import {Route, Routes  } from "react-router-dom";
import { useSelector } from 'react-redux';
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Home from './components/Home/Home'
import './App.css'
import Display from './components/Pages/Display';
import AddSkill from './components/Pages/AddSkill'

const App = () => {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home />}/>
     <Route path='/login' element={<Login />}/>
     <Route path='/signup' element={<Signup />}/>
      <Route path='/display' element={<Display/>}/>
     <Route path='/addskill' element={<AddSkill/>} />
      <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
