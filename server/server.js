const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('./'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

app.get('/', (req, res) => {
  res.status(200);
  res.sendFile('../index.html')
})

app.get('/playlists', (req, res) => {

  res.status(200);
  res.set('Content-Type', 'application/json');
  res.send([
    { "id": 1, "title": "Favorites", "system": 1 },
    { "id": 2, "title": "Music for programming", "system": 0 },
    { "id": 3, "title": "Driving", "system": 0 },
    { "id": 5, "title": "Fox house", "system": 0 },
  ])

});

app.get('/playlist-tracks/:id?', (req, res) => {

  res.status(200);
  res.set('Content-Type', 'application/json');
  res.send(
    [
      { "id": 21, "title": "Halahula", "artist": "Untitled artist", "duration": 545, "path": "c:/music/halahula.mp3" },
      { "id": 412, "title": "No sleep till Brooklyn", "artist": "Beastie Boys", "duration": 312.12, "path": "c:/music/beastie boys/No sleep till Brooklyn.mp3" }
    ]
  )

});