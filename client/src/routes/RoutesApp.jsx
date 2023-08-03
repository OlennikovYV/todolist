import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

import AccessRouter from "../components/AccessRoute";
import MainTask from "../pages/MainTask.jsx";
import Error from "../pages/Error.jsx";
import Login from "../pages/Login.jsx";

function RoutesApp() {
  const { authenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signin' element={<Login />} />
      <Route path='*' element={<Error />} />
      <Route element={<AccessRouter authenticated={authenticated} />}>
        <Route path='/main-task' element={<MainTask />} />
      </Route>
    </Routes>
  );
}

export default RoutesApp;
