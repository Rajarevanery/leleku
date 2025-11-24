import ProfileIcon from "./ProfileIcon";
import type { IUserData } from "../types/types";
import { icon } from "../assets/files";
import { IoBook, IoCreate, IoHome, IoLogOut } from "react-icons/io5";
import { IoMdQuote } from "react-icons/io";
import { BiBookAdd, BiQuestionMark, BiSolidCard } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router";
import { useLogout } from "../lib/Tanstack/mutation/mutations";
import { toast } from "react-toastify";
import { RiSettings6Fill } from "react-icons/ri";
import { TbSettingsQuestion } from "react-icons/tb";

const Sidebar = (user_data: IUserData) => {
  const location = useLocation();

  const { mutateAsync: logoutUser } = useLogout();

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Successfully Log out");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="h-screen w-[15rem] bg-secondary-bg border-r border-white/20 flex flex-col sticky top-0">
      <div className="flex flex-row gap-2 items-center border-b border-white/10 p-4 bg-neutral-900">
        <img src={icon} className="w-12 h-12" alt="" />
        <h1 className="font-semibold text-2xl">Leleku</h1>
      </div>

      <div className="px-4 flex flex-col gap-2 mt-6">
        <ol className="flex flex-col gap-2">
          <h2 className="text-lg">Main Menu</h2>
          <li
            className={`p-2 rounded transition ${
              isActive("/webapp/dashboard")
                ? "bg-white text-black"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            <Link
              to={"/webapp/dashboard"}
              className="flex flex-row gap-2 items-center cursor-pointer"
            >
              <i>
                <IoHome />
              </i>
              <span className="text-lg font-semibold">Dashboard</span>
            </Link>
          </li>
          <h2 className="text-lg">Learn</h2>
          <li
            className={`p-2 rounded transition ${
              isActive("/webapp/list-materi")
                ? "bg-white text-black"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            <Link
              to={"/webapp/list-materi"}
              className="flex flex-row gap-2 items-center cursor-pointer"
            >
              <i>
                <IoBook />
              </i>
              <span className="text-lg font-semibold">Materi</span>
            </Link>
          </li>
          <li
            className={`p-2 rounded transition ${
              isActive("/webapp/list-quiz")
                ? "bg-white text-black"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            <Link
              to={"/webapp/list-quiz"}
              className="flex flex-row gap-2 items-center cursor-pointer"
            >
              <i>
                <BiQuestionMark />
              </i>
              <span className="text-lg font-semibold">Quiz List</span>
            </Link>
          </li>
          <li
            className={`p-2 rounded transition ${
              isActive("/webapp/notebook")
                ? "bg-white text-black"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            <Link
              to={"/webapp/notebook"}
              className="flex flex-row gap-2 items-center cursor-pointer"
            >
              <i>
                <BiBookAdd />
              </i>
              <span className="text-lg font-semibold">Notebook</span>
            </Link>
          </li>
          <li
            className={`p-2 rounded transition ${
              isActive("/webapp/flashcard")
                ? "bg-white text-black"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            <Link
              to={"/webapp/flashcard"}
              className="flex flex-row gap-2 items-center cursor-pointer"
            >
              <i>
                <BiSolidCard />
              </i>
              <span className="text-lg font-semibold">Flashcard</span>
            </Link>
          </li>
          {user_data.role === "TEACHER" && (
            <>
              <h2 className="text-lg">Teacher Panel</h2>
              <li
                className={`p-2 rounded transition ${
                  isActive("/webapp/create-material")
                    ? "bg-white text-black"
                    : "bg-neutral-800 hover:bg-neutral-700"
                }`}
              >
                <Link
                  to={"/webapp/create-material"}
                  className="flex flex-row gap-2 items-center cursor-pointer"
                >
                  <i>
                    <IoCreate />
                  </i>
                  <span className="text-lg font-semibold">Create Materi</span>
                </Link>
              </li>
              <li
                className={`p-2 rounded transition ${
                  isActive("/webapp/create-quiz")
                    ? "bg-white text-black"
                    : "bg-neutral-800 hover:bg-neutral-700"
                }`}
              >
                <Link
                  to={"/webapp/create-quiz"}
                  className="flex flex-row gap-2 items-center cursor-pointer"
                >
                  <i>
                    <IoMdQuote />
                  </i>
                  <span className="text-lg font-semibold">Create Quiz</span>
                </Link>
              </li>
              <li
                className={`p-2 rounded transition ${
                  isActive("/webapp/list-materi/manage")
                    ? "bg-white text-black"
                    : "bg-neutral-800 hover:bg-neutral-700"
                }`}
              >
                <Link
                  to={"/webapp/list-materi/manage"}
                  className="flex flex-row gap-2 items-center cursor-pointer"
                >
                  <i>
                    <RiSettings6Fill />
                  </i>
                  <span className="text-lg font-semibold">Manage Materi</span>
                </Link>
              </li>
              <li
                className={`p-2 rounded transition ${
                  isActive("/webapp/list-quiz/manage")
                    ? "bg-white text-black"
                    : "bg-neutral-800 hover:bg-neutral-700"
                }`}
              >
                <Link
                  to={"/webapp/list-quiz/manage"}
                  className="flex flex-row gap-2 items-center cursor-pointer"
                >
                  <i>
                    <TbSettingsQuestion />
                  </i>
                  <span className="text-lg font-semibold">Manage Quiz</span>
                </Link>
              </li>
            </>
          )}
        </ol>
      </div>

      <div className="p-4 flex flex-col gap-4 mt-auto">
        <ProfileIcon {...user_data} />
        <button
          onClick={handleLogout}
          className="bg-red-button hover:bg-red-700 transition w-full h-14 rounded-lg text-xl font-semibold flex flex-row gap-2 items-center shadow-red-900 shadow-2xl cursor-pointer"
        >
          <i className="text-3xl mt-1 ml-4">
            <IoLogOut />
          </i>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
