import {playerA, playerB} from './playerData'

export const GIF_DATA = (function () { 
    let arr = []
    for(let i = 1 ; i <= 7 ; i++ ){
        let tmpImg = require( `./assets/Gifs/${i}.gif`)
        arr.push(tmpImg)
    }
    return arr
})()



export const music = {
    rNumber:Math.floor(Math.random() * 5),
    playable: true,
    list: [new Audio("/Music/1.mp3"), new Audio("/Music/2.mp3"), new Audio("/Music/3.mp3"), new Audio("/Music/4.mp3"), new Audio("/Music/5.mp3")],
    playMusic() {
        if (this.playable) {
            this.list[this.rNumber].volume = 0.2
            this.list[this.rNumber].play()
            this.playable = false
        }
    }
}
//object for sound effects
export const soundEffect = {
    hitBallBase: new Audio("/soundEffects/1.mp3"),
    hardHits: [new Audio("/soundEffects/2.mp3"), new Audio("/soundEffects/3.mp3")],
    crowdCheer: [new Audio("/soundEffects/4.mp3"), new Audio("/soundEffects/5.mp3")],
    // Plays a hit sound effect based on direction and how many hit's have been fired so far.
    hitBall() {        
        if (game.hits < 10) {
                this.hitBallBase.play()
        } else if (game.hits > 9) {
            if(game.ballDirection){
            this.hardHits[0].play()
            }else{
            this.hardHits[1].play() 
            }
        }
    },
    // Plays either crowdCheer sound effect 1 or 2 based on the argument.
    crowdSound(crowd){
        if(crowd===1){
            this.crowdCheer[0].play()
        }else if(crowd===2){
            this.crowdCheer[1].play()
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

        this.hits++
        this.speedSet()
        music.playMusic()
        return game.changeScene()
        
    },
    //Constantly checks if the ball is in screen and who lost the ball
    ballOnScreen(location) {
        if (location < 0) {
            playerB.score++
            return true
        }else if(location > 95){
            playerA.score++
            return true
        }
    },
    exp(x){
        return 2**(0.125*x);
    },
    calcWinner(location){
        if(location<50){
            return 'A'
        }else{
            return 'B'
        }
    },
    //Method that restarts the ball and checks for a winner
    restartGame() {
        const exp = this.exp(this.hits)
        const winner = (this.calcWinner(this.location))
        let hits = this.hits
        this.hits = 0
        this.velocity = 0.5
        this.location = 20
        this.pause = true
        music.list[music.rNumber].volume = 0.2
        const returning = [this.location, GIF_DATA[4], 60, exp, hits, winner]
        if(playerA.score===3){
            playerA.score = 0
            playerB.score = 0
            returning.push(true, true)
        }else if(playerB.score===3){
            playerA.score = 0
            playerB.score = 0
            returning.push(true, false)
        }

        return returning
    },
    // method that changes the scene base on how many hits have been fired
    changeScene() {
        if (this.hits > 10&&this.hits<20){
        
            music.list[music.rNumber].volume = 0.4
            soundEffect.crowdSound(1)
            return {sprite:GIF_DATA[5],size:100}
        }
        else if(this.hits >= 20){

            
            music.list[music.rNumber].volume = 0.6
            soundEffect.crowdSound(2)
            return {sprite:GIF_DATA[6],size:100}
        }else{
            return {sprite:GIF_DATA[4],size:60}
        }
    }
}