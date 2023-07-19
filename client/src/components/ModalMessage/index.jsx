import React from "react";

function ModalMessage({ message, typeClass }) {
  return <div className={`modal-message ${typeClass}`}>{message}</div>;
}

export default ModalMessage;
