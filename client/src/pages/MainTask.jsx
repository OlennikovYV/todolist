import React, { useState, useContext, useEffect } from "react";

import GlobalContext from "../context/GlobalProvider";

import Modal from "../containers/Modal";
import NewTask from "../containers/NewTask";
import TaskList from "../containers/TaskList";

import Button from "../components/Button";
import Footer from "../components/Footer";

function MainTask() {
  const {
    authenticatedUser,
    logout,
    displayPeriodName,
    getAllTasks,
    getPriorities,
    setDisplayPeriodName,
  } = useContext(GlobalContext);

  const [modal, setModal] = useState(false);

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

      <TaskList />

      <Footer />
    </div>
  );
}

export default MainTask;
