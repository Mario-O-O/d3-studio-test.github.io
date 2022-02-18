// console.log('tets 1');
document.addEventListener("DOMContentLoaded", e => {
  const includeHTLM = function(el, url) {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState !== 4) return ;

    if (xhr.status >= 200 && xhr.status < 300){
      // ! NOTA : el atributo "outerHTML" reemplaza la etiqueta seleccionada por lo que se va acolocar
      el.outerHTML = xhr.responseText;
    }else{
      let message = xhr.statusText || "Ocurrio un error Al traer el header";
      el.outerHTML = `<div><p>Error ${xhr.status}: ${message}</p></div>`
    }
  });

  xhr.open("GET", url);
  xhr.setRequestHeader("content-type", "text/html; charset=utf-8");
  xhr.send();
  
  }
  // ! NOTA : el elmento de la funcion "includeHTLM" en el elemnto del "forEach"
  document.querySelectorAll("[data-include]").forEach(function(el) { includeHTLM(el, el.getAttribute("data-include")); });
});