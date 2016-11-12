import React from 'react';
import { Link } from 'react-router';

const className = 'col-xs-2';
export default ({category}) => <Link className={className} to={`/items/${category.toLowerCase()}`}>{category}</Link>
