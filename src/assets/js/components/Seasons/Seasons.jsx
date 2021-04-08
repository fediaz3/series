import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Episodes } from '../Episodes/Episodes';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Seasons = (props) => {
  const classes = useStyles();
  const {serie} = props // receive its serie that belongs to 

  const [currentSeason, setCurrentSeason] = useState(-1);

  const handleChange = (event, value) => {
    setCurrentSeason(value);
    console.log(value)
    // dirigir a una nueva vista para la temporada.(salir de HOME)
  };

  const seasons = ['Temporada 1', "Temporada 2", "Temporada 3",
                    'Temporada 4', 'Temporada 5', 'Temporada 6', 'Temporada 7']


  const seasonsTabPanel = seasons.map((elem, index) => (
      <Tab label={`${elem}`} {...a11yProps(index)} />
  ));

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={currentSeason}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >   
          {seasonsTabPanel}  
        </Tabs>
      </AppBar>

      
      {/*
        seasons.map((elem, index) => (
            <TabPanel value={value} index={index}>
                {elem}
                <Episodes/>
            </TabPanel>
        ))
        */}
      
    </div>
  );
}

export {Seasons}