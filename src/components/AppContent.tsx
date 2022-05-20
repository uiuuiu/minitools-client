import React from "react";
import './AppContent.scss';

type AppContentProps = {
  children: React.ReactNode
}

export default ({ children }: AppContentProps) => {
  return (
    <div className="app-main-content">
      {children}
    </div>
  )
};
