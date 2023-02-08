import { Link } from 'react-router-dom'
import {playerA, playerB} from './playerData'
import {player1, player1} from './game'
console.log(playerA)
export const GIF_DATA = (function () { 
    let arr = []
    for(let i = 1 ; i <= 5 ; i++ ){
        let tmpImg = require( `./assets/${i}.gif`)
        arr.push(tmpImg)
    }
    return arr
})()
console.log(playerA)

addEventListener("keydown", function (e) {
    if (e.key == "d" && playerA.cooldown == false) {
        player1.setAttribute('src', "../img/player red shoot.gif");
        playerA.switchCooldown();
        setTimeout(playerA.returnPlayer, 1000);
        setTimeout(() => {
            playerA.switchCooldown()
        }, 1000)
        setTimeout(() => {
            playerA.aHitStart()
        }, 300)
    } else if (e.key == "k" && playerB.cooldown == false) {
        player2.setAttribute('src', "../img/player blue shootgif.gif")
        playerB.switchCooldown();
        setTimeout(playerB.returnPlayer, 1000);
        setTimeout(() => {
            playerB.switchCooldown()
        }, 1000)
        setTimeout(() => {
            playerB.bhitStart()
        }, 300)
    } else if (e.key == " ") {
        console.log(e.key)
        game.restartGame()
    }
})

console.log(GIF_DATA)

const Play = () => {
    return ( 
        <div className="play">
            <div className="flex-parent-player">
                <div className="flex-player gameFinal">
                    <h1 className="gameFinal play1Stat d-none">WIN</h1>
                </div>
                <div className="text-center white-space">
                    <Link to="/home" className='title'>Exit</Link>
                </div>
                <div className="flex-player">
                    <h1 className="gameFinal play2Stat d-none">LOSE</h1>
                </div>
            </div>
            
            <div className="flex-parent-player pt-5">
                <div className="flex-player">
                    <img src={GIF_DATA[0]} className='flip player' alt="player1" />
                </div>
                <div className="white-space"></div>
                <div className="flex-player">
                    <img src={GIF_DATA[1]} className=' player' alt="player2" />
                </div>
            </div>
            <div className="text-center score">
                <h1 className="score">0</h1>
            </div>
        </div>
     );
}
 
export default Play;