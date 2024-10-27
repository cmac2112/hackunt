require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

const connectionConfig = {
  host: process.env.DB_HOST || "Cmac24",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || DB_USER,
  password: process.env.DB_PASSWORD || DB_password,
  database: process.env.DB_DATABASE || "unthack",
};

let con;

function connectWithRetry() {
  con = mysql.createConnection(connectionConfig);

  con.connect(function (err) {
    console.log("Connecting to MySQL");
    if (err) {
      console.log("error retrying");
      console.log("error when connecting to db:", err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    } else {
      console.log("Connected to MySQL");
    }

    con.query("SHOW TABLES", function (err, rows) {
      if (err) {
        console.log("error in query");
        console.log("error in query:", err);
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
      }
      console.log("Data received from Db:\n");
      console.log(rows);
    });
  });

  con.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      connectWithRetry(); // Reconnect on connection loss
    } else {
      throw err;
    }
  });
}
connectWithRetry();
const port = 3000;

const genresList = ['rock', 'pop', 'jazz', 'hip-hop', 'classical', 'country', 'electronic', 'reggae', 'blues', 'metal'];
const defaultSongs = [
  { title: 'Default Song 1', artist: 'Default Artist 1', genre: 'rock', link: 'https://www.youtube.com/' },
  { title: 'Default Song 2', artist: 'Default Artist 2', genre: 'pop', link: 'https://www.youtube.com/' },
  { title: 'Default Song 3', artist: 'Default Artist 3', genre: 'jazz', link: 'https://www.youtube.com/' }
];
//add security, screw auth0
//sad times call for sad measures, if there is time implement jwt
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = 'INSERT INTO users (username, password, genres, songs) VALUES (?, ?, ?, ?)';
  con.query(query, [username, hashedPassword, JSON.stringify(genresList), JSON.stringify(defaultSongs)], (err, result) => {
    if (err) {
      res.status(500).send('Error registering user');
      throw err;
    }
    res.status(200).send('User registered successfully');
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  con.query(query, [username], (err, results) => {
    if (err) {
      res.status(500).send('Error logging in');
      throw err;
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send('Invalid password');
    }

    res.status(200).send('Login successful');
  });
});

app.get('/api/songs/:username', (req, res) => {
  const { username } = req.params;

  const query = 'SELECT songs FROM users WHERE username = ?';
  con.query(query, [username], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching songs');
      throw err;
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    const userSongs = JSON.parse(results[0].songs);
    res.status(200).json(userSongs);
  });
});
app.get('/api/genres/:username', (req, res) => {
  const { username } = req.params;

  const query = 'SELECT genres FROM users WHERE username = ?';
  con.query(query, [username], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching songs');
      throw err;
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    const userSongs = JSON.parse(results[0].genres);
    res.status(200).json(userSongs);
  });
});
app.post(`/api/songs/:username`, (req, res) => {
  const { username } = req.params;
  const { title, artist, genre, link } = req.body;

  if (!title || !artist || !genre || !link) {
    return res.status(400).send('All fields are required');
  }

  const query = 'UPDATE users SET songs = JSON_ARRAY_APPEND(songs, "$", JSON_OBJECT("title", ?, "artist", ?, "genre", ?, "link", ?)) WHERE username = ?';
  con.query(query, [title, artist, genre, link, username], (err, result) => {
    if (err) {
      res.status(500).send('Error adding song');
      throw err;
    }
    res.status(200).send('Song added successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});