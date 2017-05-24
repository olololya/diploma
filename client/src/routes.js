import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Authorization from './components/Authorization/index';

export default (
  <Route component={App} path="/">
    <IndexRoute component={Authorization} />
    <Route path="/home" component={Home} />
  </Route>
);
