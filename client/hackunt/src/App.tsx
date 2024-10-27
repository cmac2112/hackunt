import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Login from './components/ThePleaseUseAnyOtherMethodAuth/Login'
import Register from './components/ThePleaseUseAnyOtherMethodAuth/Register'
// @ts-ignore
import Home from './components/Home' //must be jsx file
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
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
    </LoginProvider>
  )
}

export default App
