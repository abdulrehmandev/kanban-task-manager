import { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BoardContext } from "@/contexts/BoardContext";
import deleteBoard from "@/firebase/boards/delete-board";

const DeleteBoard = () => {
  const [open, setOpen] = useState(false);
  const { board } = useContext(BoardContext);

  async function deleteBoardHandler() {
    const result = await deleteBoard(board.id).then((res) => res);
    if (result) {
      window.location.reload();
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 text-red-500 dark:hover:bg-gray-600 dark:hover:text-red-400">
          Delete
        </button>
      </Dialog.Trigger>
      <Dialog.Portal className="relative z-50">
        <Dialog.Overlay className="bg-black bg-opacity-40 fixed inset-0" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-gray-800 p-[25px] focus:outline-none">
          <Dialog.Title className="text-xl mb-4 font-medium text-gray-900 dark:text-white">
            Delete Board
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Are you sure you want to delete this board ({board?.name})?
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
                onClick={deleteBoardHandler}
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

export default DeleteBoard;

// const DeleteBoardModal = ({ modal, setModal }) => {
//     const { board, changeBoard } = useContext(BoardContext);

//     async function deleteBoardHandler() {
//       console.log("in handler");
//       await deleteBoard(board.id);
//       console.log("out of handler");
//       setModal({ ...modal, delete: false });
//       changeBoard(null);
//       window.location.reload();
//     }

//     return (
//       <div
//         className={`fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100vh-1rem)] max-h-full bg-black bg-opacity-40 ${
//           modal.delete ? "block" : "hidden"
//         }`}
//       >
//         <div className="relative flex justify-center items-center w-full h-full max-h-full">
//           <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-sm">
//             <button
//               type="button"
//               className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//               onClick={() => {
//                 setModal({ ...modal, delete: false });
//               }}
//             >
//               <svg
//                 className="w-3 h-3"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 14 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                 />
//               </svg>
//               <span className="sr-only">Close modal</span>
//             </button>
//             <div className="p-6 text-center">
//               <svg
//                 className="mx-auto mb-6 text-gray-400 w-12 h-12 dark:text-gray-200"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//                 />
//               </svg>
//               <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
//                 Are you sure you want to delete this {board?.name}?
//               </h3>
//               <div className="flex gap-1 flex-col items-center justify-center sm:flex-row">
//                 <button
//                   type="button"
//                   className="text-white w-full bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
//                   onClick={() => deleteBoardHandler()}
//                 >
//                   Yes, I'm sure
//                 </button>
//                 <button
//                   type="button"
//                   className="text-gray-500 w-full bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
//                   onClick={() => {
//                     setModal({ ...modal, delete: false });
//                   }}
//                 >
//                   No, cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
