"use client";

import { useContext, useState, useEffect } from "react";

import { BoardContext } from "@/contexts/BoardContext";
import { ColumnsContext } from "@/contexts/ColumnsContext";

import getColumns from "@/firebase/columns/get-columns";

import NewColumn from "@/components/NewColumn";
import TaskColumn from "@/components/TaskColumn";

const Board = () => {
  const { board, boardSeed, resetBoard } = useContext(BoardContext);
  const [columns, setColumns] = useState([]);
  const { changeColumns } = useContext(ColumnsContext);

  async function fetchColumns(boardId) {
    await getColumns(boardId).then((data) => {
      setColumns(data.reverse());
      changeColumns(data);
    });
  }

  console.log(boardSeed);

  useEffect(() => {
    if (board) {
      fetchColumns(board.id);
    }
  }, [board, boardSeed]);

  return (
    <section key={boardSeed}>
      {!board ? (
        <p>Open a board</p>
      ) : columns.length != 0 ? (
        <div className="flex gap-6 overflow-auto">
          {columns.map((column) => (
            <TaskColumn key={column.id} column={column} />
          ))}
          <div className="h-[calc(100vh-7rem)] max-w-[250px] min-w-[250px] w-full flex items-center justify-center">
            <NewColumn />
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-10rem)] max-w-[250px] min-w-[250px] w-full flex items-center justify-center">
          <NewColumn />
        </div>
      )}
    </section>
  );
};

export default Board;
