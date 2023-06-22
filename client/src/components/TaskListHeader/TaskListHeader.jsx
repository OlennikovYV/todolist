import React from "react";

function TaskListHeader() {
  return (
    <div className='task header'>
      <div className='caption'>Заголовок</div>
      <div className='border-inset'></div>
      <div className='priority'>Приоритет</div>
      <div className='border-inset'></div>
      <div className='date-complete'>Дата окончания</div>
      <div className='border-inset'></div>
      <div className='fio'>Ф.И.О.</div>
      <div className='border-inset'></div>
      <div className='status'>Статус</div>
    </div>
  );
}

export default TaskListHeader;
