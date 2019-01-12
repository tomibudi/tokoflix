import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App/App';
import HomePage from './container/HomePage/';
import DetailMovie from  './container/Detail/index';
// import PostPage from './components/PostPage/PostPage';

export default (
  <Route path="/" component={App}>
    <Route path="/sample" component={HomePage} />
    {/* <Route path="/post/:postID" component={Homepage} /> */}
    <Route path="/:id-:slugname" component={DetailMovie} />
    <IndexRoute component={HomePage} />
  </Route>
);


