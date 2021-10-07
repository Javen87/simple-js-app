

//Declaring empty pokemonList Array
let pokemonList = [];

//Initializing pokemonList Array with Objects
pokemonList =
[
    {name: 'Bulbasaur', height: 0.7, type: ['grass','poison']},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    {name: 'Pikachu', height: 0.4, type: ['electric']},
    {name: 'Gastly', height: 1.3, type: ['ghost','poison']},
    {name: 'Nidoking', height: 1.4, type: ['ground','poison']},
];

//For loop to traverse through all the pokemon in the array
for(let i=0; i < pokemonList.length; i++)
{
  //Conditional statement to check size of pokemon and display information through DOM
  if (pokemonList[i].height > 1.5)
  {
    document.write(`${pokemonList[i].name} (Height: ${pokemonList[i].height}) - Wow, that's BIG! <br>`);
  }
  else
  {
    document.write(`${pokemonList[i].name} (Height: ${pokemonList[i].height}) <br>`);
  }
  document.write("<br>");
}
