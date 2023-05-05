import React from "react";
import Disc from "./Disc";

const TurnCard = ({ color, title, turn, winner }) => {
  return (
    <div className="TurnCard__wrapper">
      <div className="TurnCard">
        <div className="TurnCard__disc">
          <Disc color={color} />
        </div>
        <div className="TurnCard__title">{title}</div>
      </div>
      <div className="TurnCard__turn">
        {color === turn && !winner && winner !== false ? "Your Turn" : ""}
        {winner === color ? "Winner" : ""}
        {winner === false ? "Tie" : ""}
      </div>
    </div>
  );
};

export default TurnCard;
