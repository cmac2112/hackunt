require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
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
//no data in database right now
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
//authentication
const port = 3000;
app.get('/hello', (req, res) => {
  res.send('Hello World');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});