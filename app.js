// Obtener elementos del DOM
const form = document.querySelector('#search-form');
const inputName = document.querySelector('#name');
const select = document.querySelector('#status');
const results = document.querySelector('.results');

// Función para crear la tarjeta de un personaje
function createCard(character) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <h3>${character.name}</h3>
    <p><strong>Species:</strong> ${character.species}</p>
    <p><strong>Status:</strong> ${character.status}</p>
    <p><strong>Gender:</strong> ${character.gender}</p>
    <p><strong>Origin:</strong> ${character.origin.name}</p>
    <p><strong>Location:</strong> ${character.location.name}</p>
  `;
  return card;
}

// Función para mostrar los resultados
function showResults(characters) {
  // Limpiar resultados anteriores
  results.innerHTML = '';
  // Crear una tarjeta por cada personaje
  characters.forEach(character => {
    const card = createCard(character);
    // Agregar evento click para mostrar detalles
    card.addEventListener('click', () => {
      alert(`ID: ${character.id}\nType: ${character.type}\nEpisodes: ${character.episode.length}`);
    });
    // Agregar la tarjeta a los resultados
    results.appendChild(card);
  });
}

// Función para realizar la búsqueda
async function searchCharacters() {
  // Obtener los valores de búsqueda
  const searchTerm = inputName.value;
  const searchType = select.value;
  // Realizar la petición a la API de Rick and Morty
  const response = await fetch(`https://rickandmortyapi.com/api/character/?${searchType}=${searchTerm}`);
  const data = await response.json();
  // Mostrar los resultados
  showResults(data.results);
}

// Agregar evento submit al formulario
form.addEventListener('submit', event => {
  event.preventDefault();
  searchCharacters();
});