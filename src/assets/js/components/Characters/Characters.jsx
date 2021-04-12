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

    // const [characterId, setCharacterId] = useState(-1)

    const handleClick = (e, value, index) => {
        console.log(value, index + 1)
        // este index, es el numero del character en el episodio nomás, y no
        // significa nada.
        // => 
        // buscar el id del character en la API
        // supongamos que es 10:
        // console.log("nombre del personajeeee: ", value)

        // console.log(nameArray)
        let nameArray = value.split(" ")
        // console.log(nameArray)
        let n1 = nameArray[0]
        let n2 = nameArray[1]
        let n3 = undefined
        // console.log("lelgamos aca xD 1:", nameArray)
        if (nameArray.length == 3){
          n3 = nameArray[2]
          // console.log("lelgamos aca xD2:", nameArray)
        }
        let n4 = undefined
        if (nameArray.length == 4){
          n3 = nameArray[2]
          n4 = nameArray[3]
        } 
        fetchCharacter(n1, n2, n3, n4)
        //history push lo hice dentro del fetch, para que solo lo haga
        // dps del await que espera el characterId
    }

    async function fetchCharacter(n1, n2, n3, n4){
      try {
        const characterData = await service.getCharacterByFullNameNew(n1, n2, n3, n4)
        const characterData2 = characterData[0]
        // console.log("Character data",characterData[0])
        // setCharacterId(characterData2.char_id)
        history.push(`/character/${characterData2.char_id}`) // cambiar de ruta
      } catch(error) {
        console.log("Error No se pudo encontrar info de este personaje", error)
        //quizas mostrar una ventana emergente, pero por lo que piden
        // con que no se caiga es suficiente.
      }
      
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