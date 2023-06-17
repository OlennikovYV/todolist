import React from "react";

import { TaskProvider } from "../context/TaskProvider";
import { GlobalTaskProvider } from "../context/GlobalTaskProvider";

import TaskList from "../components/TaskList/TaskList";

function Task() {
  return (
    <GlobalTaskProvider>
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    </GlobalTaskProvider>
  );
}

export default Task;
