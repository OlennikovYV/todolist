import React from "react";

import { GlobalTaskProvider } from "../context/GlobalTaskProvider";

import TaskList from "../containers/TaskList";

function Task() {
  return (
    <GlobalTaskProvider>
      <TaskList />
    </GlobalTaskProvider>
  );
}

export default Task;
