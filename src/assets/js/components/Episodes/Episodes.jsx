import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemText, Divider} from '@material-ui/core'
import { useHistory, useRouteMatch } from "react-router-dom";
import { HistoryOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const Episodes = (props) => {
    const classes = useStyles();

    let { url } = useRouteMatch();
    const history = useHistory();

    const {seasonId} = props // receive its season

    const episodes = [
        "Pilot",
         "Cat's in the Bag...",
         "...And the Bag's in the River",
         "Cancer Man",
         "Gray Matter",
         "Crazy Handful of Nothin",
         "A No-Rough-Stuff-Type Deal"
     ] //falta cambiar, este, hacer la consulta a la api correspondiente
      //cuando se haga click aqui.(o en el componente que contiene este,
      // revisar que es mas eficiente dps)

    const handleClick = (e, elem) => {
      console.log(elem)
      console.log("current url: ", url) 
      // /:serieName/season/:seasonId/episode/:episodeId
      history.push(`${url}/episode/${1}`)
      // history.push(`${seasonId}/episode/${1}`) Este tambien servia porque:
      // importante notar esto
      //push que empieza sin "/"
      //agrega al existente, partiendo
      // desde uno anterior.
      // Y PUSH QUE EMPIEZA CON url modifica la ruta entera
                                               
      
      // history.push(`${url}/${elem}`)
      // dirigir al episodio con ese nombre con react router.
      // 
      

    }

     const episodesComponents = episodes.map( (elem) => (
        <>
            <ListItem button onClick={(e) => handleClick(e, elem)}>
                <ListItemText primary={`${elem}`} />
            </ListItem>
            <Divider light />
        </> 
     ))
     return (
        <List component="nav" className={classes.root} aria-label="mailbox folders">
          {episodesComponents}
        </List>
      );

}

export { Episodes }