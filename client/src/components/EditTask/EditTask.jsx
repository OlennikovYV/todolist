import React, { useState, useContext } from "react";
// import moment from "moment";

import useFetch from "../../hooks/fetch";

import AuthContext from "../../context/AuthProvider";

import HeaderModal from "../HeaderModal/HeaderModal";
import FooterModal from "../FooterModal/FooterModal";

import dateFormat from "../../utils/dateFormat.js";
import fioFormat from "../../utils/fioFormat.js";

function EditTask({ task, onClose }) {
  const [responsibleList, setResponsibleList] = useState(null);

  const { auth } = useContext(AuthContext);

  const { loading, error } = useFetch(
    `http://localhost:3001/api/user/${auth.id}/responsible/list`,
    setResponsibleList
  );

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <>
      <HeaderModal
        title={"Редактирование заявки #" + task.id}
        onClose={onClose}
      />
      <div className='modal-body'>
        <div className='modal-content'>
          <section>
            <div className='title'>Заголовок:</div>
            <input
              className='caption'
              defaultValue={task.caption}
              disabled={auth.supervisorid ? true : false}
            ></input>
          </section>
          <section>
            <div className='title'>Описание:</div>
            <textarea
              className='desription'
              rows='5'
              defaultValue={task.description}
            ></textarea>
          </section>
          <section>
            <div className='title'>Приоритет:</div>
            <select
              defaultValue={task.priority}
              onChange={() => {}}
              disabled={auth.supervisorid ? "true" : ""}
            >
              <option value='низкий'>низкий</option>
              <option value='средний'>средний</option>
              <option value='высокий'>высокий</option>
            </select>
          </section>
          <section>
            <div className='title'>Дата:</div>
            <input
              disabled={true}
              defaultValue={dateFormat(task.completion_at)}
            ></input>
          </section>
          <section className='container-responsible'>
            <div className='title'>Ответственный:</div>
            <select
              defaultValue={task.responsibleid}
              onChange={() => {}}
              disabled={auth.supervisorid ? "true" : ""}
            >
              {responsibleList.map((data) => (
                <option value={data.id} key={data.id}>
                  {fioFormat(data.lastname, data.firstname, data.fathername)}
                </option>
              ))}
            </select>
          </section>
          <section>
            <div className='title'>Статус:</div>
            <select defaultValue={task.status} onChange={() => {}}>
              <option value='к выполнению'>к выполнению</option>
              <option value='выполняется'>выполняется</option>
              <option value='выполнена'>выполнена</option>
              <option value='отменена'>отменена</option>
            </select>
          </section>
        </div>
      </div>
      <FooterModal isShow={true} onOk={onClose} onCancel={onClose} />
    </>
  );
}

export default EditTask;
