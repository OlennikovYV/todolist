import React, { useState } from "react";
import moment from "moment";

import useFetch from "../../hooks/fetch";

import Modal from "../Modal/Modal";
import EditTask from "../EditTask/EditTask";

import { dateFormat, fioFormat } from "../../utils/formatField/formatField.js";

function Task({ task, selectedGroupDate }) {
  const [modal, setModal] = useState(false);
  const [responsible, setResponsible] = useState();

  const { loading, error } = useFetch(
    `http://localhost:3001/api/user/${task.responsibleid}/responsible`,
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

    let endPeriod;
    let isDateInPeriod;

    const checkDate = moment(task.completion_at);
    const startPeriod = moment().hour(0).minutes(0).seconds(0).milliseconds(0);
    const periodOneDay = moment(startPeriod).add(1, "days");
    const periodWeek = moment(startPeriod).add(7, "days");
    const isExpired = checkDate.isBefore(startPeriod);

    if (isExpired) {
      if (task.status === "к выполнению" || task.status === "выполняется") {
        return `${classTask}`;
      } else {
        return `${classTask} hidden`;
      }
    }

    if (selectedGroupDate === "future") {
      if (checkDate.isAfter(startPeriod)) {
        return `${classTask}`;
      }
    }

    switch (selectedGroupDate) {
      case "week":
        endPeriod = periodWeek;
        break;
      case "now":
        endPeriod = periodOneDay;
        break;
      default:
        throw error("Неверный период");
    }

    isDateInPeriod = checkDate.isBetween(startPeriod, endPeriod);

    if (isDateInPeriod) {
      return `${classTask}`;
    } else {
      return `${classTask} hidden`;
    }
  }

  return (
    <>
      <div className={checkShow()} onDoubleClick={() => setModal(true)}>
        <div className={setCaptionColor()}>{task.caption}</div>
        <div className='border-inset'></div>
        <div className='priority'>{task.priority}</div>
        <div className='border-inset'></div>
        <div className='date-complete'>{dateFormat(task.completion_at)}</div>
        <div className='border-inset'></div>
        <div className='fio'>
          {fioFormat(
            responsible.lastname,
            responsible.firstname,
            responsible.fathername
          )}
        </div>
        <div className='border-inset'></div>
        <span className='status'>{task.status}</span>

        {/* Для проверки */}
        {/* <span>{task.responsibleid}</span> */}
        {/* <span>{dateFormat(task.update_at)}</span> */}
      </div>

      <Modal isVisible={modal} onClose={() => setModal(false)}>
        <EditTask task={task} onClose={() => setModal(false)} />
      </Modal>
    </>
  );
}

export default Task;