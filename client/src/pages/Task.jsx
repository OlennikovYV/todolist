import React from "react";

import { GlobalProvider } from "../context/GlobalProvider";

import TaskList from "../containers/TaskList";

function Task() {
  return (
    <GlobalProvider>
      <TaskList />
    </GlobalProvider>
  );
}

export default Task;
