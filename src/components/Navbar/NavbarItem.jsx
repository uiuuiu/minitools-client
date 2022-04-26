import React from "react";
import './NavbarItem.scss';

export default ({children}) => {
  return (
    <div className='navbar-item'>
      {children}
    </div>
  )
}
