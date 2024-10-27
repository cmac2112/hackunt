//import React from 'react';
import Layout from '../Layout/Layout';
import './AboutUs.css'; // Import the CSS file for custom animations

const AboutUs = () => {
  return (
    <Layout>
      <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-6xl font-bold animate-fade-in">About Us</h1>
        <p className="mt-8 text-gray-400 max-w-2xl text-center animate-slide-in">
          Welcome to Nocturne! We are dedicated to enhancing your music listening experience through personalized recommendations, curated playlists, and interactive features. Our mission is to make discovering new music fun and engaging for everyone.
        </p>
        
        <div className="mt-12 flex flex-col items-center space-y-8">
          <div className="w-full max-w-4xl flex flex-col md:flex-row md:space-x-8">
            <div className="flex-1 bg-white text-blue-950 p-6 rounded-lg shadow-lg animate-bounce-in">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p>
                Our mission is to revolutionize the way you discover and enjoy music. We believe in the power of music to bring people together and enhance everyday moments.
              </p>
            </div>
            <div className="flex-1 bg-white text-blue-950 p-6 rounded-lg shadow-lg mt-8 md:mt-0 animate-bounce-in">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p>
                We envision a world where everyone has access to the music they love, and where discovering new tunes is a seamless and enjoyable experience.
              </p>
            </div>
          </div>
          
          <div className="w-full max-w-4xl flex flex-col md:flex-row md:space-x-8 mt-8">
            <div className="flex-1 bg-white text-blue-950 p-6 rounded-lg shadow-lg animate-bounce-in">
              <h2 className="text-2xl font-bold mb-4">Our Team</h2>
              <p>
                Our team is composed of passionate music lovers, tech enthusiasts, and creative minds dedicated to bringing you the best music experience possible.
              </p>
            </div>
            <div className="flex-1 bg-white text-blue-950 p-6 rounded-lg shadow-lg mt-8 md:mt-0 animate-bounce-in">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>
                Have questions or feedback? Reach out to us at <a href="mailto:contact@nocturne.com" className="text-blue-500 hover:underline">contact@nocturne.com</a> or follow us on social media.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
