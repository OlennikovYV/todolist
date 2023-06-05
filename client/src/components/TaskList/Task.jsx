import React, { useState } from "react";

import useFetch from "../../hooks/fetch";

import Modal from "../Modal/index";
import dateFormat from "../../utils/dateFormat.js";

function Task({ task, selectedGroupDate }) {
  const [modal, setModal] = useState(false);
  const [responsible, setResponsible] = useState();

  const { loading, error } = useFetch(
    `http://localhost:3001/api/user/${task.responsibleid}`,
    setResponsible
  );

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  function setCaptionColor() {
    const className = "caption";
    if (task.status === "выполнена") {
      return `${className} green`;
    } else if (
      (task.status === "к выполнению" || task.status === "выполняется") &&
      new Date() - new Date(task.completion_at) > 0
    ) {
      return `${className} red`;
    } else {
      return `${className} gray`;
    }
  }

  function checkShow() {
    const classTask = "task";
    const now = new Date();
    const completeDate = new Date(task.completion_at);
    const diff = new Date(completeDate - now).getDate();
    const completeMoreNow = completeDate > now;

    if (selectedGroupDate === "future") return `${classTask} ${diff}`;

    if (completeMoreNow) {
      switch (selectedGroupDate) {
        case "week":
          if (diff <= 7) {
            return `${classTask}`;
          } else {
            return `${classTask} hidden`;
          }
        case "now":
          if (diff <= 1) {
            return `${classTask}`;
          } else {
            return `${classTask} hidden`;
          }
        default:
          return `${classTask} hidden`;
      }
    }

    return `${classTask}`;
  }

  return (
    <>
      <div className={checkShow()} onClick={() => setModal(true)}>
        <div className={setCaptionColor()}>{task.caption}</div>
        <div className='priority'>{task.priority}</div>
        <div className='date-complete'>{dateFormat(task.completion_at)}</div>
        <div className='fio'>{`${responsible.lastname} ${responsible.firstname[0]}. ${responsible.fathername[0]}.`}</div>
        <span className='status'>{task.status}</span>

        {/* Для проверки */}
        {/* <span>{task.responsibleid}</span> */}
        {/* <span>{dateFormat(task.update_at)}</span> */}
      </div>
      <Modal
        isVisible={modal}
        isNew={false}
        title={"Редактирование заявки"}
        content={task}
        footer={
          <button className='button-task-ok' onClick={() => setModal(false)}>
            Готово
          </button>
        }
        // Функция обновление данных для вывранной задачи
        onClose={() => setModal(false)}
      />
    </>
  );
}

export default Task;
