import React, { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BoardContext } from "@/contexts/BoardContext";
import createColumn from "@/firebase/columns/create-column";

const NewColumn = () => {
  const { board, resetBoard } = useContext(BoardContext);
  const [columnData, setColumnData] = useState({
    name: "",
    board: {
      id: board.id,
    },
  });
  const [open, setOpen] = useState(false);

  function handleNameChange(e) {
    setColumnData({ ...columnData, name: e.target.value });
  }

  async function createColumnHandler(data) {
    const result = await createColumn(data).then((res) => res);
    if (result) resetBoard();
  }

  function handleSubmit(e) {
    if (columnData.name === "") {
      return;
    }

    e.preventDefault();

    createColumnHandler(columnData).then(() => setOpen(false));

    setColumnData({
      name: "",
      board: {
        id: board.id,
      },
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex items-center p-2 px-4 font-semibold text-sm text-gray-200 dark:text-gray-800 rounded-lg bg-indigo-500 group text-center hover:bg-indigo-400">
          + <span className="ml-1">Add Column</span>
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
            Add Column
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
              value={columnData.name}
              onChange={handleNameChange}
              placeholder="e.g., Todo"
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

export default NewColumn;
