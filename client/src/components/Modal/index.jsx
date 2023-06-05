import React, { useEffect } from "react";

import ShowContent from "./ShowContent";
import ShowHeader from "./ShowHeader";
import ShowFooter from "./ShowFooter";

function Modal({ isVisible = false, isNew, title, content, footer, onClose }) {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isVisible ? null : (
    <div className='modal' onClick={onClose}>
      <div className='modal-dialog' onClick={(e) => e.stopPropagation()}>
        <ShowHeader title={title} onClose={onClose} />
        <ShowContent isNew={isNew} task={content} />
        <ShowFooter footer={footer} />
      </div>
    </div>
  );
}

export default Modal;
