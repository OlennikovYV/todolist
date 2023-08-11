import React, { useContext, useEffect } from "react";

import GlobalContext from "../../context/GlobalProvider";
import AuthContext from "../../context/AuthProvider";

import BorderInset from "../BorderInset";
import Text from "../Text";

function TaskListHeader() {
  const { sortFieldName, sortOrder, getAllTasks, setSortFieldName } =
    useContext(GlobalContext);
  const { authenticatedUser } = useContext(AuthContext);

  useEffect(() => {
    getAllTasks(authenticatedUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortFieldName, sortOrder]);

  function sortByField(field) {
    if (field === sortFieldName) {
      setSortFieldName(field, sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortFieldName(field, "ASC");
    }
  }

  return (
    <div className='header'>
      <Text className='header__id' text='№' onClick={() => sortByField("id")} />
      <BorderInset />
      <Text
        className='header__caption'
        text='Заголовок'
        onClick={() => sortByField("caption")}
      />
      <BorderInset />
      <Text
        className='header__priority'
        text='Приоритет'
        onClick={() => sortByField("priorityId")}
      />
      <BorderInset />
      <Text
        className='header__date-complete'
        text='Дата окончания'
        onClick={() => sortByField("completion_at")}
      />
      <BorderInset />
      <Text
        className='header__fio'
        text='Ф.И.О.'
        onClick={() => sortByField("responsibleid")}
      />
      <BorderInset />
      <Text
        className='header__status'
        text='Статус'
        onClick={() => sortByField("status")}
      />
    </div>
  );
}

export default TaskListHeader;
