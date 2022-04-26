import React from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import Routes from "./routes";
import "./App.scss";
// import "antd/dist/antd.css";

const store = createStore(rootReducer);

export default () => (
  <Provider store={store}>
    {Routes}
  </Provider>
);
