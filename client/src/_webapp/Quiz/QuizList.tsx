import React, { useState, useMemo } from "react";
import { useGetAllQuiz } from "../../lib/Tanstack/query/queries";
import { GiNotebook } from "react-icons/gi";
import { LuListChecks } from "react-icons/lu";
import { BiQuestionMark } from "react-icons/bi";
import { useNavigate } from "react-router";

const QuizList = () => {
  const { data, isPending } = useGetAllQuiz();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [minQuestions, setMinQuestions] = useState("");

  const filteredQuiz = useMemo(() => {
    const list = data?.quiz ?? [];

    return list.filter((quiz) => {
      const matchesSearch = quiz.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const qCount = quiz.questions?.length ?? 0;
      const matchesQuestionCount = minQuestions
        ? qCount >= parseInt(minQuestions)
        : true;
      return matchesSearch && matchesQuestionCount;
    });
  }, [data, search, minQuestions]);

  if (isPending)
    return (
      <div>
        <h1 className="text-4xl font-semibold">Loading...</h1>
      </div>
    );

  return (
    <section className="w-full bg-secondary-bg p-6 rounded-2xl">
      <div>
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          <i className="bg-primary-button p-3 rounded relative">
            <div className="bg-primary-button w-10 h-10 absolute blur-xl animate-pulse" />
            <BiQuestionMark />
          </i>
          <p className="flex flex-col">
            Quiz
            <span className="text-sm opacity-50 font-normal">
              Mulai perjalanan belajarmu dengan menguji kemampuan melalui
              berbagai quiz di sini!
            </span>
          </p>
        </h1>
      </div>

      <hr className="opacity-50 my-6" />

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search quiz title..."
          className="bg-input-bg border border-input-border px-4 py-2 rounded-lg focus:outline-none flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

       
      </div>

      <div className="grid grid-cols-3 gap-10">
        {filteredQuiz.map((quiz) => {
          const material = quiz.material;
          const qCount = quiz.questions?.length ?? 0;

          return (
            <div
              key={quiz.id}
              className="
                bg-secondary-bg p-4 rounded-lg relative overflow-hidden group
                flex flex-col border-white/20 border-[1px]
              "
            >
              <img
                src={material.image_url}
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-xl group-hover:blur-none transition"
                alt=""
              />

              <div className="absolute inset-0 bg-gradient-to-t from-secondary-bg/95 via-secondary-bg/80 to-transparent" />

              <div className="relative z-10">
                <h2 className="font-semibold text-lg line-clamp-1">
                  {quiz.title}
                </h2>

                <p className="text-sm opacity-50 line-clamp-3 text-prettier w-[45ch] my-4">
                  {quiz.summary}
                </p>

                <div className="flex flex-row gap-6 mt-4">
                  <div className="flex flex-row gap-2 items-center">
                    <i className="text-2xl text-yellow-400">
                      <GiNotebook />
                    </i>
                    <span>{material.expReward ?? 10} EXP</span>
                  </div>

                  <div className="flex flex-row gap-2 items-center">
                    <i className="text-2xl text-blue-text">
                      <LuListChecks />
                    </i>
                    <span>
                      {qCount} {qCount === 1 ? "Question" : "Questions"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`${quiz.id}`)}
                  className="mt-14 bg-primary-button rounded-lg text-lg py-2 w-full cursor-pointer"
                >
                  Mulai Quiz
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuizList;
