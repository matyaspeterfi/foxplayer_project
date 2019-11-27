'use strict';

import { getPlaylists } from './controllers/getPlaylists.js'

//---AJAX Calls---//

getPlaylists();




//---audio control related stuff---//

let audioPlayer = document.getElementById('player');
let playPauseButton = document.getElementById('playButton');
let progressBar = document.getElementById('progressBar');

const playAudio = () => {
  audioPlayer.play();
  playPauseButton.setAttribute('src', './assets/img/pause.svg')
}

const pauseAudio = () => {
  audioPlayer.pause();
  playPauseButton.setAttribute('src', 'assets/img/play.svg')
}

function seek(event) {
  var percent = event.offsetX / this.offsetWidth;
  player.currentTime = percent * player.duration;
  progressBar.value = percent / 100;
  console.log("Progress seek clicked")
}

playPauseButton.addEventListener('click', () => {
  if (audioPlayer.paused == true) {
    playAudio()
  } else {
    pauseAudio();
  }
  console.log('Play/Pause button clicked')
})

audioPlayer.addEventListener('timeupdate', () => {
  progressBar.setAttribute('value', `${audioPlayer.currentTime / audioPlayer.duration}`)
});

progressBar.addEventListener('click', seek);