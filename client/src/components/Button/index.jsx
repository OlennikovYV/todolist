import React from "react";

function Button(props) {
  const { className, disabled, form, id, tabIndex, text, type, onClick } =
    props;
  const classNames = `${className}`;

  return (
    <button
      className={classNames}
      disabled={disabled}
      form={form}
      id={id}
      onClick={onClick}
      tabIndex={tabIndex}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;
