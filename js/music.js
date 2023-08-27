/*
1 .render songs
2. scroll
3. play / pause / seek
4. CD rotate
5. Next / prew
6. Random
7. next / prew when ended
8. Active song
9. Scroll active song into view
10. play song when click
*/

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const heading = $('body h3')
const body = $('.songArtist')
const playlist = $('.playlist');
const control = $('.control')
const Img = $('.img')
const imgArtist = $('.player--imgArtist .img')
const volume_slider = document.querySelector('.volume_slider');
const volumeBtn = $('.btn-volume ')
const heartBtn = $('.btn-heart')
const app = {
    currenIndex : 0,
    isRepeat :false,
    isPlaying : false,
    // config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY) || {} ),
    songs:[
        {
            name :'Họ đâu thương em ',
            singer:'Phan Duy Anh',
            path : '/music/song1.mp3',
            image : '/img/song1.jpg'
        },
        {
            name :'Bật tình yêu lên',
            singer:'Tăng Duy Tân',
            path : '/music/song2.mp3',
            image : '/img/song2.jpg'
        },
        {
            name :'Ngoài 30',
            singer:'Thái Học',
            path : '/music/song3.mp3',
            image : '/img/song3.jpg'
        },
        {
            name :'Phố Hoa Lệ',
            singer:'Chu Bin',
            path : '/music/song4.mp3',
            image : '/img/song4.jpg'
        },
        {
            name :'Trách Duyên Trách Phận',
            singer:'Đỗ Thanh Duy',
            path : '/music/song5.mp3',
            image : '/img/song5.jpg'
        },
        {
            name :'Người ra đi vì đâu',
            singer:'Khải Đăng',
            path : '/music/song6.mp3',
            image : '/img/song6.jpg'
        }


    ],
    render:function(){
        const htmls = this.songs.map((song,index)=>{
            return  `
            <div class="song ${index === this.currenIndex ? 'active' : ''} " data-index="${index}">
                <div class="thumb" style="background-image:url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
            </div>

            `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    definProperties:function(){
        Object.defineProperty(this , 'currenSong' ,{
            get:function(){
                return this.songs[this.currenIndex]
            }
        })
    },
    handleEvents:function(){
        const _this = this;
        // xu li cd rotate
        const cdThumbA = imgArtist.animate([{
            transform : 'rotate(360deg)'
        }],{
        duration : 50000,
        interations: Infinity
        })
        cdThumbA.pause()
        // xử lí cd

    // xử lí khi play
    playBtn.onclick = function(){
        if(_this.isPlaying){
            audio.pause()
            cdThumbA.pause()

        }else{
            audio.play()
            cdThumbA.play()

        }
    },
    
    // khi song play 
    audio.onplay = function(){
        isRandom = false
        _this.isPlaying = true,
        control.classList.add('playing')
        cdThumbA.play()
        
    }
    // khi next song
    nextBtn.onclick = function(){
        if (_this.isRandom) {
            _this.randomSong()
        }else{
            _this.nextSong()
        }
        audio.play()
        _this.render()
        _this.scrollToActiveSong()
    }
    // khi prev song
    prevBtn.onclick = function(){
        if (_this.isRandom) {
            _this.randomSong()
        }else{
            _this.prevSong()
        }
        audio.play()
        _this.render()

    }
    // khi random song
    randomBtn.onclick = function(e){
            _this.isRandom = !_this.isRandom
        randomBtn.classList.toggle('active',_this.isRandom)
        audio.play()
        _this.render()
    }
    // khi song pause 
    audio.onpause = function(){
        _this.isPlaying = false,
        control.classList.remove('playing')
        cdThumbA.pause()
    }
    
    

    // khi thay doi tien do bai hat
    audio.ontimeupdate = function(){
        if (audio.duration) {
            const progressPercent= Math.floor(audio.currentTime / audio.duration * 100)
            progress.value = progressPercent;
        }
    // xu li khi tua bai hat
    progress.onchange = function(e){
        const seekTime = audio.duration/ 100 * e.target.value
        audio.currentTime = seekTime

    }
    }
    // xu li khi xong bai hat
    audio.onended = function(){
        if (_this.isRepeat) {
            audio.play()
        }else{
            nextBtn.click()
        }
    }

    // Lang nghe hanh vi click vao playlist
    playlist.onclick = function(e){
        const songNode = e.target.closest('.song:not(.active)')
        // xu li khi click vao song
        if(e.target.closest('.song:not(.active)') || !e.target.closest('.option') ){
            if (songNode) {
                _this.currenIndex = Number(songNode.dataset.index)
                _this.loadCurrenSong()
                audio.play()    
                _this.render()

            }
        // xu li khi click vao song option
        if (e.target.closest('.option')) {
            
        }
        }
    }
    // khi repeat song
    repeatBtn.onclick = function(e){
        _this.isRepeat = !_this.isRepeat
        repeatBtn.classList.toggle('active',_this.isRepeat)
}
    },
    scrollToActiveSong:function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                blook:'center',
            })
        },300)
    },
    loadCurrenSong:function(){
        body.textContent = this.currenSong.singer
        heading.textContent = this.currenSong.name
        Img.style.backgroundImage = `url('${this.currenSong.image}')`
        imgArtist.style.backgroundImage = `url('${this.currenSong.image}')`
        audio.src = this.currenSong.path
        
    },
    
    nextSong:function(){
        this.currenIndex++;
        if (this.currenIndex > this.songs.length - 1) {
             this.currenIndex = 0
        }
        this.loadCurrenSong()
    },
    prevSong:function(){
        this.currenIndex--;
        if (this.currenIndex < 0) {
             this.currenIndex = this.songs.length - 1
        }
        this.loadCurrenSong()

    },
    randomSong:function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(this.currenIndex === newIndex)
        this.currenIndex = newIndex
        this.loadCurrenSong()

    },
    repeatSong:function(){

    },
    currenTime:function(){
        var i = setInterval(function(){
            if(audio.readyState > 0){
                var hours = Math.floor(audio.duration / 3600)
                var minutes = Math.floor(audio.duration / 60 % 60)
                var seconds = Math.floor(audio.duration % 60)
                if ((audio.duration >= 600) && (minutes < 10)) {
                    minutes = '0' + minutes;
                }
                curren_duration.textContent = `${hours>=10 ? hours+':' : ''}${minutes} :${seconds >=10 ? seconds : '0'+seconds}`
                clearInterval(i)



            }

        })
        this.timeUpdate()
        },
    timeUpdate:function(){
        audio.addEventListener('timeupdate', function() {

            // current time
            var currentHours = Math.floor(audio.currentTime / 3600);
            var currentMinutes = Math.floor(audio.currentTime / 60 % 60);
            var currentSeconds = Math.floor(audio.currentTime % 60);
            if ((audio.currentTime >= 600) && (currentMinutes < 10)) {
                currentMinutes = '0' + currentMinutes;
            }
            curren_time.textContent = `${currentHours ? currentHours+':' : ''}${currentMinutes}:${currentSeconds >= 10 ? currentSeconds : '0'+currentSeconds}`;

        });
    },
    Volume:function(){
            volumeBtn.onclick = function(){
                if(audio.volume === 0){
                    audio.volume = volume_slider.value / 100;
                    volumeBtn.classList.remove('volumea')
                    volumeBtn.classList.remove('active')
        
                }else    {
                    audio.volume =  0/volume_slider.value;
                    volumeBtn.classList.add('volumea')
                    volumeBtn.classList.add('active')
                } }
    },
    start:function(){
        // dinh nghia cac thuoc tinh cho obj
        this.definProperties();

        // lang nghe xu cac su kien (DOM even)
        this.handleEvents();

        // tải thông tin bài hát đầu tiên
        this.loadCurrenSong()
        
        // nextsong
        this.nextSong();

        // prevsong
        this.prevSong();

        // randomsong
        this.randomSong();

        // repeatsong
        this.repeatSong();

        // render playlist
        this.render()

        // Timesongs
        this.currenTime()
        this.timeUpdate()

        this.Volume()
}
}
// 


heartBtn.onclick = function(){
    heartBtn.classList.toggle('active')
}


const curren_time = $('.current-time')
const curren_duration = document.querySelector('.video-duration')
// var i = setInterval(function(){
//     if(audio.readyState > 0){
//         var hours = Math.floor(audio.duration / 3600)
//         var minutes = Math.floor(audio.duration / 60 % 60)
//         var seconds = Math.floor(audio.duration % 60)
//         if ((audio.duration >= 600) && (minutes < 10)) {
//             minutes = '0' + minutes;
//         }
//         curren_duration.textContent = `${hours>=10 ? hours+':' : ''}${minutes} :${seconds >=10 ? seconds : '0'+seconds}`
//         clearInterval(i)


//     }
// })


app.start()
