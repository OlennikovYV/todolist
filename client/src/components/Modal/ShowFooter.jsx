import React from "react";

function ShowFooter({ footer }) {
  return <>{footer && <div className='modal-footer'>{footer}</div>}</>;
}

export default ShowFooter;
