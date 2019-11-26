'use strict';
//---Render responses into HTML ---//

let renderPlaylists = (input) => {

  for (let i = 0; i < input.length; i++) {
    let playlistCont = document.querySelector('.playlistsCont');

    let playlistItem = document.createElement('div');
    playlistItem.setAttribute('class', `playlistItem ${input[i].id}`);
    
    let playlistTitle = document.createElement('p');
    playlistTitle.setAttribute('class', 'playlistTitle');
    playlistTitle.innerText = input[i].title;
    
    playlistItem.appendChild(playlistTitle);
    playlistCont.appendChild(playlistItem);

    if(input[i].system == 0){
      let deleteButton = document.createElement('img');
      deleteButton.setAttribute('class', 'deletePL');
      deleteButton.setAttribute('src', '/assets/img/deletePL.svg');
      playlistItem.appendChild(deleteButton);
    }
  }
}

let addEventListenersPL = () => {
  let playListItems = document.getElementsByClassName('playlistItem');
  for (let i = 0; i < playListItems.length; i++) {
    playListItems[i].addEventListener('click', () => {
      getSongs(playListItems[i].classList[1]);
      console.log(`Playlist ${playListItems[i].classList[1]} was clicked!`);
    })
  }

  let deleteButtons = document.getElementsByClassName('deletePL');
  for(let j=0; j<deleteButtons.length; j++){
    deleteButtons[j].addEventListener('click', () =>{
      console.log('Playlist Delete Button clicked bitch!');
    })
  }
}

let renderTracks = (input) => {
  let tracksCont = document.querySelector('.tracksCont');

  while(tracksCont.firstChild){
    tracksCont.removeChild(tracksCont.firstChild);
  }
  
  for(let i = 0; i <input.length; i++){
  let track = document.createElement('div');
  track.setAttribute('class', 'track');

  let trackTitle = document.createElement('p');
  trackTitle.setAttribute('class', 'trackTitle');
  trackTitle.innerText = input[i].title;
  track.appendChild(trackTitle);

  let trackDuration = document.createElement('p');
  trackDuration.setAttribute('class', 'trackDuration');
  trackDuration.innerText = input[i].duration;
  track.appendChild(trackDuration);

  tracksCont.appendChild(track);
  }

  console.log(input);
}

//---AJAX Calls---//

let handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response
}

let getSongs = (PLId) => {
  fetch(`http://localhost:8080/playlist-tracks/${PLId}`)
    .then(handleErrors)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      renderTracks(response);
    })
    .catch((error) => {
      console.log(error);
    })
}

fetch('http://localhost:8080/playlists')
  .then(handleErrors)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    renderPlaylists(response)
    return response
  })
  .then((response) => {
    addEventListenersPL();
    // console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })

//---audio control related stuff---//

let audioPlayer = document.getElementById('player');
let playPauseButton = document.getElementById('playButton');
let progressBar = document.getElementById('progressBar');

// console.log(audioPlayer.paused);
// console.log(audioPlayer.attributes)

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