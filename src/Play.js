import { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom'
import { playerA, playerB } from './playerData'
import { game } from './game'

export const GIF_DATA = (function () {
    let arr = []
    for (let i = 1; i <= 7; i++) {
        let tmpImg = require(`./assets/Gifs/${i}.gif`)
        arr.push(tmpImg)
    }
    return arr
})()


const Play = () => {

    const [ballState, setBallState] = useState(20);

    const [player1, setPlayer1] = useState(GIF_DATA[0]);
    const [player2, setPlayer2] = useState(GIF_DATA[1]);
    const [ballSprite, setBallSprite] = useState(GIF_DATA[4])
    const [ballSize, setBallSize] = useState(60)
    const [score, setScore] = useState(0)
    const [ballDirection, setBallDirection] = useState('')

    const [player1Stat, setPlayer1Stat] = useState('');
    const [player2Stat, setPlayer2Stat] = useState('');

    const requestRef = useRef();
    const ballStateRef = useRef(ballState);
    const inputRef = useRef();


    const updateBallState = (timestamp) => {
        if (!game.pause) {
            const location = ballStateRef.current;
            const timeElapsed = timestamp - lastTimestampRef.current;
            const distanceMoved = timeElapsed * game.velocity / 12;
    
            if (game.ballDirection) {
                setBallState((prevState) => prevState + distanceMoved);
                console.log(game.ballDirection)
            } else {
                setBallState((prevState) => prevState - distanceMoved);
                console.log('fuck it we ball')
            }
    
            if (game.ballOnScreen(location)) {
                const matchData = game.restartGame()
                console.log(matchData)
                setBallState(matchData[0])
                setBallSprite(matchData[1])
                setBallSize(matchData[2])
                if(matchData[3]){
                    if(matchData[4]){
                        setPlayer1Stat('win')
                        setPlayer2Stat('lose')
                        console.log('player 1 wins')
                    }else{
                        setPlayer1Stat('lose')
                        setPlayer2Stat('win')
                        console.log('player 2 wins')
                    }
                }
            }
        }
    
        lastTimestampRef.current = timestamp;
        requestRef.current = requestAnimationFrame(updateBallState);
    };
    
    let lastTimestampRef = useRef(performance.now());
    
    function handleSprite(size, sprite, direction){
        setBallSize(size)
        setBallSprite(sprite)
        setScore(game.hits)
        if (direction) {
            setBallDirection('flip')
        } else {
            setBallDirection(' ')
        }

    }
    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateBallState);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    useEffect(() => {
        ballStateRef.current = ballState;
    }, [ballState]);
    useEffect(() => {
        document.addEventListener("keydown", function (e) {
            const location = ballStateRef.current;

            if (e.key === "d" && playerA.cooldown === false) {
                setPlayer1(GIF_DATA[2])
                playerA.switchCooldown();
                setTimeout(() => {
                    setPlayer1(GIF_DATA[0])
                    playerA.switchCooldown()
                }, 1000)
                setTimeout(() => {
                    playerA.aHitStart(location).then((value) => {
                        console.log(value)
                        handleSprite(value.size, value.sprite, true)
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
                    playerB.bhitStart(location).then((value) => {
                        handleSprite(value.size, value.sprite, false)
                    })
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
                    <h1 className="gameFinal play1Stat ">{player1Stat}</h1>
                </div>
                <div className="text-center white-space">
                    <Link to="/home" className='title'>Exit</Link>
                </div>
                <div className="flex-player">
                    <h1 className="gameFinal play2Stat ">{player2Stat}</h1>
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
                <h1 className="score">{score}</h1>
            </div>
            <img className={`baseball ${ballDirection}`} alt="ball"  src={ballSprite} style={{ left: ballState + '%', width: ballSize  }} />
        </div>
    );
}

export default Play;