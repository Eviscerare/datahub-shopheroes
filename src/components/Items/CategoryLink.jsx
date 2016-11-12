import React from 'react';
import { Link } from 'react-router';

const className = 'col-xs-2';
export default ({category}) => {
  const img = require(`../../assets/ItemIcons/${category}.png`);
  const style = {
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 20px'
  }
  return <Link className={className} to={`/items/${category.toLowerCase()}`} style={style}>{category}</Link>
}
