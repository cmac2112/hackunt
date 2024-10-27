import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { isAuthenticated, user, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  interface Album {
    album: {
      id: string;
      name: string;
      images: { url: string }[];
    };
  }

  const [albums, setAlbums] = useState<Album[]>([]);
  console.log(user);
  useEffect(() => {
    if (isAuthenticated && user) {
      // Send the unique identifier to the backend
      fetch('http://localhost:3000/api/store-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sub: user.sub, user: user.nickname }),
      })
      .then(response => response.json())
      .then(data => console.log('User stored:', data))
      .catch(error => console.error('Error storing user:', error));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://api.spotify.com/v1',
            scope: 'user-library-read',
          },
        });

        const response = await fetch('https://api.spotify.com/v1/me/albums', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setAlbums(data.items);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    if (isAuthenticated) {
      fetchAlbums();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => loginWithRedirect()}>
          Login with Spotify
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <img src={user?.picture} alt="Profile" />
      <h2>Your Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.album.id}>
            <img src={album.album.images[0].url} alt={album.album.name} width="50" />
            {album.album.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;