import React from "react";
import Button from "./Button";


const Header = ({winner, resetGame}) => {
  return (
    <header className="Header">
      <h1 className="Header__title">Connect 4</h1>
      <div className="Header__btns">
        {winner || winner === false ? (
          <Button text="New game" click={resetGame} />
        ) : (
          <Button text="Reset game" click={resetGame} outline />
        )}
      </div>
    </header>
  );
};

export default Header;
