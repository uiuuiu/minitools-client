import React from "react";
import './NavbarItem.scss';

type NavbarItemProps = {
  children: React.ReactNode
}

export default ({ children }: NavbarItemProps) => {
  return (
    <div className='navbar-item'>
      {children}
    </div>
  )
};
