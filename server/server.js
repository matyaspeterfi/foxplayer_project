require('dotenv').config()

const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.static('./'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

app.get('/', (req, res) => {
  res.status(200);
  res.sendFile('../index.html')
})

app.get('/playlists', (req, res) => {

  conn.query('SELECT * FROM playlists', function (err, rows) {
    if (err) {
      console.log(err.tosTring());
    } else {
      console.log('Playlists data received from DB\n');
      let playlists = rows;
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.send(playlists);
    }
  })
});

app.get('/playlist-tracks/:id?', (req, res) => {

  if (req.params.id !== 'undefined') {
    let playlistId = req.params.id;
    conn.query(`SELECT * FROM tracks WHERE playlist_id = ${playlistId};`, function (err, rows) {
      if (err) {
        console.log(err.toSTring());
      } else {
        let tracks = rows;
        console.log(`Tracks data for playlist ${playlistId} received from DB\n`);
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(tracks);
      }
    });
  } else {
    console.log('Please provide a playlist ID');
  }
});