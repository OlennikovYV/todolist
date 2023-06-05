import React, { useState, useContext } from "react";

import useFetch from "../../hooks/fetch";

import AuthContext from "../../context/AuthProvider";

import dateFormat from "../../utils/dateFormat.js";

function ShowContent({ isNew, task }) {
  const [responsibleList, setResponsibleList] = useState(null);

  const { auth } = useContext(AuthContext);

  let user, supervisor;

  if (isNew) {
    if (auth.supervisorid) {
      user = auth.id;
      supervisor = 0;
    } else {
      user = 0;
      supervisor = auth.id;
    }
  } else {
    if (auth.supervisorid) {
      user = task.responsibleid;
      supervisor = 0;
    } else {
      user = task.responsibleid;
      supervisor = 0;
    }
  }

  const { loading, error } = useFetch(
    `http://localhost:3001/api/user/${user}/supervisor/${supervisor}`,
    setResponsibleList
  );

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  console.log(auth.id, auth.supervisorid, user, supervisor, responsibleList);
  return (
    <div className='modal-body'>
      <div className='modal-content'>
        {isNew ? (
          <>
            <div>
              <section>
                <span>Заголовок:</span>
                <input placeholder='Заголовок'></input>
              </section>
              <section className='container-group'>
                <span>Приоритет:</span>
                <select defaultValue='low' onChange={() => {}}>
                  <option value='low'>низкий</option>
                  <option value='middle'>средний</option>
                  <option value='high'>высокий</option>
                </select>
              </section>
              <section>
                <span>Дата</span>
                <input defaultValue={dateFormat(new Date())}></input>
              </section>
              <section className='container-responsible'>
                <span>Ответственный:</span>
                <select defaultValue={responsibleList.user[0].id}>
                  {responsibleList.user.map((data) => (
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
                <span>Статус:</span>
                <input defaultValue='к выполнению' disabled></input>
              </section>
            </div>
          </>
        ) : (
          <>
            <div>
              <section>
                <span>Заголовок:</span>
                <input
                  defaultValue={task.caption}
                  disabled={auth.supervisorid ? true : false}
                ></input>
              </section>
              <section className='container-group'>
                <span>Приоритет:</span>
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
                <span>Дата</span>
                <input
                  defaultValue={dateFormat(task.completion_at)}
                  disabled={auth.supervisorid ? "true" : ""}
                ></input>
              </section>
              <section className='container-responsible'>
                <span>Ответственный:</span>
                <select
                  defaultValue={task.responsibleid}
                  onChange={() => {}}
                  disabled={auth.supervisorid ? "true" : ""}
                >
                  {responsibleList.user.map((data) => (
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
                <span>Статус:</span>
                {/* <input defaultValue='к выполнению'></input> */}
                <select defaultValue={task.status} onChange={() => {}}>
                  <option value='к выполнению'>к выполнению</option>
                  <option value='выполняется'>выполняется</option>
                  <option value='выполнена'>выполнена</option>
                  <option value='отменена'>отменена</option>
                </select>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShowContent;
