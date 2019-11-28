const mm = require('music-metadata');
const util = require('util')

require('dotenv').config()

const express = require('express');
const app = express();
const PORT = process.env.PORT;

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const jsonParser = bodyParser.json();

const mysql = require('mysql');
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use(express.static('./'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

app.get('/', (req, res) => {
  res.status(200);
  res.sendFile('../index.html')
})


//---PLAYLIST REQUESTS---//

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


app.post('/playlists', jsonParser, (req, res) => {
  let response = '';
  res.set('Content-Type', 'application/json');
  let plTitle = conn.escape(req.body.playlist);
  // console.log(plTitle);
  if (plTitle !== 'NULL') {
    conn.query(`INSERT INTO playlists(title) 
    VALUES (${plTitle});`, function (err, rows) {
      if (err) {
        console.log(err.toString());
      } else {
        console.log('Playlist added to DB');
        conn.query(`SELECT * FROM playlists
      ORDER BY id ASC;`, function (err, rows) {
          if (err) {
            console.log(err.toString());
          } else {
            response = rows;
            res.status(200);
            res.send(response);
          }
        })
      }
    })
  } else {
    res.status(400);
    response = { 'error': 'please provide a playlist name' };
    res.send(response);
  }
})

//delete request below uses the function isNaN() so it only runs the query if the param is a number. if it's anything else it responds with an error to the frontend
app.delete('/playlists/:id?', (req, res) => {
  res.set('Content-Type', 'application/json');
  let playlistID = parseInt(req.params.id);
  if (isNaN(playlistID) == false) {
    conn.query(`DELETE FROM playlists WHERE id = ${playlistID} AND rdonly != 1`, (err, rows) => {
      if (err) {
        console.log(err.toString());
      } else {
        if (rows.affectedRows > 0) {
          res.status(200);
          res.send({ 'success': `Playlist ${playlistID} successfully deleted` })
        } else {
          res.status(400);
          res.send({ 'error': `Couldn't delete the requested playlist. It might not exist or it's read-only` });
        }
      }
    })
  } else {
    res.status(400);
    res.send({ 'error': 'Please provide a playlist ID and make sure it\'s a number!' })
  }
})

//---TRACK REQUESTS---//

app.get('/playlist-tracks/:id?', (req, res) => {
  let playlistId = req.params.id;
  if (playlistId !== undefined) {
    conn.query(`SELECT * FROM tracks WHERE playlist_id = ${playlistId};`, function (err, rows) {
      if (err) {
        console.log(err.toString());
      } else {
        let tracks = []

        mm.parseFile(`${rows[0].src}`)
          .then(metadata => {
            let track = {
              'id': `${rows[0].track_id}`,
              'title': `${metadata.common.title}`,
              'artist': `${metadata.common.artist}`,
              'duration': `${metadata.format.duration}`,
              'src': `${rows[0].src}`
            }
            tracks.push(track);
            return tracks
          })
          .then(tracks => {
            res.status(200);
            res.set('Content-Type', 'application/json');
            res.send(tracks);
          })
          .catch(err => {
            console.error(err.message);
          });
          console.log(tracks);
      }
    });
  } else {
    conn.query(`SELECT * FROM tracks`, (err, rows) => {
      let tracks = '';
      if (err) {
        console.log(err.toString());
      } else {
        ;
      }
    })
  }
});