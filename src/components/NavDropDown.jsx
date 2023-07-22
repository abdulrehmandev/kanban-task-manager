import { useState } from "react";
import EditBoard from "./EditBoard";
import DeleteBoard from "./DeleteBoard";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const NavDropDown = () => {
  const [dropDown, setDropDown] = useState(false);
  const { logOut, user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    try {
      await logOut();
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }

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
          {/* <p className="text-sm text-gray-900 dark:text-white">Abdul Rehman</p> */}
          <p
            className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
            role="none"
          >
            {user.email}
          </p>
        </div>
        <ul className="py-1" role="none">
          <li>
            <EditBoard />
          </li>
          <li>
            <DeleteBoard />
          </li>
          <li>
            <a
              onClick={handleLogout}
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

export default NavDropDown;
