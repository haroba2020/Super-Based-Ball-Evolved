import {game, soundEffect, music} from './game'
import {useRef, useEffect, useState} from "react"

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
            if (location < 45 && location > 15) {
                soundEffect.hitBall()
                game.startGame()
                game.location = 20
                game.pause = true
                return new Promise(resolve => {
                    setTimeout(() => {
                    resolve(playerA.ahitFinish())
                    }, game.velocity * 250)
                })
                }
        },
        ahitFinish() {
            game.ballDirection = true
            game.pause = false
            return game.hit();
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
            if (location > 55 && location < 85) {
                soundEffect.hitBall()
                game.location = 77
                game.pause = true
                return new Promise(resolve => {
                    setTimeout(() => {
                    resolve(playerB.bhitFinish())
                    }, game.velocity * 250)
                })
            }
        },
        bhitFinish() {
            game.ballDirection = false
            game.pause = false
            return game.hit();
        }
    }
