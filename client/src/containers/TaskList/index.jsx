import React from "react";

import Task from "../Task";
import TaskListMessage from "../../components/TaskListMessage";

function TaskList({ loadingTask, taskList, messageTask, selectedGroupDate }) {
  return (
    <>
      {loadingTask ? (
        <TaskListMessage message={"Загрузка списка задач"} />
      ) : (
        <div className='list'>
          {taskList.length ? (
            taskList.map((task) => (
              <Task
                key={task.id}
                task={task}
                selectedGroupDate={selectedGroupDate}
              />
            ))
          ) : (
            <TaskListMessage message={messageTask} />
          )}
        </div>
      )}
    </>
  );
}

export default TaskList;
