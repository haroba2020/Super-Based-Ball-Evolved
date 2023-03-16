import { useState, useEffect } from "react";

const Main = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  const showSlides = (n) => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
  
    if (n > slides.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(slides.length);
    } else {
      setSlideIndex(n);
    }
  
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.opacity = 0;
      slides[i].style.display = "none";
    }
  
    const currentSlide = slides[slideIndex - 1];
    currentSlide.style.display = "block";
  
    // Trigger reflow to enable fade animation
    void currentSlide.offsetWidth;
  
    currentSlide.style.opacity = 1;
  
    // Remove the "active" class from all the dots
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }
  
    // Add the "active" class to the dot corresponding to the current slide
    dots[slideIndex - 1].classList.add("active");
  };

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  return (
    <div className="main">
      <section className="container">
        <div className="carousel-container">
          <div className="mySlides fade">
            <div className="numbertext center-element">
              <img src="./img/1.jpg" width="500px" height="500px" />
            </div>
            <div className="text">
              <p>problem??</p>
            </div>
          </div>
          <div className="mySlides fade">
            <div className="numbertext center-element">
              <img src="./img/2.jpg" width="500px" height="500px" />
            </div>
            <div className="text">
              <p>hmmmmmm</p>
            </div>
          </div>
          <div className="mySlides fade">
            <div className="numbertext center-element">
              <img src="./img/3.jpg" width="500px" height="500px"/>
            </div>
            <div className="text">
              <p>LMAOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p>
            </div>
          </div>
          <div className="mySlides fade">
            <div className="numbertext center-element">
              <img src="./img/4.jpg" width="500px" height="500px" />
            </div>
            <div className="text">
              <p>hva faen man......</p>
            </div>
          </div>
          <a className="prev" onClick={() => plusSlides(-1)}>
            &#10094;
          </a>
          <a className="next" onClick={() => plusSlides(1)}>
            &#10095;
          </a>
        </div>
        <div className="center-element">
          <span className="dot" onClick={() => currentSlide(1)}></span>
          <span className="dot" onClick={() => currentSlide(2)}></span>
          <span className="dot" onClick={() => currentSlide(3)}></span>
          <span className="dot" onClick={() => currentSlide(4)}></span>
        </div>
      </section>
      <div>
        <p className="center-element large-font small-margin">Would you like to know more?</p>
        <p className="center-element large-font small-margin">Please refer to our About Us page!</p>
      </div>
    </div>);
}
 
export default Main;