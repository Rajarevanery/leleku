import { useNavigate } from "react-router";
import { icon } from "../assets/files";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { BsApple, BsGoogle, BsInstagram } from "react-icons/bs";

const Register = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-secondary-bg min-w-[40rem] min-h-[30rem] relative rounded border border-white/10 p-6 flex flex-col items-center text-white font-primary">
      <img src={icon} className="w-20 h-20" alt="" />
      <h1 className="text-2xl font-semibold">Selamat datang!</h1>

      <div className="flex flex-row gap-1">
        <p className="opacity-50">Sudah punya akun?</p>{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => navigate("/auth/login")}
        >
          Login disini
        </span>
      </div>

      <form action="submit" className="w-full mt-6">
        <fieldset className="space-y-4">
          <div className="bg-input-bg rounded-lg border border-input-border flex flex-row items-center p-4 gap-2">
            <span>
              <i className="text-2xl">
                <AiOutlineMail />
              </i>
            </span>
            <input
              type="email"
              className="outline-none w-full"
              placeholder="Email Address"
            />
          </div>

          <div className="flex flex-row flex-1 gap-2">
            <div className="bg-input-bg border border-input-border rounded-lg flex flex-row items-center p-4 gap-2">
              <span>
                <i className="text-2xl">
                  <IoPersonOutline />
                </i>
              </span>
              <input
                type="text"
                className="outline-none w-full"
                placeholder="Full Name"
              />
            </div>

            <div className="bg-input-bg border border-input-border rounded-lg flex flex-row items-center p-4 gap-2">
              <span>
                <i className="text-2xl">
                  <IoPersonOutline />
                </i>
              </span>
              <input
                type="text"
                className="outline-none w-full"
                placeholder="Username"
              />
            </div>
          </div>

          <div className="bg-input-bg border border-input-border rounded-lg flex flex-row items-center p-4 gap-2">
            <span>
              <i className="text-2xl">
                <AiOutlineLock />
              </i>
            </span>
            <input
              type="password"
              className="outline-none w-full"
              placeholder="Password"
            />
          </div>

          <div className="bg-input-bg border border-input-border rounded-lg flex flex-row items-center p-4 gap-2">
            <span>
              <i className="text-2xl">
                <AiOutlineLock />
              </i>
            </span>
            <input
              type="password"
              className="outline-none w-full"
              placeholder="Confirm Password"
            />
          </div>

          <button className="bg-primary-button w-full h-[3rem] rounded-lg">
            Register
          </button>

          <div className="flex flex-row gap-2 justify-center items-center">
            <div className="w-full h-[1px] bg-white/20" />
            <span>OR</span>
            <div className="w-full h-[1px] bg-white/20" />
          </div>

          <div className="flex flex-row justify-between gap-4">
            <div className="bg-zinc-800 w-full rounded-lg p-4 flex justify-center items-center cursor-pointer">
              <button>
                <i className="text-2xl">
                  <BsApple />
                </i>
              </button>
            </div>
            <div className="bg-zinc-800 w-full rounded-lg p-4 flex justify-center items-center cursor-pointer">
              <button>
                <i className="text-2xl">
                  <BsGoogle />
                </i>
              </button>
            </div>
            <div className="bg-zinc-800 w-full rounded-lg p-4 flex justify-center items-center cursor-pointer">
              <button>
                <i className="text-2xl">
                  <BsInstagram />
                </i>
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default Register;
