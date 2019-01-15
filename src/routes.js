import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App/App';
import Homepage from './container/Homepage/';
import DetailMovie from  './container/Detail/index';

export default (
  <Route path="/" component={App}>
    <Route path="/:id-:slugname" component={DetailMovie} />
    <IndexRoute component={Homepage} />
  </Route>
);


