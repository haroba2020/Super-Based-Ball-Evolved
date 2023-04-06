import useSWR from 'swr'
import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom'
import { apiURL } from "./constants";

const fetcher = (...args) => fetch(...args).then(res => res.json())


const Rooms = () => {

    const { data: rooms, mutate } = useSWR(`${apiURL}/matchmaking`, fetcher)

    async function createRoom(){
        const name = lobbynameRef.current.value
        const response = await fetch(`${apiURL}/matchmaking?name=${encodeURIComponent(name)}`, {method: "POST"});
        const lobby = await response.json();
        mutate([...rooms, lobby])
    }

    

    // useEffect(() => {
    //     async function gay(){
    //         console.log('I love men')
    //         let response = await fetch(`${apiURL}/matchmaking`)
    //         setRooms(await response.json())
    //         console.log(rooms)
    //     }
    //     gay()
    // }, [])
    const lobbynameRef = useRef(null)
    return (
        <div className="rooms-container">
            <h1 className="title">Select room to begin</h1>
            <div>
                {rooms?.map(room => (
                    <Link to={`/playOnline/${room.name}` }><h1> {room.name}</h1></Link>
                ))}
            </div>
            <input type="text" ref={lobbynameRef}/>
            <Link to="/rooms"><button onClick={createRoom}> Button swag </button></Link>
        </div>
    );
}

export default Rooms;