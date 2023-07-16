"use client";

import { useState, createContext } from "react";

export const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [board, setBoard] = useState({
    id: "",
    name: "",
  });
  const [boardSeed, setBoardSeed] = useState(1);

  const changeBoard = (board) => setBoard(board);

  const resetBoard = () => {
    setBoardSeed(Math.random());
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        changeBoard,
        boardSeed,
        resetBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
