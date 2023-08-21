import React, { useContext, useRef } from "react";
import moment from "moment";

import useAxiosGet from "../../hooks/useAxiosGet";

import globalContext from "../../context/GlobalProvider";

import HeaderModal from "../../components/HeaderModal";
import FooterModal from "../../components/FooterModal";
import FormWrapper from "../../components/FormWrapper";
import ModalMessage from "../../components/ModalMessage";

import { fioFormat } from "../../utils/formatField";
import { DATE_FORMAT } from "../../utils/common/constants";

function EditTask({ task, onClose }) {
  const captionRef = useRef();
  const descriptionRef = useRef();
  const priorityRef = useRef();
  const create_atRef = useRef();
  const completion_atRef = useRef();
  const responsibleidRef = useRef();
  const statusRef = useRef();

  const { authenticatedUser, prioritiesList, updateTask } =
    useContext(globalContext);

  const { data, loading, error } = useAxiosGet(
    `http://localhost:3001/api/user/responsible`
  );

  function handleSubmit(event) {
    event.preventDefault();

    let data;
    const { id } = prioritiesList.filter(
      (priority) => priority.caption === priorityRef.current.value
    )[0];

    data = {
      caption: captionRef.current.value,
      description: descriptionRef.current.value,
      create_at: moment(create_atRef.current.value)._d,
      update_at: moment()._d,
      completion_at: moment(completion_atRef.current.value)._d,
      priorityId: id,
      status: statusRef.current.value,
      creatorid: authenticatedUser.id,
      responsibleid: responsibleidRef.current.value,
    };

    updateTask(task.id, data);

    onClose();
  }

  function handleChangePriority() {
    const createDataTime = moment(create_atRef.current.value).format();
    const { period } = prioritiesList.filter(
      (priority) => priority.caption === priorityRef.current.value
    )[0];

    completion_atRef.current.value = moment(createDataTime)
      .add(period, "days")
      .format("YYYY-MM-DD HH:mm:ss");
  }

  if (loading)
    return <ModalMessage message={"Загрузка ..."} typeClass={"info"} />;
  if (error)
    return (
      <ModalMessage
        message={`Ошибка: ${JSON.stringify(error.message, null, 2)}`}
        typeClass={"error"}
      />
    );

  return (
    <>
      <HeaderModal
        title={"Редактирование заявки #" + task.id}
        onClose={onClose}
      />
      <div className='modal-body'>
        <div className='modal-content'>
          <FormWrapper
            className='form-task'
            id={"edit-task"}
            onSubmit={handleSubmit}
          >
            <section>
              <div className='title'>Заголовок:</div>
              <input
                className='caption'
                defaultValue={task.caption}
                disabled={authenticatedUser.supervisorid ? true : false}
                ref={captionRef}
              ></input>
            </section>
            <section>
              <div className='title'>Описание:</div>
              <textarea
                className='desription'
                defaultValue={task.description}
                ref={descriptionRef}
                rows='5'
              ></textarea>
            </section>
            <section>
              <div className='title'>Приоритет:</div>
              <select
                defaultValue={
                  prioritiesList.filter(
                    (priority) => priority.id === task.priorityId
                  )[0].caption
                }
                disabled={authenticatedUser.supervisorid ? true : false}
                onChange={handleChangePriority}
                ref={priorityRef}
              >
                {prioritiesList.map((priority) => (
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
                defaultValue={moment(task.create_at).format(DATE_FORMAT)}
                readOnly
                ref={create_atRef}
              ></input>
            </section>
            <section>
              <div className='title'>Дата окончания:</div>
              <input
                className='bg-color_disabled-input'
                defaultValue={moment(task.completion_at).format(DATE_FORMAT)}
                readOnly
                ref={completion_atRef}
              ></input>
            </section>
            <section className='container-responsible'>
              <div className='title'>Ответственный:</div>
              <select
                defaultValue={task.responsibleid}
                onChange={() => {}}
                ref={responsibleidRef}
              >
                {data.responsibleList.map((data) => (
                  <option value={data.id} key={data.id}>
                    {fioFormat(data.lastname, data.firstname, data.fathername)}
                  </option>
                ))}
              </select>
            </section>
            <section>
              <div className='title'>Статус:</div>
              <select
                defaultValue={task.status}
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
        id={"edit-task"}
      />
    </>
  );
}

export default EditTask;
