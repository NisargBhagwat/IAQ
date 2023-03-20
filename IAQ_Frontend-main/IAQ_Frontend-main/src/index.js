import "react-app-polyfill/stable";
import "core-js";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ToastContainer />
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
