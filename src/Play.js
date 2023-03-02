import { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom'
import {playerA, playerB, startGame} from './playerData'
import {game, music} from './game'

console.log(playerA)
export const GIF_DATA = (function () { 
    let arr = []
    for(let i = 1 ; i <= 7 ; i++ ){
        let tmpImg = require( `./assets/Gifs/${i}.gif`)
        arr.push(tmpImg)
    }
    return arr
})()
const MUSIC_DATA = (function () { 
    let arr = []
    for(let i = 1 ; i <= 5 ; i++ ){
        let tmpImg = require( `./assets/Music/${i}.mp3`)
        arr.push(tmpImg)
    }
    return arr
})()

const Play = () => {

    const [ballState, setBallState] = useState(20);

    const [player1, setPlayer1] = useState(GIF_DATA[0]);
    const [player2, setPlayer2] = useState(GIF_DATA[1]);
    const [ballSprite, setBallSprite] = useState(GIF_DATA[4])

    const [player1Stat, setPlayer1Stat] = useState('');
    const [player2Stat, setPlayer2Stat] = useState('');

    const requestRef = useRef();
    const ballStateRef = useRef(ballState);


    const updateBallState = (timestamp) => {
        if(!game.pause){
            if(game.ballDirection){
                setBallState((prevState) => prevState + game.velocity);
            }else{
                setBallState((prevState) => prevState - game.velocity);
            }
            
        }
        
        requestRef.current = requestAnimationFrame(updateBallState);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateBallState);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
 
    useEffect(() => {
        ballStateRef.current = ballState;
      }, [ballState]);

    useEffect(()=>{
            document.addEventListener("keydown", function (e) {
                const location = ballStateRef.current;

                const audio = document.getElementById("MyAudio");
                console.log(audio)
                audio.play()
                if(e.key === "d" && playerA.cooldown === false) {
                    setPlayer1(GIF_DATA[2])
                    playerA.switchCooldown();
                    setTimeout(() => {
                        setPlayer1(GIF_DATA[0])
                        playerA.switchCooldown()
                    }, 1000)
                    setTimeout(() => {
                        playerA.aHitStart(location).then((value)=>{
                            setBallSprite(value)
                        })
                    }, 300)

                } else if (e.key === "k" && playerB.cooldown === false) {
                    setPlayer2(GIF_DATA[3])
                    playerB.switchCooldown();
                    setTimeout(() => {
                        setPlayer2(GIF_DATA[1])
                        playerB.switchCooldown()
                    }, 1000)
                    setTimeout(() => {
                        console.log(location)
                        playerB.bhitStart(location)
                    }, 300)
                } else if (e.key === " ") {
                    console.log(e.key)
                    game.restartGame()
                }
            });
          }, [ballState]);
    return ( 
        <div className="play">

            
               
            <div className="flex-parent-player">
                <div className="flex-player gameFinal">
                    <h1 className="gameFinal play1Stat d-none">{player1Stat}</h1>
                </div>
                <div className="text-center white-space">
                    <Link to="/home" className='title'>Exit</Link>
                </div>
                <div className="flex-player">
                    <h1 className="gameFinal play2Stat d-none">{player2Stat}</h1>
                </div>
            </div>
            
            <div className="flex-parent-player pt-5">
                <div className="flex-player">
                    <img src={player1} className='flip player' alt="player1" />
                </div>
                <div className="white-space"></div>
                <div className="flex-player">
                    <img src={player2} className=' player' alt="player2" />
                </div>  
            </div>
            <div className="text-center score">
                <h1 className="score">0</h1>
            </div>
            <img className="baseball" src={ballSprite}  alt="" style={{ left: ballState+'%' }} />
            <audio id="MyAudio">
                <source src={MUSIC_DATA[0]} type="audio/mp3" />
            </audio>
        </div>
     );
}
 
export default Play;