"use client";

import { useState, createContext } from "react";

export const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [board, setBoard] = useState({
    id: "",
    name: "",
  });

  const changeBoard = (board) => setBoard(board);

  return (
    <BoardContext.Provider
      value={{
        board,
        changeBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
