import { useEffect, useState, useRef } from "react";
import { apiURL } from "./constants";
const Rooms = () => {
    const [rooms, setRooms] = useState([]);


    async function createRoom(){
        const name = lobbynameRef.current.value
        const response = await fetch(`${apiURL}/matchmaking?name=${encodeURIComponent(name)}`, {method: "POST"});
        const lobby = await response.json();

        console.log(lobby)
    }

    useEffect(() => {
        async function gay(){
            console.log('I love men')
            let response = await fetch(`${apiURL}/matchmaking`)
            setRooms(await response.json())
            console.log(rooms)
        }
        gay()
    }, [])
    const lobbynameRef = useRef(null)
    return (
        <div className="FUCK OFF">
            <h1>GAMING</h1>
            <div>
                {rooms.map(room => (
                    <h1>{room.name}</h1>
                ))}
            </div>
            <input type="text" ref={lobbynameRef}/>
            <button onClick={createRoom}> Button swag </button>
        </div>
    );
}

export default Rooms;