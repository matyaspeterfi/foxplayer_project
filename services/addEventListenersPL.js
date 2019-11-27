import {getSongs} from '../controllers/getSongs.js';

let addEventListenersPL = () => {
  let playListTitles = document.getElementsByClassName('playlistTitle');
  for (let i = 0; i < playListTitles.length; i++) {
    let playListId = playListTitles[i].classList[1];
    playListTitles[i].addEventListener('click', () => {
      getSongs(playListId);
      console.log(`Playlist ${playListId} was clicked!`);
    });
  }

  let deleteButtons = document.getElementsByClassName('deletePL');
  for (let j = 0; j < deleteButtons.length; j++) {
    deleteButtons[j].removeEventListener('click', () => {
      getSongs(playListTitles[i].classList[1])
    });
    deleteButtons[j].addEventListener('click', () => {
      console.log(`Playlist ${deleteButtons[j].classList[1]} Delete Button clicked bitch!`);
    });
  }
}

export { addEventListenersPL };