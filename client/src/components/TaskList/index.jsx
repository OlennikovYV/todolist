import React, { useState, useContext, useRef } from "react";

import useFetch from "../../hooks/fetch";

import TaskContext from "../../context/TaskProvider";
import AuthContext from "../../context/AuthProvider";

import Modal from "../Modal/index";
import Task from "./Task";

function TaskList() {
  const [selectedGroupDate, setSelectedGroupDate] = useState("future");
  const [modal, setModal] = useState(false);

  const notGroupRef = useRef();
  const responsibleGroupRef = useRef();

  const { auth, setAuthenticated } = useContext(AuthContext);
  const { task, setTask } = useContext(TaskContext);

  const { loading, error } = useFetch(
    `http://localhost:3001/api/task/${auth.id}`,
    setTask
  );

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div className='container'>
      <div className='panel'>
        <button
          onClick={() => setModal(true)}
          disabled={auth.supervisorid ? "true" : ""}
        >
          Создать задачу
        </button>
        <button
          className='log-out'
          onClick={() => {
            setAuthenticated(false);
          }}
        >
          Выйти
        </button>
        <Modal
          isVisible={modal}
          isNew={true}
          title={"Новая заявка"}
          content={null}
          footer={
            <button className='button-task-ok' onClick={() => setModal(false)}>
              Готово
            </button>
          }
          // Функция внесения данных для новой задачи
          onClose={() => setModal(false)}
        />
      </div>
      <div className='container-group'>
        <div className='filtred-date-at'>
          <select
            defaultValue='all'
            onChange={(e) => setSelectedGroupDate(e.target.value)}
          >
            <option value='future'>На будующее</option>
            <option value='week'>На неделю</option>
            <option value='now'>На сегодня</option>
          </select>
        </div>
        <div className='filtred-column'>
          {auth.supervisorid ? null : (
            <>
              <button
                className='group active'
                ref={notGroupRef}
                onClick={() => {
                  let dataLoaded;
                  if (task) {
                    dataLoaded = task.listTask;
                    dataLoaded.sort(
                      (a, b) => new Date(a.update_at) - new Date(b.update_at)
                    );
                  }
                  notGroupRef.current.classList.add("active");
                  responsibleGroupRef.current.classList.remove("active");
                  setTask({ listTask: dataLoaded });
                }}
              >
                без группировки
              </button>
              <button
                className='group'
                ref={responsibleGroupRef}
                onClick={() => {
                  let dataLoaded;
                  if (task) {
                    dataLoaded = task.listTask;
                    dataLoaded.sort(
                      (a, b) => a.responsibleid - b.responsibleid
                    );
                  }
                  notGroupRef.current.classList.remove("active");
                  responsibleGroupRef.current.classList.add("active");
                  setTask({ listTask: dataLoaded });
                }}
              >
                по ответственным
              </button>
            </>
          )}
        </div>
      </div>
      <div className='container-list'>
        {task.listTask.length ? (
          task.listTask.map((task) => (
            <Task
              key={task.id}
              task={task}
              selectedGroupDate={selectedGroupDate}
            />
          ))
        ) : (
          <p align={"center"}>Задач нет</p>
        )}
      </div>
    </div>
  );
}

export default TaskList;
