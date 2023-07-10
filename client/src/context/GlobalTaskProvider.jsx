import { createContext } from "react";

import ActionTask from "../actions/ActionTask";

const GlobalTaskContext = createContext({});

export const GlobalTaskProvider = ({ children }) => {
  const {
    error,
    loading,
    message,
    priorities,
    success,
    taskList,
    addTask,
    getAllTasks,
    getPriorities,
    sortResponsibleId,
    sortUpdateAt,
    updateTask,
  } = ActionTask();

  return (
    <GlobalTaskContext.Provider
      value={{
        error,
        loading,
        message,
        priorities,
        success,
        taskList,
        addTask,
        getAllTasks,
        getPriorities,
        sortResponsibleId,
        sortUpdateAt,
        updateTask,
      }}
    >
      {children}
    </GlobalTaskContext.Provider>
  );
};

export default GlobalTaskContext;
