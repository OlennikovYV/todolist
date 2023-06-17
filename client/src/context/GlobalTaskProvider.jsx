import { createContext } from "react";

import ReducerTask from "../reducers/ReducerTask";

const GlobalTaskContext = createContext({});

export const GlobalTaskProvider = ({ children }) => {
  const { taskList, getAllTasks } = ReducerTask();

  return (
    <GlobalTaskContext.Provider value={{ taskList, getAllTasks }}>
      {children}
    </GlobalTaskContext.Provider>
  );
};

export default GlobalTaskContext;
