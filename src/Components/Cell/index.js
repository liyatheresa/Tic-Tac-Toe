import React from "react";
import "./Cell.css";
const Cell = ({ cellId, value, handleClick }) => {
  return (
    <>
      <div
        className={`individual-cell ${
          value === "X" ? "blue-color-text" : "red-color-text"
        }`}
        onClick={() => handleClick(cellId)}
      >
        {value}
      </div>
    </>
  );
};

export default Cell;
