const $select = document.querySelector(".crud-table"),
  $form = document.querySelector(".crud-form"),
  $title = document.querySelector(".crud-title"),
  $template = document.getElementById("crud-template").content,
  $fragment = document.createDocumentFragment();

const ajax = function (options) {
  let { url, method, success, error, data } = options;
  const xhr = new XMLHttpRequest();
  // console.log(xhr);

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      success(json);
    } else {
      let message = xhr.statusText || "Ocurrio un error";
      error(`Error ${xhr.status}: ${message}`);
    }
  });

  xhr.open(method || "GET", url);
  xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
  xhr.send(JSON.stringify(data));
};

const getAll = function () {
  ajax({
    method: "GET",
    url: "./assets/db-locales.json",
    success: function (res) {
      res.forEach((el) => {
        $template.querySelector(".name").textContent = el.nombre;
        $template.querySelector(".name").setAttribute("value", el.value);

        let $clone = document.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $select.appendChild($fragment);

      document.querySelector(".nombreLocal").textContent = res[0].nombre;
      document.querySelector(".parrafo").textContent = res[0].parrafo;
      document.querySelector(".imgLocal").src = res[0].imgPrincipal;

      res[0].galeriaProyect.forEach((el, i) => {
        let divimgGaleria = document.createElement('div');
        let divimgGaleria2 = document.createElement('div');
        divimgGaleria.classList.add("contIMG");
        divimgGaleria2.classList.add("mySlides");
        let imgGaleria = document.createElement('img');
        let imgGaleria2 = document.createElement('img');
        imgGaleria.src= el;
        imgGaleria.setAttribute("onclick", `openModal();currentSlide(${i+1})`);
        imgGaleria2.src= el;
        imgGaleria.classList.add("imgGaleria");
        imgGaleria2.classList.add("imgGaleriaMd");
        divimgGaleria.appendChild(imgGaleria);
        divimgGaleria2.appendChild(imgGaleria2);
        document.querySelector(".galeria").appendChild(divimgGaleria);
        document.querySelector(".modalGaleria").appendChild(divimgGaleria2);
      });

      // Añadir imagenes noche
      let $divIMG = document.querySelectorAll(".mySlides")
      
      res[0].galeriaProyectDK.forEach((el, i) => {
        let imgGaleriaDK = document.createElement('img');
        imgGaleriaDK.src= el;
        imgGaleriaDK.classList.add("imgGaleriaDK");
        $divIMG[i].appendChild(imgGaleriaDK);
      });
      // Añadir imagenes noche

      let select = document.getElementById("locales");
      select.addEventListener("change", function () {
        let selectedOption = this.options[select.selectedIndex];

        res.forEach((el) => {
          if (selectedOption.value === el.value) {
            document.querySelector(".nombreLocal").textContent = el.nombre;
            document.querySelector(".parrafo").textContent = el.parrafo;
            document.querySelector(".imgLocal").src = el.imgPrincipal;

            let element = document.querySelector(".galeria");
            let elementModal = document.querySelector(".modalGaleria");
            while (element.firstChild) { element.removeChild(element.firstChild); }
            while (elementModal.firstChild) { elementModal.removeChild(elementModal.firstChild); }

            el.galeriaProyect.forEach((el, i) => {
              let divimgGaleria = document.createElement('div');
              let divimgGaleria2 = document.createElement('div');
              divimgGaleria.classList.add("contIMG");
              divimgGaleria2.classList.add("mySlides");
              let imgGaleria = document.createElement('img');
              let imgGaleria2 = document.createElement('img');
              imgGaleria.src= el;
              imgGaleria.setAttribute("onclick", `openModal();currentSlide(${i+1})`);
              imgGaleria2.src= el;
              imgGaleria.classList.add("imgGaleria");
              imgGaleria2.classList.add("imgGaleriaMd");
              divimgGaleria.appendChild(imgGaleria);
              divimgGaleria2.appendChild(imgGaleria2);
              document.querySelector(".galeria").appendChild(divimgGaleria);
              document.querySelector(".modalGaleria").appendChild(divimgGaleria2);
            });

            // Añadir imagenes noche
            let $divIMG = document.querySelectorAll(".mySlides");
            
            el.galeriaProyectDK.forEach((el, i) => {
              let imgGaleriaDK = document.createElement('img');
              imgGaleriaDK.src= el;
              imgGaleriaDK.classList.add("imgGaleriaDK");
              $divIMG[i].appendChild(imgGaleriaDK);
            });
            // Añadir imagenes noche

            for (let i = 0; i < document.querySelectorAll(".ojo").length; i++) {
              document.querySelectorAll(".ojo")[i].classList.remove('activeEye');
            }
            document.getElementById(el.value).classList.add('activeEye');
      
          }
        });
      });

      res.forEach((el) => {
        let btnEye = document.createElement('div');
        btnEye.id = el.value;
        btnEye.title = el.nombre;
        btnEye.classList.add("ojo");
        btnEye.innerHTML = `<img src="${el.icon}" alt="" class="icon-logo">`;
        document.querySelector(".btnOjos").appendChild(btnEye);
      });

      document.querySelectorAll(".ojo")[0].classList.add('activeEye');

      document.addEventListener('click',function(e){
        if (e.target.classList.value === "ojo") {
          select.value = e.target.id;
          
          for (let i = 0; i < document.querySelectorAll(".ojo").length; i++) {
            document.querySelectorAll(".ojo")[i].classList.remove('activeEye');
          }
          document.getElementById(e.target.id).classList.add('activeEye');

          select.dispatchEvent(new Event('change'));
        }
    });
    
    },
    error: function (err) {
      console.log(err);
      $select.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
    },
    data: null,
  });
};
getAll();