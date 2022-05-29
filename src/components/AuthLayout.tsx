import React from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AuthLayout.scss';

type AuthLayoutProps = {
  children: React.ReactNode
}

export default ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth-layout">
      <ToastContainer />
      {children}
    </div>
  )
};
