import { useState } from "react";
import Board from "./components/Board";
import confetti from "canvas-confetti";
import Column from "./components/Column";
import Slot from "./components/Slot";
import Disc from "./components/Disc";
import TurnCard from "./components/TurnCard";
import Container from "./components/Container";
import { checkEndGame, checkWinnerFrom, getVerticals } from "./login";
import { TURNS } from "./constants";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(42).fill(null));
  const [turn, setTurn] = useState(TURNS.RED);
  const [winner, setWinner] = useState(null);

  const colsBoard = getVerticals(board);

  const handleClick = (col) => {
    if (winner) return;
    const lastIndex = colsBoard[col].findLastIndex((e) => e === null);
    colsBoard[col][lastIndex] = turn;
    const newBoard = colsBoard.flat();
    setBoard(newBoard);
    
    if(lastIndex !== -1){
      const newTurn = turn === TURNS.RED ? TURNS.YELLOW : TURNS.RED;
      setTurn(newTurn);

    };


    const newWinner = checkWinnerFrom(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }

  };

  const resetGame = () => {
    setBoard(Array(42).fill(null));
    setTurn(TURNS.RED);
    setWinner(null);
  };

  return (
    <>
      <Header winner={winner} resetGame={resetGame}/>
      <Container>
        <Board>
          {colsBoard.map((col, ci) => (
            <Column handleClick={() => handleClick(ci)} key={`col-${ci}`}>
              {col.map((slot, si) => (
                <Slot key={`slot${si}-${ci}`}>
                  <Disc color={slot} position={si} />
                </Slot>
              ))}
            </Column>
          ))}
        </Board>

        <TurnCard
          color={TURNS.RED}
          title="Player 1"
          turn={turn}
          winner={winner}
        />

        <TurnCard
          color={TURNS.YELLOW}
          title="Player 2"
          turn={turn}
          winner={winner}
        />
      </Container>
    </>
  );
}

export default App;
