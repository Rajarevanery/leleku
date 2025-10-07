import { Outlet } from "react-router";
import { hero } from "../../assets/files";

const AuthLayout = () => {
  return (
    <div className="flex flex-1 min-h-screen justify-center items-center relative">
      <img
        src={hero}
        className="w-screen min-h-screen fixed object-cover brightness-50 -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/100 via-slate-800/60 to-slate-900/100 -z-10" />

      <Outlet />
    </div>
  );
};

export default AuthLayout;
