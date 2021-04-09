import React from 'react'


import { useParams } from "react-router-dom";


import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import {List, ListItem, ListItemText, Divider} from '@material-ui/core'
import { Characters } from '../Characters/Characters';




const Episode = (props) => {
    const classes = useStyles();

    let { serieName, seasonId, episodeId } = useParams(); // get the variable parameters 
                                                          // that exist in the current url

    return (
        <>
          <div className={classes.root}>
            <div className={classes.section1}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    {`Episodio ${episodeId}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    Temporada X 
                  </Typography>
                </Grid>
                
              </Grid>
              <Typography color="textSecondary" variant="body2">
                  Fecha de Lanzamiento: yyyy/mm/dd 
              </Typography>
              <Typography color="textSecondary" variant="body2">
                  Serie X
              </Typography>
            </div>
            <Divider variant="middle" />
          </div>
            
          <Characters/>
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


export {Episode}