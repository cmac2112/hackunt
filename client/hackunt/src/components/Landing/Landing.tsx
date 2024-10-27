import Layout from '../Layout/Layout';

const Landing = () => {
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
    </Layout>
  );
};

export default Landing;
