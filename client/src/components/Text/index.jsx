import React from "react";

function Text(props) {
  const { className, text } = props;

  return <div className={className}>{text}</div>;
}

export default Text;
