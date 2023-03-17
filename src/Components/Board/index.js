import React, { useEffect, useState } from "react";
import Cell from "../Cell";
import "./Board.css";

const Board = () => {
  const [cellsData, setCellsData] = useState(
    Array.from({ length: 9 }, () => {
      return { id: crypto.randomUUID(), value: "" };
    })
  );
  const [isFirstPlayer, setIsFirstPlayer] = useState(true);
  const [playersScore, setPlayersScore] = useState({ player1: 0, player2: 0 });
  const [roundCount, setRoundCount] = useState(1);
  const LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    for (let i = 0; i < LINES.length; i++) {
      let indexes = LINES[i];
      let [index1, index2, index3] = indexes;
      if (
        cellsData[index1].value &&
        cellsData[index2].value &&
        cellsData[index3].value
      ) {
        if (
          cellsData[index1].value === cellsData[index2].value &&
          cellsData[index1].value === cellsData[index3].value
        ) {
          if (cellsData[index1].value === "X") {
            setTimeout(() => alert("Winner is Player 1"));
          } else {
            setTimeout(() => alert("Winner is Player 2"));
          }
          proceedToNextRound();
        }
      }
    }
  }, [cellsData]);

  const handleClick = (id) => {
    let updatedCell = cellsData.map((each) => {
      if (each.id === id) {
        if (isFirstPlayer) {
          if (each.value === "") {
            setIsFirstPlayer(!isFirstPlayer);
            return { ...each, value: "X" };
          } else {
            return { ...each };
          }
        } else {
          if (each.value === "") {
            setIsFirstPlayer(!isFirstPlayer);
            return { ...each, value: "O" };
          } else {
            return { ...each };
          }
        }
      } else {
        return each;
      }
    });
    setCellsData(updatedCell);
  };

  const proceedToNextRound = () => {
    let boardAfterReset = cellsData.map((cell) => {
      return { ...cell, value: "" };
    });
    setCellsData(boardAfterReset);
    setRoundCount((previousValue) => {
      setIsFirstPlayer(previousValue % 2 === 0);
      return previousValue + 1;
    });
    setPlayersScore({ ...playersScore, player1: 0, player2: 0 });
  };

  const resetBoard = () => {
    let boardAfterReset = cellsData.map((cell) => {
      return { ...cell, value: "" };
    });
    setCellsData(boardAfterReset);
    setIsFirstPlayer(true);
    setRoundCount(1);
    setPlayersScore({ ...playersScore, player1: 0, player2: 0 });
  };

  return (
    <div className="main">
      <div className="score-board">
        <span className="score-title">Scores </span>
        <span>Player 1: {playersScore.player1}</span>
        <span>Player 2: {playersScore.player2}</span>
      </div>
      <div>Round: {roundCount}</div>
      <div className="cells">
        {cellsData.map((cell) => (
          <Cell
            key={cell.id}
            cellId={cell.id}
            value={cell.value}
            handleClick={handleClick}
          ></Cell>
        ))}
      </div>
      {isFirstPlayer ? (
        <div className="player-info">Current player is Player 1</div>
      ) : (
        <div className="player-info">Current player is Player 2</div>
      )}
      <button className="reset-button" onClick={resetBoard}>
        Reset
      </button>
    </div>
  );
};

export default Board;
