import { createContext } from "react";

import ActionTask from "../actions/ActionTask";

const GlobalTaskContext = createContext({});

export const GlobalTaskProvider = ({ children }) => {
  const {
    success,
    error,
    message,
    taskList,
    getAllTasks,
    addTask,
    sortUpdateAt,
    sortResponsibleId,
  } = ActionTask();

  return (
    <GlobalTaskContext.Provider
      value={{
        success,
        error,
        message,
        taskList,
        getAllTasks,
        addTask,
        sortUpdateAt,
        sortResponsibleId,
      }}
    >
      {children}
    </GlobalTaskContext.Provider>
  );
};

export default GlobalTaskContext;
