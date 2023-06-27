import React from "react";

function FooterModal({ isShow, onOk, onCancel, id = "" }) {
  return isShow ? (
    <footer className='modal-footer'>
      {!onOk ? null : (
        <button className='button-ok' onClick={onOk} type='submit' form={id}>
          Готово
        </button>
      )}
      {!onCancel ? null : (
        <button className='button-cancel' onClick={onCancel}>
          Отмена
        </button>
      )}
    </footer>
  ) : null;
}

export default FooterModal;
