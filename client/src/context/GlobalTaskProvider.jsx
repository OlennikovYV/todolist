import { createContext } from "react";

import ActionTask from "../actions/ActionTask";

const GlobalTaskContext = createContext({});

export const GlobalTaskProvider = ({ children }) => {
  const {
    success,
    error,
    message,
    taskList,
    priorities,
    getAllTasks,
    addTask,
    updateTask,
    getPriorities,
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
        priorities,
        getAllTasks,
        addTask,
        updateTask,
        getPriorities,
        sortUpdateAt,
        sortResponsibleId,
      }}
    >
      {children}
    </GlobalTaskContext.Provider>
  );
};

export default GlobalTaskContext;
