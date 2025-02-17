import Square from "./Square";

interface BoardProps {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
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
    const updatedBoard = squares.slice();

    xIsNext ? (updatedBoard[index] = "X") : (updatedBoard[index] = "O");

    onPlay(updatedBoard);
  }

  function renderSquare(index: number) {
    return (
      <Square value={squares[index]} onSquareClick={() => handleClick(index)} />
    );
  }

  return (
    <>
      <div className="board">
        {[0, 3, 6].map((row: number) => (
          <div className="board-row" key={row}>
            {renderSquare(row)}
            {renderSquare(row + 1)}
            {renderSquare(row + 2)}
          </div>
        ))}
      </div>
      <h3>
        {calculateWinner(squares)
          ? `Winner: ${calculateWinner(squares)}`
          : `Next Player: ${xIsNext ? "X" : "O"}`}
      </h3>
    </>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
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
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
