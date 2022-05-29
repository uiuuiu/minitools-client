import React, { HTMLAttributes } from 'react';
import './AppContentHeaderBar.scss';

interface AppContentHeaderBarProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export default ({ children, ...props }: AppContentHeaderBarProps) => {
  const defaultClassName = 'app-content-header-bar'
  const classNames = props.className ? `${defaultClassName} ${props.className}` : defaultClassName
  const newProps = {
    ...props,
    className: classNames
  }

  return (
    <div {...newProps}>
      {children}
    </div>
  )
};
