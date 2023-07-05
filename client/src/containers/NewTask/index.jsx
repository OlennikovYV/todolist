import React, { useContext, useRef } from "react";
import moment from "moment";

import useAxiosGet from "../../hooks/fetch";

import AuthContext from "../../context/AuthProvider";
import globalTaskContext from "../../context/GlobalTaskProvider";

import HeaderModal from "../../components/HeaderModal";
import FooterModal from "../../components/FooterModal";
import FormWrapper from "../../components/FormWrapper";

import { fioFormat } from "../../utils/formatField";
import { DATE_FORMAT } from "../../utils/common/constants";

function NewTask({ onClose }) {
  const formId = "create-task";

  const captionRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const create_atRef = useRef();
  const completion_at = useRef();
  const responsibleidRef = useRef();
  const statusRef = useRef();

  const { auth } = useContext(AuthContext);
  const { priorities, addTask } = useContext(globalTaskContext);

  const {
    data: responsible,
    loading,
    error,
  } = useAxiosGet(`http://localhost:3001/api/user/responsible`);

  function handleSubmit(event) {
    let newTask;
    const createDataTime = moment(create_atRef.current.value)._d;
    const { id, period } = priorities.filter(
      (priority) => priority.caption === priorityRef.current.value
    )[0];

    event.preventDefault();

    newTask = {
      caption: captionRef.current.value,
      description: descriptionRef.current.value,
      create_at: createDataTime,
      update_at: createDataTime,
      completion_at: moment(createDataTime).add(period, "days")._d,
      priorityId: id,
      status: statusRef.current.value,
      creatorid: auth.id,
      responsibleid: responsibleidRef.current.value,
    };

    addTask(newTask);

    onClose();
  }

  function handleChangePriority() {
    const createDataTime = moment(create_atRef.current.value).format();
    const { period } = priorities.filter(
      (priority) => priority.caption === priorityRef.current.value
    )[0];

    completion_at.current.value = moment(createDataTime)
      .add(period, "days")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  if (loading) return <></>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <>
      <HeaderModal title={"Новая заявка"} onClose={onClose} />
      <div className='modal-body'>
        <div className='modal-content'>
          <FormWrapper
            className='form-task'
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
              <select
                defaultValue={priorities[0].caption}
                onChange={handleChangePriority}
                ref={priorityRef}
              >
                {priorities.map((priority) => (
                  <option key={priority.id} value={priority.caption}>
                    {priority.caption}
                  </option>
                ))}
              </select>
            </section>
            <section>
              <div className='title'>Дата создания:</div>
              <input
                className='bg-color_disabled-input'
                defaultValue={moment().format(DATE_FORMAT)}
                readOnly
                ref={create_atRef}
              ></input>
            </section>
            <section>
              <div className='title'>Дата завершения:</div>
              <input
                className='bg-color_disabled-input'
                defaultValue={moment().add(1, "days").format(DATE_FORMAT)}
                readOnly
                ref={completion_at}
              ></input>
            </section>
            <section className='container-responsible'>
              <div className='title'>Ответственный:</div>
              <select
                defaultValue={responsible.list[0].id}
                ref={responsibleidRef}
              >
                {responsible.list.map((data) => (
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
