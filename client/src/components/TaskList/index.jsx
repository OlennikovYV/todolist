import React, { useState, useContext, useRef } from "react";
import { useLocalStorage } from "react-use";

import useFetch from "../../hooks/fetch";

import TaskContext from "../../context/TaskProvider";
import AuthContext from "../../context/AuthProvider";

import Modal from "../Modal/index";
import Task from "./Task";

import fioFormat from "../../utils/fioFormat.js";

function TaskList() {
  const [selectedGroupDate, setSelectedGroupDate] = useState("future");
  const [modal, setModal] = useState(false);

  const notGroupRef = useRef();
  const responsibleGroupRef = useRef();

  const { auth, setAuthenticated } = useContext(AuthContext);
  const { task, setTask } = useContext(TaskContext);

  const [, , removeStorage] = useLocalStorage("user", "{}");

  const { loading, error } = useFetch(
    `http://localhost:3001/api/task/${auth.id}`,
    setTask
  );

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div className='container'>
      <div className='panel-header'>
        <span className='account-name'>
          {auth.supervisorid ? "сотрудник" : "руководитель"}
        </span>
        <span className='account-name'>
          {fioFormat(auth.lastname, auth.firstname, auth.fathername)}
        </span>
        <button
          className='log-out'
          onClick={() => {
            removeStorage();
            setAuthenticated(false);
          }}
        >
          Выйти
        </button>
      </div>
      <div className='container-control'>
        <button
          onClick={() => setModal(true)}
          disabled={auth.supervisorid ? "true" : ""}
        >
          Создать задачу
        </button>
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
      <div className='container-list'>
        <div className='task header'>
          <div className='caption'>Заголовок</div>
          <div className='border-inset'></div>
          <div className='priority'>Приоритет</div>
          <div className='border-inset'></div>
          <div className='date-complete'>Дата завершения</div>
          <div className='border-inset'></div>
          <div className='fio'>Ф.И.О.</div>
          <div className='border-inset'></div>
          <div className='status'>Статус</div>
        </div>

        {task.listTask.length ? (
          task.listTask.map((task) => (
            <Task
              key={task.id}
              task={task}
              selectedGroupDate={selectedGroupDate}
            />
          ))
        ) : (
          <div className='task' align={"center"}>
            <span className='notask'>Нет задач для выполнения</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
