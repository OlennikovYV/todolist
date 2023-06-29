import React, { forwardRef } from "react";

const Button = forwardRef(function Button(props, ref) {
  const { className, disabled, form, id, tabIndex, text, type, onClick } =
    props;
  const classNames = `${className}`;

  return (
    <button
      className={classNames}
      disabled={disabled}
      form={form}
      id={id}
      ref={ref}
      onClick={onClick}
      tabIndex={tabIndex}
      type={type}
    >
      {text}
    </button>
  );
});

export default Button;
