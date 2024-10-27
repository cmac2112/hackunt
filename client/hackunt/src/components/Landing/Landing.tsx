import React from 'react'
import Layout from '../Layout/Layout'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
const Landing = () => {
  const { loginWithRedirect, logout } = useAuth0()
  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleLogout = async () => {
    try{
      await logout({
        logoutParams: { returnTo: window.location.origin }
      })
    }catch(error){
      console.error("Logout failed:", error);
    }
  }
  return (
    <Layout>
      <div>Landing</div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/test">Home</Link>
    </Layout>
    
  )
}

export default Landing