import React from "react";

import Button from "../Button";

function FooterModal({ isShow, onOk, onCancel, formId = "" }) {
  return (
    isShow && (
      <footer className='modal-footer'>
        {onOk && (
          <Button
            className='modal-button-footer'
            onClick={onOk}
            type='submit'
            form={formId}
            text='Готово'
          />
        )}
        {onCancel && (
          <Button
            className='modal-button-footer'
            onClick={onCancel}
            text='Отмена'
          />
        )}
      </footer>
    )
  );
}

export default FooterModal;
