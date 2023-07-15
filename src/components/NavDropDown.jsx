import deleteBoard from "@/firebase/boards/delete-board";
import { useContext, useState } from "react";
import { BoardContext } from "@/contexts/BoardContext";
import EditBoard from "./EditBoard";

const NavDropDown = () => {
  const [dropDown, setDropDown] = useState(false);
  const [modal, setModal] = useState({
    delete: false,
    edit: false,
  });

  return (
    <div className="flex items-center ml-3 relative">
      <div>
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-lg focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          onClick={() => setDropDown(!dropDown)}
        >
          <span className="sr-only">Open menu</span>

          <span className="px-2 py-1">
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="currentColor" fillRule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </span>
        </button>
      </div>
      <div
        className={`z-50 top-10 right-2 my-4 min-w-[175px] text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${
          dropDown ? "fixed" : "hidden"
        }`}
      >
        <div className="px-4 py-3" role="none">
          <p className="text-sm text-gray-900 dark:text-white">Abdul Rehman</p>
          <p
            className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
            role="none"
          >
            beingabdulr@gmail.com
          </p>
        </div>
        <ul className="py-1" role="none">
          <li>
            {/* <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Edit Board
            </a> */}
            <EditBoard />
          </li>
          <li>
            <button
              type="button"
              className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 text-red-600 dark:hover:bg-gray-600 dark:hover:text-red-400"
              role="menuitem"
              onClick={() => {
                setModal({ ...modal, delete: true });
              }}
            >
              Delete Board
            </button>
            <DeleteBoardModal modal={modal} setModal={setModal} />
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const DeleteBoardModal = ({ modal, setModal }) => {
  const { board, changeBoard } = useContext(BoardContext);

  async function deleteBoardHandler() {
    console.log("in handler");
    await deleteBoard(board.id);
    console.log("out of handler");
    setModal({ ...modal, delete: false });
    changeBoard(null);
    window.location.reload();
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100vh-1rem)] max-h-full bg-black bg-opacity-40 ${
        modal.delete ? "block" : "hidden"
      }`}
    >
      <div className="relative flex justify-center items-center w-full h-full max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-sm">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => {
              setModal({ ...modal, delete: false });
            }}
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
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              className="mx-auto mb-6 text-gray-400 w-12 h-12 dark:text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this {board?.name}?
            </h3>
            <div className="flex gap-1 flex-col items-center justify-center sm:flex-row">
              <button
                type="button"
                className="text-white w-full bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={() => deleteBoardHandler()}
              >
                Yes, I'm sure
              </button>
              <button
                type="button"
                className="text-gray-500 w-full bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  setModal({ ...modal, delete: false });
                }}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDropDown;
