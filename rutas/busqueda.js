//declaracion de claves y constantes que permiten consumi la api
const privateKey = "0e3a61991d39296e0a077cc5d72cfb52017aa85d";
const publicKey = "eb21a48643b2901fea305523c0c44e18";

//permite la lectura del input de busqueda de html
search = document.getElementById('search');

//realiza la busqueda segun el nombre del superheroe
const searchHero = name => {

    const ts = Date.now(); //se toma la fecha
    hash = md5(ts + privateKey + publicKey); // se genera el hash para lograr conectar con la api mediante md5
                                            //el protocolo md5 ha sido extraido de una fuente libre de Copyright


    //codificado de nombre para evitar errores
    hero = encodeURIComponent(name);

     //coneccion al servidor
    URL = `https://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
               
    //peticion al servidor
    fetch(URL)
    .then(response => { // se verifica que la coneccion sea exitosa
        const problemas = response.status;
           if (response.status != 200){
               console.log(`problemas tecnicos id = ${problemas} `);
           }else{ return response.json(); // se extrae la informacion en formato Json
           }
        })
    .then(response => { // se imprimen los resultados de la pagina
        response.data.results.forEach(e => {
            drawHeroBusqueda(e);
        });
    })
    .catch(e => console.log(e)); // en caso de error se imprime el mismo

};

// se crea un listener para redireccionar la pagina en caso de presionar enter
search.addEventListener('keyup', e => {
    if (e.keyCode === 13){
        sessionStorage.setItem("busqueda", `${e.target.value.trim()}`); // se setea el nombre de la busqueda
        window.location.replace(`buscado.html`); // se redicciona
    }
});


function buscado(){
    var e = sessionStorage.getItem("busqueda"); // se extrae el valor de la busqueda

    const params = new URLSearchParams(window.location.search) //se extrae de la url la variable generada por el index
    var nombreIndex = null; // variable que guardara el nombre del index

    for (const param of params) {
        nombreIndex = params.get("pj").replace("'",""); // el ciclo for se mantiene para inspeccionar varias variables a futuro
                                                        // se extrae la variable y se le quita una comilla que obstruye la busqueda
                                                        // del personaje
        }

    content.innerHTML = ''; //se prepara la pagina
    if(nombreIndex != null){ // si se ha clickeado un personaje se redirige a su informacion
    searchHero(nombreIndex);
    }
    if(e != null){ // si se ha buscado por la barra de busqueda se redirige al personaje en cuestion
        searchHero(e); 
    }
}

buscado(); // metodo iniciador

// dispone y organiza el contenido de la pagina
const drawHeroBusqueda = e => {
    const image =`${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`; // imagen del heroe
const hero = `
<div> 
    <h3>${e.name}</h3>
    <div class="hero-img">
        <img class="thumbnail" src = "${image}">
        <p class="description">${e.description}</p>
    </div>
</div>
`;// informacion del mismo
sessionStorage.removeItem("busqueda"); // reinicio de parametro
sessionStorage.removeItem('id'); // reinicio de parametro
content.insertAdjacentHTML('beforeEnd', hero); // insertado en pagina

};



