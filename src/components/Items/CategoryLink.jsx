import React from 'react';
import { Link } from 'react-router';

const className = 'col-xs-2';
export default ({category}) => {
  console.log(category);
  const imgURL = `../../assets/ItemIcons/${category}.png`;
  const style = {
    backgroundImage: `url(${imgURL})`
  }
  return <Link className={className} to={`/items/${category.toLowerCase()}`} style={style}>{category}</Link>
}
