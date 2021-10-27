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

    //Selecting the List Item Node and adding CSS classes
    let listpokemon = document.createElement('li');
   
    //Creating button element for each pokemon
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('list-button', 'btn', 'btn-outline-primary', 'font-weight-bold');
    
    //Adding Event Listener to button for the modal using jQuery
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModalContainer');

    //Adding EventListener to Pokemon Button
    button.addEventListener("click", function() {
      showDetails(pokemon);
    });

    //Adding the pokemon to the button and then as a List Item
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
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
    loadDetails(pokemonObject).then(function () {
      showModal(pokemonObject);
    });
  }

  //Function to create modal box to display Pokemon Information
  function showModal(pokemonObject){
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    modalTitle.innerText = '';
    modalBody.innerText = '';

    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemonObject.name;

    let imageElement = document.createElement('img');
    imageElement.src = pokemonObject.imageUrl;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemonObject.height;

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + pokemonObject.weight;

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);

    modalContainer.classList.add('is-visible');

  }
 
  //Function to hide Modal Box
  function hideModal(){
    modalContainer.classList.remove('is-visible');
  }

  //Function to add Click Event Listener to close Modal Container
  modalContainer.addEventListener('click', (ev) =>{
    let target = ev.target;
    if(target === modalContainer){
      hideModal();
    }
  });

  //Function to add Event Listener to close Modal after pressing the Escape Key
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



