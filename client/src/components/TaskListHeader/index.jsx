import React, { useContext, useEffect } from "react";

import GlobalContext from "../../context/GlobalProvider";
import AuthContext from "../../context/AuthProvider";

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
      <Text
        className='id'
        text='№'
        onClick={() => sortByField("id")}
        borderInset={true}
      />
      <Text
        className='caption'
        text='Заголовок'
        onClick={() => sortByField("caption")}
        borderInset={true}
      />
      <Text
        className='priorityId'
        text='Приоритет'
        onClick={() => sortByField("priorityId")}
        borderInset={true}
      />
      <Text
        className='completion_at'
        text='Дата окончания'
        onClick={() => sortByField("completion_at")}
        borderInset={true}
      />
      <Text
        className='responsibleid'
        text='Ф.И.О.'
        onClick={() => sortByField("responsibleid")}
        borderInset={true}
      />
      <Text
        className='status'
        text='Статус'
        onClick={() => sortByField("status")}
      />
    </div>
  );
}

export default TaskListHeader;
