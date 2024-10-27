import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Login'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'
import { LoginProvider } from './context/LoginContext'

function App() {
  

  return (
    <LoginProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home:username" element={<Home />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
    </LoginProvider>
  )
}

export default App
