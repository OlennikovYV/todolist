import React from "react";

function Caption(props) {
  const { className, text } = props;

  return <div className={className}>{text}</div>;
}

export default Caption;
