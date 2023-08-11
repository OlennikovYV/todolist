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
    displayPeriodName,
    loadingTask,
    messageTask,
    taskList,
    getAllTasks,
    getPriorities,
    setDisplayPeriodName,
  } = useContext(GlobalContext);

  const [modal, setModal] = useState(false);

  const { authenticatedUser, logout } = useContext(AuthContext);

  useEffect(() => {
    getPriorities();
    getAllTasks(authenticatedUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllTasks(authenticatedUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayPeriodName]);

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
            onChange={(event) => setDisplayPeriodName(event.target.value)}
          >
            <option value='all'>Все</option>
            <option value='future'>На будующее</option>
            <option value='week'>На неделю</option>
            <option value='now'>На сегодня</option>
          </select>
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
        />
      </div>

      <Footer />
    </div>
  );
}

export default MainTask;
