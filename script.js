const songs = [

{
title: "Song One",
artist: "Artist One",
src: "songs/song1.mp3",
cover: "images/cover1.jpg"
},

{
title: "Song Two",
artist: "Artist Two",
src: "songs/song2.mp3",
cover: "images/cover2.jpg"
},

{
title: "Song Three",
artist: "Artist Three",
src: "songs/song3.mp3",
cover: "images/cover3.jpg"
}

];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");

const currentTimeEl =
document.getElementById("current");

const durationEl =
document.getElementById("duration");

let songIndex = 0;

function loadSong(index){

title.textContent = songs[index].title;
artist.textContent = songs[index].artist;

audio.src = songs[index].src;
cover.src = songs[index].cover;

document
.querySelectorAll("li")
.forEach(li =>
li.classList.remove("active"));

playlist.children[index]
.classList.add("active");
}

songs.forEach((song,index)=>{

const li =
document.createElement("li");

li.textContent =
`${song.title} - ${song.artist}`;

li.addEventListener("click",()=>{

songIndex=index;

loadSong(songIndex);

playSong();

});

playlist.appendChild(li);

});

function playSong(){

audio.play();

playBtn.innerHTML =
'<i class="fas fa-pause"></i>';

cover.classList.add("playing");
}

function pauseSong(){

audio.pause();

playBtn.innerHTML =
'<i class="fas fa-play"></i>';

cover.classList.remove("playing");
}

playBtn.addEventListener("click",()=>{

if(audio.paused){

playSong();

}else{

pauseSong();

}

});

nextBtn.addEventListener("click",()=>{

songIndex++;

if(songIndex>=songs.length)
songIndex=0;

loadSong(songIndex);

playSong();

});

prevBtn.addEventListener("click",()=>{

songIndex--;

if(songIndex<0)
songIndex=songs.length-1;

loadSong(songIndex);

playSong();

});

audio.addEventListener("timeupdate",()=>{

progress.value =
(audio.currentTime /
audio.duration) * 100 || 0;

currentTimeEl.textContent =
formatTime(audio.currentTime);

durationEl.textContent =
formatTime(audio.duration);
});

progress.addEventListener("input",()=>{

audio.currentTime =
(progress.value/100)
* audio.duration;

});

volume.addEventListener("input",()=>{

audio.volume =
volume.value;

});

audio.addEventListener("ended",()=>{

songIndex++;

if(songIndex>=songs.length)
songIndex=0;

loadSong(songIndex);

playSong();

});

function formatTime(time){

if(isNaN(time))
return "0:00";

let min =
Math.floor(time/60);

let sec =
Math.floor(time%60);

if(sec<10)
sec="0"+sec;

return `${min}:${sec}`;
}

loadSong(songIndex);