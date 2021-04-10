import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {List, ListItem, ListItemText, Divider} from '@material-ui/core'
import { useHistory, useRouteMatch } from "react-router-dom";
import service from '../../../queries/getCharacterByFullName'

const Characters = (props) => {
    const classes = useStyles();
    let { url } = useRouteMatch();
    const history = useHistory();
    
    const {characters} = props

    const [characterId, setCharacterId] = useState(-1)

    const handleClick = (e, value, index) => {
        console.log(value, index + 1)
        // este index, es el numero del character en el episodio nomás, y no
        // significa nada.
        // => 
        // buscar el id del character en la API
        // supongamos que es 10:
        // console.log("nombre del personajeeee: ", value)
        let nameArray = value.split(" ")
        console.log(nameArray)
        let firstName = nameArray[0]
        let lastName = nameArray[1]
        let secondLastName = undefined
        if (nameArray.length == 2){ // minimo 2 nombres tienen en la APi los personajes.
          fetchCharacter(firstName, lastName)
        } else if (nameArray.length == 3){ // maximo 3 nombres en la API tienen los personajes        
          secondLastName = nameArray[2]
          fetchCharacterVersion2(firstName, lastName, secondLastName)
        }
        
        //history push lo hice dentro del fetch, para que solo lo haga
        // dps del await que espera el characterId
        
    }

    async function fetchCharacter(firstName, lastName){
      const characterData = await service.getCharacterByFullName(firstName, lastName)
      const characterData2 = characterData[0]
      // console.log("characterData2", characterData2)
      setCharacterId(characterData2.char_id)
      history.push(`/character/${characterData2.char_id}`) // cambiar de ruta
    }

    async function fetchCharacterVersion2(firstName, lastName, secondLastName){
      const characterData = await service.getCharacterByFullNameVersion2(firstName, lastName, secondLastName)
      const characterData2 = characterData[0]
      // console.log("characterData2", characterData2)
      setCharacterId(characterData2.char_id)
      history.push(`/character/${characterData2.char_id}`) // cambiar de ruta
    }

    const charactersList = characters.map( (elem, index) => (
        <>
            <ListItem button onClick={(e) => handleClick(e, elem, index)}>
                <ListItemText primary={`${elem}`} />
            </ListItem>
            <Divider light />
        </> 
     ))
       
    return (
        <>
          <div className={classes.section2}>
              <Typography gutterBottom variant="body1">
                Personajes
              </Typography>
          </div>
          <List component="nav" className={classes.root2} aria-label="mailbox folders">
              {charactersList}
          </List>
        </>
      );


}

const useStyles = makeStyles((theme) => ({
 
    section2: {
      margin: theme.spacing(2),
    },

    root2: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
  }));

export {Characters}