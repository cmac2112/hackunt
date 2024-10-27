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

const con = mysql.createConnection(connectionConfig);

con.connect(function(err){
    if (err) throw err;
    console.log('connected to mysql, database:' + connectionConfig.database);

})
con.query('DROP DATABASE IF EXISTS unthack', function(err, result){
    if (err) throw err;
    console.log('Database dropped');
})
con.query("CREATE DATABASE IF NOT EXISTS unthack", function(err, result){
    if (err) throw err;
    console.log('Database created');
})
con.query("USE unthack", function(err, result){
    if (err) throw err;
    console.log('Using jobSite database');
})

con.query(`
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255),
    songs MEDIUMTEXT,
    genres MEDIUMTEXT)`, function(err, res){
        if(err)
            throw err;
        console.log("table created")
        
    })

    const users = [
        {
          username: 'user1',
          password: 'password1',
          songs: JSON.stringify([
            { title: 'Song 1', artist: 'Artist 1', genre: 'rock' },
            { title: 'Song 2', artist: 'Artist 2', genre: 'country' }
          ])
        },
        {
          username: 'user2',
          password: 'password2',
          songs: JSON.stringify([
            { title: 'Song 3', artist: 'Artist 3', genre: 'pop' },
            { title: 'Song 4', artist: 'Artist 4', genre: 'country' }
          ])
        },
        {
          username: 'user3',
          password: 'password3',
          songs: JSON.stringify([
            { title: 'Song 5', artist: 'Artist 5', genre: 'rock' },
            { title: 'Song 6', artist: 'Artist 6', genre: 'pop' }
          ])
        }
      ];
      users.forEach(user => {
        const query = `
          INSERT INTO users (username, password, songs)
          VALUES ('${user.username}', '${user.password}', '${user.songs}')
        `;
        con.query(query, function(err, result) {
          if (err) throw err;
          console.log('User inserted');
        });
      });