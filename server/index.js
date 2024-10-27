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
app.get('/hello', (req, res) => {
  res.send('Hello World');
});

//add security, screw auth0
//sad times call for sad measures, if there is time implement jwt
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  con.query(query, [username, hashedPassword], (err, result) => {
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});