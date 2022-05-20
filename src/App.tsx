import React from "react";
import { Provider } from 'react-redux';
import store from "./store";
import Routes from "./routes";
import "./App.scss";
// import "antd/dist/antd.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {Routes}
    </Provider>
  )
};

export default App;
