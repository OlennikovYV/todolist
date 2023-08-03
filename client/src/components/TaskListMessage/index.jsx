import React from "react";

function TaskListMessage({ message }) {
  return (
    <div className='task' align={"center"}>
      <span className={"task-message"} align={"center"}>
        {message}
      </span>
    </div>
  );
}

export default TaskListMessage;
