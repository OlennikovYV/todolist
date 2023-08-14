import React from "react";

import BorderInset from "../BorderInset";

function Text(props) {
  const { borderInset = false, className, text, onClick } = props;
  const classNames = `text ${className}`.trimEnd();

  return (
    <>
      <div className={classNames} onClick={onClick}>
        {text}
      </div>
      {borderInset && <BorderInset />}
    </>
  );
}

export default Text;
