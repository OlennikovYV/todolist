import React, { useState, useContext } from "react";
// import moment from "moment";

import useFetch from "../../hooks/fetch";

import AuthContext from "../../context/AuthProvider";

import HeaderModal from "../HeaderModal/HeaderModal";
import FooterModal from "../FooterModal/FooterModal";

import { dateFormat, fioFormat } from "../../utils/formatField/formatField.js";

import "./NewTask.css";

function NewTask({ onClose }) {
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
      <HeaderModal title={"Новая заявка"} onClose={onClose} />
      <div className='modal-body'>
        <div className='modal-content'>
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
            <div className='title'>Дата создания:</div>
            <input
              disabled={true}
              defaultValue={dateFormat(new Date())}
              // defaultValue={moment()
              // .add(1, "days")
              // .format("DD/MM/YYYY HH:mm:ss")}
            ></input>
          </section>
          <section className='container-responsible'>
            <div className='title'>Ответственный:</div>
            <select defaultValue={responsibleList[0].id}>
              {responsibleList.map((data) => (
                <option value={data.id} key={data.id}>
                  {fioFormat(data.lastname, data.firstname, data.fathername)}
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
        </div>
      </div>
      <FooterModal isShow={true} onOk={onClose} onCancel={onClose} />
    </>
  );
}

export default NewTask;
