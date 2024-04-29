/* Importing Hooks, method, function etc. */
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";

/* Creating Virtual DOM */
const container = document.getElementById("root");
const root = createRoot(container);

/* Rendering the JSX */
root.render(
  <React.StrictMode>
    {/* Proving Redux Store access to whole component */}
    <Provider store={store}>
      {/* Using Persistence Local Storage */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
