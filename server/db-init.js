require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))


//sad times call for sad measures, sql it is
const connectionConfig = {
  host: process.env.DB_HOST || "Cmac24",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || DB_USER,
  password: process.env.DB_PASSWORD || DB_password,
  database: process.env.DB_DATABASE || "unthack",
};

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

    const hashedPassword1 = bcrypt.hashSync('password1', 8);
    const hashedPassword2 = bcrypt.hashSync('password2', 8);
    const hashedPassword3 = bcrypt.hashSync('password3', 8);
    
    const users = [
      {
        username: 'user1',
        password: hashedPassword1,
        songs: JSON.stringify([
          { title: 'Song 1', artist: 'Artist 1', genre: 'rock', link: 'https://www.youtube.com/watch?v=link1' },
      { title: 'Song 2', artist: 'Artist 2', genre: 'country', link: 'https://www.youtube.com/watch?v=link2' },
      { title: 'Song 3', artist: 'Artist 3', genre: 'pop', link: 'https://www.youtube.com/watch?v=link3' },
      { title: 'Song 4', artist: 'Artist 4', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link4' },
      { title: 'Song 5', artist: 'Artist 5', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link5' },
      { title: 'Song 6', artist: 'Artist 6', genre: 'classical', link: 'https://www.youtube.com/watch?v=link6' },
      { title: 'Song 7', artist: 'Artist 7', genre: 'rock', link: 'https://www.youtube.com/watch?v=link7' },
      { title: 'Song 8', artist: 'Artist 8', genre: 'country', link: 'https://www.youtube.com/watch?v=link8' },
      { title: 'Song 9', artist: 'Artist 9', genre: 'pop', link: 'https://www.youtube.com/watch?v=link9' },
      { title: 'Song 10', artist: 'Artist 10', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link10' },
      { title: 'Song 11', artist: 'Artist 11', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link11' },
      { title: 'Song 12', artist: 'Artist 12', genre: 'classical', link: 'https://www.youtube.com/watch?v=link12' },
      { title: 'Song 13', artist: 'Artist 13', genre: 'rock', link: 'https://www.youtube.com/watch?v=link13' },
      { title: 'Song 14', artist: 'Artist 14', genre: 'country', link: 'https://www.youtube.com/watch?v=link14' },
      { title: 'Song 15', artist: 'Artist 15', genre: 'pop', link: 'https://www.youtube.com/watch?v=link15' },
      { title: 'Song 16', artist: 'Artist 16', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link16' },
      { title: 'Song 17', artist: 'Artist 17', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link17' },
      { title: 'Song 18', artist: 'Artist 18', genre: 'classical', link: 'https://www.youtube.com/watch?v=link18' },
      { title: 'Song 19', artist: 'Artist 19', genre: 'rock', link: 'https://www.youtube.com/watch?v=link19' },
      { title: 'Song 20', artist: 'Artist 20', genre: 'country', link: 'https://www.youtube.com/watch?v=link20' },
      { title: 'Song 21', artist: 'Artist 21', genre: 'pop', link: 'https://www.youtube.com/watch?v=link21' },
      { title: 'Song 22', artist: 'Artist 22', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link22' },
      { title: 'Song 23', artist: 'Artist 23', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link23' },
      { title: 'Song 24', artist: 'Artist 24', genre: 'classical', link: 'https://www.youtube.com/watch?v=link24' },
      { title: 'Song 25', artist: 'Artist 25', genre: 'rock', link: 'https://www.youtube.com/watch?v=link25' },
      { title: 'Song 26', artist: 'Artist 26', genre: 'country', link: 'https://www.youtube.com/watch?v=link26' },
      { title: 'Song 27', artist: 'Artist 27', genre: 'pop', link: 'https://www.youtube.com/watch?v=link27' },
      { title: 'Song 28', artist: 'Artist 28', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link28' },
      { title: 'Song 29', artist: 'Artist 29', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link29' },
      { title: 'Song 30', artist: 'Artist 30', genre: 'classical', link: 'https://www.youtube.com/watch?v=link30' },
      { title: 'Song 1', artist: 'Artist 1', genre: 'rock', link: 'https://www.youtube.com/watch?v=link1' },
      { title: 'Song 2', artist: 'Artist 2', genre: 'country', link: 'https://www.youtube.com/watch?v=link2' },
      { title: 'Song 3', artist: 'Artist 3', genre: 'pop', link: 'https://www.youtube.com/watch?v=link3' },
      { title: 'Song 4', artist: 'Artist 4', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link4' },
      { title: 'Song 5', artist: 'Artist 5', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link5' },
      { title: 'Song 6', artist: 'Artist 6', genre: 'classical', link: 'https://www.youtube.com/watch?v=link6' },
      { title: 'Song 7', artist: 'Artist 7', genre: 'rock', link: 'https://www.youtube.com/watch?v=link7' },
      { title: 'Song 8', artist: 'Artist 8', genre: 'country', link: 'https://www.youtube.com/watch?v=link8' },
      { title: 'Song 9', artist: 'Artist 9', genre: 'pop', link: 'https://www.youtube.com/watch?v=link9' },
      { title: 'Song 10', artist: 'Artist 10', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link10' },
      { title: 'Song 11', artist: 'Artist 11', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link11' },
      { title: 'Song 12', artist: 'Artist 12', genre: 'classical', link: 'https://www.youtube.com/watch?v=link12' },
      { title: 'Song 13', artist: 'Artist 13', genre: 'rock', link: 'https://www.youtube.com/watch?v=link13' },
      { title: 'Song 14', artist: 'Artist 14', genre: 'country', link: 'https://www.youtube.com/watch?v=link14' },
      { title: 'Song 15', artist: 'Artist 15', genre: 'pop', link: 'https://www.youtube.com/watch?v=link15' },
      { title: 'Song 16', artist: 'Artist 16', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link16' },
      { title: 'Song 17', artist: 'Artist 17', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link17' },
      { title: 'Song 18', artist: 'Artist 18', genre: 'classical', link: 'https://www.youtube.com/watch?v=link18' },
      { title: 'Song 19', artist: 'Artist 19', genre: 'rock', link: 'https://www.youtube.com/watch?v=link19' },
      { title: 'Song 20', artist: 'Artist 20', genre: 'country', link: 'https://www.youtube.com/watch?v=link20' },
      { title: 'Song 21', artist: 'Artist 21', genre: 'pop', link: 'https://www.youtube.com/watch?v=link21' },
      { title: 'Song 22', artist: 'Artist 22', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link22' },
      { title: 'Song 23', artist: 'Artist 23', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link23' },
      { title: 'Song 24', artist: 'Artist 24', genre: 'classical', link: 'https://www.youtube.com/watch?v=link24' },
      { title: 'Song 25', artist: 'Artist 25', genre: 'rock', link: 'https://www.youtube.com/watch?v=link25' },
      { title: 'Song 26', artist: 'Artist 26', genre: 'country', link: 'https://www.youtube.com/watch?v=link26' },
      { title: 'Song 27', artist: 'Artist 27', genre: 'pop', link: 'https://www.youtube.com/watch?v=link27' },
      { title: 'Song 28', artist: 'Artist 28', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link28' },
      { title: 'Song 29', artist: 'Artist 29', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link29' },
      { title: 'Song 30', artist: 'Artist 30', genre: 'classical', link: 'https://www.youtube.com/watch?v=link30' },
      { title: 'Song 1', artist: 'Artist 1', genre: 'rock', link: 'https://www.youtube.com/watch?v=link1' },
      { title: 'Song 2', artist: 'Artist 2', genre: 'country', link: 'https://www.youtube.com/watch?v=link2' },
      { title: 'Song 3', artist: 'Artist 3', genre: 'pop', link: 'https://www.youtube.com/watch?v=link3' },
      { title: 'Song 4', artist: 'Artist 4', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link4' },
      { title: 'Song 5', artist: 'Artist 5', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link5' },
      { title: 'Song 6', artist: 'Artist 6', genre: 'classical', link: 'https://www.youtube.com/watch?v=link6' },
      { title: 'Song 7', artist: 'Artist 7', genre: 'rock', link: 'https://www.youtube.com/watch?v=link7' },
      { title: 'Song 8', artist: 'Artist 8', genre: 'country', link: 'https://www.youtube.com/watch?v=link8' },
      { title: 'Song 9', artist: 'Artist 9', genre: 'pop', link: 'https://www.youtube.com/watch?v=link9' },
      { title: 'Song 10', artist: 'Artist 10', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link10' },
      { title: 'Song 11', artist: 'Artist 11', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link11' },
      { title: 'Song 12', artist: 'Artist 12', genre: 'classical', link: 'https://www.youtube.com/watch?v=link12' },
      { title: 'Song 13', artist: 'Artist 13', genre: 'rock', link: 'https://www.youtube.com/watch?v=link13' },
      { title: 'Song 14', artist: 'Artist 14', genre: 'country', link: 'https://www.youtube.com/watch?v=link14' },
      { title: 'Song 15', artist: 'Artist 15', genre: 'pop', link: 'https://www.youtube.com/watch?v=link15' },
      { title: 'Song 16', artist: 'Artist 16', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link16' },
      { title: 'Song 17', artist: 'Artist 17', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link17' },
      { title: 'Song 18', artist: 'Artist 18', genre: 'classical', link: 'https://www.youtube.com/watch?v=link18' },
      { title: 'Song 19', artist: 'Artist 19', genre: 'rock', link: 'https://www.youtube.com/watch?v=link19' },
      { title: 'Song 20', artist: 'Artist 20', genre: 'country', link: 'https://www.youtube.com/watch?v=link20' },
      { title: 'Song 21', artist: 'Artist 21', genre: 'pop', link: 'https://www.youtube.com/watch?v=link21' },
      { title: 'Song 22', artist: 'Artist 22', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link22' },
      { title: 'Song 23', artist: 'Artist 23', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link23' },
      { title: 'Song 24', artist: 'Artist 24', genre: 'classical', link: 'https://www.youtube.com/watch?v=link24' },
      { title: 'Song 25', artist: 'Artist 25', genre: 'rock', link: 'https://www.youtube.com/watch?v=link25' },
      { title: 'Song 26', artist: 'Artist 26', genre: 'country', link: 'https://www.youtube.com/watch?v=link26' },
      { title: 'Song 27', artist: 'Artist 27', genre: 'pop', link: 'https://www.youtube.com/watch?v=link27' },
      { title: 'Song 28', artist: 'Artist 28', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link28' },
      { title: 'Song 29', artist: 'Artist 29', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link29' },
      { title: 'Song 30', artist: 'Artist 30', genre: 'classical', link: 'https://www.youtube.com/watch?v=link30' },
      { title: 'Song 1', artist: 'Artist 1', genre: 'rock', link: 'https://www.youtube.com/watch?v=link1' },
      { title: 'Song 2', artist: 'Artist 2', genre: 'country', link: 'https://www.youtube.com/watch?v=link2' },
      { title: 'Song 3', artist: 'Artist 3', genre: 'pop', link: 'https://www.youtube.com/watch?v=link3' },
      { title: 'Song 4', artist: 'Artist 4', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link4' },
      { title: 'Song 5', artist: 'Artist 5', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link5' },
      { title: 'Song 6', artist: 'Artist 6', genre: 'classical', link: 'https://www.youtube.com/watch?v=link6' },
      { title: 'Song 7', artist: 'Artist 7', genre: 'rock', link: 'https://www.youtube.com/watch?v=link7' },
      { title: 'Song 8', artist: 'Artist 8', genre: 'country', link: 'https://www.youtube.com/watch?v=link8' },
      { title: 'Song 9', artist: 'Artist 9', genre: 'pop', link: 'https://www.youtube.com/watch?v=link9' },
      { title: 'Song 10', artist: 'Artist 10', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link10' },
      { title: 'Song 11', artist: 'Artist 11', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link11' },
      { title: 'Song 12', artist: 'Artist 12', genre: 'classical', link: 'https://www.youtube.com/watch?v=link12' },
      { title: 'Song 13', artist: 'Artist 13', genre: 'rock', link: 'https://www.youtube.com/watch?v=link13' },
      { title: 'Song 14', artist: 'Artist 14', genre: 'country', link: 'https://www.youtube.com/watch?v=link14' },
      { title: 'Song 15', artist: 'Artist 15', genre: 'pop', link: 'https://www.youtube.com/watch?v=link15' },
      { title: 'Song 16', artist: 'Artist 16', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link16' },
      { title: 'Song 17', artist: 'Artist 17', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link17' },
      { title: 'Song 18', artist: 'Artist 18', genre: 'classical', link: 'https://www.youtube.com/watch?v=link18' },
      { title: 'Song 19', artist: 'Artist 19', genre: 'rock', link: 'https://www.youtube.com/watch?v=link19' },
      { title: 'Song 20', artist: 'Artist 20', genre: 'country', link: 'https://www.youtube.com/watch?v=link20' },
      { title: 'Song 21', artist: 'Artist 21', genre: 'pop', link: 'https://www.youtube.com/watch?v=link21' },
      { title: 'Song 22', artist: 'Artist 22', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link22' },
      { title: 'Song 23', artist: 'Artist 23', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link23' },
      { title: 'Song 24', artist: 'Artist 24', genre: 'classical', link: 'https://www.youtube.com/watch?v=link24' },
      { title: 'Song 25', artist: 'Artist 25', genre: 'rock', link: 'https://www.youtube.com/watch?v=link25' },
      { title: 'Song 26', artist: 'Artist 26', genre: 'country', link: 'https://www.youtube.com/watch?v=link26' },
      { title: 'Song 27', artist: 'Artist 27', genre: 'pop', link: 'https://www.youtube.com/watch?v=link27' },
      { title: 'Song 28', artist: 'Artist 28', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link28' },
      { title: 'Song 29', artist: 'Artist 29', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link29' },
      { title: 'Song 30', artist: 'Artist 30', genre: 'classical', link: 'https://www.youtube.com/watch?v=link30' }
    ]),
    genres: JSON.stringify([
      'rock', 'country', 'pop', 'jazz', 'hip-hop', 'classical'
    ])
  },
      {
        username: 'user2',
        password: hashedPassword2,
        songs: JSON.stringify([
          { title: 'Song 3', artist: 'Artist 3', genre: 'pop', link: 'https://www.youtube.com/watch?v=link3' },
          { title: 'Song 4', artist: 'Artist 4', genre: 'country', link: 'https://www.youtube.com/watch?v=link4' }
        ]),
        genres: JSON.stringify([
          'pop', 'country'
        ])
      },
      {
        username: 'user3',
        password: hashedPassword3,
        songs: JSON.stringify([
          { title: 'Song 5', artist: 'Artist 5', genre: 'hip-hop', link: 'https://www.youtube.com/watch?v=link5' },
          { title: 'Song 6', artist: 'Artist 6', genre: 'jazz', link: 'https://www.youtube.com/watch?v=link6' }
        ]),
        genres: JSON.stringify([
          'hip-hop', 'jazz'
        ])
      }
    ];
    
    users.forEach(user => {
      const query = `
        INSERT INTO users (username, password, songs, genres)
        VALUES (?, ?, ?, ?)
      `;
      con.query(query, [user.username, user.password, user.songs, user.genres], function(err, result) {
        if (err) throw err;
        console.log('User inserted');
      });
    });