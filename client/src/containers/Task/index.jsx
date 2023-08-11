import React, { useState, useContext } from "react";
import moment from "moment";

import GlobalContext from "../../context/GlobalProvider";

import useAxiosGet from "../../hooks/useAxiosGet";

import Modal from "../Modal";
import EditTask from "../EditTask";

import BorderInset from "../../components/BorderInset";
import Text from "../../components/Text";

import { fioFormat } from "../../utils/formatField";
import { DATE_FORMAT } from "../../utils/common/constants";

function Task({ task }) {
  const [modal, setModal] = useState(false);

  const { prioritiesList } = useContext(GlobalContext);

  const viewPriority = () =>
    prioritiesList.filter((priority) => priority.id === task["priorityId"])[0]
      .caption;
  const viewDateComplete = () => moment(task.completion_at).format(DATE_FORMAT);
  const viewFio = () =>
    fioFormat(
      data.responsible.lastname,
      data.responsible.firstname,
      data.responsible.fathername
    );

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
      return "task-status-completed";
    }

    if (
      (task.status === "к выполнению" || task.status === "выполняется") &&
      new Date() - new Date(task.completion_at) > 0
    ) {
      return "task-status-expired";
    }

    return "task-status-other";
  }

  function checkTask() {
    return `task ${setColorTask()}`;
  }

  return (
    <>
      <div className={checkTask()} onDoubleClick={() => setModal(true)}>
        <Text className='task__id' text={task.id} />
        <BorderInset />
        <Text className='task__caption' text={task.caption} />
        <BorderInset />
        <Text className='task__priority' text={viewPriority()} />
        <BorderInset />
        <Text className='task__date-complete' text={viewDateComplete()} />
        <BorderInset />
        <Text className='task__fio' text={viewFio()} />
        <BorderInset />
        <Text className='task__status' text={task.status} />
      </div>

      <Modal isVisible={modal} onClose={() => setModal(false)}>
        <EditTask task={task} onClose={() => setModal(false)} />
      </Modal>
    </>
  );
}

export default Task;
