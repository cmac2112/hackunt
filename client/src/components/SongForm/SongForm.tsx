import React, { useState } from 'react';
import axios from 'axios';
import { useLogin } from '../../context/LoginContext';

interface SongFormProps {
  onClose: () => void;
  onSongAdded: () => void;
}

const SongForm: React.FC<SongFormProps> = ({ onClose, onSongAdded }) => {
    const { username } = useLogin();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/songs/${username}`, {
        title,
        artist,
        genre,
        link,
      });

      if (response.status === 200) {
        onClose(); // Close the form on successful submission
        onSongAdded(); // Refresh the song list
      }
    } catch (err) {
      setError('Failed to add song');
    }
  };

  return (
    <div className="fixed top-0 left-0 w- bg-gray-800 p-4 z-50">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded"
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="p-2 rounded"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-2 rounded"
        />
        <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className='p-2 rounded'
        />
        <button type="submit" className="bg-blue-500 p-2 rounded">
          Add Song
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <button onClick={onClose} className="bg-red-500 p-2 rounded">Cancel</button>
      </form>
      
    </div>
  );
};

export default SongForm;