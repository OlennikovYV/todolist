import React from "react";

function ShowHeader({ title, numTask, onClose }) {
  return (
    <div className='modal-header'>
      <h3 className='modal-title'>
        {title}
        {numTask ? " №" + numTask : ""}
      </h3>
      <span className='modal-close' onClick={onClose}>
        &times;
      </span>
    </div>
  );
}

export default ShowHeader;
