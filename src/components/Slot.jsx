import React from "react";

const Slot = (props) => {
  return (
    <div className="slot" {...props}>
      {props.children}
    </div>
  );
};

export default Slot;
