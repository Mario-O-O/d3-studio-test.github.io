let select = document.getElementById("locales");

function imgOnOff() {
  let $contImgLight = document.querySelectorAll(".imgGaleriaMd");
  let $contImgDark = document.querySelectorAll(".imgGaleriaDK");
  let $btnActiveDK = document.querySelector(".switchDK");
  let onOffimg = false;
  
  select.addEventListener("change", function () {
    $contImgLight = document.querySelectorAll(".imgGaleriaMd");
    $contImgDark = document.querySelectorAll(".imgGaleriaDK");
    $btnActiveDK = document.querySelector(".switchDK");
    onOffimg = false;

    document.querySelector(".switchDK").classList.remove('moon');
    document.querySelector(".switchDK").classList.add('sun');
  });
  
  const lightModeIMG = function() {
    $contImgLight.forEach(el => {
      el.style.display = "initial";
    });
    $contImgDark.forEach(el => {
      el.style.display = "none";
    });
    console.log("light");
    $btnActiveDK.classList.remove('moon');
    $btnActiveDK.classList.add('sun');
    onOffimg = false;
  }
  
  const darkModeIMG = function() {
    $contImgLight.forEach(el => {
      el.style.display = "none";
    });
    $contImgDark.forEach(el => {
      el.style.display = "initial";
    });
    $btnActiveDK.classList.remove('sun');
    $btnActiveDK.classList.add('moon');
    console.log("dark");
    onOffimg = true;
  }
  
  // console.log('test desde funcion imgOnOff');
  document.addEventListener("click", function(e) {
    if (e.target === $btnActiveDK) { (onOffimg === false) ? darkModeIMG() : lightModeIMG(); } 
  });
}

setTimeout(() => {
  imgOnOff();
}, 600);

// Open the Modal
function openModal() {
  document.getElementById("myModal").classList.add("modalOn");
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").classList.remove("modalOn");
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.querySelectorAll(".mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  try {
    slides[slideIndex-1].style.display = "flex";
  } catch (error) {}
}


select.addEventListener("change", function () {
  
  // Open the Modal
  function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  // Close the Modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  var slideIndex = 1;
  showSlides(slideIndex);
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.querySelectorAll(".mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    // console.log(slides);
    slides[slideIndex-1].style.display = "flex";
  }

});