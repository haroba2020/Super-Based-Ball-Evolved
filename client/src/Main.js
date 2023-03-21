import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

const Main = () => {

  return (
    <div className="main">
      <ul className="list">
        <li><Link to="/play">GAME START</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
      </ul>
    </div>);
}
 
export default Main;