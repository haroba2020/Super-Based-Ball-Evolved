import {game, soundEffect, } from './game'
// import {useRef, useEffect, useState} from "react"

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
            //detects if ball is within 50 to 15 percent of the screen
            if (location < 35 && location > 15) {

                soundEffect.hitBall()
                game.location = 20
                game.pause = true
                return new Promise(resolve => {
                    setTimeout(() => {
                    resolve(playerA.ahitFinish())
                    }, game.velocity * 250)
                })
            }else{
                return Promise.resolve(false);
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
            if (location > 65 && location < 85) {
                soundEffect.hitBall()
                game.location = 77
                game.pause = true
                game.ballDirection = false
                return new Promise(resolve => {
                    setTimeout(() => {
                    resolve(playerB.bhitFinish())
                    }, game.velocity * 250)
                })
            }else{
                return Promise.resolve(false);
            }
        },
        bhitFinish() {
            game.ballDirection = false
            game.pause = false
            return game.hit();
        }
    }
