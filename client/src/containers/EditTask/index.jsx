import React, { useContext } from "react";

import useAxiosGet from "../../hooks/fetch";

import AuthContext from "../../context/AuthProvider";

import HeaderModal from "../../components/HeaderModal";
import FooterModal from "../../components/FooterModal";
import FormWrapper from "../../components/FormWrapper";

import { dateFormat, fioFormat } from "../../utils/formatField/formatField.js";

function EditTask({ task, onClose }) {
  const formId = "edit-task";

  const { auth } = useContext(AuthContext);

  function handleSubmit(event) {
    event.preventDefault();

    onClose();
  }

  const {
    data: responsible,
    loading,
    error,
  } = useAxiosGet(`http://localhost:3001/api/user/responsible`);

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
          <FormWrapper
            className='form-task'
            id={formId}
            onSubmit={handleSubmit}
          >
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
                disabled={auth.supervisorid ? true : false}
              >
                <option value='низкий'>низкий</option>
                <option value='средний'>средний</option>
                <option value='высокий'>высокий</option>
              </select>
            </section>
            <section>
              <div className='title'>Дата окончания:</div>
              <input
                disabled={true}
                defaultValue={dateFormat(task.completion_at)}
              ></input>
            </section>
            <section className='container-responsible'>
              <div className='title'>Ответственный:</div>
              <select defaultValue={task.responsibleid} onChange={() => {}}>
                {responsible.list.map((data) => (
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

export default EditTask;
