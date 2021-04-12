import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Loading(props) {
  const classes = useStyles();
  const {color} = props

  return (
    <div className={classes.root}>
        {color == "red" ? 
        <CircularProgress color="secondary" />:
        <CircularProgress />
        }
     
    </div>
  );
}

export {Loading}