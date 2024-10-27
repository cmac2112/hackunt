import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Login/Register'
import Login from './components/Login/LogIn'
import Home from './components/Home'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home:username" element={<Home />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  )
}

export default App
