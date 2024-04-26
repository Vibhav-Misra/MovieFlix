var slideIndex = 0;
showSlides();

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("movie-item");
    if (slideIndex >= slides.length) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = slides.length - 1; }
    
    for (i = 0; i < slides.length; i++) {
      slides[i].style.zIndex = "1"; 
      slides[i].classList.remove("active");
    }
  
    slides[slideIndex].style.zIndex = "2";
    slides[slideIndex].classList.add("active");
  }
setInterval(function() { plusSlides(1); }, 5000);
