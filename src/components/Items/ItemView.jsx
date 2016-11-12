import React from 'react';

export default ({ params: {itemname} }) => {
  return (
    <div className="item-view">
      <ul>
        <li>ItemView for {itemname}</li>
      </ul>
    </div>
  )
}
