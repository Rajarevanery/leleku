import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";
import { useAuthContext } from "../../context/auth-context";

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

  return (
    <div className="flex flex-1 min-h-screen relative bg-primary-bg text-primary-text">
      <Sidebar {...user_data} />
      <div className="p-10 ">
        <Outlet />
      </div>
    </div>
  );
};

export default WebAppLayout;
