import { Link } from 'react-router-dom'
import { useState } from "react"
const Main = () => {

    return (
    <div className="main"><section className="container">
        <div className="carousel-container">
            <div className="mySlides fade">
              <div className="numbertext center-element">
                <img src="./img/fetchimage.jpg" width="500px" height="500px"/>
              </div>
              <div className="text"><p>problem??</p></div>
            </div>
            <div className="mySlides fade">
              <div className="numbertext center-element">
                <img src="./img/lmao.jpg" width="500px" height="500px"/>
              </div>
              <div className="text"><p>hmmmmmm</p></div>
            </div>
            <div className="mySlides fade">
              <div className="numbertext center-element">
                <img src="./img/trollmask.jpg" width="500px" height="500px"/>
              </div>
              <div className="text"><p>LMAOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p></div>
            </div>
            <div className="mySlides fade">
              <div className="numbertext center-element">
                <img src="./img/troll.jpg" width="500px" height="500px"/>
              </div>
              <div className="text"><p>hva faen man......</p></div>
            </div>
            {/* <a className="prev" onClick={PlusSlides(-1)}>&#10094;</a>
            <a className="next" onClick={PlusSlides(1)}>&#10095;</a> */}
        </div>
        <br/>
        <div className="center-element">
          {/* <span className="dot" onClick={currentSlide(1)}></span>
          <span className="dot" onClick={currentSlide(2)}></span>
          <span className="dot" onClick={currentSlide(3)}></span>
          <span className="dot" onClick={currentSlide(4)}></span> */}
          <img src="./img/fetchimage.jpg" width="500px" height="500px"/>
        </div>
      </section>

      <div>
        <p className="center-element large-font">Would you like to know more?</p>
        <p className="center-element large-font">Please refer to our About Us page!</p>
      </div>
    </div>);
}
 
export default Main;