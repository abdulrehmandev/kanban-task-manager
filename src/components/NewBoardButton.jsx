import { useContext, useState } from "react";
import NewBoardModal from "./NewBoardModal";
import { SidebarContext } from "@/contexts/SidebarContext";

const NewBoardButton = ({ reset }) => {
  const [openModal, setOpenModal] = useState(false);
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <>
      <button
        className="flex items-center mt-2 p-2 text-gray-900 rounded-lg dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-center"
        onClick={() => {
          setOpenModal(true);
          toggleSidebar();
        }}
      >
        <span className="pl-2 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-indigo-400">
          +
        </span>
        <span className="ml-3">Create New Board</span>
      </button>
      <NewBoardModal reset={reset} modal={openModal} setModal={setOpenModal} />
    </>
  );
};

export default NewBoardButton;
