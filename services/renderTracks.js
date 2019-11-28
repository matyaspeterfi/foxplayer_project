'use strict';

let renderTracks = (input) => {
  let tracksCont = document.querySelector('.tracksCont');

  while (tracksCont.firstChild) {
    tracksCont.removeChild(tracksCont.firstChild);
  }
  console.log(input);
  console.log(input.length);
  for (let i = 0; i < input.length; i++) {
    let track = document.createElement('div');
    track.setAttribute('class', 'track');

    let trackNum = document.createElement('p');
    trackNum.innerText = i + 1;
    track.appendChild(trackNum);

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
}

export { renderTracks };