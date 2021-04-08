async function getAllCharacters() { // Obtiene characters, de la api que vamos a usar
    // voy a buscar el post a la api: (con fetch)
    const characters = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=3&offset=10');
    // el FETCH ES PARA OBTENER INFO DE OTROS SITIOS Y RETORNA UNA PROMESA
    return characters.json(); // lo pasamos a json, para que quede listo.
  }
  
  // eslint-disable-next-line max-len
  export default { getAllCharacters };
   // exporto la función para poder importarlo en otra parte
   // ( lo quiero usar en un componente react o archivo.jsx)