import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <div className="navbar-brand">Data Hub</div>
          </div>

          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/items">Items</Link></li>
            <li><Link to="/workers">Workers</Link></li>
            <li><Link to="/heroes">Heroes</Link></li>
            <li><Link to="/buildings">Buildings</Link></li>
          </ul>
          
        </div>
      </nav>
    )
  }
}

export default Navbar;
