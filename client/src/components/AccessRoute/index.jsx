import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import GlobalContext from "../../context/GlobalProvider";

function AccessRouter({ redirectPath = "/signin", children }) {
  const { isAuthenticated } = useContext(GlobalContext);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

export default AccessRouter;
