import React, { useState } from "react";
import moment from "moment";

import useAxiosGet from "../../hooks/fetch";

import Modal from "../Modal";
import EditTask from "../EditTask";

import BorderInset from "../../components/BorderInset";

import { dateFormat, fioFormat } from "../../utils/formatField/formatField.js";

function Task({ task, selectedGroupDate }) {
  const [modal, setModal] = useState(false);

  const {
    data: responsible,
    loading,
    error,
  } = useAxiosGet(
    `http://localhost:3001/api/user/responsible/${task.responsibleid}`
  );

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  function setColorTask() {
    if (task.status === "выполнена") {
      return "green";
    } else if (
      (task.status === "к выполнению" || task.status === "выполняется") &&
      new Date() - new Date(task.completion_at) > 0
    ) {
      return "red";
    } else {
      return "gray";
    }
  }

  function isShow() {
    let endPeriod;
    let isDateInPeriod;

    const checkDate = moment(task.completion_at);
    const startPeriod = moment().hour(0).minutes(0).seconds(0).milliseconds(0);
    const periodOneDay = moment(startPeriod).add(1, "days");
    const periodWeek = moment(startPeriod).add(7, "days");
    const isExpired = checkDate.isBefore(startPeriod);

    if (isExpired) {
      if (task.status === "к выполнению" || task.status === "выполняется") {
        return true;
      } else {
        return false;
      }
    }

    if (selectedGroupDate === "future") {
      if (checkDate.isAfter(startPeriod)) {
        return true;
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
        throw new Error("Неверный период");
    }

    isDateInPeriod = checkDate.isBetween(startPeriod, endPeriod);

    if (isDateInPeriod) {
      return true;
    } else {
      return false;
    }
  }

  function checkTask() {
    let totalClass = "hidden";

    if (isShow()) {
      totalClass = `task ${setColorTask()}`;
    }

    return totalClass;
  }

  return (
    <>
      <div className={checkTask()} onDoubleClick={() => setModal(true)}>
        <div className='field-id'>{task.id}</div>
        <BorderInset />
        <div className='field-caption'>{task.caption}</div>
        <BorderInset />
        <div className='field-priority'>{task.priority}</div>
        <BorderInset />
        <div className='field-date-complete'>
          {dateFormat(task.completion_at)}
        </div>
        <BorderInset />
        <div className='field-fio'>
          {fioFormat(
            responsible.user.lastname,
            responsible.user.firstname,
            responsible.user.fathername
          )}
        </div>
        <BorderInset />
        <span className='field-status'>{task.status}</span>

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
