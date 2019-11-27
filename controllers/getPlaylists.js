
import {fetchHandleErrors} from '../services/fetchHandleErrors.js';
import {renderPlaylists} from '../services/renderPlaylists.js';
import {addEventListenersPL} from '../services/addEventListenersPL.js';

let getPlaylists = () => {
  fetch('http://localhost:8080/playlists')
    .then(fetchHandleErrors)
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
}

export { getPlaylists };