import React, { useState, useContext } from "react";

import useFetch from "../../hooks/fetch";

import Modal from "../Modal/index";
import TaskContext from "../../context/TaskProvider";
import AuthContext from "../../context/AuthProvider";
import Task from "./Task";

function TaskList() {
  const [modal, setModal] = useState(false);
  const { auth } = useContext(AuthContext);
  const { task, setTask } = useContext(TaskContext);

  const { loading, error } = useFetch(
    `http://localhost:3001/api/task/${auth.id}`,
    setTask
  );

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div className='container-list'>
      <div className='new-task'>
        <button onClick={() => setModal(true)}>Создать задачу</button>
        <Modal
          isVisible={modal}
          title={"Заявка"}
          content={task}
          footer={
            <button className='button-task-ok' onClick={() => setModal(false)}>
              Готово
            </button>
          }
          onClose={() => setModal(false)}
        />
      </div>
      <div className='list'>
        {task.listTask.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
