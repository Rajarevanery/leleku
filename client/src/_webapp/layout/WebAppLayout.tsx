import { Outlet, useNavigate } from "react-router";
import Sidebar from "../../components/Sidebar";
import { useAuthContext } from "../../context/auth-context";
import LeleChatbot from "../../components/LeleChatbot";

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

  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/auth/login");
  }

  return (
    <div
      className="flex flex-1 min-h-screen relative bg-primary-bg text-primary-text font-primary"
      // style={{
      //   backgroundImage: "url('/topography.svg')",
      //   backgroundRepeat: "repeat",
      //   backgroundSize: "400px",
      //   opacity: 1,
      // }}
    >
      <Sidebar {...user_data} />
      <div className="p-6 flex flex-1">
        <Outlet />
      </div>
      <LeleChatbot />
    </div>
  );
};

export default WebAppLayout;
