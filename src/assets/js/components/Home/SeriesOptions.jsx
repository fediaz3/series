import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Button,
} from '@material-ui/core';
import { Seasons } from '../Seasons/Seasons';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(6),
      align: 'center',
      textAlign: 'center',
    },
  },
  root2: {
    '& > *': {
      margin: theme.spacing(2),
      align: 'center',
      textAlign: 'center',
    },
  },
}));

const SeriesOptions = (props) => {
  const classes = useStyles();

  const [currentSerie, setCurrentSerie] = useState('Breaking Bad')

  const handleClick = (e, serie) => {
      console.log(e)
      console.log(serie)
      setCurrentSerie(serie)
  }
  
  
  return (
    <>
        <div className={classes.root2}>
            <Typography component="h1" variant="h5">
              {currentSerie}
            </Typography>
        </div>
        <div className={classes.root}>
            
            <Button variant="contained" color="primary" 
            onClick={(e) =>  handleClick(e, 'Breaking Bad')}>
                Breaking Bad
            </Button>
            
            <Button variant="contained" color="secondary" 
            onClick={(e) =>  handleClick(e, 'Better Call Saul')}>
              Better Call Saul
            </Button>
         
        </div>

        <Seasons serie={currentSerie}/>
    </>
  );
}

export {SeriesOptions}