import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemText, Divider} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const Episodes = (props) => {
    const classes = useStyles();
    const {season} = props // receive its season

    const episodes = [
        "Pilot",
         "Cat's in the Bag...",
         "...And the Bag's in the River",
         "Cancer Man",
         "Gray Matter",
         "Crazy Handful of Nothin",
         "A No-Rough-Stuff-Type Deal"
     ]

     const episodesComponents = episodes.map( (elem) => (
        <>
            <ListItem button>
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