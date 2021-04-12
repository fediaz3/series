import React from 'react';
import { hot } from 'react-hot-loader';
import { Body } from './Body/Body' 
import { Navbar } from './Navbar/Navbar'


function App() {
  return (
    <div>
      <Navbar/>
      <Body/>
    </div>
  );
}

export default hot(module)(App);
