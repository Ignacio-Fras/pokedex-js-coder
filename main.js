// Se saluda al usuario
 const btn = document.querySelector("#btn").addEventListener("click", () =>{
     Swal.fire('Bienvenido')
     })

// // Se aplica una alerta en el caso que el usuario refresque la pagina, por si quiere guardar o no su progreso
//  Swal.fire({
//      title: 'Do you want to save the changes?',
//      showDenyButton: true,
//      showCancelButton: true,
//      confirmButtonText: 'Save',
//      denyButtonText: `Don't save`,
//    }).then((result) => {
//      if (result.isConfirmed) {
//        Swal.fire('Saved!', '', 'success')
//      } else if (result.isDenied) {
//        Swal.fire('Changes are not saved', '', 'info')
//      }
//    })

// Se utiliza DOM para el estilo de la pokedex
const pokemonCard = document.querySelector('[data-poke-card]');
const pokemonNombre = document.querySelector('[data-poke-name]');
const pokemonImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokemonId = document.querySelector('[data-poke-id]');
const pokemonTipos = document.querySelector('[data-poke-types]');
const pokemonEstado = document.querySelector('[data-poke-stats]');

// Se aplican colores para cada tipo de pokemon
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

// Se aplican eventos y funciones de tipo arrow para iniciar la busqueda
const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderDatosPokemon(response))
        .catch(err => renderNotFound())
}

const renderDatosPokemon = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokemonNombre.textContent = data.name;
    pokemonImg.setAttribute('src', sprite);
    pokemonId.textContent = `Nº ${data.id}`;
    setColorCarta(types);
    renderTipoPokemon(types);
    renderPokemonEstados(stats);
}

// Se asigna el color primario y secundario a la caja que contiene la img del pokemon

const setColorCarta = types => {
    const colorUno = typeColors[types[0].type.name];
    const colorDos = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokemonImg.style.background =  `radial-gradient(${colorDos} 33%, ${colorUno} 43%)`;
    pokemonImg.style.backgroundSize = ' 10px 10px';
}

// Se obtiene en pantalla el tipo y las estadisticas de cada pokemon
const renderTipoPokemon = types => {
    pokemonTipos.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokemonTipos.appendChild(typeTextElement);
    });
}

const renderPokemonEstados = stats => {
    pokemonEstado.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokemonEstado.appendChild(statElement);
    });
}

// Se asigna una funcion y se establece lo que ocurre en la pagina en el caso de escribir un pokemon incorrecto en la pokedex
const renderNotFound = () => {
    pokemonNombre.textContent = 'No encontrado';
    pokemonImg.setAttribute('src','./images/Pokedex.png');
    pokemonImg.style.background =  '#fff';
    pokemonTipos.innerHTML = '';
    pokemonEstado.innerHTML = '';
    pokemonId.textContent = '';
}

// Se establece un localStorage para que el usuario vea el ultimo pokemon que busco antes de cerrar el navegador


// Se aplica una libreria para que se llene un formulario y tener datos del usuario

// Se crea un evento para que se salude al usuario una vez que lleno el formulario del inicio de la pagina mediante libreria
