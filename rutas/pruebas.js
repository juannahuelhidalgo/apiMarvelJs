//declaracion de claves y constantes
const privateKey = "0e3a61991d39296e0a077cc5d72cfb52017aa85d";
const publicKey = "eb21a48643b2901fea305523c0c44e18";

const a = 100;
const c = 0;

//contenido de la pagina
content = document.getElementById('content');

//funcionamiento de los botones de pagina
function botonPlus() {
  var a = sessionStorage.getItem('id');
  pageControl();
}

function botonLess() {
  var a = sessionStorage.getItem('id');
  if(a < 0 ){
    console.log("lo siento");
  }else{pageControl2(a);}
}

//consumo de la api
function getConnection(c) {
  const ts = Date.now();
  const limit = 100;

  var offset = sessionStorage.getItem('id');

  console.log(offset)

  var off = 0;
  off = offset * a;
  console.log(`el numero en conexion es ${off}`);

  hash = md5(ts + privateKey + publicKey);
  URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${off}`;

  fetch(URL)
    .then(response => {
      const problemas = response.status;
      if (response.status != 200) {
        console.log(`problemas tecnicos`);
      } else {
        return response.json();
      }
    })
    .then(response => {
      response.data.results.forEach(e => {
        drawHero(e);
      })
    })
    .catch(e => console.log(e));

    console.log(`el siguiente resultado es ${off}`)
}

//consumo a la api
function conectar() {
  var b = sessionStorage.getItem('id');
  console.log(b);
  if (b == null) {
    sessionStorage.setItem('id', `0`);
    getConnection(c);
  } else {
    getConnection(b)
  }
}

conectar();

//formatear el contenido
const drawHero = e => {

  const hero = `
	<div class="hero l-1-3"> 
		<ul>
		<li>
  		  <h3>${e.name}</h3>
			</li>
			</ul>
		</div>
`;
  content.insertAdjacentHTML('beforeEnd', hero);
}

//control de variables y paginacion
function direccionAbajo(offset){
  offset--;
  sessionStorage.setItem('id', `${offset}`);
  window.location.replace(`pagina${offset}.html`);
}

function direccionArriba(offset){
  offset++;
  sessionStorage.setItem('id', `${offset}`);
  window.location.replace(`pagina${offset}.html`);
}

//desacople de codigo
function pageControl() {
  var offset = sessionStorage.getItem('id');;
  switch (offset) {
    case '0':
      direccionArriba(offset);
      break;
    case '1':
      direccionArriba(offset);
      break;
    case '2':
      direccionArriba(offset);
      break;
    case '3':
      direccionArriba(offset);
      break;
    case '4':
      direccionArriba(offset);
      break;
    case '5':
      direccionArriba(offset);
      break;
    case '6':
      direccionArriba(offset);
      break;
    case '7':
      direccionArriba(offset);
      break;
    case '8':
      direccionArriba(offset);
      break;
    case '9':
      direccionArriba(offset);
      break;
    case '10':
      direccionArriba(offset);
      break;
    case '11':
      direccionArriba(offset);
      break;
    case '12':
      direccionArriba(offset);
      break;
    case '13':
      direccionArriba(offset);
      break;
    case '14':
      sessionStorage.setItem('id', `${offset}`);
      window.location.replace(`pagina${offset}.html`);
      break;
    default:
      sessionStorage.setItem('id', `14`);
      window.location.replace(`pagina${offset}.html`);
      break;
  }
}



function pageControl2() {
  var offset = sessionStorage.getItem('id');;
  switch (offset) {
    case "0":
      sessionStorage.setItem("id", `0`);
      window.location.replace(`pagina1.html`);
      break;
    case '1':
      offset--;
      sessionStorage.setItem('id', `${offset}`);
      window.location.replace(`pagina1.html`);
      break;
    case '2':
      direccionAbajo(offset); 
      break;
    case '3':
      direccionAbajo(offset); 
      break;
    case '4':
      direccionAbajo(offset); 
      break;
    case '5':
      direccionAbajo(offset); 
      break;
    case '6':
      direccionAbajo(offset); 
      break;
    case '7':
      direccionAbajo(offset); 
      break;
    case '8':
      direccionAbajo(offset); 
      break;
    case '9':
      direccionAbajo(offset); 
      break;
    case '10':
      direccionAbajo(offset); 
      break;
    case '11':
      direccionAbajo(offset); 
      break;
    case '12':
      direccionAbajo(offset); 
      break;
    case '13':
      direccionAbajo(offset); 
      break;
    case '14':
      direccionAbajo(offset); 
      break;
    default:
      direccionAbajo(offset); 

  }
}


