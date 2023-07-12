import React, { useState, useContext } from "react";
import moment from "moment";

import GlobalContext from "../../context/GlobalProvider";

import useAxiosGet from "../../hooks/fetch";

import Modal from "../Modal";
import EditTask from "../EditTask";

import BorderInset from "../../components/BorderInset";

import { fioFormat } from "../../utils/formatField";
import { DATE_FORMAT } from "../../utils/common/constants";

function Task({ task, selectedGroupDate }) {
  const [modal, setModal] = useState(false);

  const { prioritiesList } = useContext(GlobalContext);

  const {
    data,
    loading: loadingResponsible,
    error,
  } = useAxiosGet(
    `http://localhost:3001/api/user/responsible/${task.responsibleid}`
  );

  if (loadingResponsible) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  function setColorTask() {
    if (task.status === "выполнена") {
      return "green";
    }

    if (
      (task.status === "к выполнению" || task.status === "выполняется") &&
      new Date() - new Date(task.completion_at) > 0
    ) {
      return "red";
    }

    return "gray";
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
        <label className='task__id'>{task.id}</label>
        <BorderInset />
        <div className='task__caption'>{task.caption}</div>
        <BorderInset />
        <div className='task__priority'>
          {
            prioritiesList.filter(
              (priority) => priority.id === task["priorityId"]
            )[0].caption
          }
        </div>
        <BorderInset />
        <div className='task__date-complete'>
          {moment(task.completion_at).format(DATE_FORMAT)}
        </div>
        <BorderInset />
        <div className='task__fio'>
          {fioFormat(
            data.responsible.lastname,
            data.responsible.firstname,
            data.responsible.fathername
          )}
        </div>
        <BorderInset />
        <span className='task__status'>{task.status}</span>
      </div>

      <Modal isVisible={modal} onClose={() => setModal(false)}>
        <EditTask task={task} onClose={() => setModal(false)} />
      </Modal>
    </>
  );
}

export default Task;
