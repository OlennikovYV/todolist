import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";
import Error404 from "../../pages/error404";

function AccessRouter() {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? <Outlet /> : <Error404 />;
}

export default AccessRouter;
