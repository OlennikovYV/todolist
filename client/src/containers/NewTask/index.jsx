import React, { useContext, useRef } from "react";
import moment from "moment";

import useAxiosGet from "../../hooks/fetch";

import AuthContext from "../../context/AuthProvider";
import globalTaskContext from "../../context/GlobalTaskProvider";

import HeaderModal from "../../components/HeaderModal";
import FooterModal from "../../components/FooterModal";
import FormWrapper from "../../components/FormWrapper";

import { dateFormat, fioFormat } from "../../utils/formatField/formatField.js";

function NewTask({ onClose }) {
  const formId = "create-task";

  const captionRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const create_atRef = useRef();
  const responsibleidRef = useRef();
  const statusRef = useRef();

  const { auth } = useContext(AuthContext);
  const { addTask } = useContext(globalTaskContext);

  const {
    data: responsibleList,
    loading,
    error,
  } = useAxiosGet(`http://localhost:3001/api/user/${auth.id}/responsible/list`);

  function handleSubmit(event) {
    let newTask, newPriority, newCompletion_at;
    const createDataTime = moment(create_atRef.current.value)._d;

    event.preventDefault();

    switch (priorityRef.current.value) {
      case "low":
        newPriority = "низкий";
        newCompletion_at = moment(createDataTime).add(1, "days")._d;
        break;
      case "middle":
        newPriority = "средний";
        newCompletion_at = moment(createDataTime).add(6, "days")._d;
        break;
      case "high":
        newPriority = "высокий";
        newCompletion_at = moment(createDataTime).add(15, "days")._d;
        break;
      default:
        newPriority = "";
    }

    newTask = {
      caption: captionRef.current.value,
      description: descriptionRef.current.value,
      create_at: createDataTime,
      update_at: createDataTime,
      completion_at: newCompletion_at,
      priority: newPriority,
      status: statusRef.current.value,
      creatorid: auth.id,
      responsibleid: responsibleidRef.current.value,
    };

    addTask(newTask);
    onClose();
  }

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <>
      <HeaderModal title={"Новая заявка"} onClose={onClose} />
      <div className='modal-body'>
        <div className='modal-content'>
          <FormWrapper
            className='padding-bottom_05rem'
            id={formId}
            onSubmit={handleSubmit}
          >
            <section>
              <div className='title'>Заголовок:</div>
              <input
                className='caption'
                placeholder='Заголовок'
                ref={captionRef}
              ></input>
            </section>
            <section>
              <div className='title'>Описание:</div>
              <textarea
                className='desription'
                placeholder='Описание'
                rows='5'
                ref={descriptionRef}
              ></textarea>
            </section>
            <section>
              <div className='title'>Приоритет:</div>
              <select defaultValue='low' onChange={() => {}} ref={priorityRef}>
                <option value='low'>низкий</option>
                <option value='middle'>средний</option>
                <option value='high'>высокий</option>
              </select>
            </section>
            <section>
              <div className='title'>Дата создания:</div>
              <input
                className='bg-color_disabled-input'
                defaultValue={dateFormat(new Date())}
                readOnly
                ref={create_atRef}
              ></input>
            </section>
            <section className='container-responsible'>
              <div className='title'>Ответственный:</div>
              <select
                defaultValue={responsibleList[0].id}
                ref={responsibleidRef}
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
              <select
                defaultValue={"к выполнению"}
                onChange={() => {}}
                ref={statusRef}
              >
                <option value='к выполнению'>к выполнению</option>
                <option value='выполняется'>выполняется</option>
                <option value='выполнена'>выполнена</option>
                <option value='отменена'>отменена</option>
              </select>
            </section>
          </FormWrapper>
        </div>
      </div>
      <FooterModal
        isShow={true}
        onOk={handleSubmit}
        onCancel={onClose}
        id={formId}
      />
    </>
  );
}

export default NewTask;
