import * as Dialog from "@radix-ui/react-dialog";
import EditTask from "./EditTask";
import { useState, useContext, useEffect } from "react";
import deleteTask from "@/firebase/tasks/delete-task";
import { BoardContext } from "@/contexts/BoardContext";
import { SidebarContext } from "@/contexts/SidebarContext";

const TaskCard = ({ task }) => {
  const [open, setOpen] = useState(false);
  const { resetBoard } = useContext(BoardContext);
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  useEffect(() => {
    if (open && isSidebarOpen) toggleSidebar();
  }, [open]);

  async function deleteTaskHandler() {
    const result = await deleteTask(task.id).then((res) => res);
    if (result) {
      resetBoard();
      setOpen(false);
    }
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <Dialog.Trigger asChild>
        <section className="flex group cursor-pointer flex-col gap-2 py-4 px-4 bg-white rounded-md shadow-md dark:bg-gray-800 border dark:border-gray-700">
          <h1 className="font-semibold text-base group-hover:text-indigo-400">
            {task.title}
          </h1>
        </section>
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
            Task Details
          </Dialog.Title>
          <p className="dark:text-gray-400 text-xs mb-1">Title:</p>
          <Dialog.Description className="text-gray-800 dark:text-gray-200 mb-4">
            {task.title}
          </Dialog.Description>
          <p className="dark:text-gray-400 text-xs mb-1">Description:</p>
          <Dialog.Description className="text-gray-800 dark:text-gray-200">
            {task.description}
          </Dialog.Description>

          <div className="mt-[25px] flex justify-between items-center gap-2">
            <Dialog.Close asChild>
              <EditTask onClick={() => setOpen(false)} task={task} />
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="text-white w-full bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={deleteTaskHandler}
              >
                Delete
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

export default TaskCard;
