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
  function findByName(pokemonName){
    let filterResult = pokemonList.filter(pokemon => pokemon.name === pokemonName);
    console.log(`We found the Pokemon: ${filterResult[0].name}`);
  }

  //Function to return all pokemon objects in the Array
  function getAll(){
    return pokemonList;
  }

  return {
    add: add,
    findByName: findByName,
    getAll: getAll
  }
})();

//Implementation of ForEach method to display all pokemon objects
pokemonRepository.getAll().forEach(function(pokemon)
{
  //Conditional statement to ensure an adjective is printed for the biggest pokemon object
  if (pokemon.height > 1.5)
  {
    document.write(`${pokemon.name} (Height: ${pokemon.height}) - Wow, that's BIG! <br>`);
  }
  else
  {
    document.write(`${pokemon.name} (Height: ${pokemon.height}) <br>`);
  }
  document.write("<br>");
});


//

pokemonRepository.findByName('Pikachu');
