const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a User schema
const userSchema = new mongoose.Schema({
  sub: { type: String, unique: true, required: true },
  user: { type: String, required: true },
  songs: { type: Map, of: Object },
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Endpoint to store user
app.post('/api/store-user', async (req, res) => {
  const { sub, user } = req.body;

  if (!sub || !user) {
    return res.status(400).json({ message: 'Invalid user data' });
  }

  try {
    // Check if the user already exists
    let existingUser = await User.findOne({ sub });
    if (!existingUser) {
      // Create a new user if not exists
      existingUser = new User({ sub, user, songs: {} });
      await existingUser.save();
    }
    res.status(200).json({ message: 'User stored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error storing user', error });
  }
});

// Endpoint to add a song to a user
app.post('/api/add-song', async (req, res) => {
  const { sub, songName, songData } = req.body;

  if (!sub || !songName || !songData) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    // Find the user by sub
    const user = await User.findOne({ sub });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the song to the user's songs map
    user.songs.set(songName, songData);
    await user.save();

    res.status(200).json({ message: 'Song added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});