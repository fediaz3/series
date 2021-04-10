import React, {useEffect, useState} from 'react'


import { useParams } from "react-router-dom";


import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import {List, ListItem, ListItemText, Divider} from '@material-ui/core'
import { Characters } from '../Characters/Characters';
import service from '../../../queries/getEpisodeById'



function convertDateFormat(date){
  let dateNew = date.slice(0, 10)
  return `${dateNew.slice(8, 10)}-${dateNew.slice(5, 7)}-${dateNew.slice(0, 4)}`

}

const Episode = (props) => {
    const classes = useStyles();

    let { serieName, seasonNum, episodeNum, episodeId } = useParams(); // get the variable parameters 
                                                          // that exist in the current url

    const [title, setTitle] = useState('')
    const [airDate, setAirDate] = useState('')
    const [characters, setCharacters] = useState([])

    //data to show after fetch (This variables are "let", and not states.
    // because this will not change after the mount or first fetch) 

    useEffect(() => {
      fetchEpisode(episodeId)
    }, [])
    // obtener la información de episodeId en la api
    async function fetchEpisode(episodeId){
      const episodeData = await service.getEpisodeById(episodeId);
      const episodeData2 = episodeData[0]
      console.log("Episode Data2: ", episodeData2)
      setTitle(episodeData2.title)
      setAirDate(episodeData2.air_date)
      setCharacters(episodeData2.characters)
      //console.log(episodeData2.air_date)
    }

    return (
        <>
          <div className={classes.root}>
            <div className={classes.section1}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    {`${title}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h6">
                    {`Episodio ${episodeNum} | Temporada ${seasonNum}`} 
                  </Typography>
                </Grid>
                
              </Grid>
              <Typography color="textSecondary" variant="body2">
                  {`Fecha de lanzamiento: ${convertDateFormat(airDate)}`}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                  {serieName}
              </Typography>
            </div>
            <Divider variant="middle" />
          </div>
            
          <Characters characters={characters}/>
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