import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';

import "./index.css";
import App from "./App";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
 
const store = createStore(burgerBuilderReducer, composeWithDevTools());

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
