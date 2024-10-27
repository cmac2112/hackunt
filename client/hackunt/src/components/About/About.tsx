import React from 'react';
import Layout from '../Layout/Layout';

const AboutUs = () => {
  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center">About Us</h1>
        <p className="mt-4 text-center text-gray-400">
          Welcome to My Music App! We are dedicated to providing you with the best music experience possible. Our app allows you to discover new music, create personalized playlists, and enjoy your favorite tunes anytime, anywhere.
        </p>
        <p className="mt-4 text-center text-gray-400">
          Our mission is to connect people through music and make it easy for everyone to find and enjoy the songs they love. Thank you for being a part of our community!
        </p>
      </div>
    </Layout>
  );
};

export default AboutUs;
