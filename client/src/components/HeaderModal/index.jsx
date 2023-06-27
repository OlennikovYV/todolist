import React from "react";

function HeaderModal({ title, onClose }) {
  return (
    <div className='modal-header'>
      <span className='modal-title'>{title}</span>
      <span className='modal-close' onClick={onClose}>
        &times;
      </span>
    </div>
  );
}

export default HeaderModal;
