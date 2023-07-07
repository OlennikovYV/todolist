import React, { useState, useContext, useEffect } from "react";
import { useLocalStorage } from "react-use";

import GlobalTaskContext from "../../context/GlobalTaskProvider";
import AuthContext from "../../context/AuthProvider";

import Modal from "../../containers/Modal";
import NewTask from "../NewTask";
import Task from "../Task";

import Button from "../../components/Button";
import TaskListHeader from "../../components/TaskListHeader";

import { fioFormat } from "../../utils/formatField";

function TaskList() {
  const [selectedGroupDate, setSelectedGroupDate] = useState("future");
  const [modal, setModal] = useState(false);

  const {
    message,
    taskList,
    getAllTasks,
    getPriorities,
    sortUpdateAt,
    sortResponsibleId,
  } = useContext(GlobalTaskContext);

  const { auth, setAuth, setAuthenticated } = useContext(AuthContext);

  const [, , removeStorage] = useLocalStorage("user", "{}");

  useEffect(() => {
    getPriorities();
    getAllTasks(auth.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSort(event) {
    const UpdateAt = document.getElementById("sort-update-at");
    const Responsible = document.getElementById("sort-responsible");

    switch (event.target.id) {
      case "sort-update-at":
        sortUpdateAt();
        UpdateAt.classList.add("active");
        Responsible.classList.remove("active");
        break;
      case "sort-responsible":
        sortResponsibleId();
        UpdateAt.classList.remove("active");
        Responsible.classList.add("active");
        break;
      default:
        return;
    }
  }

  return (
    <div className='container-task-list'>
      <div className='panel-header'>
        <span className='account-name'>
          {auth.supervisorid ? "сотрудник" : "руководитель"}
        </span>
        <span className='account-name'>
          {fioFormat(auth.lastname, auth.firstname, auth.fathername)}
        </span>
        <Button
          className='log-out'
          onClick={() => {
            removeStorage();
            setAuthenticated(false);
            setAuth(null);
          }}
          text='Выйти'
        />
      </div>
      <div className='menu'>
        <div className='control'>
          <Button onClick={() => setModal(true)} text='Создать задачу' />
          <Button
            onClick={() => {
              getPriorities();
              getAllTasks(auth.id);
            }}
            text='Обновить'
          />
        </div>
        <div className='menu__filter'>
          <select
            defaultValue='all'
            onChange={(event) => setSelectedGroupDate(event.target.value)}
          >
            <option value='future'>На будующее</option>
            <option value='week'>На неделю</option>
            <option value='now'>На сегодня</option>
          </select>
        </div>
        <div className='menu__sort'>
          <Button
            id='sort-update-at'
            className='active'
            disabled={auth.supervisorid}
            onClick={handleSort}
            text='Без группировки'
          />
          <Button
            id='sort-responsible'
            className=''
            disabled={auth.supervisorid}
            onClick={handleSort}
            text='По ответственным'
          />
        </div>

        <Modal isVisible={modal} onClose={() => setModal(false)}>
          <NewTask onClose={() => setModal(false)} />
        </Modal>
      </div>
      <div className='task-list'>
        <TaskListHeader />

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
            <div className='task' align={"center"}>
              <span className='notask'>{message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
