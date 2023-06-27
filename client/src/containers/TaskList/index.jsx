import React, { useState, useContext, useRef, useEffect } from "react";
import { useLocalStorage } from "react-use";

import GlobalTaskContext from "../../context/GlobalTaskProvider";
import AuthContext from "../../context/AuthProvider";

import Modal from "../../containers/Modal";
import NewTask from "../NewTask";
import Task from "../Task";
import TaskListHeader from "../../components/TaskListHeader";

import { fioFormat } from "../../utils/formatField/formatField.js";

function TaskList() {
  const [selectedGroupDate, setSelectedGroupDate] = useState("future");
  const [modal, setModal] = useState(false);

  const notGroupRef = useRef();
  const responsibleGroupRef = useRef();

  const { message, taskList, getAllTasks, sortUpdateAt, sortResponsibleId } =
    useContext(GlobalTaskContext);
  const { auth, setAuth, setAuthenticated } = useContext(AuthContext);

  const [, , removeStorage] = useLocalStorage("user", "{}");

  useEffect(() => {
    getAllTasks(auth.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container-task-list'>
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
            setAuth(null);
          }}
        >
          Выйти
        </button>
      </div>
      <div className='container-control'>
        <div className='button-control'>
          <button
            onClick={() => setModal(true)}
            disabled={auth.supervisorid ? true : false}
          >
            Создать задачу
          </button>
          <button
            onClick={() => {
              getAllTasks(auth.id);
            }}
          >
            Обновить
          </button>
        </div>
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
                  sortUpdateAt();
                  notGroupRef.current.classList.add("active");
                  responsibleGroupRef.current.classList.remove("active");
                }}
              >
                Без группировки
              </button>
              <button
                className='group'
                ref={responsibleGroupRef}
                onClick={() => {
                  sortResponsibleId();
                  notGroupRef.current.classList.remove("active");
                  responsibleGroupRef.current.classList.add("active");
                }}
              >
                По ответственным
              </button>
            </>
          )}
        </div>

        <Modal isVisible={modal} onClose={() => setModal(false)}>
          <NewTask onClose={() => setModal(false)} />
        </Modal>
      </div>
      <div className='container-list'>
        <TaskListHeader />

        {taskList.length ? (
          taskList.map((task) => (
            <Task
              key={task.id}
              task={task}
              selectedGroupDate={selectedGroupDate}
            />
          ))
        ) : (
          <div className='task' align={"center"}>
            <span className='notask'>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
