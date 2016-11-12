/**
 * Returns a link to an item category, ie. swords
 */

import React from 'react';
import { Link } from 'react-router';

export default ({category}) => {
  const className = 'col-xs-2';
  const to = `/items/${category.toLowerCase()}`;
  const img = require(`../../assets/ItemIcons/${category}.png`);
  const style = {
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 20px'
  }
  return (
    <Link className={className} to={to} style={style}>{category}</Link>
  )
}
