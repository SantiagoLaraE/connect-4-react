import React from "react";

const Button = ({ text, click, outline }) => {
  const classOutline = outline ? "outline" : "";
  return <button className={`Button ${classOutline}`} onClick={click}>{text}</button>;
};

export default Button;
