import React from "react";
import './AppContent.scss';

export default ({children}) => {
  return (
    <div className="app-main-content">
      {children}
    </div>
  )
}