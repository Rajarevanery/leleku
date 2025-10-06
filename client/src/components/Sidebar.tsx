import ProfileIcon from "./ProfileIcon";
import type { IUserData } from "../types/types";
import { icon } from "../assets/files";
import { IoBook, IoHome, IoLogOut } from "react-icons/io5";

const Sidebar = (user_data: IUserData) => {
  return (
    <nav className="h-screen w-[15rem] bg-secondary-bg border-r border-white/20 flex flex-col">
      <div className="flex flex-row gap-2 items-center border-b border-white/10 p-4 bg-neutral-900">
        <img src={icon} className="w-12 h-12" alt="" />
        <h1 className="font-semibold text-2xl">Leleku</h1>
      </div>

      <div className="px-4 flex flex-col gap-2 mt-6">
        <h2 className="text-lg">Main Menu</h2>
        <ol className="">
          <li className="p-2 bg-neutral-800 cursor-pointer hover:bg-neutral-700 rounded text-2xl transition">
            <button className="flex flex-row gap-2 items-center cursor-pointer">
              <i>
                <IoHome />
              </i>
              <span className="text-lg font-semibold">Dashboard</span>
            </button>
          </li>
        </ol>
        <h2 className="text-lg">Learn</h2>
        <ol className="">
          <li className="p-2 bg-neutral-800 cursor-pointer hover:bg-neutral-700 rounded text-2xl transition">
            <button className="flex flex-row gap-2 items-center cursor-pointer">
              <i>
                <IoBook />
              </i>
              <span className="text-lg font-semibold">Course List</span>
            </button>
          </li>
        </ol>
      </div>

      <div className="p-4 flex flex-col gap-4 mt-auto">
        <ProfileIcon {...user_data} />
        <button className="bg-red-button hover:bg-red-700 transition w-full h-14 rounded-lg text-xl font-semibold flex flex-row gap-2 items-center shadow-red-900 shadow-2xl cursor-pointer">
          <i className="text-3xl mt-1 ml-4">
            <IoLogOut />
          </i>{" "}
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
