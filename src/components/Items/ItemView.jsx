import React from 'react';

export default ({ params: {itemname} }) => {
  return (
    <div className="item-view">
      ItemView for {itemname}
    </div>
  )
}
