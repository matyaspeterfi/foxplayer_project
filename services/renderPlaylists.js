let renderPlaylists = (input) => {

  for (let i = 0; i < input.length; i++) {
    let playlistCont = document.querySelector('.playlistsCont');

    let playlistItem = document.createElement('div');
    playlistItem.setAttribute('class', `playlistItem ${input[i].id}`);
    

    let playlistTitle = document.createElement('p');
    playlistTitle.setAttribute('class', `playlistTitle ${input[i].id}`);
    playlistTitle.innerText = input[i].title;

    playlistItem.appendChild(playlistTitle);
    playlistCont.appendChild(playlistItem);

    if (input[i].system == 0) {
      let deleteButton = document.createElement('img');
      deleteButton.setAttribute('class', `deletePL ${input[i].id}`);
      deleteButton.setAttribute('src', '/assets/img/deletePL.svg');
      playlistItem.appendChild(deleteButton);
    }
  }
}

export {renderPlaylists};