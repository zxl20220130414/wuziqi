import React, { useState } from 'react';

const boardSize = 15;

const FiveInARow = () => {
  const [squares, setSquares] = useState(Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)));
  const [isNext, setIsNext] = useState(true);
  const winner = calculateWinner(squares);

  const handleClick = (i, j) => {
    if (squares[i][j] || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i][j] = isNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsNext(!isNext);
  };

  const renderSquare = (i, j) => {
    return (
      <button className="square" onClick={() => handleClick(i, j)} key={`${i},${j}`}>
        {squares[i][j]}
      </button>
    );
  };

  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(renderSquare(i, j));
      }
      rows.push(<div key={i} className="board-row">{row}</div>);
    }
    return <div>{rows}</div>;
  };

  const calculateWinner = (squares) => {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (squares[i][j] !== null) {
          if (checkDirection(i, j, 1, 0, squares[i][j]) ||
              checkDirection(i, j, 0, 1, squares[i][j]) ||
              checkDirection(i, j, 1, 1, squares[i][j]) ||
              checkDirection(i, j, 1, -1, squares[i][j])) {
            return squares[i][j];
          }
        }
      }
    }
    return null;
  };

  const checkDirection = (x, y, dx, dy, player) => {
    let count = 0;
    for (let i = 0; i < 5; i++) {
      const nx = x + dx * i;
      const ny = y + dy * i;
      if (nx < 0 || ny < 0 || nx >= boardSize || ny >= boardSize || squares[nx][ny] !== player) {
        return false;
      }
      count++;
    }
    return count === 5;
  };

  const status = winner ? `Winner: ${winner}` : `Next player: ${isNext ? 'X' : 'O'}`;

  return (
    <div>
      <div>{status}</div>
      {renderBoard()}
    </div>
  );
};

export default FiveInARow;
