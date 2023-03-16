import {game, soundEffect, } from './game'
// import {useRef, useEffect, useState} from "react"

    export const playerA = {
        cooldown: false,
        score:0,

        //A method used to switch cooldown.
        switchCooldown() {
            if (this.cooldown) {
                this.cooldown = false;
            } else {
                this.cooldown = true;
            }
        },

        //a hit start is used as the start sequence of hitting the ball.It detects the ball and temporaraly pauses the ball, A fast ball gives a longer pause.
        aHitStart(location) {
            //detects if ball is within 50 to 15 percent of the screen
            if (location < 35 && location > 15) {

                soundEffect.hitBall()
                game.pause = true
                return new Promise(resolve => {
                    setTimeout(() => {
                    resolve(playerA.ahitFinish())
                    }, game.velocity * 250)
                })
            }else{
                //returns a promise with the value false so that it can be handled properly 
                return Promise.resolve(false);
            }
        },
        ahitFinish() {
            //Unpauses the ball and calls the hit function
            game.ballDirection = true
            game.pause = false
            return game.hit();
        }
    }



    //methods and varibles for player B instead of player A
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
