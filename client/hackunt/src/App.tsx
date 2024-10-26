import { useState } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Login/register'
import Login from './components/Login/Login'
import Home from './components/Home'
import './App.css'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home:username" element={<Home />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
      <div className="text-red-800 text-8xl">tailwindstest</div>
      </>
  )
}

export default App
