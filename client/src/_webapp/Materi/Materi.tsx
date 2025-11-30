import { useNavigate, useParams } from "react-router";
import { useGetMaterialById } from "../../lib/Tanstack/query/queries";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { convertDifficultyToColor } from "../../lib/utils";
import { BiBook, BiTrophy } from "react-icons/bi";
import { BsArrowRight, BsClock } from "react-icons/bs";
import { FaStarOfLife } from "react-icons/fa";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

const Materi = () => {
  const { id } = useParams();
  const [confirm, setConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data, isPending } = useGetMaterialById(Number(id));

  if (isPending) return <p>Loading...</p>;

  if (!confirm)
    return (
      <section className="bg-secondary-bg w-[45vw] min-h-[70vh] m-auto p-6 rounded-lg border-[1px] border-input-border">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl">{data.title}</h1>
          <span
            className={`${convertDifficultyToColor(
              data.difficulty
            )} rounded-full text-sm py-1 px-2`}
          >
            {data.difficulty}
          </span>
        </div>

        <div className="flex flex-row justify-between gap-6 mt-10 text-3xl">
          <div className="bg-zinc-800 border-zinc-700 shadow-zinc-700 border-[1px] p-6 rounded-lg flex-1 flex flex-col items-center justify-center">
            <i className="text-4xl text-blue-text">
              <BiBook />
            </i>

            <p className="font-semibold mt-4">{data.expReward}</p>
            <span className="text-sm opacity-50">XP Reward</span>
          </div>
          <div className="bg-zinc-800 border-zinc-700 border-[1px] p-6 rounded-lg flex-1 flex flex-col items-center justify-center">
            <i className="text-4xl text-blue-text">
              <BsClock />
            </i>

            <p className="font-semibold mt-4">{data.expectedTime} min</p>
            <span className="text-sm opacity-50">Duration</span>
          </div>
          <div className="bg-zinc-800 border-zinc-700 border-[1px] p-6 rounded-lg flex-1 flex flex-col items-center justify-center">
            <i className="text-4xl text-blue-text">
              <BiTrophy />
            </i>

            <p className="font-semibold mt-4 text-center">
              {data.quiz[0]?.questions ? data.quiz[0]?.questions.length : "0"}
            </p>
            <span className="text-sm opacity-50">Quiz Questions</span>
          </div>

          {/* <div>
            <i>
              <BsClock />
            </i>
            <p>{data.expectedTime} min</p>
            <span>Duration</span>
          </div>
          <div>
            <i>
              <BiQuestionMark />
            </i>
            <p>{data.quiz[0].questions.length}</p>
            <span>Quiz Questions</span>
          </div> */}
        </div>

        <div className="relative">
          <div
            className="absolute bg-white/50 w-52 h-52 rounded-full blur-3xl opacity-20 
                  -top-5 -left-5 z-0"
          />

          <div className="p-6 bg-zinc-800 border-zinc-700 border-[1px] rounded-lg mt-10 relative z-10">
            <div className="flex flex-row items-center justify-between">
              <span className="text-lg font-semibold">Quick Summary</span>
              <i className="text-xl">
                <FaStarOfLife />
              </i>
            </div>
            <hr className="opacity-50 my-4" />
            <span className="text-sm">
              {data.quiz[0]?.summary
                ? data.quiz[0].summary
                : "Belum ada summary untuk materi ini..."}
            </span>
          </div>
        </div>

        <button
          onClick={() => setConfirm(true)}
          className="bg-primary-button p-4 w-full rounded-lg mt-20 cursor-pointer hover:opacity-75 transition"
        >
          Continue
        </button>
      </section>
    );

  console.log(data);

  return (
    <article className="mx-auto w-full bg-secondary-bg rounded-lg min-h-screen text-white p-6 font-primary">
      <div className="relative">
        <img
          src={data.image_url}
          alt=""
          className="w-full object-cover aspect-16/9 rounded-lg object-center h-[25rem]"
        />
        <h1 className="bottom-5 z-10 right-5 text-sm text-neutral-500 font-semibold absolute">
          Materi {data.title}
        </h1>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg to-transparent"></div>
      </div>

      <hr className="opacity-20 my-8" />

      <div className="prose prose-invert max-w-full text-white">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
        >
          {data.content}
        </ReactMarkdown>
      </div>

      <hr className="opacity-20 my-6" />

      <p className="opacity-50 w-fit mx-auto ">
        Yuk uji kemampuanmu! Mulai kuis sekarang dan lihat seberapa jauh kamu
        bisa!
      </p>

      {data.quiz ? (
        <button
          onClick={() => navigate(`/webapp/list-quiz/${data.quiz[0]?.id}`)}
          className="mx-auto flex flex-row items-center gap-4 px-4 py-2 bg-primary-button rounded-lg cursor-pointer w-fit mt-6 hover:opacity-75 transition"
        >
          Mulai Quiz{" "}
          <i>
            <BsArrowRight />
          </i>
        </button>
      ) : (
        <p>Tidak ada quiz...</p>
      )}
    </article>
  );
};

export default Materi;
