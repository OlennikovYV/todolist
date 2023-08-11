import React from "react";

function Text(props) {
  const { className, text, onClick } = props;

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}

export default Text;
