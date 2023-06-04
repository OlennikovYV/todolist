import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";
import Login from "../../pages/Login";

function AccessRouter() {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? <Outlet /> : <Login />;
}

export default AccessRouter;
