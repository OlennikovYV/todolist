import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import AccessRouter from "./components/AccessRoute/index";
import Login from "./pages/Login.jsx";
import Task from "./pages/Task.jsx";
import Error404 from "./pages/error404.jsx";

function Todo() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<Error404 />} />
        <Route element={<AccessRouter />}>
          <Route path='/task' element={<Task />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default Todo;