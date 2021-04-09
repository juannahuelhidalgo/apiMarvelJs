//se declaran constantes para mostrar el contenido del programa
const a = 100;
const c = 0;

//contenido de la pagina
content = document.getElementById("content");

//funcionamiento del boton de siguiente pagina
function botonPlus() {
  var a = sessionStorage.getItem("id"); //se toma en que pagina estamos
  pageControl(); 
}

//funcionamiento del boton de volver la pagina
function botonLess() {
  var a = sessionStorage.getItem("id"); //se toma en que pagina estamos
  pageControl2(); 
}

//consumo de la api
function getConnection(c) {
  const ts = Date.now(); //se toma la fecha
  const limit = 100; //se establece el limite de personajes por pagina

  var offset = sessionStorage.getItem("id"); // se obtiene el numero de la pagina

  var off = 0; // se muestra la pagina 1 por defecto
  off = offset * a; //se setea el numero de personajes que tiene que mostrar del arreglo de 1500
 

  hash = md5(ts + privateKey + publicKey); // se genera el hash para lograr conectar con la api mediante md5
                                          //el protocolo md5 ha sido extraido de una fuente libre de Copyright
  
  
  //coneccion al servidor
  URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${off}`;

  // peticiones al servidor
  fetch(URL)
    .then((response) => {
      const problemas = response.status; // se verifica que la coneccion sea exitosa
      if (response.status != 200) {
        console.log(`problemas tecnicos`);
      } else {
        return response.json(); // se extrae la informacion en formato Json
      }
    })
    .then((response) => { // se imprimen los resultados de la pagina
      response.data.results.forEach((e) => {
        drawHero(e);
      });
    })
    .catch((e) => console.log(e)); // en caso de error se imprime el mismo
}

//primer ingreso a la api
function conectar() {
  var b = sessionStorage.getItem("id"); //la variable permite almacenar el numero de la pagina
  if (b == null) { // si es el primer ingreso a la misma se setea el valor de session id = 0;
    sessionStorage.setItem("id", `0`);
    getConnection(c); // coneccion a la pagina
  } else {
    getConnection(b); // coneccion a la pagina marcada por el usuario
  }
}

conectar(); // metodo disparador

// dispone y organiza el contenido de la pagina
const drawHero = (e) => {
  const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`; // imagen del heroe
  const hero = `
	<div class="hero l-1-3"> 
		<ul>
		<li>
    <a href="buscado.html?pj=${e.name}'"
  		  <h3>${e.name}</h3>
            <div class="hero-img">
            <img class="thumbnail" src = "${image}">
            </a>
			</li>
			</ul>
		</div>
`; // informacion adicional
  content.insertAdjacentHTML("beforeEnd", hero); // acoplado en la pagina
};

//control de variables y paginacion
function direccionAbajo(offset){
  offset--; // disminuye el numero de la pagina
  sessionStorage.setItem('id', `${offset}`); // setea el valor como nuevo
  window.location.replace(`pagina${offset}.html`); // redirecciona
}

function direccionArriba(offset){
  offset++; // aumenta el numero de pagina 
    sessionStorage.setItem('id', `${offset}`); // setea el valor como nuevo
    window.location.replace(`pagina${offset}.html`); // redirecciona
  
}


//desacople de codigo
//el mismo segun la pagina en la que este de forma logica permite o no avanzar de pagina
function pageControl() {
  var offset = sessionStorage.getItem('id');

  if(offset == 14){ // setea el superior inferior de paginas
    sessionStorage.setItem('id', `${offset}`); // setea el valor como nuevo
      window.location.replace(`pagina${offset}.html`); // redirecciona
  }else{ 
    direccionArriba(offset);
  }
}


//desacople de codigo
//el mismo segun la pagina en la que este de forma logica permite o no avanzar de pagina
function pageControl2() {
  var offset = sessionStorage.getItem('id');;

  if(offset == 0){ // setea el tope inferior de paginas
    sessionStorage.setItem('id', `${offset}`); // setea el valor como nuevo
      window.location.replace(`pagina${offset}.html`); // redirecciona
  }else{ 
    direccionAbajo(offset);
  }
}

