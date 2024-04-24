console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let favoriteSongs = [];

let songs = [
    {songName: "1st", filePath: "songs/1.mp3", coverPath: "song cover/1.jpg"},
    {songName: "2nd", filePath: "songs/2.mp3", coverPath: "song cover/2.jpg"},
    {songName: "3rd", filePath: "songs/3.mp3", coverPath: "song cover/3.jpg"},
    {songName: "4th", filePath: "songs/4.mp3", coverPath: "song cover/4.jpg"},
    {songName: "5th", filePath: "songs/5.mp3", coverPath: "song cover/5.jpg"},
    {songName: "6th", filePath: "songs/6.mp3", coverPath: "song cover/6.jpg"},
    {songName: "7th", filePath: "songs/7.mp3", coverPath: "song cover/7.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
const fetchShazamEvents = async () => {
    const url = 'https://shazam.p.rapidapi.com/shazam-events/list?artistId=73406786&l=en-US&from=2022-12-31&limit=50&offset=0';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};
fetchShazamEvents();
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', ()=>{ 
    
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; 
    updateSong();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; 
    updateSong();
});
const updateSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
};
const toggleFavorite = (index) => {
    const favoriteButton = document.getElementById(`favorite${index}`);
    favoriteButton.classList.toggle('fas');
    if (favoriteButton.classList.contains('fas')) {
        favoriteSongs.push(songs[index]);
    } else {
        const songToRemove = songs[index];
        favoriteSongs = favoriteSongs.filter(song => song !== songToRemove);
    }
    updateFavoriteList();
};
Array.from(document.getElementsByClassName('favoriteButton')).forEach((element, index) => {
    element.addEventListener('click', () => {
        toggleFavorite(index);
    });
});
const updateFavoriteList = () => {
    const favoriteList = document.getElementById('favoriteList');
    favoriteList.innerHTML = '';

    favoriteSongs.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${song.songName}`;
        favoriteList.appendChild(listItem);
    });
};
