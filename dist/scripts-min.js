let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150",n=document.querySelector("#modalContainer");function o(t){"object"==typeof t?e.push(t):console.log("Not a pokrmon object")}function i(e){let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types,e.weight=t.weight}).catch(function(e){console.error(e)})}function l(e){i(e).then(function(){c(e)})}function c(e){let t=document.querySelector(".modal-title"),o=document.querySelector(".modal-body");t.innerText="",o.innerText="";let i=document.createElement("h1");i.innerText=e.name;let l=document.createElement("img");l.src=e.imageUrl;let c=document.createElement("p");c.innerText="Height: "+e.height;let r=document.createElement("p");r.innerText="Weight: "+e.weight,t.append(i),o.append(l),o.append(c),o.append(r),n.classList.add("is-visible")}function r(){n.classList.remove("is-visible")}return n.addEventListener("click",e=>{e.target===n&&r()}),window.addEventListener("keydown",e=>{"Escape"===e.key&&n.classList.contains("is-visible")&&r()}),{add:o,getAll:function(){return e},addListItem:function(e){let t=document.querySelector(".pokemon-list"),n=document.createElement("li"),o=document.createElement("button");o.innerText=e.name,o.classList.add("list-button","btn","btn-outline-primary","font-weight-bold"),o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#pokemonModalContainer"),o.addEventListener("click",function(){l(e)}),n.appendChild(o),t.appendChild(n)},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){let t={name:e.name,detailsUrl:e.url};o(t),console.log(t)})}).catch(function(e){console.error(e)})},loadDetails:i,showDetails:l,showModal:c}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});