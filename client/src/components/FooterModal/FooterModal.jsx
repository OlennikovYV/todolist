import React from "react";

function FooterModal({ isShow, onOk, onCancel }) {
  return isShow ? (
    <footer className='modal-footer'>
      {!onOk ? null : (
        <button className='button-ok' onClick={onOk}>
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
