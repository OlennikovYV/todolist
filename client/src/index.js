import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalProvider";

import RoutesApp from "./routes/RoutesApp";

import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalProvider>
        <RoutesApp />
      </GlobalProvider>
    </Router>
  </React.StrictMode>
);
