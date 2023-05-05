import React from "react";

const Column = ({ children, handleClick }) => {
  return (
    <div className="col" onClick={handleClick}>
      {children}
    </div>
  );
};

export default Column;
