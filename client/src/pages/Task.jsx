import React from "react";

import { TaskProvider } from "../context/TaskProvider";

import TaskList from "../components/TaskList/TaskList";

function Task() {
  return (
    <TaskProvider>
      <TaskList />
    </TaskProvider>
  );
}

export default Task;
