"use client";

import { BoardContext } from "@/contexts/BoardContext";
import { ColumnsContext } from "@/contexts/ColumnsContext";
import getColumns from "@/firebase/columns/get-columns";
import getTasks from "@/firebase/tasks/get-tasks";

import { useContext, useState, useEffect } from "react";
import NewColumn from "./NewColumn";

const Board = () => {
  const { board } = useContext(BoardContext);
  const [columns, setColumns] = useState([]);
  const { changeColumns } = useContext(ColumnsContext);

  async function fetchColumns(boardId) {
    await getColumns(boardId).then((data) => {
      setColumns(data.reverse());
      changeColumns(data);
    });
  }

  useEffect(() => {
    if (board) {
      fetchColumns(board.id);
    }
  }, [board]);

  return (
    <section>
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
        <p>Add Column</p>
      )}
    </section>
  );
};

const TaskColumn = ({ column }) => {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks(columnId) {
    getTasks(columnId).then((data) => setTasks(data));
  }

  useEffect(() => {
    if (column) {
      fetchTasks(column.id);
    }
  }, []);

  return (
    <section className="max-w-[250px] min-w-[250px] w-full">
      <p className="uppercase text-[0.7rem] tracking-[0.1rem] ml-2 mb-3 font-medium text-gray-600 dark:text-gray-400">
        {column.name}
      </p>
      <div className="flex flex-col gap-4">
        {tasks && tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </section>
  );
};

const TaskCard = ({ task }) => {
  return (
    <section className="flex group cursor-pointer flex-col gap-2 py-4 px-4 bg-white rounded-md shadow-md dark:bg-gray-800">
      <h1 className="font-semibold text-base group-hover:text-indigo-400">
        {task.title}
      </h1>
    </section>
  );
};

export default Board;
