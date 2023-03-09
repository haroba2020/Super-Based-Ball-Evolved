const Main = () => {
    return (
    <div class="main"><section class="container">
        <div class="carousel-container">
            <div class="mySlides fade">
              <div class="numbertext center-element">
                <img src="./img/fetchimage.jpg" width="500px" height="500px"/>
              </div>
              <div class="text"><p>problem??</p></div>
            </div>
            <div class="mySlides fade">
              <div class="numbertext center-element">
                <img src="./img/lmao.jpg" width="500px" height="500px"/>
              </div>
              <div class="text"><p>hmmmmmm</p></div>
            </div>
            <div class="mySlides fade">
              <div class="numbertext center-element">
                <img src="./img/trollmask.jpg" width="500px" height="500px"/>
              </div>
              <div class="text"><p>LMAOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p></div>
            </div>
            <div class="mySlides fade">
              <div class="numbertext center-element">
                <img src="./img/troll.jpg" width="500px" height="500px"/>
              </div>
              <div class="text"><p>hva faen man......</p></div>
            </div>
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </div>
        <br/>
        <div class="center-element">
          <span class="dot" onclick="currentSlide(1)"></span>
          <span class="dot" onclick="currentSlide(2)"></span>
          <span class="dot" onclick="currentSlide(3)"></span>
          <span class="dot" onclick="currentSlide(4)"></span>
        </div>
      </section>
  
      <div>
        <p class="center-element large-font">Would you like to know more?</p>
        <p class="center-element large-font">Please refer to our <a href="./about.html" style="text-decoration:none;color:blue;">About Us</a> page!</p>
      </div>
    </div>);
}
 
export default Main;