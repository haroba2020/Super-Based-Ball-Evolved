export const test = 'test'

export const playerA = {
    cooldown: false,
    score:0,
    returnPlayer() {
        player1.setAttribute('src', "../img/player red still.gif")

    },
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
        if (game.hits == 0) {
            startGame = setInterval(() => {
                game.moveBall()
                game.ballOnScreen()
            }, 20)
            music.playMusic()
            player1Stat.classList.add("d-none")
            player2Stat.classList.add("d-none")
        }
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
        ball.classList.add("flip")
        game.ballDirection = true
        game.pause = false
    }
}



//methods and varibles for player B
export const playerB = {
    cooldown: false,
    score:0,

    returnPlayer() {
        player2.setAttribute('src', "../img/player blue still.gif")

    },
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
        ball.classList.remove("flip")
        game.ballDirection = false
        game.pause = false
    }
}