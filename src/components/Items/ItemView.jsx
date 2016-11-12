import React from 'react';

const ItemView = ({ params: {itemname} }) => {
  return (
    <div className="item-view">
      <ul>
        <li>ItemView for {itemname}</li>
      </ul>
    </div>
  )
}

export default ItemView;
