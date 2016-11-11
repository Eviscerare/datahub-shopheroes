import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexLink } from 'react-router';
import { DataHub, ItemsHome, WorkersHome, HeroesHome, BuildingsHome } from 'components';
import './style/main.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={DataHub}>
      <Route path="/items" component={ItemsHome} />
      <Route path="/workers" component={WorkersHome} />
      <Route path="/heroes" component={HeroesHome} />
      <Route path="/buildings" component={BuildingsHome} />
    </Route>
  </Router>
), document.getElementById('root'))
