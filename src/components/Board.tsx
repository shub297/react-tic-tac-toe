import { useState } from "react";
import Square from "./Square";

interface BoardProps {
  xIsNext: boolean;
  squares: string[];
  onPlay: (arg0: string[]) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(index: number): void {
    if (squares[index] || calculateWinner(squares)) {
      return; // return early if square[i] has been marked already
    }
    /*
     * Create a copy of square to achieve Immutability
     * Avoiding direct data mutation lets you keep previous versions of the data intact, and reuse them later
     * all child components re-render automatically when the state of a parent component changes - includes even the child components that weren’t affected by the change
     * So, for performance - skip re-rendering components which did not change
     * Immutability makes it very cheap for components to compare whether their data has changed or not
     */
    const nextSquares = squares.slice();

    xIsNext ? (nextSquares[index] = "X") : (nextSquares[index] = "O");

    onPlay(nextSquares);
  }

  const winner: string | null = calculateWinner(squares);
  let status: string;
  status = winner
    ? "Winner: " + winner
    : "Next Player: " + (xIsNext ? "X" : "O");

  return (
    <>
      <h1>Let's play Tic Tac</h1>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <h2>{status}</h2>
    </>
  );
}

function calculateWinner(squares: string[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
