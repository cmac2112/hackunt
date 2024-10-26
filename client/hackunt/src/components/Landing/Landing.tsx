import React from 'react'
import Layout from '../Layout/Layout'
import { useAuth0 } from '@auth0/auth0-react'
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
    </Layout>
    
  )
}

export default Landing