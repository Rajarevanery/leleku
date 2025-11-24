import { FaStar } from "react-icons/fa";
import { achievement, crystal, exp, exp_mats, hero } from "../assets/files";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <img
        src={hero}
        className="w-screen h-screen fixed object-center object-cover brightness-50 -z-10"
      />
      <section className="w-screen min-h-screen p-20 grid grid-cols-1 2xl:grid-cols-2 text-white place-items-center font-primary overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/80 -z-10" />
        <div className="flex flex-col justify-around h-full">
          <div>
            <span className="text-xl font-semibold">Coba Sekarang!</span>
            <h1 className="text-8xl font-bold">
              Belajar Ternak Lele
              <span className="text-blue-400"> Mudah & Menyenangkan</span>
            </h1>
          </div>
          <p className="text-xl w-[37ch] opacity-50">
            Mulai dari dasar hingga panen, lengkap dengan kuis interaktif dan
            level yang bikin belajar terasa seperti bermain.
          </p>

          <div className="flex flex-row gap-4">
            <button
              onClick={() => navigate("/auth/register")}
              className="bg-primary-button p-3 rounded-lg text-xl cursor-pointer"
            >
              Mulai Sekarang
            </button>

            <div className="flex flex-col ml-10">
              <div className="flex flex-row gap-2 items-center">
                {Array(5)
                  .fill("")
                  .map((_, idx) => (
                    <div key={idx}>
                      <i className="text-yellow-400 text-xl">
                        <FaStar />
                      </i>
                    </div>
                  ))}

                <p className="font-semibold text-lg">5.0</p>
              </div>
              <p>
                Dari 120+{" "}
                <span className="underline font-bold text-gray-200">
                  Reviews
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="bg-gradient-to-t from-sky-500 to-blue-800 h-full w-full rounded-3xl"></div> */}

        <div className="grid grid-cols-2 relative overflow-hidden 2xl:mt-0 mt-10">
          <div className="absolute w-40 h-40 bg-purple-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-sky-600 rounded-full blur-3xl" />

          <div className="bg-black-800/50 border border-white/20 backdrop-blur-2xl h-[18rem] 2xl:w-[18rem] p-6">
            <img
              src={exp_mats}
              className="absolute opacity-50 rotate-12 right-0 bottom-0 w-40 rounded-full"
              alt=""
            />
            <span className="text-4xl font-bold text-amber-400">1</span>
            <p className="text-lg">
              Belajar step-by-step dari persiapan kolam sampai pemasaran
            </p>
          </div>
          <div className="bg-black-800/50 backdrop-blur-2xl border-r border-white/20 border-t h-[18rem] 2xl:w-[18rem]  p-6 flex justify-start items-start text-start flex-col relative">
            <img
              src={exp}
              className="absolute opacity-50 w-40 rotate-12 bottom-0 right-0"
              alt=""
            />

            <span className="text-4xl font-bold text-amber-400">2</span>

            <p className="text-lg">
              Sistem level & XP untuk menjaga semangat belajar
            </p>
          </div>
          <div className="bg-black-800/50 backdrop-blur-2xl border-l border-white/20 border-b h-[18rem] 2xl:w-[18rem] p-6 relative">
            <img
              src={crystal}
              className="absolute opacity-50 w-40 rotate-12 bottom-0 right-0"
              alt=""
            />
            <span className="text-4xl font-bold text-amber-400">3</span>

            <p className="text-lg">
              Kuis di setiap bab untuk menguji pemahaman
            </p>
          </div>
          <div className="bg-black-800/50 border-white/20 border backdrop-blur-2xl h-[18rem] 2xl:w-[18rem] relative p-6">
            <img
              src={achievement}
              className="absolute opacity-50 w-30 rotate-12 bottom-5 right-5"
              alt=""
            />
            <span className="text-4xl font-bold text-amber-400">4</span>
            <p className="text-lg">
              Raih sertifikat & badge sebagai bukti keahlianmu
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
