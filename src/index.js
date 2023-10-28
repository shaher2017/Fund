import React from "react";
import { createRoot } from "react-dom/client"; // Correct import path
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import reportWebVitals from "./reportWebVitals";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";
let persistor = persistStore(store);

if (process.env.NODE_ENV !== "production") disableReactDevTools();
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
