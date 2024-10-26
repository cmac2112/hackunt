import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <img src={user?.picture} alt="Profile" />
    </div>
  );
};

export default Home