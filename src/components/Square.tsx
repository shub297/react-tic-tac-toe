interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  highlight: boolean;
}

function Square({ value, onSquareClick, highlight }: SquareProps) {
  return (
    <button
      className={`square ${highlight ? "highlight" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
