import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing'
import AboutUs from './components/AboutUs/AboutUs';
import Register from './components/Login/register'
import Login from './components/Login/Login'
import Home from './components/Home'
import './App.css'


function App() {
  

  return (
    <Router>
      <Routes>
   
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home:username" element={<Home />} />
        <Route path="*" element={<div>404</div>} />
        <Route path="/" element={<Landing />} />
        <Route path="/about-us" element={<AboutUs />} />
        </Routes>
    </Router>
  )
}

export default App
