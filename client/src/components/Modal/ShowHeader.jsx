import React from "react";

function ShowHeader({ title, onClose }) {
  return (
    <div className='modal-header'>
      <h3 className='modal-title'>{title}</h3>
      <span className='modal-close' onClick={onClose}>
        &times;
      </span>
    </div>
  );
}

export default ShowHeader;
