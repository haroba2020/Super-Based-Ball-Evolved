import {playerA, playerB} from './playerData'

export const GIF_DATA = (function () { 
    let arr = []
    for(let i = 1 ; i <= 7 ; i++ ){
        let tmpImg = require( `./assets/Gifs/${i}.gif`)
        arr.push(tmpImg)
    }
    return arr
})()
// const SFX_DATA = (function () { 
//     let arr = []
//     for(let i = 1 ; i <= 6 ; i++ ){
//         let tmpImg = require( `./assets/soundsEffects/${i}.mp3`)
//         arr.push(tmpImg)
//     }
//     return arr
// })()
const MUSIC_DATA = (function () { 
    let arr = []
    for(let i = 1 ; i <= 5 ; i++ ){
        let tmpImg = require( `./assets/Music/${i}.mp3`)
        arr.push(tmpImg)
    }
    return arr
})()
const player1 = document.querySelector(".p1")
const player2 = document.querySelector(".p2")
const ball = document.querySelector(".baseball")
const player1Stat = document.querySelector(".play1Stat")
const player2Stat = document.querySelector(".play2Stat")
console.log(player1Stat)
//object to store music data in

let rNumber;

export const music = {
    list: [new Audio("../img/sounds/zeroScar.mp3"), new Audio("../img/sounds/snibbit.mp3"), new Audio("../img/sounds/Nasty den.mp3"), new Audio("../img/sounds/Whipz.mp3"), new Audio("../img/sounds/zeroScar.mp3")],
    playMusic() {
        if (this.playable) {
            // // const audio = document.getElementById("MyAudio");
            // // console.log(audio)
            // // audio.play()
            // rNumber = Math.floor(Math.random() * 5)
            // this.list[rNumber].volume = 0.2
            // this.list[rNumber].play()
            // this.playable = false
        }
    }
}
//object for sound effects
export const soundEffect = {
    hitBallBase: new Audio("/soundEffects/1.mp3"),
    hardHits: [new Audio("/soundEffects/2.mp3"), new Audio("/soundEffects/3.mp3")],
    crowdCheer: [new Audio("/soundEffects/4.mp3"), new Audio("/soundEffects/5.mp3")],
    nuclearAlarm: new Audio("/soundEffects/6.mp3"),
    hitBall() {        
        const rNumber = Math.floor(Math.random() * 1)+1
        if (game.hits < 10) {
                this.hitBallBase.play()
            // this.hitBallBase.play()
        } else if (game.hits > 9) {
            if(game.ballDirection){
            this.hardHits[0].play()
            //    console.log('hard hit 1 fired')
            }else{
            this.hardHits[1].play() 
                // console.log('hard hit 2 fired')
            }
        }
    }
}

//methods and varibles for the game status
export const game = {
    hits: 0,
    velocity: 0.4,
    location: 20,
    ballDirection: null,
    pause: true,
    //Method to set the speed of the ball after every hit
    speedSet() {
        if(this.velocity<2.5){
            this.velocity = this.velocity + 0.06
        }else{
            this.velocity = this.velocity + 0.25
        }
    },
    //method to update game when a hit have been fired
    hit() {
        console.log(`hit fired ${game.hits} hits have been fired so far`)
        // console.log(SFX_DATA)
        // MUSIC_DATA[0].play()
        this.hits++
        this.speedSet()
        return game.changeScene()
        
    },
    //Constantly checks if the ball is in screen and who lost the ball
    ballOnScreen(location) {
        console.log(location)
        if (location < 0) {
            playerB.score++
            console.log(playerB.score)
            this.restartGame()
        }else if(location > 99){
            playerA.score++

            this.restartGame()
        }
    },
    //Method that restarts the ball and checks for a winner
    restartGame() {
        this.hits = 0
        this.velocity = 0.5
        this.location = 20
        // this.moveBall()
        // ball.classList.remove("d-none")
        // ball.setAttribute("src", "../img/baseball faster.gif")
        // ball.style.width = "60px"
        // music.list[rNumber].volume = 0.2
        if(playerA.score==3){
            // player1Stat.textContent = "win"
            // player2Stat.textContent = "lose"
            // player1Stat.classList.remove("d-none")
            // player2Stat.classList.remove("d-none")
            // soundEffect.nuclearAlarm.play()
            playerA.score = 0
            playerB.score = 0

        }else if(playerB.score==3){
            // player1Stat.textContent = "lose"
            // player2Stat.textContent = "win"
            // player1Stat.classList.remove("d-none")
            // player2Stat.classList.remove("d-none")
            // soundEffect.nuclearAlarm.play()
            playerA.score = 0
            playerB.score = 0
        }
    },
    // method that changes the scene base on how many hits have been fired
    changeScene() {
        if (this.hits > 10){
        
        // music.list[rNumber].volume = 0.3
        // soundEffect.crowdCheer[0].play()
        return GIF_DATA[5]
        }
        else if(this.hits === 20){
            ball.setAttribute("src", "../img/cosmicBall.gif")
            ball.style.width = "100px"
        music.list[rNumber].volume = 0.4
        console.log(rNumber)
        soundEffect.crowdCheer[1].play()
        }else{
            return GIF_DATA[4]
        }
    },
    startGame(){
        if( this.hit === 0){
           game.pause = false 
        }
    }
}
        