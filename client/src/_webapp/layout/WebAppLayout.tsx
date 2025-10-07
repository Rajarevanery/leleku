import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "../../components/Sidebar";
import { useAuthContext } from "../../context/auth-context";
import { IoHome } from "react-icons/io5";
import { IoMdQuote } from "react-icons/io";

const WebAppLayout = () => {
  const {
    email,
    id,
    isAuthenticated,
    role,
    full_name,
    exp,
    isPending,
    username,
  } = useAuthContext();

  const user_data = {
    email,
    id,
    isAuthenticated,
    role,
    full_name,
    exp,
    isPending,
    username,
  };

  const location = useLocation();
  const navigate = useNavigate();
  const locationPath = location.pathname;
  const splittedPath = locationPath
    .split("/")
    .filter((segment) => segment !== "" && segment !== "webapp");

  const locationMarks = [
    {
      route: "dashboard",
      icon: <IoHome />,
    },
    {
      route: "create-course",
      icon: <IoMdQuote />,
    },
  ];

  const activeMarks = locationMarks.filter((item) =>
    splittedPath.includes(item.route)
  );

  if (!isAuthenticated) {
    navigate("/auth/login");
  }

  return (
    <div className="flex flex-1 min-h-screen relative bg-primary-bg text-primary-text font-primary">
      <Sidebar {...user_data} />
      <div className="p-10 ">
        {activeMarks?.map((item, index) => (
          <div key={index} className="flex flex-row gap-2 items-center">
            <i>{item.icon}</i>
            <p className="capitalize">{item.route}</p>
          </div>
        ))}
        <Outlet />
      </div>
    </div>
  );
};

export default WebAppLayout;
