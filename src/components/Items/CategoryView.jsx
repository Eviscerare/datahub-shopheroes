/**
 * Category View ~ Container for all items of particular type, ie. swords
 */

import React from 'react';
import { Link } from 'react-router';

export default ({ params: {category}, loadData }) => {
  const links = [];
  createLinks(category, loadData(category));

  function createLinks(itemType, itemArray) {
    if (!itemArray) return <div className = "category-view">Loading data...</div>;
    itemArray.forEach(item => {
      const itemName = item.itemName.toLowerCase().replace(/ /, '');
      const to = `/items/${itemType}/${itemName}`;
      const link = <Link className="col-xs-5" key={item.itemName} to={to}>{item.itemName}</Link>;
      links.push(link);
    });
  }
  
  return (
    <div className="category-view">
      {links}
    </div>
  )
}
