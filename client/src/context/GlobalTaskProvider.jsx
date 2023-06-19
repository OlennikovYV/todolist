import { createContext } from "react";

import ReducerTask from "../reducers/ReducerTask";

const GlobalTaskContext = createContext({});

export const GlobalTaskProvider = ({ children }) => {
  const {
    success,
    error,
    message,
    taskList,
    getAllTasks,
    sortUpdateAt,
    sortResponsibleId,
  } = ReducerTask();

  return (
    <GlobalTaskContext.Provider
      value={{
        success,
        error,
        message,
        taskList,
        getAllTasks,
        sortUpdateAt,
        sortResponsibleId,
      }}
    >
      {children}
    </GlobalTaskContext.Provider>
  );
};

export default GlobalTaskContext;
