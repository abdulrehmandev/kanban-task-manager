import { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ColumnsContext } from "@/contexts/ColumnsContext";
import createTask from "@/firebase/tasks/create-task";
import updateTask from "@/firebase/tasks/update-task";

const EditTask = ({ task, onClick }) => {
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    column: {
      id: task.column.id,
    },
  });
  const { columns } = useContext(ColumnsContext);

  function handleChange(e) {
    setTaskData((prevData) => {
      if (e.target.name === "column") {
        return { ...prevData, [e.target.name]: { id: e.target.value } };
      }
      return { ...prevData, [e.target.name]: e.target.value };
    });
  }

  async function updateTaskHandler(data, id) {
    await updateTask(data, id);
  }

  function handleSubmit(e) {
    if (taskData.title === "" || taskData.column.id === "") {
      return;
    }
    e.preventDefault();

    updateTaskHandler(taskData, task.id);

    // window.location.reload();

    setTaskData({
      title: "",
      description: "",
      column: {
        id: "",
      },
    });
    onClick();
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-gray-500 w-full bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
          Edit
        </button>
      </Dialog.Trigger>
      <Dialog.Portal className="relative z-50">
        {/* <Dialog.Overlay className="bg-black bg-opacity-40 fixed inset-0" /> */}
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-gray-800 p-[25px] focus:outline-none">
          <Dialog.Title className="text-xl mb-4 font-medium text-gray-900 dark:text-white">
            Edit {task.title}
          </Dialog.Title>
          <fieldset className="mb-[15px] space-y-2">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="e.g., Update UI"
              required
            />
          </fieldset>
          <fieldset className="mb-[15px] space-y-2">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              value={taskData.description}
              onChange={handleChange}
              name="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description goes here..."
            ></textarea>
          </fieldset>
          <fieldset className="mb-[15px] space-y-2">
            <label
              htmlFor="column"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              name="column"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={taskData.column.id}
              onChange={handleChange}
            >
              <option disabled value="">
                Select Column
              </option>
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              ))}
            </select>
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
              onClick={onClick}
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

export default EditTask;
