import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import { Home } from '../Home/Home'
import {HomeSeason, Season} from '../Seasons/HomeSeason'
import { HomeEpisode } from '../Episodes/HomeEpisode';

function Body() {
  return (
        <Switch>
          <Route exact path="/" component={() => <Home/>} />
          
          <Route exact path="/:serieName/season/:seasonId" children={() => <HomeSeason/>} /> 
          <Route exact path="/:serieName/season/:seasonId/episode/:episodeId" children={() => <HomeEpisode/>} /> 
          
          {/* con :id y :type forma para pasar dos parametros */}
  
          {/*
          <Route exact path="/link1" render={() => <div>link1</div>} />
          <Route exact path="/link2" render={() => <div>link2</div>} />   
          */}      
        </Switch>
  );
}

export { Body }
