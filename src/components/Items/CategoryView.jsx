/**
 * Category View ~ Container for all items of particular type, ie. swords
 */

import React from 'react';
import { Link } from 'react-router';
// import {
//   sword, dagger, axe, spear, mace, staff, bow, gun,
//   armor, vest, helmet, gauntlet, boots, clothes,
//   shield, hat, bracer, footwear, remedy, potion,
//   spell, projectile, ring, pendant, instruments
// } from './itemNames';

export default ({ params: {category} }) => {
  const links = [];
  createLinks(category, this.props.loadData(category));
  // switch (category) {
  //   case 'sword': createLinks(category, sword); break;
  //   case 'dagger': createLinks(category, dagger); break;
  //   case 'axe': createLinks(category, axe); break;
  //   case 'spear': createLinks(category, spear); break;
  //   case 'mace': createLinks(category, mace); break;
  //   case 'staff': createLinks(category, staff); break;
  //   case 'bow': createLinks(category, bow); break;
  //   case 'gun': createLinks(category, gun); break;
  //   case 'armor': createLinks(category, armor); break;
  //   case 'vest': createLinks(category, vest); break;
  //   case 'helmet': createLinks(category, helmet); break;
  //   case 'gauntlet': createLinks(category, gauntlet); break;
  //   case 'boots': createLinks(category, boots); break;
  //   case 'clothes': createLinks(category, clothes); break;
  //   case 'shield': createLinks(category, shield); break;
  //   case 'hat': createLinks(category, hat); break;
  //   case 'bracer': createLinks(category, bracer); break;
  //   case 'footwear': createLinks(category, footwear); break;
  //   case 'remedy': createLinks(category, remedy); break;
  //   case 'potion': createLinks(category, potion); break;
  //   case 'spell': createLinks(category, spell); break;
  //   case 'projectile': createLinks(category, projectile); break;
  //   case 'ring': createLinks(category, ring); break;
  //   case 'pendant': createLinks(category, pendant); break;
  //   case 'instruments': createLinks(category, instruments); break;
  // }

  function createLinks(itemType, itemArray) {
    if (itemArray == null) {
      return (<div className = "category-view">Loading data...</div>);
    }
    itemArray.forEach(item => {
      const itemName = item.toLowerCase().replace(/ /, '');
      const to = `/items/${itemType}/${itemName}`;
      const link = <Link className="col-xs-5" key={itemName} to={to}>{item}</Link>;
      links.push(link);
    });
  }

  return (
    <div className="category-view">
      {links}
    </div>
  )
}
