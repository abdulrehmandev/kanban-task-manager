import deleteColumn from "@/firebase/columns/delete-column";
import * as Dialog from "@radix-ui/react-dialog";

const Column = ({ column }) => {
  async function deleteColumnHandler(columnId) {
    await deleteColumn(columnId);
  }
  function handleSubmit(e) {
    e.preventDefault();
    deleteColumnHandler(column.id);
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center justify-between gap-4 uppercase text-[0.7rem] tracking-[0.1rem] ml-2 mb-3 font-medium text-gray-600 dark:text-gray-400 w-full">
          <span>{column.name}</span>
          <span>
            <svg
              className="text-gray-600 dark:text-gray-400 w-4 h-4 mr-3 hover:text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
              <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
            </svg>
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal className="relative z-50">
        <Dialog.Overlay className="bg-black bg-opacity-40 fixed inset-0" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-gray-800 p-[25px] focus:outline-none">
          <Dialog.Title className="text-xl mb-4 font-medium text-gray-900 dark:text-white">
            Delete
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-800 dark:text-gray-200">
            Are you sure you want to delete this column ({column.name})? All
            tasks in this column will also get deleted with it
          </Dialog.Description>

          <div className="mt-[25px] flex justify-between gap-2">
            <Dialog.Close asChild>
              <button className="text-gray-500 w-full bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="text-white w-full bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={handleSubmit}
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

export default Column;
