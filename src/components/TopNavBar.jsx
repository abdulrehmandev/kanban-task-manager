"use client";

import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import SideBarToggler from "./SideBarToggler";
import NewTaskButton from "./NewTaskButton";
import Image from "next/image";
import NavDropDown from "./NavDropDown";
import { BoardContext } from "@/contexts/BoardContext";

const TopNavBar = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const { board } = useContext(BoardContext);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <SideBarToggler onClick={toggleSidebar} />
            <Image
              className="h-full hidden sm:block sm:w-32 ml-6 sm:mr-10"
              src="logo-light.svg"
              width={150}
              height={150}
              alt=""
            />
            <h1 className="font-semibold text-xl text-indigo-400 ml-2">
              {board?.name}
            </h1>
          </div>
          <div className="flex items-center sm:gap-2">
            <NewTaskButton />
            <NavDropDown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
