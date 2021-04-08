import React, {useState, useEffect} from 'react';

// import service from '../../../queries/get_all_characters'
import {SeriesOptions} from './SeriesOptions'

import {Seasons} from '../Seasons/Seasons'


import {CssBaseline, Typography, Container} from '@material-ui/core'



function Home() {
  // const [characters, setCharacters] = useState([]);

  // useEffect(() => {
  //   fetchCharacters()
  // }, []);

  // async function fetchCharacters(){
  //   const charactersList = await service.getAllCharacters();
  //   const charactersList2 = charactersList.map( (elem) => elem.name )
  //   setCharacters(charactersList2)
  // }
  
  return (
    <>
      <React.Fragment>
        <CssBaseline />
          {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
          <Container maxWidth="sm">
              <SeriesOptions/>
              {/* <Seasons/> */}
          </Container>
      </React.Fragment>
      
      {
        /*
        <div>Estoy en home</div>
        <div>{characters}</div> 
        */
      }
      
    </>
  );
}

export { Home };
