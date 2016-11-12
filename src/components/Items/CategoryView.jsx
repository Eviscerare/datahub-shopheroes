/**
 * Category View ~ Container for all items of particular type, ie. swords
 */

import React from 'react';
import { Link } from 'react-router';
import { ItemLink } from 'components';

export default ({ params: {category}, loadData }) => {
  // const items = [];
  // loadData(category)
  //   .then(itemArray => {
  //     itemArray.forEach(item => items.push(item.itemName));
  //     console.log(items)
  //   })
  //   .catch(err => console.error(err));
  const links = [];
  const img = require(`../../assets/ItemIcons/Armor.png`);
  const style = {
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 20px'
  }

  createLinks(category, loadData(category));
  function createLinks(itemType, itemArray) {
    if (!itemArray) return <div className="category-view">Loading data...</div>;
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
