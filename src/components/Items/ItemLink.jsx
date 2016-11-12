/**
 * Returns a React Link to a certain item page, ie. shortsword
 */

import React from 'react';
import { Link } from 'react-router';

const className = 'col-xs-5';
export default ({category, itemname}) => {
  const img = require(`../../assets/ItemIcons/${category}.png`);
  const style = {
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 20px'
  }
  return <Link className={className} to={`/items/${category}/${itemname.toLowerCase().replace(/ /, '')}`} style={style}>{itemname}</Link>
}
