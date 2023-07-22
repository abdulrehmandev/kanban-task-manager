import React, { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BoardContext } from "@/contexts/BoardContext";
import updateBoard from "@/firebase/boards/update-board";
import { SidebarContext } from "@/contexts/SidebarContext";

const EditBoard = () => {
  const { board } = useContext(BoardContext);
  const [open, setOpen] = useState(false);
  const [boardData, setBoardData] = useState({
    name: "",
  });
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  useEffect(() => {
    setBoardData({
      name: board?.name,
    });
  }, [board]);

  function handleNameChange(e) {
    setBoardData({ name: e.target.value });
  }

  async function updateBoardHandler(data) {
    const result = await updateBoard(data, board.id).then((res) => res);
    if (result) {
      setOpen(false);
      window.location.reload();
    }
  }

  function handleSubmit(e) {
    if (boardData.name === "") {
      return;
    }

    e.preventDefault();

    updateBoardHandler(boardData);

    setBoardData({
      name: "",
    });
  }

  useEffect(() => {
    if (open && isSidebarOpen) toggleSidebar();
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
          Edit Board
        </button>
      </Dialog.Trigger>
      <Dialog.Portal className="relative z-50">
        <Dialog.Overlay className="bg-black bg-opacity-40 fixed inset-0" />
        <Dialog.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-gray-800 p-[25px] focus:outline-none"
        >
          <Dialog.Title className="text-xl mb-4 font-medium text-gray-900 dark:text-white">
            Edit Board
          </Dialog.Title>
          <fieldset className="mb-[15px] space-y-2">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="name"
              value={boardData.name}
              onChange={handleNameChange}
              placeholder={board?.name}
              required
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                className="w-full text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-700"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-indigo-300 hover:bg-indigo-800 focus:shadow-indigo-500 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditBoard;
