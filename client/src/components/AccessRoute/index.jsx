import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";

function AccessRouter({ authenticated, redirectPath = "/signin", children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

export default AccessRouter;
