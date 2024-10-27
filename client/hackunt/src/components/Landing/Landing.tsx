import Layout from '../Layout/Layout';

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
      <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-6xl font-bold">Nocturne</h1>
        <p className="mt-8 text-gray-400">Nocturne is an innovative web application designed to enhance your music listening experience. By leveraging spotify's API, the app provides personalized song recommendations, curated playlists, and interactive features that make discovering new music fun and engaging. 
          Whether you're looking to create custom playlists, explore trending tracks, or simply enjoy your favorite tunes, Nocturne offers a seamless and enjoyable user experience. Get started today and dive into a world of music tailored just for you!
        </p>
        <button className="mt-8 px-6 py-4 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-700">
          Get Started
        </button>
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/test">Home</Link>
    </Layout>
  );
};

export default Landing;
