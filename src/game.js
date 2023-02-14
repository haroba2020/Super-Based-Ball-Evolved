import {playerA, playerB, startGame} from './playerData'


const player1 = document.querySelector(".p1")
const player2 = document.querySelector(".p2")
const ball = document.querySelector(".baseball")
const score = document.querySelector(".score")
const player1Stat = document.querySelector(".play1Stat")
const player2Stat = document.querySelector(".play2Stat")
console.log(player1Stat)
//object to store music data in

let rNumber;

export const music = {
    playable: true,
    snibbit: new Audio("../img/sounds/snibbit.mp3"),
    bravo: new Audio("../img/sounds/bravo.mp3"),
    nastyDen: new Audio("../img/sounds/Nasty den.mp3"),
    whipz: new Audio("../img/sounds/Whipz.mp3"),
    zeroScar: new Audio("../img/sounds/zeroScar.mp3"),

    list: [new Audio("../img/sounds/zeroScar.mp3"), new Audio("../img/sounds/snibbit.mp3"), new Audio("../img/sounds/Nasty den.mp3"), new Audio("../img/sounds/Whipz.mp3"), new Audio("../img/sounds/zeroScar.mp3")],
    playMusic() {
        if (this.playable) {
            
            rNumber = Math.floor(Math.random() * 5)
            this.list[rNumber].volume = 0.2
            this.list[rNumber].play()
            this.playable = false
        }
    }
}
//object for sound effects
export const soundEffect = {
    hitBallBase: new Audio("../img/sounds/baseHit.mp3"),
    hardHits: [new Audio("../img/sounds/hardHit.mp3"), new Audio("../img/sounds/hardHit2.mp3")],
    crowdCheer: [new Audio("../img/sounds/crowd1.mp3"), new Audio("../img/sounds/crowd2.mp3")],
    nuclearAlarm: new Audio("../img/sounds/smashGame.mp3"),
    hitBall() {        
        const rNumber = Math.floor(Math.random() * 1)+1
        if (game.hits < 10) {
            this.hitBallBase.play()
        } else if (game.hits > 9) {
            if(game.ballDirection){
               this.hardHits[0].play()
               console.log('hard hit 1 fired')
            }else{
                this.hardHits[1].play() 
                console.log('hard hit 2 fired')
            }
        }
    }
}

//methods and varibles for the game status
export const game = {
    hits: 0,
    velocity: 0.5,
    location: 20,
    ballDirection: null,
    pause: false,
    //Method to set the speed of the ball after every hit
    speedSet() {
        if(this.velocity<2.5){
            this.velocity = this.velocity + 0.1
        }else{
            this.velocity = this.velocity + 0.03
        }
        console.log(this.velocity)
    },
    //method that moves the ball based on the velocity of the ball
    moveBall(ball) {
        if (game.pause == false) {
            if (this.ballDirection) {
                ball = ball + this.velocity
            } else {
                ball = ball - this.velocity
            }
        }

    },
    //method to update game when a hit have been fired
    hit() {
        this.hits++
        this.speedSet()
        this.changeScene()
        score.textContent=this.hits
        console.log(`hit fired ${game.hits} hits have been fired so far`)
    },
    //Constantly checks if the ball is in screen and who lost the ball
    ballOnScreen() {
        if (this.location < 0) {
            ball.classList.add("d-none")
            playerB.score++
            console.log(playerB.score)
            this.restartGame()
        }else if(this.location > 100){
            playerA.score++
            ball.classList.add("d-none")
            this.restartGame()
        }
    },
    //Method that restarts the ball and checks for a winner
    restartGame() {
        this.hits = 0
        this.velocity = 0.5
        this.location = 20
        clearInterval(startGame)
        this.moveBall()
        ball.classList.remove("d-none")
        ball.setAttribute("src", "../img/baseball faster.gif")
        ball.style.width = "60px"
        music.list[rNumber].volume = 0.2
        score.textContent=0
        if(playerA.score==3){
            player1Stat.textContent = "win"
            player2Stat.textContent = "lose"
            player1Stat.classList.remove("d-none")
            player2Stat.classList.remove("d-none")
            soundEffect.nuclearAlarm.play()
            playerA.score = 0
            playerB.score = 0

        }else if(playerB.score==3){
            player1Stat.textContent = "lose"
            player2Stat.textContent = "win"
            player1Stat.classList.remove("d-none")
            player2Stat.classList.remove("d-none")
            soundEffect.nuclearAlarm.play()
            playerA.score = 0
            playerB.score = 0
        }
    },
    // method that changes the scene base on how many hits have been fired
    changeScene() {
        if (this.hits == 10){

            ball.setAttribute("src", "../img/fire-fireball.gif")
            ball.style.width = "100px"
        music.list[rNumber].volume = 0.3
        soundEffect.crowdCheer[0].play()
        console.log(rNumber)
        }
        if(this.hits == 20){
            ball.setAttribute("src", "../img/cosmicBall.gif")
            ball.style.width = "100px"
        music.list[rNumber].volume = 0.4
        console.log(rNumber)
        soundEffect.crowdCheer[1].play()
        }
    },
}