import React, { useContext } from "react";

import GlobalContext from "../../context/GlobalProvider";

import Task from "../Task";
import TaskListHeader from "../../components/TaskListHeader";
import TaskListMessage from "../../components/TaskListMessage";

function TaskList() {
  const { loadingTask, messageTask, taskList } = useContext(GlobalContext);

  return (
    <div className='task-list'>
      <TaskListHeader />

      {loadingTask ? (
        <TaskListMessage message={"Загрузка списка задач"} />
      ) : (
        <div className='list'>
          {taskList.length ? (
            taskList.map((task) => <Task key={task.id} task={task} />)
          ) : (
            <TaskListMessage message={messageTask} />
          )}
        </div>
      )}
    </div>
  );
}

export default TaskList;
