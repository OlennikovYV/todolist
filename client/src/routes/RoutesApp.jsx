import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

import AccessRouter from "../components/AccessRoute/AccessRoute";
import Task from "../pages/Task.jsx";
import Error404 from "../pages/error404.jsx";
import Login from "../pages/Login.jsx";

function RoutesApp() {
  const { authenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signin' element={<Login />} />
      <Route path='*' element={<Error404 />} />
      <Route element={<AccessRouter authenticated={authenticated} />}>
        <Route path='/task' element={<Task />} />
      </Route>
    </Routes>
  );
}

export default RoutesApp;
