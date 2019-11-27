'use strict';

import {fetchHandleErrors} from '../services/fetchHandleErrors.js';
import {renderTracks} from '../services/renderTracks.js';

let getSongs = (PLId) => {
  fetch(`http://localhost:8080/playlist-tracks/${PLId}`)
    .then(fetchHandleErrors)
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

export { getSongs };