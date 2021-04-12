import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {List, ListItem, ListItemText, Divider} from '@material-ui/core'
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { HistoryOutlined } from '@material-ui/icons';
import service from '../../../queries/getEpisodesBySerie'
import { Loading } from '../Loading/Loading';
import { ErrorMessage } from '../Error/Error';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const Episodes = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const classes = useStyles();

    let { url } = useRouteMatch();
    const history = useHistory();
    let { serieName, seasonNum } = useParams(); 


    const [episodesBrBad, setEpisodesBrBad] = useState([])
    const [episodesBeCal, setEpisodesBeCal] = useState([])

    useEffect(() => {
      console.log("Serieee nameeeeee:", serieName)
      if (serieName == "Breaking Bad"){
        fetchEpisodesBreakingBad()
      } else if (serieName == "Better Call Saul"){
        fetchEpisodesBetterCallSaul()
      }
      // fetchSeasons()
    }, [])


    async function fetchEpisodesBreakingBad(){
      try {
        const episodesBrBadList = await service.getEpisodesBreakingBad();
        // console.log("Episodes breaking bad List:", episodesBrBadList)
        const episodesBrBadList2 = episodesBrBadList.
          filter( (x) => `${x.season}` == `${seasonNum}` ).
          map( (x) => {return {episodeId: x.episode_id, title: x.title} } )
        //console.log("Episodes breaking bad List:", episodesBrBadList2)
        setEpisodesBrBad(episodesBrBadList2)
        setIsLoaded(true);
      } catch(error) {
        console.log("Error:", error)
        setError(error);
        setIsLoaded(true);

      }
      
    }

    async function fetchEpisodesBetterCallSaul(){
      try {
        const episodesBeCalList = await service.getEpisodesBetterCallSaul();
        // console.log("Episodes better call saul List:", episodesBeCalList)
        const episodesBeCalList2 = episodesBeCalList.
          filter( (x) => `${x.season}` == `${seasonNum}` ).
          map( (x) => {return {episodeId: x.episode_id, title: x.title} } )
        //console.log("Episodes better call saul List:", episodesBeCalList2)
        setEpisodesBeCal(episodesBeCalList2)
        setIsLoaded(true);
      } catch(error) {
        console.log("Error:", error)
        setError(error);
        setIsLoaded(true);

      }
      
    }
    
    const handleClick = (e, elem, index) => {
      console.log(elem, elem.episodeId)
      // console.log("current url: ", url) 
      // /:serieName/season/:seasonNum/episode/:episodeNum/:episodeId
      history.push(`${url}/episode/${index + 1}/${elem.episodeId}`) //modificar con el real 
      // history.push(`${seasonNum}/episode/${1}`) Este tambien servia porque:
      // importante notar esto
      //push que empieza sin "/"
      //agrega al existente, partiendo
      // desde uno anterior.
      // Y PUSH QUE EMPIEZA CON url modifica la ruta entera
      // history.push(`${url}/${elem}`)
      // dirigir al episodio con ese nombre con react router.
      // 
      
    }

     const episodesBrBadComponents = episodesBrBad.map( (elem, index) => (
        <>
            <ListItem button onClick={(e) => handleClick(e, elem, index)}>
                <ListItemText primary={`${elem.title}`} />
            </ListItem>
            <Divider light />
        </> 
     ))

     const episodesBeCalComponents = episodesBeCal.map( (elem, index) => (
      <>
          <ListItem button onClick={(e) => handleClick(e, elem, index)}>
              <ListItemText primary={`${elem.title}`} />
          </ListItem>
          <Divider light />
      </> 
   ))
      if (error) {
       return (
        <>
          <ErrorMessage/>
        </>
       )
     } else if (!isLoaded) {
       return (
       <>
          <Loading/>
       </>);
     } else {
         return (
            <List component="nav" className={classes.root} aria-label="mailbox folders">
              { serieName == "Breaking Bad"
               ? episodesBrBadComponents
               : episodesBeCalComponents
              }
            </List>
          );
     }

}

export { Episodes }