import React, { useState, useContext, useEffect } from "react";

import GlobalContext from "../context/GlobalProvider";
import AuthContext from "../context/AuthProvider";

import Modal from "../containers/Modal";
import NewTask from "../containers/NewTask";
import TaskList from "../containers/TaskList";

import Button from "../components/Button";
import TaskListHeader from "../components/TaskListHeader";
import Footer from "../components/Footer";

function MainTask() {
  const {
    loadingTask,
    messageTask,
    taskList,
    getAllTasks,
    getPriorities,
    sortResponsibleId,
    sortUpdateAt,
  } = useContext(GlobalContext);

  const [selectedGroupDate, setSelectedGroupDate] = useState("future");
  const [modal, setModal] = useState(false);

  const { authenticatedUser, logout } = useContext(AuthContext);

  useEffect(() => {
    getPriorities();
    getAllTasks(authenticatedUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSort(event) {
    const buttonUpdateAt = document.getElementById("sort-update-at");
    const buttonResponsible = document.getElementById("sort-responsible");

    switch (event.target.id) {
      case "sort-update-at":
        sortUpdateAt();
        buttonUpdateAt.classList.add("active");
        buttonResponsible.classList.remove("active");
        break;
      case "sort-responsible":
        sortResponsibleId();
        buttonUpdateAt.classList.remove("active");
        buttonResponsible.classList.add("active");
        break;
      default:
        return;
    }
  }

  return (
    <div className='container-task-list'>
      <div className='menu'>
        <div className='control'>
          <Button onClick={() => setModal(true)} text='Создать задачу' />
          <Button
            onClick={() => {
              getPriorities();
              getAllTasks(authenticatedUser.id);
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
            disabled={authenticatedUser.supervisorid}
            onClick={handleSort}
            text='Без группировки'
          />
          <Button
            id='sort-responsible'
            className=''
            disabled={authenticatedUser.supervisorid}
            onClick={handleSort}
            text='По ответственным'
          />
        </div>
        <Button
          onClick={() => {
            logout();
          }}
          text='Выйти'
        />

        <Modal isVisible={modal} onClose={() => setModal(false)}>
          <NewTask onClose={() => setModal(false)} />
        </Modal>
      </div>

      <div className='task-list'>
        <TaskListHeader />
        <TaskList
          loadingTask={loadingTask}
          taskList={taskList}
          messageTask={messageTask}
          selectedGroupDate={selectedGroupDate}
        />
      </div>

      <Footer />
    </div>
  );
}

export default MainTask;
