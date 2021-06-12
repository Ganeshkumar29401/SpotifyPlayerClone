//functional programming

const playBtn = document.getElementById("play");
const pauseBtn = document.querySelector(".fa-pause");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const mute = document.getElementById("vol");
const like = document.getElementById("like");
const likeitag = document.querySelector(".fa-heart");
const audio = document.getElementById("audio");
const progressContainer = document.querySelector(".progress_container");
const progress = document.querySelector(".progress");
const title = document.getElementById("title");
const singer = document.getElementById("singer");
const image = document.getElementById("image");
const fullDuration = document.querySelector(".fullLeng");
const currentDuration = document.querySelector(".currentDur");

console.log(progress);

const songs = [
  "Agaram ippo",
  "Moonumolam",
  "Sembaruthi",
  "Kanne Kalai Mane",
  "Komatha",
  "Konji Konji Male",
  "Idho Idho En Pallavi",
  "Koondukkulla",
  "Koopital Malar",
  "Muthamizhe",
  "Muthumani Maalai",
  "Chinna Chinna",
  "Vannam konda",
  "Oruvan Oruvan Mudhalali",
  "Thoda Thoda",
];

const generateRandomSongIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

let randomSongINdex = generateRandomSongIndex(0, 14);

let songIndex = randomSongINdex;

const loadSong = (song) => {
  title.textContent = song;
  console.log(song);
  if (song === "Agaram ippo" || song === "Kanne Kalai Mane") {
    singer.textContent = "K.J.Yesudas";
  } else {
    singer.textContent = "S.P.Balasubramanyam,K.S.Chitra";
  }
  audio.src = `./musics/${song}.mp3`;
  image.src = `./images/${song}.jpg`;
};

const enablePauseBtn = () => {
  playBtn.querySelector(".fas").classList.remove("fa-pause");
  playBtn.querySelector(".fas").classList.add("fa-play");
  audio.pause();
};

const enablePlayBtn = () => {
  playBtn.querySelector(".fas").classList.remove("fa-play");
  playBtn.querySelector(".fas").classList.add("fa-pause");
  audio.play();
};

const enableLikedBtn = () => {
  likeitag.classList.toggle("colored-like");
};

mute.addEventListener("click", () => {
  if (mute.querySelector(".fas").classList.contains("fa-volume-up")) {
    mute.querySelector(".fas").classList.remove("fa-volume-up");
    mute.querySelector(".fas").classList.add("fa-volume-mute");
    audio.muted = true;
  } else {
    mute.querySelector(".fas").classList.remove("fa-volume-mute");
    mute.querySelector(".fas").classList.add("fa-volume-up");
    audio.muted = false;
  }
});

//play event

playBtn.addEventListener("click", () => {
  let check = playBtn.querySelector(".fas").classList.contains("fa-play");
  check ? enablePlayBtn() : enablePauseBtn();
});

//play next prev song

const playPrevSong = () => {
  songIndex--;

  songIndex < 0 ? (songIndex = songs.length - 1) : null;

  loadSong(songs[songIndex]);
  enablePlayBtn();
};

const playNextSong = () => {
  songIndex++;

  songIndex > songs.length - 1 ? (songIndex = 0) : null;

  loadSong(songs[songIndex]);
  enablePlayBtn();
};

const updateProgress = (e) => {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  let presentTime = currentDuration;
  let totalTime = fullDuration;

  audio.addEventListener("loadeddata", () => {
    let audioDur = audio.duration;
    let min = Math.floor(audioDur / 60);
    let sec = Math.floor(audioDur % 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }
    totalTime.textContent = `${min}:${sec}`;
  });

  let curMin = Math.floor(currentTime / 60);
  let curSec = Math.floor(currentTime % 60);
  if (curSec < 10) {
    curSec = `0${curSec}`;
  }
  presentTime.textContent = `${curMin}:${curSec}`;
};

const setProgress = (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = +audio.duration;
  audio.currentTime = (clickX / width) * duration;
};

prev.addEventListener("click", playPrevSong);

next.addEventListener("click", playNextSong);

like.addEventListener("click", enableLikedBtn);

audio.addEventListener("timeupdate", updateProgress);

audio.addEventListener("ended", playNextSong);

progressContainer.addEventListener("click", setProgress);

loadSong(songs[songIndex]);
