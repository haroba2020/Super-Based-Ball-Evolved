import { useState, useEffect } from "react";
import { music, game } from './game'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

const Main = () => {
  const access_token = Cookies.get('access_token');
  const refresh_token = Cookies.get('refresh_token',);
  console.log(access_token, refresh_token);
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
      <div className="main-container">
        <div className="front-left-container">
          <div className="border-image-container cool-border">
            <img className="cool-border" src="/img/baseballtrol.png" alt="" />
          </div>
          <div className="front-div-container">
            <div className="stats-container cool-border">
              <ul className="list">
                <li><Link to="/play">GAME START</Link></li>
                <li><Link to="/rooms">ROOMS</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/login">LOGIN</Link></li>
                <li><Link to="/signup">SIGNUP</Link></li>
              </ul>
            </div>
            <div className="skin-container cool-border">
              <img src="/img/troll-face.gif" alt="skin" />
            </div>
          </div>
        </div>
        <div className="front-right-container">
          <div className="video-container cool-border">

          </div>
          <div className="img-container"></div>
            <img className="basedball-title" src="/img/SuperBasedBallTitle.png" alt="" />
            <img className="basedball-info" src="/img/SuperBasedBallInfo.png" alt="" />
        </div>
      </div>  
    </div>);
}
 
export default Main;