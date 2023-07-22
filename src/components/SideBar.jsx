"use client";

import { useContext, useState, useEffect } from "react";

import { SidebarContext } from "@/contexts/SidebarContext";
import { BoardContext } from "@/contexts/BoardContext";
import { useAuth } from "@/contexts/AuthContext";

import getBoards from "@/firebase/boards/get-boards";

import SideBarButton from "@/components/SideBarButton";
import NewBoardButton from "./NewBoardButton";

const SideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const { changeBoard } = useContext(BoardContext);
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);
  const [seed, setSeed] = useState(1);
  const [loading, setLoading] = useState(true);

  const reset = () => {
    setSeed(Math.random());
  };

  async function fetchBoards(uid) {
    await getBoards(uid).then((data) => setBoards(data));
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    if (user.uid) {
      fetchBoards(user.uid);
      changeBoard(boards[0]);
    }
    setLoading(false);
  }, [seed]);

  const handleBoardChange = (board) => {
    changeBoard(board);
    if (isSidebarOpen) toggleSidebar();
  };

  return (
    <aside
      key={seed}
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
        isSidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
      }`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <p className="uppercase text-[0.7rem] tracking-[0.15rem] ml-4 mb-2 font-medium text-gray-600 dark:text-gray-400">
          All Boards ({boards.length})
        </p>
        {loading ? (
          <p className="ml-4 dark:text-gray-400 text-gray-600 text-xs mt-6 mb-4">
            Loading...
          </p>
        ) : boards.length === 0 ? (
          <p className="ml-4 dark:text-gray-400 text-gray-600 text-xs mt-6 mb-4">
            No boards found!
          </p>
        ) : (
          <ul className="space-y-2 font-medium">
            {boards.map((board) => (
              <li key={board.id}>
                <SideBarButton onClick={() => handleBoardChange(board)}>
                  {board.name}
                </SideBarButton>
              </li>
            ))}
          </ul>
        )}
        <div>
          <NewBoardButton reset={reset} />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
