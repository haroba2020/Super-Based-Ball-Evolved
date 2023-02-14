import {game, soundEffect, music} from './game'

export const test = 'test'

export const startGame = setInterval((ball) => {
    game.moveBall(ball)
    game.ballOnScreen()

    return
}, 150) 


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
    aHitStart() {

        if (game.location < 28 && game.location > 12) {
            setTimeout(() => {
                playerA.ahitFinish()
            }, game.velocity * 250)
            soundEffect.hitBall()
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
    bhitStart() {
        if (game.location > 72 && game.location < 88) {
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