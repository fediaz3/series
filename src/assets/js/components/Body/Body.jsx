import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import { Home } from '../Home/Home'
import {HomeSeason, Season} from '../Seasons/HomeSeason'

function Body() {
  return (
        <Switch>
          <Route exact path="/" component={() => <Home/>} />
          <Route path="/season/:id" children={() => <HomeSeason/>} />
          {/*
          <Route exact path="/link1" render={() => <div>link1</div>} />
          <Route exact path="/link2" render={() => <div>link2</div>} />   
          */}      
        </Switch>
  );
}

export { Body }
