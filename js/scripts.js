//Immediately Invoked Function Expression
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  let modalContainer = document.querySelector('#modalContainer');

  //Function to check if pokemon is an object before its added to the List
  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    } else {
      console.log("Not a pokrmon object");
    }
  }

  //Function to return all Pokemon objects
  function getAll() {
    return pokemonList;
  }

  //Function to add pokemon objects to unordered list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("list-button");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

  //Function to fetch pokemon from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //Function to fecth details of  specific pokemon  
  function loadDetails(pokemonObject) {
    let url = pokemonObject.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      pokemonObject.imageUrl = details.sprites.front_default;
      pokemonObject.height = details.height;
      pokemonObject.types = details.types;
      pokemonObject.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Function to dispay pokemon details
  function showDetails(pokemonObject) {
    pokemonRepository.loadDetails(pokemonObject).then(function () {
      showModal(pokemonObject.name, pokemonObject.imageUrl, pokemonObject.height, pokemonObject.weight);
      console.log(pokemonObject);
    });
  }

  //Function to create modal box for information
  function showModal(name, imageUrl, height, weight){
    
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = name;

    let imageElement = document.createElement('img');
    imageElement.src = imageUrl;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + height;

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + weight;

    modalContainer.appendChild(modal);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);

    modalContainer.classList.add('is-visible');
  }

  //Function to hide Modal Box
  function hideModal(){
    modalContainer.classList.remove('is-visible');
  }

  //Function to add Click Event Listener to Modal Container
  modalContainer.addEventListener('click', (ev) =>{
    let target = ev.target;
    if(target === modalContainer){
      hideModal();
    }
  });

  //Function to add Event Listener for pressing the Escape Key
  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});



