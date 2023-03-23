import { useState, useEffect } from "react";
import { music, game } from './game'
import { Link } from 'react-router-dom'

const Main = () => {

  function MyComponent() {
    useEffect(() => {
      // Your function here
      game.restartGame()
      music.list[music.rNumber].volume = 0
      console.log('Component loaded!');
    },[]); // Empty dependency array ensures the function only runs once
  }  
MyComponent()
  return (
    <div className="main">
      <ul className="list">
        <li><Link to="/play">GAME START</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
      </ul>
    </div>);
}
 
export default Main;