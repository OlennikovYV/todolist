import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import { GlobalProvider } from "./context/GlobalProvider";
import RoutesApp from "./routes/RoutesApp";

import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <GlobalProvider>
          <RoutesApp />
        </GlobalProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
