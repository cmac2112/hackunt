import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom'
import { useLogin } from '../../context/LoginContext';
import './Landing.css'; // Import the CSS file for custom animations

const Landing = () => {
  const { login, isLoggedIn } = useLogin();
  console.log('is logged in?', login);
  console.log('is logged in?', isLoggedIn);
  const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };
  useEffect(()=>{
    if(isMobile()){
      alert('We are not yet prepared for mobile traffic, please visit us on the web')
    }
  })
  return (
    <Layout>
      <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-6xl font-bold">Nocturne</h1>
        <svg className="animate-bounce w-6 h-6 mt-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
        <p className="mt-8 text-gray-400">
          Nocturne is an innovative web application designed to enhance your music listening experience. By leveraging Spotify's API, the app provides personalized song recommendations, curated playlists, and interactive features that make discovering new music fun and engaging. 
          Whether you're looking to create custom playlists, explore trending tracks, or simply enjoy your favorite tunes, Nocturne offers a seamless and enjoyable user experience. Get started today and dive into a world of music tailored just for you!
        </p>
        <Link to='/home' className="mt-8 px-6 py-4 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-700 animate-pulse">Get Started
        </Link>
        <h2 className="mt-8 text-6xl font-bold">Why use Nocturne?</h2>  
        <div className="mt-8 flex flex-col items-center space-y-8">
          <div className="flex space-x-16">
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-blue-950 text-center text-lg p-4 shadow-lg float-animation">
              <span className="font-semibold">Personalized Music Recommendations</span>
            </div>
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-blue-950 text-center text-lg p-4 shadow-lg float-animation">
              <span className="font-semibold">Interactive Features</span>
            </div>
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-blue-950 text-center text-lg p-4 shadow-lg float-animation">
              <span className="font-semibold">Community & Sharing</span>
            </div>
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-blue-950 text-center text-lg p-4 shadow-lg float-animation">
              <span className="font-semibold">Enhanced Listening Experience</span>
            </div>
          </div>
          <div className="flex space-x-16 text-center text-gray-400">
            <div className="w-48">
              <p>Get song suggestions tailored to your taste, ensuring you always discover new music that you'll love.</p>
            </div>
            <div className="w-48">
              <p>Engage with features that enhance your music experience, such as custom playlists and trending tracks.</p>
            </div>
            <div className="w-48">
              <p>Connect with other music lovers, share your favorite tracks, and discover what others are listening to.</p>
            </div>
            <div className="w-48">
              <p>Enjoy a seamless and enjoyable user experience with features designed to enhance your music listening.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
