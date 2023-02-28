import {game, soundEffect, music} from './game'

export function startGame(ball) {
    
    const ballPosition = game.moveBall(ball)
    console.log(ballPosition)
    console.log(ball+' ball')
    // game.ballOnScreen()
    return ballPosition
} 


export const GIF_DATA = (function () { 
    let arr = []
    for(let i = 1 ; i <= 5 ; i++ ){
        let tmpImg = require( `./assets/${i}.gif`)
        arr.push(tmpImg)
    }
    return arr
})()


export const playerA = {
    cooldown: false,
    score:0,

    switchCooldown() {
        if (typeof (this.cooldown) == "boolean") {
            if (this.cooldown) {
                this.cooldown = false;
            } else {
                this.cooldown = true;
            }
        }
    },
    aHitStart(location) {
        console.log(location + "A hit")
        if (location < 40 && location > 15) {
            setTimeout(() => {
                playerA.ahitFinish()
            }, game.velocity * 250)
            console.log('gaming')
            soundEffect.hitBall()
            game.startGame()
            game.location = 20
            game.moveBall()
            game.pause = true
        }
    },
    ahitFinish() {
        game.hit();
        game.ballDirection = true
        game.pause = false
    }
}



//methods and varibles for player B
export const playerB = {
    cooldown: false,
    score:0,

    switchCooldown() {
        if (typeof (this.cooldown) == "boolean") {
            if (this.cooldown) {
                this.cooldown = false;
            } else {
                this.cooldown = true;
            }
        }
    },
    bhitStart(location) {
        console.log(location + "b hit")
        if (location > 50 && location < 75) {
            setTimeout(() => {
                playerB.bhitFinish()
            }, game.velocity * 250)
            soundEffect.hitBall()
            game.location = 77
            game.moveBall()
            game.pause = true
        
        }
    },
    bhitFinish() {
        game.hit();
        game.ballDirection = false
        game.pause = false
    }
}