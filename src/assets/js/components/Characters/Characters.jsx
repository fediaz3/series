import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {List, ListItem, ListItemText, Divider} from '@material-ui/core'
import { useHistory, useRouteMatch } from "react-router-dom";

const Characters = (props) => {
    const classes = useStyles();
    let { url } = useRouteMatch();
    const history = useHistory();
    
    const characters = ["Personaje 1", "Personaje 2", "Personaje 3", "Personaje 4",
                        "Personaje 5", "Personaje 6", "Personaje 7"]

    const handleClick = (e, value, index) => {
        console.log(value, index + 1)
        // este index, es el numero del character en el episodio nomás, y no
        // significa nada.
        // => 
        // buscar el id del character en la API
        // supongamos que es 10:
        history.push(`/character/${10}`) //modificar con el real 
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