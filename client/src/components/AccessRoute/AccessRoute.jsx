import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AccessRouter({ authenticated, redirectPath = "/signin", children }) {
  if (!authenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}

export default AccessRouter;
