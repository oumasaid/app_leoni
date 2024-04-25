import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import "bulma/css/bulma.css";
import axios from "axios";

try {
  axios.defaults.withCredentials = true;
} catch (error) {
  console.error("Error configuring axios:", error);
}

const container = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
