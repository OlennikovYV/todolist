import { createContext } from "react";

import ActionTask from "../actions/ActionTask";
import ActionUser from "../actions/ActionUser";

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
  const {
    errorUser,
    messageUser,
    responsible,
    responsibleList,
    successUser,
    getResponsible,
    getResponsibleList,
  } = ActionUser();

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
        // ReducerUser
        errorUser,
        messageUser,
        responsible,
        responsibleList,
        successUser,
        getResponsible,
        getResponsibleList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
