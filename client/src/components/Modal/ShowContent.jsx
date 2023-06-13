import React, { useState, useContext } from "react";

import useFetch from "../../hooks/fetch";

import AuthContext from "../../context/AuthProvider";

import dateFormat from "../../utils/dateFormat.js";

function ShowContent({ isNew, task }) {
  const [responsibleList, setResponsibleList] = useState(null);

  const { auth } = useContext(AuthContext);

  const { loading, error } = useFetch(
    `http://localhost:3001/api/user/${auth.id}/responsible/list`,
    setResponsibleList
  );

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div className='modal-body'>
      <div className='modal-content'>
        {isNew ? (
          <>
            <section>
              <div className='title'>Заголовок:</div>
              <input className='caption' placeholder='Заголовок'></input>
            </section>
            <section>
              <div className='title'>Описание:</div>
              <textarea
                className='desription'
                placeholder='Описание'
                rows='5'
              ></textarea>
            </section>
            <section>
              <div className='title'>Приоритет:</div>
              <select defaultValue='low' onChange={() => {}}>
                <option value='low'>низкий</option>
                <option value='middle'>средний</option>
                <option value='high'>высокий</option>
              </select>
            </section>
            <section>
              <div className='title'>Дата:</div>
              <input defaultValue={dateFormat(new Date())}></input>
            </section>
            <section className='container-responsible'>
              <div className='title'>Ответственный:</div>
              <select defaultValue={responsibleList[0].id}>
                {responsibleList.map((data) => (
                  <option value={data.id} key={data.id}>
                    {data.lastname +
                      " " +
                      data.firstname[0] +
                      ". " +
                      data.fathername[0] +
                      "."}
                  </option>
                ))}
              </select>
            </section>
            <section>
              <div className='title'>Статус:</div>
              <select defaultValue={"к выполнению"} onChange={() => {}}>
                <option value='к выполнению'>к выполнению</option>
                <option value='выполняется'>выполняется</option>
                <option value='выполнена'>выполнена</option>
                <option value='отменена'>отменена</option>
              </select>
            </section>
          </>
        ) : (
          <>
            <section>
              <div className='title'>Заголовок:</div>
              <input
                defaultValue={task.caption}
                disabled={auth.supervisorid ? true : false}
              ></input>
            </section>
            <section>
              <div className='title'>Описание:</div>
              <textarea rows='5' value={task.description}></textarea>
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
                defaultValue={dateFormat(task.completion_at)}
                disabled={auth.supervisorid ? "true" : ""}
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
                    {data.lastname +
                      " " +
                      data.firstname[0] +
                      ". " +
                      data.fathername[0] +
                      "."}
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
          </>
        )}
      </div>
    </div>
  );
}

export default ShowContent;
