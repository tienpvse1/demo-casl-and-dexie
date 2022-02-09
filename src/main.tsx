import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { AbilityProvider } from "./context/permission.context";

ReactDOM.render(
  <React.StrictMode>
    <AbilityProvider>
      <App />
    </AbilityProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
