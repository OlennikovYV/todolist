import React from "react";

function FormWrapper(props) {
  return (
    <>
      <form
        id={props?.id ? props.id : ""}
        onSubmit={props?.onSubmit ? props.onSubmit : null}
      ></form>
    </>
  );
}

export default FormWrapper;
