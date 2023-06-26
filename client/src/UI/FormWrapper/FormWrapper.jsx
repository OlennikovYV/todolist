import React from "react";

import "./FormWrapper.scss";

function FormWrapper(props) {
  return (
    <>
      <form
        className={
          props?.className ? " formWrapper " + props.className : "formWrapper"
        }
        id={props?.id ? props.id : ""}
        onSubmit={props?.onSubmit ? props.onSubmit : null}
      >
        {props?.children}
      </form>
    </>
  );
}

export default FormWrapper;
