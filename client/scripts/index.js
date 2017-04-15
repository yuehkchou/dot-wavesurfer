// Initializing wavesurfer
var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'volet',
  progressColor: 'purple',
  scrollParent: true
})
// Establish WaveList , should contain object of music;
// Music Load
let musicPlayer = [];
let currIndex = 0;
// playlist is the json API file that contains Song Title, Song Track duration, and SongURL
// once it enters it will get a music
// Very wet code, need to revise later on.
const loadSongs = (playlist) => {
  let articleList = document.getElementById('article-list');
  playlist.forEach((song, ind) => {
    musicPlayer.push(song.songURL);
    let articleUL = document.createElement('ul')
    articleUL.className="audio-td"
    let num = document.createElement('li');
    let title = document.createElement('li');
    let len = document.createElement('li');
    num.appendChild(document.createTextNode(`#${ind + 1}`))
    title.appendChild(document.createTextNode(song.title));
    len.appendChild(document.createTextNode(song.duration))
    articleUL.appendChild(num);
    articleUL.appendChild(title);
    articleUL.appendChild(len);
    articleList.appendChild(articleUL);
  })
}
// EventListener
// When song finish playing
wavesurfer.on('ready', () => {
  console.log('wave surfer ready')
  let currSong = document.getElementById('article-list');
  currSong.childNodes[currIndex].setAttribute('style', "font-weight: bold; background: blue;" )
})
// Once Finish Index Increases, Play Next Music
wavesurfer.on('finish', () => {
  let currSong = document.getElementById('article-list');
  currSong.childNodes[currIndex].setAttribute('style', "font-weight: 400; background: none;" )
  currIndex += 1
  wavesurfer.load(musicPlayer[currIndex])
})
// If an Error Occurs
wavesurfer.on('error', (err) => {
  console.log(err);
})
var slider = document.querySelector('#slider');
slider.oninput = function() {
  var zoomLevel = Number(slider.value);
  wavesurfer.zoom(zoomLevel)
}
