import { Outlet } from "react-router";

const WebAppLayout = () => {
  return (
    <div className="flex flex-1 min-h-screen relative">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default WebAppLayout;
