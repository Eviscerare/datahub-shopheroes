/**
 * Item Categories ~ Category selection page for all the main item types
 */

import React from 'react';
import { CategoryLink } from 'components';

export default () => {
  const categories = [
    'Swords', 'Daggers', 'Axes', 'Spears', 'Maces', 'Staves', 'Bows',
    'Guns', 'Armor', 'Vests', 'Helmets', 'Gauntlets', 'Boots',
    'Clothes', 'Shields', 'Hats', 'Bracers', 'Footwear', 'Remedies',
    'Potions', 'Spells', 'Projectiles', 'Rings', 'Pendants', 'Instruments'
  ];

  return (
    <div className="item-categories">
      {categories.map((category) => <CategoryLink key={category} category={category} />)}
    </div>
  )
}
