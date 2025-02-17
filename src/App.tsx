import { useState } from "react";
import Board from "./components/Board";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(newSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setHistory(history.slice(0, nextMove + 1)); // Trim history
  }

  const moves = history.map((_, index: number) => {
    let description: string;

    description = index > 0 ? `Go to move #${index}` : "Go to game start";

    return (
      <li className="game-info-list" key={index}>
        {index === currentMove ? (
          <span>{description}</span>
        ) : (
          <button className="game-info-btn" onClick={() => jumpTo(index)}>
            {description}
          </button>
        )}
      </li>
    );
  });

  return (
    <>
      <h1>Let's play Tic Tac!</h1>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

export default Game;
