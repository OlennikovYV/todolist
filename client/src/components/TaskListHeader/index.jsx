import React from "react";

import BorderInset from "../BorderInset";
import Text from "../Text";

function TaskListHeader() {
  return (
    <div className='header'>
      <Text className='header__id' text='№' />
      <BorderInset />
      <Text className='header__caption' text='Заголовок' />
      <BorderInset />
      <Text className='header__priority' text='Приоритет' />
      <BorderInset />
      <Text className='header__date-complete' text='Дата окончания' />
      <BorderInset />
      <Text className='header__fio' text='Ф.И.О.' />
      <BorderInset />
      <Text className='header__status' text='Статус' />
    </div>
  );
}

export default TaskListHeader;
