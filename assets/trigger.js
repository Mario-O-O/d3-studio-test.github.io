// TRGGER
let e = document.getElementById("cont_proyectos");
let $btnOjo = document.querySelector(".ojoBtn");
    
let createtrigger = document.createElement("div");
createtrigger.classList.add("trigger");
document.querySelector("body").appendChild(createtrigger);

let $trigger = document.querySelector(".trigger");
let trigger = Math.round($trigger.getBoundingClientRect().top);

console.log(e.clientHeight);

function alturaVigilado() {
  let footerRec = e.getBoundingClientRect().top;
  
  if (footerRec < trigger) {
    $btnOjo.classList.add('onOjo');
  } else {
    $btnOjo.classList.remove('onOjo');
  }
}
// FIN TRGGER

try {
  alturaVigilado();
  window.addEventListener("resize", (function() { alturaVigilado() }));
  document.addEventListener('scroll', function () { alturaVigilado() });
 } catch (error) {}