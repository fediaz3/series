import React, {useState, useEffect} from 'react';

import service from '../../../queries/get_all_characters'


function Home() {
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    fetchCharacters()
  }, []);

  async function fetchCharacters(){
    const charactersList = await service.getAllCharacters();
    const charactersList2 = charactersList.map( (elem) => elem.name )
    setCharacters(charactersList2)
  }

  return (
    <>
      <div>Estoy en home</div>
      <div>{characters}</div>
    </>
  );
}

export { Home };
