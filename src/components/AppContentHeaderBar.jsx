import React from 'react';
import './AppContentHeaderBar.scss';

export default ({children, ...props}) => {
  const defaultClassName = 'app-content-header-bar' 
  const classNames = props.className ? `${defaultClassName} ${props.className}` : defaultClassName
  const newProps = {
    ...props,
    className: classNames
  }

  return(
    <div {...newProps}>
      {children}
    </div>
  )
}