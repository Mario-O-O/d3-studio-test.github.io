
const d = document;
const w = window;

// MENU
function navMenu(linea, classLi) {
  let $line = d.querySelector(linea),
      $aTarget = d.querySelectorAll(classLi);

  let URLactual = window.location;

  let $leave = d.querySelector(".leave");
  let $leave2 = d.querySelector(".leave-2");

  const recLeftBottom = function() {        
      let $active = d.querySelector(".active"),
      recLeft = $active.getBoundingClientRect().left,
      recBottom = $active.getBoundingClientRect().bottom + 5;
      $line.style.left = `${recLeft}px`;
      $line.style.top = `${recBottom}px`;
  }

  recLeftBottom();

  switch (URLactual.pathname) {
    case '/d3-studio-test.github.io/index.html':
      $aTarget.forEach(function(el) { el.classList.remove("active") });
      $aTarget[0].classList.add("active");
      recLeftBottom();
      break;
    case '/d3-studio-test.github.io/servicios.html':
      $aTarget.forEach(function(el) { el.classList.remove("active") });
      $aTarget[1].classList.add("active");
      recLeftBottom();
      break;
    case '/d3-studio-test.github.io/proyectos.html':
      $aTarget.forEach(function(el) { el.classList.remove("active") });
      $aTarget[2].classList.add("active");
      recLeftBottom();
      break;
    case '/d3-studio-test.github.io/contacto.html':
      $aTarget.forEach(function(el) { el.classList.remove("active") });
      $aTarget[3].classList.add("active");
      recLeftBottom();
      break;
  
    default:
      break;
  }

  d.addEventListener("click", function(e) {
      if (e.target.matches(classLi)) {
          $aTarget.forEach(function(el) { el.classList.remove("active") });
          e.target.classList.add("active");
          recLeftBottom();
      }

      d.querySelectorAll(".cont_menu ul li a").forEach(el => {   
        setTimeout(() => {   
          if (e.target.dataset.link === el.dataset.link && e.target.matches(".link-app")) {
            el.click();
          }
        }, 600);
      });

      if (e.target.matches(".cont_menu ul li a")) {
        recLeftBottom();
        e.preventDefault();
        
        setTimeout(() => { $leave2.classList.add("leaveOn"); }, 400);
        setTimeout(() => { $leave.classList.add("leaveOn"); }, 500);

        setTimeout(()=> location.href = e.target.getAttribute("href"),2000);
      }
  });
  
  d.addEventListener("mouseover", function(e) {
      (e.target.matches(classLi)) ? $line.style.left = `${e.target.getBoundingClientRect().left}px` : recLeftBottom();
  });


  // CAMBIAR AL HACER SCROLL
  function cambiarAlScroll(bgMenu) {
      
      let scrolldett = window.scrollY,
          $menuNav = d.querySelector(bgMenu),
          logoHeight = 0.1;
  
      const addClass = function(){ 
          $menuNav.classList.add("menuOn");
          setTimeout(() => { recLeftBottom(); }, 600);
      }
      const removeClass = function(){ 
          $menuNav.classList.remove("menuOn");
          recLeftBottom();
      }
  
      window.addEventListener('scroll', function() { 
          scrolldett = window.scrollY;
          (scrolldett >= logoHeight) ? addClass() : removeClass();
          if (scrolldett >= 0 && scrolldett < 5) {
              $line.classList.add("op");
              setTimeout(() => { $line.classList.remove("op"); }, 600);
          }
      });
  }
  
  cambiarAlScroll(".menu");
}
// FIN CAMBIAR AL HACER SCROLL

function darkMode(btn, classDark) {
  let $themeBtn = d.querySelector(btn),
      $body = d.querySelector('body'),
      onOff = false,
      date = new Date();
    
    const lightMode = function() {
      $body.classList.remove(classDark);
      onOff = false;
    }
    
    const darkMode = function() {
      $body.classList.add(classDark);
      onOff = true;
    }

    d.addEventListener("click", function(e) {
      if (e.target.matches(btn) || e.target.matches(`${btn} *`)) { (onOff === false) ? darkMode() : lightMode(); } 
    });

    // hora = date.getHours();
   
    // if(hora >= 0 && hora < 18){
    //   lightMode();
    //   console.log(date.getHours(), 'luz');
    // }
   
    // if(hora >= 18 && hora < 24){
    //   darkMode();
    //   console.log(date.getHours(), 'noche');
    // }

}
// End MENU

// MENU HAMBURGUESA
function munuHamburguesa() {
  let  $menuMobile = d.querySelector('.menuMobile'),
  onOffMenu = false,
  $lineMenu = d.querySelectorAll('.lineMneu'),
  $elMenu = d.querySelector('.menu'),
  $elBody = d.querySelector('body'),
  $menuFloat = d.querySelector('.menuDesk');
 
  function menuOn() {
    $menuFloat.classList.add("menuOn");
    $elMenu.classList.add("menuXon");
    $elBody.classList.add("hidden");
    $menuMobile.classList.add("Xon");
    onOffMenu = true;
  }
 
  function menuOff() {
    $menuFloat.classList.remove("menuOn");
    $elMenu.classList.remove("menuXon");
    $elBody.classList.remove("hidden");
    $menuMobile.classList.remove("Xon");
    onOffMenu = false;
  }

  d.addEventListener('click', function(e) {
    if (e.target === $menuMobile || e.target === $lineMenu[0] || e.target === $lineMenu[1] || e.target === $lineMenu[2]) { (onOffMenu === false) ? menuOn() : menuOff(); } 
    if (e.target.matches(".cont_menu ul li a")) {
      menuOff();
    }
  })
}
// END MENU HAMBURGUESA

// OBTENER BG
function obtenerBG() {
  let slideBG = d.querySelectorAll(".slide"),
  slideBGscr = d.querySelectorAll(".slideBG-desk");

  for (let i = 0; i < slideBGscr.length; i++) {
    slideBG[i].style.backgroundImage = `url(${slideBGscr[i].currentSrc})`;
  }
}
// End OBTENER BG

// SLIDER
class Sliders {
  
  constructor({id_sliders, num_sliders, animacion, tipo_animacion, tiempo_slide, velocidad_slide, dots, flechas, prevNext}){
    // Ajustes
    this.id_sliders = document.getElementById(id_sliders);
    this.num_sliders = num_sliders || 1;
    this.animacion = animacion || false;
    this.tipo_animacion = tipo_animacion || 'linear';
    this.tiempo_slide = tiempo_slide || 5000;
    this.velocidad_slide = velocidad_slide || .6;
    this.dots = dots || false;
    this.flechas = flechas || false;
    this.prevNext = prevNext || false;
  };

  slideOn(){
    // Variables
    let idSliders = this.id_sliders;
    let sliderItems = this.id_sliders.querySelector('.slides');
    let slideSolo = this.id_sliders.querySelectorAll('.slide');
    let anchoSliders = this.id_sliders.offsetWidth;

    let prev = this.id_sliders.querySelector('.prev');
    let next = this.id_sliders.querySelector('.next');
    let btnPuse = this.id_sliders.querySelector(".pauseBtn");

    let animacionSlide = this.animacion;
    let tipoAnimacion = this.tipo_animacion;
    let velocidadSlide = this.velocidad_slide;
    let tiempoSlide = this.tiempo_slide;
    let dots = this.dots;
    let flechas = this.flechas;
    let prevNext = this.prevNext;
    
    let $dot = this.id_sliders.querySelector(".dots");
    let $flechas = idSliders.querySelectorAll(`.control`);

    // Ancho slide
    for (var i = 0; i < slideSolo.length; i++) {
      slideSolo[i].style.width = anchoSliders / this.num_sliders + 'px';
    }

    // Ancho slide responsive
    function slideResponsive(x) {
      for (var i = 0; i < slideSolo.length; i++) {
        if (x.matches) {
          slideSolo[i].setAttribute('style', 'width:' + anchoSliders / 1 + 'px;');
        }
      }
    }

    let x = window.matchMedia("(max-width: 700px)")
    slideResponsive(x);
    x.addListener(slideResponsive);

    // Agregar Dots
    if (dots === true) {
      for (let i = 0; i < slideSolo.length; i++) {
        let $newDot = document.createElement("div");
        $newDot.classList.add('dot');
        $dot.insertBefore($newDot, $dot.firstElementChild);
      }
    }

    // Agregar Flechas
    if (flechas === false) {  $flechas.forEach(el => { el.style.display = "none"; }); }

    function slide() {
      let posX1 = 0,
          posX2 = 0,
          posInitial,
          posFinal,
          threshold = 100,
          slides = slideSolo,
          slidesLength = slides.length,
          slideSize = slideSolo[0].offsetWidth,
          index = 0,
          allowShift = true,

          firstSlide = slides[0],
          lastSlide = slides[slidesLength - 1],
          cloneLast = lastSlide.cloneNode(true),

          ind = 0,
          dot = idSliders.querySelectorAll(`.dot`),

          onOffSlide = false;

      // clonar
      for (let i = 0; i < slides.length; i++) {
        let allSlide = slides[i];
        let cloneAllSlide = allSlide.cloneNode(true);
        sliderItems.appendChild(cloneAllSlide);
      }
      sliderItems.insertBefore(cloneLast, firstSlide);

      sliderItems.style.left = `-${slideSize}px`;
      if (dots === true) {  
        dot[0].classList.add("active");
      }

      function stopInterval() {
        (prevNext === true) ? next.click() :  prev.click();}
      let myTimer = setInterval(stopInterval, tiempoSlide);

      const playSlide = function() {
        myTimer = setInterval(stopInterval, tiempoSlide);
        btnPuse.classList.add("pausa");
        btnPuse.classList.remove("play");
        onOffSlide = false;
      }
  
      const pausaSlide = function() {
        clearInterval(myTimer);
        btnPuse.classList.add("play");
        btnPuse.classList.remove("pausa");
        onOffSlide = true;
      }

      // animacion
      if (animacionSlide === true) {
        stopInterval();
      }

      // evetos muose
      sliderItems.onmousedown = dragStart;

      // evetos tactil
      sliderItems.addEventListener('touchstart', dragStart);
      sliderItems.addEventListener('touchend', dragEnd);
      sliderItems.addEventListener('touchmove', dragAction);

      // eventos click
      prev.addEventListener('click', function () { shiftSlide(-1); });
      next.addEventListener('click', function () {  shiftSlide(1); });
      document.addEventListener("click", function(e) { 
        dotActive(e); 
        if (e.target === btnPuse) { (onOffSlide === false) ? pausaSlide() : playSlide(); }
      });

      // transicion de enventos
      sliderItems.addEventListener('transitionend', checkIndex);

      // funciones
      function dragStart (e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = sliderItems.offsetLeft;
    
        if (e.type == 'touchstart') {
          posX1 = e.touches[0].clientX;
        } else {
          posX1 = e.clientX;
          document.onmouseup = dragEnd;
          document.onmousemove = dragAction;
        }
      }
    
      function dragAction (e) {
        e = e || window.event;
    
        if (e.type == 'touchmove') {
          posX2 = posX1 - e.touches[0].clientX;
          posX1 = e.touches[0].clientX;
        } else {
          posX2 = posX1 - e.clientX;
          posX1 = e.clientX;
        }
        sliderItems.style.left = (sliderItems.offsetLeft - posX2) + "px";
      }
    
      function dragEnd (e) {
        posFinal = sliderItems.offsetLeft;
        if (posFinal - posInitial < -threshold) {
          shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
          shiftSlide(-1, 'drag');
        } else {
          sliderItems.style.left = (posInitial) + "px";
        }
        document.onmouseup = null;
        document.onmousemove = null;
      }

      function shiftSlide(dir, action) {
        sliderItems.classList.add('shifting');
        sliderItems.style.transition = `left ${velocidadSlide}s ${tipoAnimacion}`;

        if (allowShift) {
          if (!action) { posInitial = sliderItems.offsetLeft; }
    
          if (dir == 1) {
            sliderItems.style.left = (posInitial - slideSize) + "px";
            index++;
            dot.forEach((el, i) => {dot[i].classList.remove("active"); });
            try { dot[index].classList.add("active"); } catch (error) {}
          } else if (dir == -1) {
            sliderItems.style.left = (posInitial + slideSize) + "px";
            index--;
            dot.forEach((el, i) => {dot[i].classList.remove("active"); });
            try { dot[index].classList.add("active"); } catch (error) {}
          }
        };

        allowShift = false;
      }

      function checkIndex (){
        sliderItems.classList.remove('shifting');
        sliderItems.style.transition = `initial`;
    
        if (index == -1) {
          sliderItems.style.left = -(slidesLength * slideSize) + "px";
          index = slidesLength - 1;
          try { dot[slidesLength - 1].classList.add("active"); } catch (error) {}
        }
    
        if (index == slidesLength) {
          sliderItems.style.left = -(1 * slideSize) + "px";
          index = 0;
          try { dot[0].classList.add("active"); } catch (error) {}
        }
    
        allowShift = true;
      }

      function dotActive(e) {
        if (dots === true) {   
          for (let inde = 0; inde < dot.length; inde++) {
            if (e.target === dot[inde]) {
              dot.forEach((el, i) => { /*slides[i].classList.remove("active");*/ dot[i].classList.remove("active"); });
              dot[inde].classList.add("active");
              
              let posInitialx = slideSolo[0].offsetWidth;
              
              sliderItems.classList.add('shifting');
              sliderItems.style.left = `-${posInitialx * (inde + 1)}px`;
              sliderItems.style.transition = `left ${velocidadSlide}s ${tipoAnimacion}`;
              index = inde;

              sliderItems.classList.remove('shifting');
  
              ind = inde;

            }
          }
        }
      }

    }

    slide();
   
  }
  
}
// End SLIDER

// TABS SERVICIOS
function tabsBeneficios(btnTabs, tabs) {
  let $tabs = d.querySelectorAll(tabs),
      $btnTabs = d.querySelectorAll(btnTabs);

  for (let i = 0; i < $tabs.length; i++) {
      let a = d.createAttribute('data-link');
      $tabs[i].id = `tab${i}`;
      a.value = `tab${i}`;
      $btnTabs[i].setAttributeNode(a);
  }

  d.addEventListener('click', (e) =>{

    if (e.target.matches(btnTabs)){
        for (let i = 0; i < $tabs.length; i++) {
            $btnTabs[i].classList.remove("active");
            e.target.classList.add("active");  
            $tabs[i].classList.remove("ver");
            d.getElementById(e.target.getAttribute("data-link")).classList.add("ver");
        }
      }
    });
      
    console.log('start');
}
// FIN TABS SERVICIOS


// MODALES SERVICIOS
function modalUp() {

  let $initModal = document.querySelectorAll('.init-modal[data-modal]');

  $initModal.forEach((el, i) => {

    let $contModalAll = document.querySelectorAll('.cont-modal-all');
    let $closeX = document.querySelectorAll('.close-x');

    document.addEventListener("click", function(e) {
      
      if (e.target.dataset.modal === $initModal[i].dataset.modal) {
        e.preventDefault();
        $initModal[i].classList.add("modal-bgOn");
        $initModal[i].classList.remove("modal-bgOff");
      }

      if(e.target === $contModalAll[i] || e.target === $closeX[i]){
        e.preventDefault();
        $initModal[i].classList.remove("modal-bgOn");
        $initModal[i].classList.add("modal-bgOff");
      }

    });

  });

}
// FIN MODALES SERVICIOS
const $pupila = d.querySelector('.pupila');
const $stage = d.querySelector('.conPupila');

function eyeMove() {
  document.onmousemove = function (e) {
    let limitsEye = $pupila.getBoundingClientRect();
    let limitsStage = $stage.getBoundingClientRect();
  
    let x = `${e.clientX * 100 / window.innerWidth}%`;
    let y = `${(e.clientY * 100 / window.innerWidth) + 10}%`;
  
    $pupila.style.left = x;
    $pupila.style.top = y;
  
    (limitsEye.bottom > limitsStage.bottom) ? $pupila.style.height = '9px' : $pupila.style.height = '13px';
  }
}
// FIN OJO SIGUE MOUSE

// INSERTAR SVG
function svgInner(clase, txt) { let $svg = d.querySelectorAll(clase); $svg.forEach(e => { e.innerHTML = txt }); }
// FIN INSERTAR SVG

// FUN SLIDER
const mis_slides = [
  // Slide-1
  {
    id_sliders: "slider1",
    num_sliders: 1,
    animacion: true,
    tipo_animacion: "ease-out",
    tiempo_slide: 15000,
    velocidad_slide: 1,
    dots: true,
    flechas: true,
    prevNext: true
  },
  // Slide-2
  {
    id_sliders: "slider2",
    num_sliders: 2,
    animacion: true,
    tipo_animacion: "linear",
    tiempo_slide: 0.00000001,
    velocidad_slide: 20,
    dots: false,
    flechas: false,
    prevNext: true
  },
  // Slide-3
  {
    id_sliders: "slider3",
    num_sliders: 2,
    animacion: true,
    tipo_animacion: "linear",
    tiempo_slide: 0.00000001,
    velocidad_slide: 20,
    dots: false,
    flechas: false,
    prevNext: false
  },
]
// End FUN SLIDER
  
w.addEventListener('load', (e) =>{
  setTimeout(() => {   

    svgInner(".dTres", '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 71.6 71.6" style="enable-background:new 0 0 71.6 71.6" xml:space="preserve"><style type="text/css">.st0{fill:transparent}.st1{fill:#364259}.st2{fill:#fff}</style><g id="logBgColor"><linearGradient id="Rectángulo_1173_1_" gradientUnits="userSpaceOnUse" x1="-636.8301" y1="427.8801" x2="-635.8298" y2="427.3019" gradientTransform="matrix(69.82 0 0 -69.82 44464.3672 29890.2188)"><stop offset="0" style="stop-color:#7ceddc"/><stop offset="1" style="stop-color:#c26cef"/></linearGradient><path id="Rectángulo_1173" class="st0" d="M21,0.9h29.6c11.1,0,20.1,9,20.1,20.1v29.6c0,11.1-9,20.1-20.1,20.1H21 c-11.1,0-20.1-9-20.1-20.1V21C0.9,9.9,9.9,0.9,21,0.9z"/></g><g id="logBgTres"><path id="Trazado_1886" class="st1" d="M52.7,19.6c-0.4-0.1-0.8-0.1-1.2-0.2l-29.8-5.3c-0.9-0.2-1.9-0.2-2.8-0.2 c-2.7,0-5.1,0.6-5.1,1.3v0c0.1,0.5,1.2,0.8,2.6,1.1l19.8,3.5c6.7,1.2,12.2,5.9,14.4,12.3c3.4,0.6,6.7-1.7,7.3-5.2 C58.4,23.5,56.2,20.2,52.7,19.6L52.7,19.6z"/><g id="Grupo_3173"><g id="Grupo_3172"><path id="Trazado_1887" class="st1" d="M21.7,39.7c-0.9-0.2-1.9-0.2-2.8-0.2c-2.7,0-5.1,0.6-5.1,1.3v0.1c0.1,0.4,1.1,0.8,2.3,1 l15.4,2.7c0.4,0.1,0.8,0.1,1.2,0.1c1.9,0,3.6-0.8,4.8-2.2L21.7,39.7z"/><path id="Trazado_1888" class="st1" d="M52.7,45.2C52.4,45.1,52,45,51.6,45l-1.1-0.2c-1.8,5-5.7,9-10.6,11l10.6,1.9 c3.4,0.6,6.7-1.6,7.4-5.1C58.4,49.1,56.2,45.8,52.7,45.2L52.7,45.2z"/></g></g></g><g id="logBgD"><path id="Trazado_1889" class="st2" d="M13.8,53.5c0,0.4,1,0.8,2.4,1v0l13.1,2.3c10.2,1.9,20-4.8,21.9-15c1.9-10.2-4.8-20-15-21.9 l0,0l-19.8-3.5c-1.4-0.2-2.6-0.6-2.6-1.1V28c0,0.4,1.1,0.8,2.3,1l17.7,3.1c3.4,0.6,5.7,3.9,5.1,7.3c-0.5,3-3.2,5.2-6.2,5.2 c-0.4,0-0.8,0-1.2-0.1l-15.4-2.7c-1.3-0.2-2 4-0.6-2.4-1.1L13.8,53.5z"/></g></svg>');
    svgInner(".dTres_txt", '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 60 18.6" style="enable-background:new 0 0 60 18.6;" xml:space="preserve"><style type="text/css">.stLine{fill:#C26CEF;}.st1{fill:#364259;}</style><g id="logLine"><g id="Grupo_3177"><rect id="Rectángulo_1175" x="26" y="17.3" class="stLine" width="8" height="1"/></g></g><g id="logTxt"><g>   <path id="Trazado_1891" class="st1" d="M56.3,3.6h-0.6c-1.6,0-2.9,1.3-2.9,2.9v1.5c0,1.6,1.3,2.9,2.9,2.9h0.6c1.6,0,2.9-1.3,2.9-2.9V6.6C59.2,5,57.9,3.6,56.3,3.6z M58.2,8.1c0,1-0.9,1.9-1.9,1.9l0,0h-0.6c-1,0-1.9-0.9-1.9-1.9c0,0,0,0,0,0V6.6c0-1,0.9-1.9,1.9-1.9l0,0h0.6c1,0,1.9,0.9,1.9,1.9c0,0,0,0,0,0V8.1z"/><path id="Trazado_1892" class="st1" d="M38.3,10h-1.7c-1,0-1.7-0.8-1.7-1.7V3.7h-1v4.6c0,1.5,1.2,2.8,2.8,2.8h2.2l0.6,0V3.7h-1V10z"/><g id="Grupo_3174"><rect id="Rectángulo_1174" x="49.8" y="3.8" class="st1" width="1" height="7.2"/><path id="Trazado_1893" class="st1" d="M50.1,2.7c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1-0.1,0.2-0.1c0.1-0.1,0.2-0.2,0.2-0.4c0-0.1,0-0.1,0-0.2c0-0.1-0.1-0.1-0.1-0.2c-0.2-0.2-0.5-0.2-0.7,0c0,0.1-0.1,0.1-0.1,0.2c0,0.1,0,0.1,0,0.2C49.8,2.4,49.9,2.6,50.1,2.7L50.1,2.7z"/></g><path id="Trazado_1894" class="st1" d="M31.7,9.8c-0.2,0.1-0.4,0.2-0.6,0.2h-0.4c-0.7,0-1.3-0.6-1.3-1.3v-4h2.8v-1h-2.8V1.5l-1,0.2v7c0,1.3,1,2.3,2.3,2.3h0.4c0.4,0,0.9-0.2,1.2-0.4L31.7,9.8z"/><path id="Trazado_1895" class="st1" d="M25.5,7.4l-2.4-1.1c-0.3-0.1-0.5-0.4-0.5-0.7c0-0.4,0.4-0.8,0.8-0.8h0.9c0.4,0,0.8,0.4,0.8,0.8v0.1l1,0.2V5.6c0-1-0.8-1.8-1.8-1.8h-0.9c-1,0-1.8,0.8-1.8,1.8c0,0.7,0.4,1.4,1.1,1.7l2.4,1.1c0.3,0.2,0.5,0.5,0.5,0.8c0,0.4-0.4,0.8-0.8,0.8h-1.2c-0.5,0-0.9-0.4-0.9-0.9V9l-1-0.2v0.3c0,1,0.9,1.9,1.9,1.9l0,0h1.2c1,0,1.8-0.8,1.8-1.8C26.6,8.4,26.2,7.7,25.5,7.4z"/> <path id="Trazado_1897" class="st1" d="M46.5,0.4v3.8c-0.5-0.4-1.1-0.7-1.8-0.7h-0.2c-1.7,0-3.1,1.4-3.1,3.1v1.3c0,1.7,1.4,3.1,3.1,3.1H47l0.6,0V0.3L46.5,0.4z M46.5,9.5V10h-2c-1.1,0-2-0.9-2-2V6.7c0-1.1,0.9-2,2-2h0.2c1,0,1.8,0.8,1.8,1.8 V9.5z"/></g></g><g id="LogD3"><g><path id="Trazado_1890" class="st1" d="M4.6,1.8H2.5c-0.9,0-1.7,0.8-1.7,1.7v0v5.8c0,0.9,0.8,1.7,1.7,1.7l0,0h2.1c2.2,0,4-1.8,4-4V5.9C8.7,3.6,6.9,1.8,4.6,1.8z M7.6,7c0,1.7-1.3,3-3,3H2.5c-0.4,0-0.7-0.3-0.7-0.7V3.5c0-0.4,0.3-0.7,0.7-0.7l0,0h2.1 c1.7,0,3,1.3,3,3V7z"/><path id="Trazado_1896" class="st1" d="M14.7,1.8h-4.4l0.2,1h4.3c0.7,0,1.3,0.6,1.3,1.3v1.8h-4.3l0.2,1H16v1.8c0,0.7-0.6,1.3-1.3,1.3h-4.5v1h4.5C16,11,17,10,17,8.7V4.1C17,2.8,16,1.8,14.7,1.8z"/></g></g></svg>');
    svgInner(".d3studio", '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 176 55.2" style="enable-background:new 0 0 176 55.2;" xml:space="preserve"><style type="text/css">.st6{fill:url(#SVGID_1_);}.st5{fill:url(#SVGID_2_);}.st4{fill:#C26CEF;}.st3{fill:#404551;}</style><g id="d3"><g> <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="0.2463" y1="13.0023" x2="46.5441" y2="37.5129">   <stop  offset="0" style="stop-color:#7CEDDC"/>   <stop  offset="1" style="stop-color:#C26CEF"/> </linearGradient> <path class="st6" d="M14.1,5.8H8C5.2,5.8,3,8,3,10.7v16.9c0,2.7,2.2,4.9,4.9,4.9h6.2c6.5,0,11.8-5.3,11.8-11.8v-3.3   C25.9,11,20.6,5.8,14.1,5.8z M22.9,20.8c0,4.8-3.9,8.8-8.8,8.8H8c-1.1,0-1.9-0.9-1.9-1.9V10.7C6,9.6,6.9,8.8,8,8.8h6.2   c4.8,0,8.8,3.9,8.8,8.8V20.8z"/> <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="5.9436" y1="2.2407" x2="52.2415" y2="26.7513">   <stop  offset="0" style="stop-color:#7CEDDC"/>   <stop  offset="1" style="stop-color:#C26CEF"/> </linearGradient> <path class="st5" d="M43.6,5.8H30.6l0.5,3h12.4c2,0,3.7,1.7,3.7,3.7v5.2H34.9l0.5,3h11.9v5.2c0,2-1.7,3.7-3.7,3.7h-13v3h13   c3.7,0,6.7-3,6.7-6.7v-5.2v-3v-5.2C50.3,8.8,47.3,5.8,43.6,5.8z"/></g><g> <rect x="76.4" y="50.9" class="st4" width="23.2" height="3"/></g></g><g id="studio"><g> <path class="st3" d="M164.4,11.1h-1.7c-4.7,0-8.5,3.8-8.5,8.5V24c0,4.7,3.8,8.5,8.5,8.5h1.7c4.7,0,8.5-3.8,8.5-8.5v-4.3   C173,15,169.1,11.1,164.4,11.1z M170,24c0,3-2.5,5.5-5.5,5.5h-1.7c-3,0-5.5-2.5-5.5-5.5v-4.3c0-3,2.5-5.5,5.5-5.5h1.7   c3,0,5.5,2.5,5.5,5.5V24z"/> <path class="st3" d="M112.1,29.5h-5.1c-2.8,0-5.1-2.3-5.1-5.1V11.2h-3v13.3c0,4.5,3.6,8.1,8.1,8.1h6.4l1.6-0.1V11.2h-3V29.5z"/> <g>   <rect x="145.6" y="11.6" class="st3" width="3" height="20.9"/>   <path class="st3" d="M146.6,8.3c0.2,0.1,0.4,0.1,0.6,0.1c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.3-0.2,0.5-0.3c0.3-0.3,0.4-0.7,0.4-1.1     c0-0.2,0-0.4-0.1-0.6c-0.1-0.2-0.2-0.3-0.3-0.5c-0.6-0.6-1.6-0.6-2.2,0c-0.1,0.1-0.2,0.3-0.3,0.5c-0.1,0.2-0.1,0.4-0.1,0.6     c0,0.4,0.2,0.8,0.4,1.1C146.2,8.1,146.4,8.2,146.6,8.3z"/> </g> <path class="st3" d="M92.8,28.9c-0.5,0.4-1.1,0.6-1.7,0.6H90c-2.1,0-3.8-1.7-3.8-3.8V14.2h8.2v-3h-8.2V4.8l-3,0.5v20.5   c0,3.8,3.1,6.8,6.8,6.8h1.1c1.3,0,2.6-0.5,3.6-1.3L92.8,28.9z"/> <path class="st3" d="M74.9,22.1L68,18.9c-0.8-0.4-1.3-1.2-1.3-2.1c0-1.3,1.1-2.4,2.4-2.4h2.6c1.3,0,2.4,1.1,2.4,2.4V17l3,0.5v-0.7   c0-3-2.4-5.4-5.4-5.4H69c-3,0-5.4,2.4-5.4,5.4c0,2.1,1.2,4,3.1,4.8l6.9,3.2c0.9,0.4,1.5,1.4,1.5,2.4c0,1.3-1,2.3-2.3,2.3h-3.6   c-1.4,0-2.5-1.1-2.5-2.5v-0.2l-3-0.5V27c0,3.1,2.5,5.5,5.5,5.5h3.6c2.9,0,5.3-2.4,5.3-5.3C78.1,25.1,76.9,23,74.9,22.1z"/> <path class="st3" d="M136,1.8v11.2c-1.4-1.2-3.3-2-5.3-2h-0.4c-4.9,0-9,4-9,9v3.7c0,4.9,4,9,9,9h7.1l1.6-0.1v-4.3v-8.8v-18   L136,1.8z M136,28.1v1.5h-5.7c-3.3,0-5.9-2.7-5.9-5.9v-3.7c0-3.3,2.7-5.9,5.9-5.9h0.4c2.9,0,5.3,2.4,5.3,5.3V28.1z"/></g></g></svg>');
    svgInner(".mapa", '<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 556.35 360.305"><g id="Grupo_3394" data-name="Grupo 3394" transform="translate(-8436.826 -31.102)"><path id="Trazado_7122" data-name="Trazado 7122" d="M-646.324,228.983v-3.922a9.225,9.225,0,0,1,9.225-9.225h2.994a3.506,3.506,0,0,0,3.505-3.505v-2.359a3.316,3.316,0,0,0-1.983-3.036l-9.214-4.045a4.215,4.215,0,0,1-2.52-3.859V195.92a4.248,4.248,0,0,0-4.17-4.247l-26.759-.5a5.3,5.3,0,0,1-5.2-5.3h0a2.156,2.156,0,0,0-2.157-2.156h-3.2a4.014,4.014,0,0,0-4.015,4.015h0l-12.286-.4a36,36,0,0,1-15.906-4.284l-6.722-3.619a6.133,6.133,0,0,1-3.225-5.4v-3.384A1.651,1.651,0,0,0-729.6,169h-14.217a3.359,3.359,0,0,0-3.078,2.013l-3.333,7.617a.513.513,0,0,1-.941,0l-3.333-7.619A3.357,3.357,0,0,0-757.581,169h-2.995a3.356,3.356,0,0,0-3.06,1.979l-4.246,9.436a2.837,2.837,0,0,1-3.017,1.639l-4.94-.76a5.421,5.421,0,0,1-2.84-1.362l-3.459-3.17a36.543,36.543,0,0,0-7.367-5.237l-2.6-1.4A9.426,9.426,0,0,0-796.569,169h-3a9.346,9.346,0,0,0-9.346,9.346v12.086a2.655,2.655,0,0,1-2.655,2.655h-13.154A8.278,8.278,0,0,0-833,201.365v16.644a8.279,8.279,0,0,0,6.864,8.157l159.1,27.58a11.366,11.366,0,0,0,11.565-5.151l6.461-10.278A17.544,17.544,0,0,0-646.324,228.983Z" transform="translate(9269.826 -137.898)" fill="#e6e8f0"/><path id="Trazado_7123" data-name="Trazado 7123" d="M-550.689,253.807v6.6a5.525,5.525,0,0,1-.848,2.941l-10.34,16.451a2.045,2.045,0,0,0,1.383,3.1l104.9,18.133a3.362,3.362,0,0,0,3.934-3.313V280.176a5.26,5.26,0,0,0-.693-2.61h0a2.68,2.68,0,0,0-2.907-1.286l-8.547,1.9a2.678,2.678,0,0,1-2.615-.872l-6.427-7.5a2.687,2.687,0,0,0-1.384-.856l-3.635-.908a2.68,2.68,0,0,1-1.457-.944l-5.5-7a2.966,2.966,0,0,0-3.271-.982l-10.564,3.521a2.968,2.968,0,0,1-2.759-.473l-3.293-2.561a2.967,2.967,0,0,0-3.148-.311h0a2.966,2.966,0,0,1-3.8-1.008l-1.681-2.522a2.966,2.966,0,0,0-2.468-1.321h-5.467a2.313,2.313,0,0,1-2.313-2.313v-1.3a2.573,2.573,0,0,0-2.573-2.573h-18.973A5.552,5.552,0,0,0-550.689,253.807Z" transform="translate(9180.214 -164.124)" fill="#e6e8f0"/><path id="Trazado_7124" data-name="Trazado 7124" d="M-742.735,400.053l59.243-54.685a7.861,7.861,0,0,1,5.332-2.085h15.781A3.79,3.79,0,0,0-659.54,342l8.557-9.673a3.793,3.793,0,0,0-.512-5.506l-.844-.656a1.6,1.6,0,0,1-.62-1.267V296.526a3.792,3.792,0,0,0-3.146-3.736L-804.95,267.059a2.48,2.48,0,0,0-2.9,2.444V292.76c0,7.764,5.36,13.681,14.058,14.058l39.8,2.676a3.792,3.792,0,0,1,3.392,2.1l4.237,7.136a3.792,3.792,0,0,1-3.392,5.488h-36.6a3.792,3.792,0,0,0-2.5.943l-18.423,16.191a3.792,3.792,0,0,0-.576,5.062l11.446,15.925a3.792,3.792,0,0,0,4.864,1.133l4.927-2.628a3.791,3.791,0,0,1,4.128.364l24.708,19.413a3.791,3.791,0,0,1,1.449,2.982v25.822a3.79,3.79,0,0,0,1.364,2.913l2.353,1.961a5.691,5.691,0,0,0,7.68-.361,1.131,1.131,0,0,0,.311-.724l.67-10.37A3.793,3.793,0,0,1-742.735,400.053Z" transform="translate(9261.741 -170.334)" fill="#e6e8f0"/><path id="Trazado_7125" data-name="Trazado 7125" d="M-609.821,367.377l-11.016,12.453a7.332,7.332,0,0,1-5.491,2.474h-15.552a5.284,5.284,0,0,0-3.584,1.4l-56.024,51.715A4.7,4.7,0,0,0-703,438.872v1.9a5.428,5.428,0,0,0,5.428,5.428h13.443a5.324,5.324,0,0,1,3.765,1.56h0a5.324,5.324,0,0,1,.629,6.771l-5.327,7.785a5.022,5.022,0,0,0-.876,2.834v6.811a5.016,5.016,0,0,1-1,3.011l-.995,1.327a5.018,5.018,0,0,0-.3,5.576l12.5,21.025a3.572,3.572,0,0,1,.5,1.825v8.127a2.764,2.764,0,0,0,2.223,2.711h0a2.767,2.767,0,0,0,2.076-.41l4.078-2.719a8.985,8.985,0,0,0,4-7.477v-5.323a14.89,14.89,0,0,1,2.922-8.859l41.635-56.255a2.8,2.8,0,0,1,4.124-.41l3.226,2.918a4.138,4.138,0,0,0,4.945.457l45.89-28.208a3.2,3.2,0,0,0,.289-5.248l-47.429-36.889A1.884,1.884,0,0,0-609.821,367.377Z" transform="translate(9226.808 -203.332)" fill="#e6e8f0"/><path id="Trazado_7126" data-name="Trazado 7126" d="M-506.113,332.875v-9.431a5.368,5.368,0,0,0-4.453-5.289l-50.152-8.669A5.368,5.368,0,0,0-567,314.774v19.371a5.368,5.368,0,0,0,2.069,4.234l24.606,19.167a5.367,5.367,0,0,0,6.651-.043l25.547-20.437A5.367,5.367,0,0,0-506.113,332.875Z" transform="translate(9181.805 -184.36)" fill="#e6e8f0"/><path id="Trazado_7127" data-name="Trazado 7127" d="M-482.215,332.2v9.246a5.475,5.475,0,0,1-2.055,4.276l-27.949,22.359a2.026,2.026,0,0,0,.021,3.18l21.376,16.652a5.478,5.478,0,0,0,6.234.345l46.6-28.646a5.478,5.478,0,0,0,2.609-4.666V336.623a3.362,3.362,0,0,0-2.789-3.313l-37.638-6.506A5.477,5.477,0,0,0-482.215,332.2Z" transform="translate(9163.929 -190.09)" fill="#e6e8f0"/><path id="Trazado_7128" data-name="Trazado 7128" d="M-542.547,508.9l-1.578-5.521a6.136,6.136,0,0,1,.146-3.817l7.753-20.946a21.9,21.9,0,0,1,8.16-10.464l25.225-17.284a3.141,3.141,0,0,0,.494-4.763l-9.959-10.412a2.634,2.634,0,0,1-.031-3.606l13.162-14.258a4.455,4.455,0,0,0,.889-4.607l-1.443-3.786a1.733,1.733,0,0,0-2.528-.86l-81.986,50.4a3.546,3.546,0,0,1-4.236-.391l-2.555-2.312a2.089,2.089,0,0,0-3.08.306l-37.754,51.011A10.877,10.877,0,0,0-634,514.05v1.557a10.874,10.874,0,0,0,4.956,9.122l4.53,2.938a11.919,11.919,0,0,1,4.337,5.007l5.826,12.624a4.544,4.544,0,0,0,2.437,2.314l2.933,1.173a13.1,13.1,0,0,1,3.764,2.306l1.709,1.5a4.543,4.543,0,0,0,4.427.891l9.407-3.135a4.543,4.543,0,0,1,4.051.594l12.63,8.888a4.542,4.542,0,0,0,6.214-.945l3.18-4.134a6.506,6.506,0,0,1,2.1-1.774l5.938-3.167a6.5,6.5,0,0,0,3.365-4.726l1.134-7.183a6.51,6.51,0,0,1,2.142-3.882l6.32-5.53a4.2,4.2,0,0,0,.863-5.281l-1.485-2.546a6.139,6.139,0,0,1-.467-5.192l1.012-2.784A6.139,6.139,0,0,0-542.547,508.9Z" transform="translate(9203.976 -217.089)" fill="#e6e8f0"/><path id="Trazado_7129" data-name="Trazado 7129" d="M-409.31,381.447l-17.835,10.963a6.141,6.141,0,0,0-2.523,7.418l1.619,4.251a6.683,6.683,0,0,1-1.334,6.911l-11.4,12.345a1.883,1.883,0,0,0,.023,2.579l7.9,8.263a24.287,24.287,0,0,0,7.5,5.322l20.2,9.18a10.811,10.811,0,0,0,7.185.623l9.967-2.585a8.809,8.809,0,0,1,8.689,2.558l20.825,22.6a1.753,1.753,0,0,0,3.042-1.188V428.119a8.29,8.29,0,0,0-2.521-5.953l-36.269-35.153a26.662,26.662,0,0,0-7.731-5.221l-1.631-.725A6.139,6.139,0,0,0-409.31,381.447Z" transform="translate(9140.202 -207.898)" fill="#e6e8f0"/><path id="Trazado_7130" data-name="Trazado 7130" d="M-310.452,432.386v15.487a1.945,1.945,0,0,0,3.2,1.481l1.991-1.693a6.141,6.141,0,0,0,2.164-4.68v-13.71a19.459,19.459,0,0,1,5.7-13.761l12.485-12.485a2.917,2.917,0,0,0-.183-4.294l-11.642-9.8a3.947,3.947,0,0,0-2.543-.928h0a3.946,3.946,0,0,0-2.755,1.121l-20.813,20.292a2.171,2.171,0,0,0,0,3.111l6.744,6.536A18.557,18.557,0,0,1-310.452,432.386Z" transform="translate(9101.227 -210.367)" fill="#e6e8f0"/><path id="Trazado_7131" data-name="Trazado 7131" d="M-289.186,540.485l66.627-44.833a10.06,10.06,0,0,0,3.384-3.85h0a14.038,14.038,0,0,1,7.024-6.623l6.468-2.771a.46.46,0,0,0-.2-.883l-24.477.857a17.729,17.729,0,0,0-7.051,1.735l-7.5,3.6a28.687,28.687,0,0,1-12.414,2.825h0a28.686,28.686,0,0,0-9.717,1.7l-8.516,3.066a21.323,21.323,0,0,1-7.221,1.26h-2.852a5.915,5.915,0,0,1-5.509-3.76l-2.478-6.334a2.512,2.512,0,0,0-3.966-1l-1.53,1.3A13.882,13.882,0,0,0-304,497.35v55.025a4.406,4.406,0,0,0,4.406,4.406h2.563a4.406,4.406,0,0,0,4.406-4.406v-5.43A7.788,7.788,0,0,1-289.186,540.485Z" transform="translate(9094.775 -241.315)" fill="#e6e8f0"/><path id="Trazado_7132" data-name="Trazado 7132" d="M-333.863,370.421l-39.65-22.9a3.914,3.914,0,0,0-1.958-.525h-8.615A3.915,3.915,0,0,0-388,350.915v9.018a3.914,3.914,0,0,0,2.325,3.577l8.453,3.757a3.907,3.907,0,0,1,1.135.767l23.244,22.529a3.915,3.915,0,0,0,5.458-.009l14.3-13.94A3.914,3.914,0,0,0-333.863,370.421Z" transform="translate(9122.571 -196.8)" fill="#e6e8f0"/><path id="Trazado_7133" data-name="Trazado 7133" d="M-188.044,535.214l1.465-3.664a2.524,2.524,0,0,0-.707-2.858l-15.022-12.8a2.6,2.6,0,0,1-.555-3.3l10.629-18.071a12.9,12.9,0,0,0,1.771-6.034l.1-2.648a1.669,1.669,0,0,0-2.326-1.6l-18.389,7.881a4.171,4.171,0,0,0-2.087,1.968L-215,497.766a5.825,5.825,0,0,1-1.958,2.228l-67.591,45.482a4.655,4.655,0,0,0-2.057,3.863v12.4a1.915,1.915,0,0,1-1.915,1.915H-300.4a3.6,3.6,0,0,0-3.6,3.6v29.915a2.876,2.876,0,0,0,1.59,2.573l1.627.814a2.877,2.877,0,0,0,4.062-1.817h0a30.766,30.766,0,0,0,1.084-8.094V589a6.351,6.351,0,0,1,3.084-5.446h0a15.185,15.185,0,0,1,7.814-2.165h14.268a4.318,4.318,0,0,0,2.811-1.04l2.541-2.177a1.11,1.11,0,0,1,1.633.206l1.258,1.8a4.962,4.962,0,0,0,6.73,1.341h0a4.961,4.961,0,0,0,2-5.872l-6.566-18.183a7.393,7.393,0,0,0-2.656-3.5l-1.7-1.214a2.651,2.651,0,0,1-1.11-2.157h0a2.651,2.651,0,0,1,2.65-2.65h8.592a7.389,7.389,0,0,1,4.908,1.866l1.346,1.2a3.656,3.656,0,0,0,5.014-.147L-240,547.83a6.5,6.5,0,0,1,4.6-1.9h1.748a2.919,2.919,0,0,1,2.919,2.919v1.735a2.967,2.967,0,0,1-.312,1.325l-.213.426a2.962,2.962,0,0,0,.267,3.085l9.081,12.286a1.628,1.628,0,0,0,2.544.092l2.237-2.611a1.627,1.627,0,0,1,1.134-.565l7.711-.482a1,1,0,0,0,.618-1.722l-7.107-6.633a.668.668,0,0,1,.456-1.157h5.516a13.3,13.3,0,0,0,5.406-1.148l1.6-.708a13.307,13.307,0,0,1,3.851-1.057l8.091-.951a2.58,2.58,0,0,0,1.926-1.261l3.157-5.413a2.577,2.577,0,0,0-.191-2.881l-2.725-3.5A2.525,2.525,0,0,1-188.044,535.214Z" transform="translate(9094.775 -242.169)" fill="#e6e8f0"/><path id="Trazado_7134" data-name="Trazado 7134" d="M-267.767,416.477l-13.071,13.071A10.8,10.8,0,0,0-284,437.183v8.907a50.677,50.677,0,0,0,3.485,18.468h0a6.358,6.358,0,0,0,5.921,4.041h0a6.351,6.351,0,0,0,2.153-.376l11.1-4a27.9,27.9,0,0,1,9.448-1.649h0a27.891,27.891,0,0,0,12.069-2.747l5.283-2.536a27.891,27.891,0,0,1,12.069-2.747h10.546a1.523,1.523,0,0,0,1.524-1.524v-2.975a1.523,1.523,0,0,0-1.524-1.524h-3.1A27.206,27.206,0,0,1-234.8,440l-.955-1.011a8,8,0,0,0-5.815-2.507h-1.105a5.858,5.858,0,0,1-5.858-5.858v-.387a5.857,5.857,0,0,0-2.085-4.481l-11.315-9.528A4.313,4.313,0,0,0-267.767,416.477Z" transform="translate(9088.157 -219.372)" fill="#e6e8f0"/><path id="Trazado_7135" data-name="Trazado 7135" d="M-311.147,339.764l6.35-4.826a4.488,4.488,0,0,0,1.772-3.572v-6.542a4.486,4.486,0,0,0-2.041-3.762l-8.391-5.454a2.791,2.791,0,0,0-3.544.418l-8.238,8.671a14.457,14.457,0,0,0-3.7,7.122L-329.972,337a1.131,1.131,0,0,1-2.179.145l-5.773-16.838a5.281,5.281,0,0,0-3.563-3.371l-22.276-6.283a8.682,8.682,0,0,0-2.352-.325h-1.461a12.909,12.909,0,0,1-6.3-1.64l-11.8-6.593A1.566,1.566,0,0,0-388,303.462v19.85a2.741,2.741,0,0,0,2.741,2.741h6.471a22.315,22.315,0,0,1,11.159,2.991l40.044,23.124a3.317,3.317,0,0,0,4.07-.593C-320.624,348.52-314.871,342.594-311.147,339.764Z" transform="translate(9122.571 -181.874)" fill="#e6e8f0"/><path id="Trazado_7136" data-name="Trazado 7136" d="M-239.13,400.025l2.4-5.14a9.138,9.138,0,0,1,7.176-5.208l16.337-1.993a19.547,19.547,0,0,0,11.456-5.582l3.675-3.675a8.238,8.238,0,0,1,5.825-2.413h16.657a4.419,4.419,0,0,0,3.651-1.93l6.5-9.541a4.126,4.126,0,0,0-.583-5.331l-5.794-5.446a20.345,20.345,0,0,0-13.934-5.52h-40.384a1.737,1.737,0,0,1-1.737-1.737v-6.273a5.755,5.755,0,0,0-2.071-4.421l-.938-.782a.856.856,0,0,1,.165-1.423l3.691-1.845a3.309,3.309,0,0,0,1.829-2.959h0a3.308,3.308,0,0,0-3.308-3.308h-22.694a11.357,11.357,0,0,0-6.3,1.907l-2.529,1.686a3.674,3.674,0,0,0-1.637,3.057v8.412a7.718,7.718,0,0,1-3.048,6.144l-12.408,9.43a19.111,19.111,0,0,0-3.728,3.752h0a1.856,1.856,0,0,0,.294,2.538l37.994,31.782a2.72,2.72,0,0,1,.968,2.081v3.19a1.294,1.294,0,0,0,1.295,1.295h0A1.3,1.3,0,0,0-239.13,400.025Z" transform="translate(9087.239 -189.685)" fill="#e6e8f0"/><path id="Trazado_7137" data-name="Trazado 7137" d="M-88.825,402.606l-15.07-5.347a16.892,16.892,0,0,0-5.649-.973h-1.974a1.808,1.808,0,0,1-1.808-1.808v-.347a8.6,8.6,0,0,1,1.368-4.656l3.506-5.454a2.733,2.733,0,0,1,3.162-1.115l.775.259a21.01,21.01,0,0,0,6.639,1.077h0a3.284,3.284,0,0,0,3.284-3.284V366.564a3.064,3.064,0,0,0-3.064-3.064h-11.057a3.062,3.062,0,0,0-2.166.9l-.865.865a13.072,13.072,0,0,1-1.99,1.631l-.225.15a6.1,6.1,0,0,0-2.713,5.07h0a2.092,2.092,0,0,1-2.092,2.092h-10.424a5.219,5.219,0,0,0-4.311,2.278l-11.233,16.475a3.788,3.788,0,0,1-3.13,1.654h-18.587a6.045,6.045,0,0,0-4.274,1.77l-5.7,5.7a12.647,12.647,0,0,1-7.413,3.612l-19.848,2.421a4.774,4.774,0,0,0-3.748,2.721h0a6.122,6.122,0,0,0,1.1,6.793h0a24.759,24.759,0,0,0,18,7.759h5.825a3.282,3.282,0,0,1,3.281,3.281v3.094a4.517,4.517,0,0,0,4.4,4.515l19.744.494a2.683,2.683,0,0,1,2.616,2.682v3.657a4.053,4.053,0,0,0,1.607,3.232l8.431,6.38a4.052,4.052,0,0,0,4.753.1l4.059-2.81a7.3,7.3,0,0,1,4.921-1.258l20.595,2.168a2.707,2.707,0,0,0,2.84-1.806l3.008-8.689a9.311,9.311,0,0,1,9.363-6.249l12.607.764a2.694,2.694,0,0,0,2.82-2.246l2.156-12.937a2.838,2.838,0,0,1,.583-1.305l3.806-4.757a4.955,4.955,0,0,0,1.085-3.095v-4.412a2.548,2.548,0,0,0-2.549-2.549h-10.4A18.078,18.078,0,0,1-88.825,402.606Z" transform="translate(9063.012 -202.26)" fill="#e6e8f0"/><path id="Trazado_7138" data-name="Trazado 7138" d="M-355,595.074v8.813a73.841,73.841,0,0,0,1.191,13.207h0a3.97,3.97,0,0,1-1.33,3.731l-19.4,16.545a1.54,1.54,0,0,0-.322,1.964l2.906,4.843a2.05,2.05,0,0,1-1.758,3.1H-393.1a2.05,2.05,0,0,1-2.05-2.05v-15.9a4.8,4.8,0,0,0-4.8-4.8h0a6.455,6.455,0,0,0-2.483.5l-9.718,4.049A3.254,3.254,0,0,0-414,633.052l1.1,3.51a7.246,7.246,0,0,1-1.986,7.472L-419.158,648a1.733,1.733,0,0,0,.337,2.785l8.095,4.5a8.483,8.483,0,0,1,3.013,2.826l3.574,5.559a4.393,4.393,0,0,0,3.694,2.017h41.274a4.392,4.392,0,0,0,4.166-3l6.694-20.081V581.942a.815.815,0,0,0-1.42-.547h0A20.387,20.387,0,0,0-355,595.074Z" transform="translate(9133.065 -274.274)" fill="#e6e8f0"/><path id="Trazado_7139" data-name="Trazado 7139" d="M-417.727,583.8h3.968a4.285,4.285,0,0,1,4.285,4.285v13.681a4.784,4.784,0,0,0,4.783,4.783h0a2.047,2.047,0,0,0,1.755-3.1h0a1.675,1.675,0,0,1,.349-2.137l19.984-17.045a5.269,5.269,0,0,0,1.765-4.951l-.31-1.708a13.854,13.854,0,0,1-.224-2.482V559.074a23.065,23.065,0,0,1,5.961-15.474l4.661-5.151a8.091,8.091,0,0,0,2.091-5.428V518.884A8.091,8.091,0,0,0-370.8,513.4l-24.952-27.075a5.748,5.748,0,0,0-5.669-1.669l-11.342,2.941a7.8,7.8,0,0,1-5.187-.45l-22.569-10.259a7.361,7.361,0,0,0-7.207.629L-475.3,496.413a10.807,10.807,0,0,0-4.086,5.331l-1.366,3.889a7.852,7.852,0,0,0,3.248,9.262l7.933,4.955a9.152,9.152,0,0,0,4.848,1.39h.946a9.151,9.151,0,0,1,6.471,2.68l.675.675a9.151,9.151,0,0,0,3.072,2.026l1.305.522a9.152,9.152,0,0,1,5.1,5.1l1.694,4.235a5.449,5.449,0,0,1-.1,4.278l-4.813,10.588a16.8,16.8,0,0,0-1.279,4.194l-.147.877a14.42,14.42,0,0,0,1.619,9.376h0a2.629,2.629,0,0,1-.32,3.008l-5.616,6.419a3.682,3.682,0,0,0,.471,5.3l4.532,3.625a5.072,5.072,0,0,0,5.382.6l16.591-8.044a3.734,3.734,0,0,1,4.479.948l4.087,4.829A3.734,3.734,0,0,0-417.727,583.8Z" transform="translate(9153.412 -239.563)" fill="#e6e8f0"/></g></svg>');
    svgInner(".ico-casa", '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve"><style type="text/css">.color-0{fill:#D1D4E6;}.color-1{fill:#B3B7CC;}</style><g id="casa-grisCla"><path id="Trazado_1986" class="color-0" d="M10.8,9.8H6.6c-0.5,0-1,0.4-1,1c0,0,0,0,0,0v4.4h6.2v-4.4C11.8,10.3,11.3,9.8,10.8,9.8 C10.8,9.8,10.8,9.8,10.8,9.8z"/></g><g id="casa-grisOsc"><path id="Trazado_1985" class="color-1" d="M16.9,6.1L9.3,0.7c-0.4-0.3-0.9-0.3-1.2,0L0.4,6.1C0.2,6.3,0,6.6,0,7v7.2c0,0.6,0.5,1,1,1 h4.5v-4.4c0-0.5,0.4-1,1-1c0,0,0,0,0,0h4.2c0.5,0,1,0.4,1,1c0,0,0,0,0,0v4.4h4.5c0.6,0,1-0.5,1-1V7C17.3,6.6,17.2,6.3,16.9,6.1z"/></g><g id="casa-grisOsc2"><path id="Trazado_1984" class="color-1" d="M5.6,16.7c0,0.5,0.4,1,1,1c0,0,0,0,0,0h4.2c0.5,0,1-0.4,1-1c0,0,0,0,0,0v-1.4H5.6L5.6,16.7z"/></g></svg>');

    
    if (d.getElementById('servicios')) {
      tabsBeneficios(".tablinks", ".tabcontent");
      modalUp();
    }

    navMenu(".linea_menu",".cont_menu ul li a");
    darkMode('.switchDarkLight', 'darkMode');
    munuHamburguesa();

    try {
      // slide(); 
      mis_slides.forEach(e => { new Sliders(e).slideOn() });
      obtenerBG();
      eyeMove();
    } catch (error) {}

  }, 500);
});

w.addEventListener('resize', function(e) { munuHamburguesa(); });

// tamaño imagen pixel perfect 0,985

// LOAD
window.onload = function(){
  let $load = d.querySelector(".load");
  let $load2 = d.querySelector(".load-2");
  setTimeout(() => { $load.classList.add("loadOff"); }, 400);
  setTimeout(() => { $load2.classList.add("loadOff"); }, 500);
}
// FIN LOAD