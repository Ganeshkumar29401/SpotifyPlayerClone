//object oriented programming

class MainSupply {
  constructor() {
    this.title = document.getElementById("title");
    this.singer = document.getElementById("singer");
    this.image = document.getElementById("image");
    this.audio = document.getElementById("audio");
    this.songIndex = this.generateRandomNum(0, 3);
    this.songs = [
      "Chinna Chinna",
      "Oruvan Oruvan Mudhalali",
      "Thoda Thoda",
      "Unnaivida", 
    ];
  }

  generateRandomNum(min, max) {
    const randomNum = Math.floor(Math.random() * (max - min) + min);
    return +randomNum;
  }

  loadSong(song) {
    this.title.textContent = song;
    console.log(song);
    if(song === "Chinna Chinna" || song === "Oruvan Oruvan Mudhalali"){
      singer.textContent = "S.P.Balasubramanyam";
    }else if( song === "Unnaivida"){
      this.singer.textContent = "Kamal Hasan,Shreya Goshal";
    }else {
      singer.textContent = "S.P.Balasubramanyam,K.S.Chitra";
    }
    this.audio.src = `./musics/${song}.mp3`;
    this.image.src = `./images/${song}.jpg`;
  }
}

class Progress extends MainSupply{
  constructor(){
    super();
    this.progressContainer = document.querySelector(".progress_container");
    this.progress = document.querySelector(".progress");
    this.fullDuration = document.querySelector(".fullLeng");
    this.currentDuration = document.querySelector(".currentDur");
    this.audio = document.getElementById("audio");
  }

  updateProgress(e){
    const { duration, currentTime } = e.srcElement;
    const progressPercent  = (currentTime/duration) * 100;
    this.progress.style.width = `${progressPercent}%`;
    let presentTime = this.currentDuration;
    let totalTime = this.fullDuration;

    this.audio.addEventListener("loadeddata", () => {
      let audioDur = this.audio.duration;
      console.log(this.audio.duration);
      let min = Math.floor(audioDur / 60);
      let sec = Math.floor(audioDur % 60);

      if(sec < 10){
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
  }

  setProgress(e){
    const width = this.progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = +this.audio.duration;
    this.audio.currentTime = (clickX / width) * duration;
  }
}

class ToggleNavigationBtns extends Progress {
  constructor() {
    super();
    this.playBtn = document.getElementById("play");
    this.audio = document.getElementById("audio");
    this.like = document.getElementById("like");
    this.mute = document.getElementById("vol");
    this.likeITag = document.querySelector(".fa-heart");
    this.prev = document.getElementById("prev");
    this.next = document.getElementById("next");
  }

  enablePlayBtn() {
    this.playBtn.querySelector(".fas").classList.remove("fa-play");
    this.playBtn.querySelector(".fas").classList.add("fa-pause");
    this.audio.play();
  }

  enablePauseBtn() {
    this.playBtn.querySelector(".fas").classList.remove("fa-pause");
    this.playBtn.querySelector(".fas").classList.add("fa-play");
    this.audio.pause();
  }

  enableLikeBtn() {
    this.likeITag.classList.toggle("colored-like");
  }

  enableMuteBtn() {
    if (this.mute.querySelector(".fas").classList.contains("fa-volume-up")) {
      this.mute.querySelector(".fas").classList.remove("fa-volume-up");
      this.mute.querySelector(".fas").classList.add("fa-volume-mute");
      this.audio.muted = true;
    } else {
      this.mute.querySelector(".fas").classList.remove("fa-volume-mute");
      this.mute.querySelector(".fas").classList.add("fa-volume-up");
      this.audio.muted = false;
    }
  }

  enablePrevSong() {
    this.songIndex--;
    this.songIndex < 0 ? (this.songIndex = this.songs.length - 1) : null;
    this.loadSong(this.songs[this.songIndex]);
    this.likeITag.classList.remove("colored-like");
    this.enablePlayBtn();
  }

  enableNextSong() {
    this.songIndex++;
    this.songIndex > this.songs.length - 1 ? (this.songIndex = 0) : null;
    this.loadSong(this.songs[this.songIndex]);
    this.likeITag.classList.remove("colored-like");
    this.enablePlayBtn();
  }
}

class Action extends ToggleNavigationBtns{
  constructor() {
    super();
  }
  
  render() {
    this.audio.addEventListener("timeupdate", this.updateProgress.bind(this));
    this.playBtn.addEventListener("click", () => {
      let conditionCheck = this.playBtn
        .querySelector(".fas")
        .classList.contains("fa-play");
      conditionCheck === true ? this.enablePlayBtn() : this.enablePauseBtn();
    });

    this.like.addEventListener("click", this.enableLikeBtn.bind(this));

    this.mute.addEventListener("click", this.enableMuteBtn.bind(this));

    this.prev.addEventListener("click", this.enablePrevSong.bind(this));

    this.next.addEventListener("click", this.enableNextSong.bind(this));

    this.audio.addEventListener("ended", this.enableNextSong.bind(this));

    this.loadSong(this.songs[this.songIndex]);

   this.progressContainer.addEventListener("click", this.setProgress.bind(this));
  }
}

const finalRes = new Action();
finalRes.render();
