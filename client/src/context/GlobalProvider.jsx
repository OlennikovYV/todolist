import { createContext } from "react";

import ActionTask from "../actions/ActionTask";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const {
    displayPeriodName,
    errorTask,
    loadingTask,
    messageTask,
    prioritiesList,
    sortFieldName,
    sortOrder,
    successTask,
    taskList,
    addTask,
    getAllTasks,
    getPriorities,
    setDisplayPeriodName,
    setSortFieldName,
    updateTask,
  } = ActionTask();

  return (
    <GlobalContext.Provider
      value={{
        // ReducerTask
        displayPeriodName,
        errorTask,
        loadingTask,
        messageTask,
        prioritiesList,
        sortFieldName,
        sortOrder,
        successTask,
        taskList,
        addTask,
        getAllTasks,
        getPriorities,
        setDisplayPeriodName,
        setSortFieldName,
        updateTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
