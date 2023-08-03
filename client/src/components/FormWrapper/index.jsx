import React from "react";

function FormWrapper(props) {
  const { className, id, onSubmit, children } = props;
  return (
    <>
      <form
        className={className ? " formWrapper " + className : "formWrapper"}
        id={id ? id : ""}
        onSubmit={onSubmit ? onSubmit : null}
      >
        {children}
      </form>
    </>
  );
}

export default FormWrapper;
