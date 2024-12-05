import React, { useState } from 'react';
import './App.css';

// 定义棋盘大小和初始棋盘状态
const boardSize = 15;
const initialBoard = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));

// 单个棋盘格子组件
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

// 棋盘组件
function Board({ board, onClick }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((_, colIndex) => (
            <Square
              key={colIndex}
              value={board[rowIndex][colIndex]}
              onClick={() => onClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// 主游戏组件
function App() {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // 计算胜利者
  function calculateWinner(board) {
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const player = board[row][col];
        if (!player) continue;

        // 水平检查
        if (col <= boardSize - 5 && 
            player === board[row][col + 1] && 
            player === board[row][col + 2] && 
            player === board[row][col + 3] && 
            player === board[row][col + 4]) {
          return player;
        }

        // 垂直检查
        if (row <= boardSize - 5 && 
            player === board[row + 1][col] && 
            player === board[row + 2][col] && 
            player === board[row + 3][col] && 
            player === board[row + 4][col]) {
          return player;
        }

        // 主对角线检查
        if (row <= boardSize - 5 && col <= boardSize - 5 &&
            player === board[row + 1][col + 1] && 
            player === board[row + 2][col + 2] && 
            player === board[row + 3][col + 3] && 
            player === board[row + 4][col + 4]) {
          return player;
        }

        // 副对角线检查
        if (row >= 4 && col <= boardSize - 5 && 
            player === board[row - 1][col + 1] && 
            player === board[row - 2][col + 2] && 
            player === board[row - 3][col + 3] && 
            player === board[row - 4][col + 4]) {
          return player;
        }
      }
    }
    return null;
  }

  // 处理棋盘格子点击事件
  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.slice();
    newBoard[row] = [...board[row]]; // 创建新的数组以保持不变性
    newBoard[row][col] = xIsNext ? 'X' : 'O';
    
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  // 重置游戏
  const handleReset = () => {
    setBoard(initialBoard);
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board board={board} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}</div>
        <button onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
}

export default App;
