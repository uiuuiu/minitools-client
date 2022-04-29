import React from "react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AuthLayout.scss';

export default ({children}) => {
  return (
    <div className="auth-layout">
      <ToastContainer />
      {children}
    </div>
  )
}