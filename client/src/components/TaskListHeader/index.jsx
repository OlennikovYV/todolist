import React from "react";

import BorderInset from "../BorderInset";
import Caption from "../Caption";

function TaskListHeader() {
  return (
    <div className='header'>
      <Caption className='header__id' text='№' />
      <BorderInset />
      <Caption className='header__caption' text='Заголовок' />
      <BorderInset />
      <Caption className='header__priority' text='Приоритет' />
      <BorderInset />
      <Caption className='header__date-complete' text='Дата окончания' />
      <BorderInset />
      <Caption className='header__fio' text='Ф.И.О.' />
      <BorderInset />
      <Caption className='header__status' text='Статус' />
    </div>
  );
}

export default TaskListHeader;
