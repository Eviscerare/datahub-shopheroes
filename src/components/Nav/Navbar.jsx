/**
 * Navbar
 */

import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <nav className="navbar navbar-inverse">
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
