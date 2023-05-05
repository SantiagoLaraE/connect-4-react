import React from "react";

const Disc = ({ color, position }) => {
  if (!color) return;

  return (
    <div
      style={{
        transform: `translateY(${(position + 1) * - 100}px)`,
        animationDuration: `${position / 10 + 0.3}s`,
      }}
      className={`disc ${color}`}
    ></div>
  );
};

export default Disc;
