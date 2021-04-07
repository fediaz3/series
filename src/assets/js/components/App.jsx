import React from 'react';
import { hot } from 'react-hot-loader';
import { Router } from './router/Router' 
function App() {
  return (
    <div>
      Hello React World!
      <Router/>
    </div>
  
    );
}

export default hot(module)(App);
