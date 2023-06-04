import React, { useState } from "react";

import useFetch from "../../hooks/fetch";

import Modal from "../Modal/index";
import dateFormat from "../../utils/dateFormat.js";

function Task({ task }) {
  const [modal, setModal] = useState(false);
  const [responsible, setResponsible] = useState();

  const { loading, error } = useFetch(
    `http://localhost:3001/api/user/${task.responsibleid}`,
    setResponsible
  );

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <>
      <div className='task' onClick={() => setModal(true)}>
        <span>{task.caption}</span>
        <span>{task.priority}</span>
        <span>{dateFormat(task.completion_at)}</span>
        <span>{`${responsible.lastname} ${responsible.firstname[0]}. ${responsible.fathername[0]}.`}</span>
        <span>{task.status}</span>
      </div>
      <Modal
        isVisible={modal}
        title={"Заявка"}
        content={task}
        footer={
          <button className='button-task-ok' onClick={() => setModal(false)}>
            Готово
          </button>
        }
        onClose={() => setModal(false)}
      />
    </>
  );
}

export default Task;
