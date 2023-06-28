import React from "react";

import Button from "../Button";

function HeaderModal({ title, onClose }) {
  return (
    <div className='modal-header'>
      <span className='modal-title'>{title}</span>
      <Button
        className='modal-close'
        onClick={onClose}
        text='&times;'
        type='modal-close'
      />
    </div>
  );
}

export default HeaderModal;
