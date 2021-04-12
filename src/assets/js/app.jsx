import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HashRouter as Router } from 'react-router-dom';

const reactAppContainer = document.getElementById('react-app');

if (reactAppContainer) {
  ReactDOM.render(
    <Router>
      <App/>
    </Router>
    ,
  reactAppContainer);
}
