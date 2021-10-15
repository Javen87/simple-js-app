//IIFE created
let pokemonRepository = (function () {
  //Manaually filling pokemon array with pokemon objects
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass','poison']},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    {name: 'Pikachu', height: 0.4, type: ['electric']},
    {name: 'Gastly', height: 1.3, type: ['ghost','poison']},
    {name: 'Nidoking', height: 1.4, type: ['ground','poison']}
  ];

  //Function to add pokemon object to Array of Pokemon
  function add(pokemon){
    //Conditional statement to ensure its a pokemon object
    if (typeof pokemon === 'object')
    {
      pokemonList.push(pokemon);
    }
    else
    {
      document.write('Not a Pokemmon Object');
    }
  }

  //Function to filter pokemon by name
  function findByName(pokemonName){
    let filterResult = pokemonList.filter(pokemon => pokemon.name === pokemonName);
    console.log(`We found the Pokemon: ${filterResult[0].name}`);
  }

  //Function to add pokemen to the List for displaying
  function addListItem(pokemon){
    let listContainer = document.querySelector('ul');

    let listItem = document.createElement('li');
  
    let button = document.createElement('button');
    button.innerHTML = pokemon.name;
    button.addEventListener('click', function() {
      showDetails(pokemon)
    });
  
    button.classList.add('list-button');
  
    listItem.appendChild(button);
  
    listContainer.appendChild(listItem);
  }

  //Function to show Pokemon when clicked
  function showDetails(pokemon){
    console.log(pokemon.name);
  }

  //Function to return all pokemon objects in the Array
  function getAll(){
    return pokemonList;
  }

  return {
    add: add,
    findByName: findByName,
    addListItem: addListItem,
    showDetails: showDetails,
    getAll: getAll
  }
})();

//Implementation of ForEach method to display all pokemon objects
pokemonRepository.getAll().forEach(function(pokemon)
{
  pokemonRepository.addListItem(pokemon);
  
});


//

pokemonRepository.findByName('Pikachu');
