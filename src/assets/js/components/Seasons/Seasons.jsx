import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Episodes } from '../Episodes/Episodes';
import { useHistory } from "react-router-dom";
import { HistoryOutlined } from '@material-ui/icons';


import service from '../../../queries/getEpisodesBySerie'


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
  const history = useHistory();

  const {serie} = props // receive its serie that belongs to 
  const [currentSeason, setCurrentSeason] = useState(-1);

  const [seasonsBreakingBad, setSeasonsBreakingBad] = useState([])

  const [seasonsBetterCallSaul, setSeasonsBetterCallSaul] = useState([])


  useEffect(() => {
    fetchSeasons() // solo se ejecuta al inicio, al cargar el componente
  }, [])

  async function fetchSeasons(){
    const seasonsBrBadList = await service.getEpisodesBreakingBad();
    // console.log("Seasons breaking bad List:", seasonsBBadList)
    const seasonsBrBadList2 = seasonsBrBadList.map( (elem) => (elem.season) )
    let uniqueSeasonsBrBadList = [ ... new Set(seasonsBrBadList2)]
    // console.log("Seasos List in breaking bad:", uniqueSeasonsBrBadList)
    setSeasonsBreakingBad(uniqueSeasonsBrBadList)

    const seasonsBeCalList = await service.getEpisodesBetterCallSaul();
    let seasonsBeCalList2 = seasonsBeCalList.map( (elem) => (elem.season) )
    let uniqueSeasonsBeCalList = [ ... new Set(seasonsBeCalList2)]
    // console.log("Seasons better call soul List:", uniqueSeasonsBeCalList)
    setSeasonsBetterCallSaul(uniqueSeasonsBeCalList)

  }

  const handleClick = (event, value) => {
    setCurrentSeason(value);
    console.log(value)
    let seasonNum = value + 1
    
    history.push(`${serie}/season/${seasonNum}`) //because value is the index
                                         // and index start in 0
                                         // and seasons start
    // dirigir a una nueva vista para la temporada.(salir de HOME)
  };

  const seasonsBrBadTabPanel = seasonsBreakingBad.map((elem, index) => (
      <Tab label={`Temporada ${elem}`} {...a11yProps(index)} />
  ));

  const seasonsBeCalTabPanel = seasonsBetterCallSaul.map((elem, index) => (
    <Tab label={`Temporada ${elem}`} {...a11yProps(index)} />
));

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={currentSeason}
          onChange={handleClick}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          { 
          serie == "Breaking Bad"
          ? seasonsBrBadTabPanel  // when condition is True
          : seasonsBeCalTabPanel 
          }
        
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