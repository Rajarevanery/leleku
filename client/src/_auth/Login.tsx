import { useNavigate } from "react-router";
import { icon } from "../assets/files";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { BsApple, BsGoogle, BsInstagram } from "react-icons/bs";
import { useLogin } from "../lib/Tanstack/mutation/mutations";
import type { ILogin } from "../types/types";
import { toast } from "react-toastify";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const { mutateAsync: loginUser } = useLogin();

  const [user, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });

  const handleNavigate = (params: string) => {
    navigate(params);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormEmpty = Object.values(user).some(
      (value) => value === "" || value.length <= 0
    );

    if (isFormEmpty) {
      return toast.error("Tolong isi semua input.");
    }

    try {
      await loginUser(user);
      handleNavigate("/webapp/dashboard");
      toast.success("Login berhasil!");
    } catch (error) {
      toast.error("Login gagal.");
      console.error(error);
    }
  };

  return (
    <section className="bg-secondary-bg min-w-[40rem] min-h-[25rem] relative rounded border border-white/10 p-6 flex flex-col items-center text-white font-primary">
      <img src={icon} className="w-20 h-20" alt="" />
      <h1 className="text-2xl font-semibold">Selamat datang kembali!</h1>

      <div className="flex flex-row gap-1">
        <p className="opacity-50">Belum punya akun?</p>{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => navigate("/auth/register")}
        >
          Register disini
        </span>
      </div>

      <form action="submit" className="w-full mt-6" onSubmit={handleSubmit}>
        <fieldset className="space-y-4">
          <div className="bg-input-bg rounded-lg border border-input-border flex flex-row items-center p-4 gap-2">
            <span>
              <i className="text-2xl">
                <AiOutlineMail />
              </i>
            </span>
            <input
              type="text"
              name="email"
              onChange={handleInput}
              className="outline-none w-full"
              placeholder="Email Address"
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
              name="password"
              onChange={handleInput}
              className="outline-none w-full"
              placeholder="Password"
            />
          </div>

          <button className="bg-primary-button w-full h-[3rem] rounded-lg">
            Login
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

export default Login;
