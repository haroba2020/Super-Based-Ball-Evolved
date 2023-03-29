import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { rtcURL } from "./constants"
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

const PlayOnline = () => {
    const {roomID} = useParams()

    const [isReady, setIsReady] = useState(false)
    const [playerSelect, setPlayerSelect] = useState()
    const [playerReadyA, setPlayerAReady] = useState()
    const [playerReadyB, setPlayerBReady] = useState()
    const [gameOn, setGameOn] = useState(false)
    //useStates used to change sprites and the DOM.
    const [ballState, setBallState] = useState(20);

    const [player1, setPlayer1] = useState(GIF_DATA[0]);
    const [player2, setPlayer2] = useState(GIF_DATA[1]);
    const [ballSprite, setBallSprite] = useState(GIF_DATA[4])
    const [ballSize, setBallSize] = useState(60)
    const [score, setScore] = useState(0)
    const [ballDirection, setBallDirection] = useState('')

    const [playerWinStat, setPlayerWinStat] = useState(' ');

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
                        setPlayerWinStat('PLAYER 1 WINS')
                        console.log('PLAYER 1 WINS')
                    } else {
                        setPlayerWinStat('PLAYER 2 WINS')
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

    function handleSprite(size, sprite, direction) {
        setBallSize(size)
        setBallSprite(sprite)
        setScore(game.hits)
        setPlayerWinStat(' ')

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
        if(gameOn){
            setBallState(20)
            console.log(GIF_DATA)
            const handleKeyDown = (e) => {
                if (e.key === " " && !playerA.cooldown && playerSelect === 'A' ) {
                    sendMessage(JSON.stringify({command:"aHit"}))

                    // basically the same code but with player B instead of player A
                } else if (e.key === " " && !playerB.cooldown && playerSelect === 'B') {
                    sendMessage(JSON.stringify({command:"bHit"}))
                }
            };
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                console.log('Event listener removed!');
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [gameOn]);




    const { sendMessage, lastMessage, readyState } = useWebSocket(rtcURL)
    const [hasConnected, setHasConnected] = useState();
    if (!hasConnected && readyState == ReadyState.OPEN) {
        sendMessage(roomID)
        sendMessage(JSON.stringify({Message:"A new opponent has entered the arena"}))
        sendMessage(JSON.stringify({command:""}))
        setHasConnected(true);
    }
    useEffect(()=>{
        if(lastMessage===null){
            return
        }
        let data = JSON.parse(lastMessage.data)
        if(data.command === 'readyA'){
            console.log('Player A Is ready')
            setPlayerAReady(true)
        }
        if(data.command === 'notReadyA'){
            console.log('Player A Is not ready')
            setPlayerAReady(false)
        }
        if(data.command === 'readyB'){
            console.log('Player B Is ready')
            setPlayerBReady(true)
        }
        if(data.command === 'notReadyB'){
            console.log('Player B Is not ready')
            setPlayerBReady(false)
        }
        if(data.command === 'gameOn'){
            console.log('THE GAME HAS STARTED')
            setGameOn(true)
        }
        if(data.command === 'aHit'){
            setPlayer1(GIF_DATA[2])
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
        }
        if(data.command === 'bHit'){
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
        }
        
        if(data.Message){
            console.log(data.Message)
        }
    },[lastMessage])
    function readyUp(player){
        if(!isReady){
            setPlayerSelect(player)
            setIsReady(true)
            sendMessage(JSON.stringify({command:`ready${player}` }))
        }else if(isReady){
            setIsReady(false)
            sendMessage(JSON.stringify({command:`notReady${player}` }))
            setPlayerSelect('')
        }
    }
    function startGame(){
        sendMessage(JSON.stringify({command:`gameOn` }))
    }
    return (
        <div className="play-online">
            {!gameOn && <div className="matchmaking">
                <br />
                {(playerSelect === 'A' || (playerSelect !== 'B' && !playerReadyA )) && <button onClick={() => readyUp('A')}> Select Player A </button>}
                {(playerSelect === 'B' || (playerSelect !== 'A' && !playerReadyB )) && <button onClick={() => readyUp('B')}> Select Player B </button>}
                {((playerReadyA && playerReadyB )) && <h1 onClick={() => startGame()}> START GAME </h1>}
                <h1></h1>
            </div>}
            { gameOn && <div className="play">
                <div className="player-container">
                    <img src={player1} className='flip player player1' alt="player1" />
                    <img src={player2} className=' player player2' alt="player2" />
                    <img className={`baseball ${ballDirection}`} alt="ball" src={ballSprite} style={{ left: ballState + '%', width: ballSize }} />
                    <h1 className="score">{score}</h1>
                    <h1 className="playerWinStat">{playerWinStat}</h1>
                </div>
            </div>}
        </div>
     );
}
 
export default PlayOnline;