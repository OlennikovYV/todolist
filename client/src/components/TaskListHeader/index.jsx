import React from "react";

import BorderInset from "../BorderInset";
import Caption from "../Caption";

function TaskListHeader() {
  return (
    <div className='task header'>
      <Caption className='field-id' text='№№' />
      <BorderInset />
      <Caption className='field-caption' text='Заголовок' />
      <BorderInset />
      <Caption className='field-priority' text='Приоритет' />
      <BorderInset />
      <Caption className='field-date-complete' text='Дата окончания' />
      <BorderInset />
      <Caption className='field-fio' text='Ф.И.О.' />
      <BorderInset />
      <Caption className='field-status' text='Статус' />
    </div>
  );
}

export default TaskListHeader;
