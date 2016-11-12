import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexLink } from 'react-router';
import {
  DataHub,
  ItemsHome, ItemCategories, CategoryView, ItemView,
  WorkersHome, HeroesHome, BuildingsHome
} from 'components';

import './style/main.css';
import './style/TestCSS.css';
import './style/ItemCategories.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={DataHub}>

      <Route path="/items" component={ItemsHome}>
        <IndexRoute component={ItemCategories} />
        <Route path="/items/:category" component={CategoryView} />
        <Route path="/items/:category/:itemname" component={ItemView} />
      </Route>

      <Route path="/workers" component={WorkersHome} />
      <Route path="/heroes" component={HeroesHome} />
      <Route path="/buildings" component={BuildingsHome} />
    </Route>
  </Router>
), document.getElementById('root'))
