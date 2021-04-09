import React from 'react'


import { useParams } from "react-router-dom";


import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import {List, ListItem, ListItemText, Divider} from '@material-ui/core'
import { Seasons } from '../Seasons/Seasons';
import { Link } from 'react-router-dom';




const Character = (props) => {
    const classes = useStyles();

    let { characterId } = useParams(); // get the variable parameters 
                                                          // that exist in the current url

    // con la API obtener, el nombre y todos sus detalles, porque aqui
    // ya tengo el ID unico del personaje

    const appearences_b_bad = [1, 2, 3, 4] //n° de la season(temporada) en la serie
    const appearences_b_caul_soul = [2, 5, 6, 7] //numero de temporada en la serie


    const appearencesBreakingBad = appearences_b_bad.map( (elem) => (
        <Link to={`/BreakingBad/season/${elem}`} style={{"text-decoration": "none"}}>
            {`Temporada ${elem}  `}
        </Link> 
        
    ))

    const appearencesBetterCaulSoul = appearences_b_caul_soul.map( (elem) => (
        <Link to={`/BetterCaulSoul/season/${elem}`} style={{"text-decoration": "none"}}>
            {`Temporada ${elem}  `}
        </Link> 
    ))


    return (
        <>
          <div className={classes.root}>
            <div className={classes.section1}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    {`Nombre Personaje`}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <img src="https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_mike-ehrmantraut-lg.jpg"
                   style={{ height: 'auto', width: "100%" }}></img>  
                </Grid>
                
              </Grid>
              <Typography color="textSecondary" variant="body2">
                  NickName: El Guasón
              </Typography>
              <Typography color="textSecondary" variant="body2">
                  Ocupación: Comisario 
              </Typography>
              <Typography color="textSecondary" variant="body2">
                  Estatus: Vivo
              </Typography>
              <Typography color="textSecondary" variant="body2">
                  NickName: El Guasón
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Apariciones en temporadas de Breaking Bad
              </Typography>
              {appearencesBreakingBad}
              <Typography color="textSecondary" variant="body2">
                  Apariciones en temporadas de Better Caul Soul
              </Typography>
              {appearencesBetterCaulSoul}
              
              <Typography color="textSecondary" variant="body2">
                  Actor/Actriz: Brad Pitt
              </Typography>
            </div>
            <Divider variant="middle" />
          </div>
            
        </>
      );
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
    root2: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
  }));


export {Character}