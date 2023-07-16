import createBoard from "@/firebase/boards/create-board";
import { useContext, useState } from "react";
import { BoardContext } from "@/contexts/BoardContext";

const NewBoardModal = ({ modal, setModal, setRefetch }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  async function createBoardHandler(data) {
    return await createBoard(data).then((res) => res);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const result = createBoardHandler(formData);

    console.log(result);
    if (result) {
      setRefetch(true);
    }

    window.location.reload();
    setModal(false);
    setFormData({ name: "" });
  }

  return (
    <div
      className={`fixed top-0 left-64 sm:left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100vh-1rem)] w-[100vw] bg-black bg-opacity-40 ${
        modal ? "block" : "hidden"
      }`}
    >
      <div className="relative flex justify-center items-center w-full h-full max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800 max-w-sm w-full">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => {
              setModal(false);
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
          <div className="p-6">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Create New Board
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Board Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="e.g., Marketing Plan"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-700"
              >
                Create Board
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBoardModal;
