import { createContext } from "react";

import ActionPage from "./actions/ActionPage";
import ActionTask from "./actions/ActionTask";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const {
    currentPage,
    limitPage,
    totalPage,
    setCurrentPage,
    setLimitPage,
    setTotalPage,
  } = ActionPage();

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
        // ReducerPage
        currentPage,
        limitPage,
        totalPage,
        setCurrentPage,
        setLimitPage,
        setTotalPage,

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
