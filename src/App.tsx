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
    return (
      index > 0 && (
        <li className="game-info-list" key={index}>
          {index === currentMove ? (
            <span>{`Move #${index}`}</span>
          ) : (
            <button className="game-info-btn" onClick={() => jumpTo(index)}>
              {`Go to move #${index}`}
            </button>
          )}
        </li>
      )
    );
  });

  return (
    <>
      <h1>Let's play Tic-Tac-Toe!</h1>
      <div className="game">
        <section className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
          <button
            className="reset"
            onClick={() => jumpTo(0)}
            disabled={history.length === 1}
          >
            Reset Game
          </button>
        </section>

        {history.length > 1 && (
          <section className="game-info">
            <h2 aria-live="polite">Move History</h2>
            <ol>{moves}</ol>
          </section>
        )}
      </div>
    </>
  );
}

export default Game;
