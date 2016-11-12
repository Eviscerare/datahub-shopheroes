/**
 * Shop Heroes Data Hub ~ Main Container
 */

import React from 'react';
import { Navbar } from 'components';

export default ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
