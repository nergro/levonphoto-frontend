import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

import App from "./components/app";
import * as serviceWorker from "./serviceWorker";
import authReducer from "./store/reducers/auth";
import mainReducer from "./store/reducers/main";

// axios.defaults.baseURL = "https://levon.herokuapp.com";
// axios.defaults.baseURL = "http://localhost:8080";

const devMiddleware =
  typeof window !== "undefined" && window.devToolsExtension
    ? window.devToolsExtension()
    : f => f;

const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer
});
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    devMiddleware
  )
);

const AppWithRedux = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

hydrate(<AppWithRedux />, document.getElementById("root"));
