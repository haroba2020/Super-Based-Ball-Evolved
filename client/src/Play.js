import { useState, useEffect, useRef } from "react"
import { playerA, playerB } from './playerData'
import { game } from './game'

//Exports all the gifs into a variable.
export const GIF_DATA = (function () {
    let arr = []
    for (let i = 1; i <= 7; i++) {
        let tmpImg = require(`./assets/Gifs/${i}.gif`)
        arr.push(tmpImg)
    }
    return arr
})()


const Play = () => {


    //useStates used to change sprites and the DOM.
    const [ballState, setBallState] = useState(20);

    const [player1, setPlayer1] = useState(GIF_DATA[0]);
    const [player2, setPlayer2] = useState(GIF_DATA[1]);
    const [ballSprite, setBallSprite] = useState(GIF_DATA[4])
    const [ballSize, setBallSize] = useState(60)
    const [score, setScore] = useState(0)
    const [ballDirection, setBallDirection] = useState('')

    const [player1Stat, setPlayer1Stat] = useState(' ');
    const [player2Stat, setPlayer2Stat] = useState(' ');

    const requestRef = useRef();
    const ballStateRef = useRef(ballState);


    const updateBallState = (timestamp) => {
        if (!game.pause) {
            const location = ballStateRef.current;
            const timeElapsed = timestamp - lastTimestampRef.current;

            const distanceMoved = timeElapsed * game.velocity / 14; //Divides game velocity so that the ball moves slower, this is easily adjustable
            if (game.ballDirection) {
                setBallState((prevState) => prevState + distanceMoved);
            } else {
                setBallState((prevState) => prevState - distanceMoved);
            }

            if (game.ballOnScreen(location)) {
                //Get values from the reset game function and handles theme, while reseting other values.
                const matchData = game.restartGame()
                console.log(matchData)
                setBallState(matchData[0])
                setBallSprite(matchData[1])
                setBallSize(matchData[2])
                if (matchData[3]) {
                    if (matchData[4]) {
                        setPlayer1Stat('win')
                        setPlayer2Stat('lose')
                        console.log('player 1 wins')
                    } else {
                        setPlayer1Stat('lose')
                        setPlayer2Stat('win')
                        console.log('player 2 wins')
                    }
                }
            }
        }
        //Makes updateBallState function run every frame
        lastTimestampRef.current = timestamp;
        requestRef.current = requestAnimationFrame(updateBallState);
    };
    //makes the frames the same for each computer
    let lastTimestampRef = useRef(performance.now());

    //A function that makes sure all the sprites are correct.
    function handleSprite(size, sprite, direction) {
        setBallSize(size)
        setBallSprite(sprite)
        setScore(game.hits)
        setPlayer1Stat(' ')
        setPlayer2Stat(' ')
        if (direction) {
            setBallDirection('flip')
        } else {
            setBallDirection(' ')
        }

    }
    //idk something that makes the values update in request animation frame.
    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateBallState);
        return () => cancelAnimationFrame(requestRef.current);
    }, [ballState]);
    //always sets ballStateRef to the current version of ballState so that it's updated whenever you call it
    useEffect(() => {
        ballStateRef.current = ballState;
    }, [ballState]);
    //A event listener inside a useEffect so thats not rendered each time the ballState gets updated, this is good for performance.
    useEffect(() => {
        console.log('use effect ran!')
        setBallState(20)
        console.log(GIF_DATA)
        document.addEventListener("keydown", function (e) {
            if (e.key === "d" && !playerA.cooldown) {
                setPlayer1(GIF_DATA[2])
                console.log('u pressed a button lmao')
                //Switches the cooldown so that you can't spam the ball and a setTimeout to make sure that it's switches back after a second passes
                playerA.switchCooldown();
                setTimeout(() => {
                    setPlayer1(GIF_DATA[0])
                    playerA.switchCooldown()
                }, 1000)

                // A setimeout that delays the hit by 300 miliseconds
                setTimeout(() => {
                    //Get the current value of ballState and pass it into aHitStart and handle the values returned
                    const location = ballStateRef.current;
                    console.log(location)
                    playerA.aHitStart(location).then((value) => {
                        if (value) {
                            handleSprite(value.size, value.sprite, true)
                        } else {
                            console.log('u missed lmao')
                        }
                    })
                }, 300)

                // basically the same code but with player B instead of player A
            } else if (e.key === "k" && !playerB.cooldown) {
                setPlayer2(GIF_DATA[3])
                playerB.switchCooldown();
                setTimeout(() => {
                    setPlayer2(GIF_DATA[1])
                    playerB.switchCooldown()
                }, 1000)
                setTimeout(() => {
                    const location = ballStateRef.current;
                    playerB.bhitStart(location).then((value) => {
                        if (value) {
                            handleSprite(value.size, value.sprite, false)
                        } else {
                            console.log('u missed lmao')
                        }
                    })
                }, 300)
            } else if (e.key === " ") {
                console.log(e.key)
                game.restartGame()
            }
        });
    }, []);
    return (
        <div className="play">
            <div className="game-container">
                <div className="player-container">
                    <img src={player1} className='flip player player1' alt="player1" />
                    <img src={player2} className=' player player2' alt="player2" />
                    <img className={`baseball ${ballDirection}`} alt="ball" src={ballSprite} style={{ left: ballState + '%', width: ballSize }} />
                    <h1 className="score">{score}</h1>
                </div>
                <h1 className="winloss1">{player1Stat}</h1>
                <h1 className="winloss2">{player2Stat}</h1>
            </div>
        </div>
    );
}

export default Play;