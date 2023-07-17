import { createContext } from "react";

import ActionTask from "../actions/ActionTask";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const {
    errorTask,
    loadingTask,
    messageTask,
    prioritiesList,
    successTask,
    taskList,
    addTask,
    getAllTasks,
    getPriorities,
    sortResponsibleId,
    sortUpdateAt,
    updateTask,
  } = ActionTask();

  return (
    <GlobalContext.Provider
      value={{
        // ReducerTask
        errorTask,
        loadingTask,
        messageTask,
        prioritiesList,
        successTask,
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
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
