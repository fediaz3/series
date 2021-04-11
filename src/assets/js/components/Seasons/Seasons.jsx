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



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Seasons = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    try {
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
      setIsLoaded(true)
    } catch(error){
      console.log("Error: ", error)
      setError(error);
      setIsLoaded(true);
    }
    

  }

  const handleClick = (event, value) => {
    setCurrentSeason(value);
    let seasonNum = value
    history.push(`${serie}/season/${seasonNum}`) //because value is the index
                                         // and index start in 0
                                         // and seasons start
    // dirigir a una nueva vista para la temporada.(salir de HOME)
  };

  const seasonsBrBadTabPanel = seasonsBreakingBad.map((elem) => (
      <Tab label={`Temporada ${elem}`} value={elem} />
  ));
  const seasonsBeCalTabPanel = seasonsBetterCallSaul.map((elem) => (
    <Tab label={`Temporada ${elem}`} value={elem}/>
));
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            //value={currentSeason}
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
  
}


// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-auto-tabpanel-${index}`}
//       aria-labelledby={`scrollable-auto-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `scrollable-auto-tab-${index}`,
//     'aria-controls': `scrollable-auto-tabpanel-${index}`,
//   };
// }

export {Seasons}