import React from "react";

import { TaskProvider } from "../context/TaskProvider";
import TaskList from "../components/TaskList/index";

function Task() {
  return (
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
}

export default Task;
