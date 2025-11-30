import React, { useState } from "react";
import { useGetQuizById } from "../../lib/Tanstack/query/queries";
import { useNavigate, useParams } from "react-router";
import { convertDifficultyToColor } from "../../lib/utils";
import { BiBook, BiTrophy } from "react-icons/bi";
import { useAuthContext } from "../../context/auth-context";
import { useSubmitQuiz } from "../../lib/Tanstack/mutation/mutations";
import { toast } from "react-toastify";
import ReactConfetti from "react-confetti";
import JSConfetti from "js-confetti";
import { useWindowSize } from "react-use";

const Quiz = () => {
  const { id } = useParams();
  const [confirm, setConfirm] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const { width, height } = useWindowSize();
  const [selectedChoice, setSelectedChoice] = useState<number>();
  const [showJawaban, setShowJawaban] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [resultShown, setResultShown] = useState<boolean>(false);
  const navigate = useNavigate();

  const { id: userId } = useAuthContext();
  const { mutateAsync: submitUserQuiz } = useSubmitQuiz();

  const { data, isPending } = useGetQuizById(Number(id));

  const jsConfetti = new JSConfetti();

  if (isPending) return <p>Loading...</p>;

  const handleSubmit = () => {
    if (!showJawaban) {
      setShowJawaban(true);
      setUserAnswers((prev) => {
        const newArr = [...prev];
        newArr[currentQuestion] = selectedChoice!;
        return newArr;
      });
    } else {
      if (currentQuestion === data.questions.length - 1) {
        setResultShown(true);
        jsConfetti.addConfetti();
      } else {
        setCurrentQuestion((p) => p + 1);
        setShowJawaban(false);
        setSelectedChoice(undefined);
      }
    }
  };

  const handleSubmitUserQuiz = async () => {
    try {
      await submitUserQuiz({
        userId,
        quizId: Number(id),
        expReward: data.material.expReward,
      });
      navigate("/webapp/dashboard");
      toast.success("Congratulation!");
    } catch (error) {
      console.log(error);
      toast.error("Kamu sudah menyelesaikan quiz ini!");
    }
  };

  const correctCount = userAnswers.filter(
    (ans, idx) => ans === data.questions[idx].correctAnswer
  ).length;

  if (!confirm)
    return (
      <section className="bg-secondary-bg w-[45vw] min-h-[70vh] m-auto p-6 rounded-lg border-[1px] border-input-border">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl">{data.title}</h1>
          <span
            className={`${convertDifficultyToColor(
              data.material.difficulty
            )} rounded-full text-sm py-1 px-2`}
          >
            {data.material.difficulty}
          </span>
        </div>

        <div className="flex flex-row justify-between gap-6 mt-10 text-3xl">
          <div className="bg-zinc-800 border-zinc-700 shadow-zinc-700 border-[1px] p-6 rounded-lg flex-1 flex flex-col items-center justify-center">
            <i className="text-4xl text-blue-text">
              <BiBook />
            </i>
            <p className="font-semibold mt-4">{data.material.expReward}</p>
            <span className="text-sm opacity-50">XP Reward</span>
          </div>

          <div className="bg-zinc-800 border-zinc-700 border-[1px] p-6 rounded-lg flex-1 flex flex-col items-center justify-center">
            <i className="text-4xl text-blue-text">
              <BiTrophy />
            </i>
            <p className="font-semibold mt-4">{data.questions.length}</p>
            <span className="text-sm opacity-50">Quiz Questions</span>
          </div>
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 mt-10">
          <h3 className="font-semibold text-lg mb-2">Rules</h3>

          <ul className="text-sm opacity-80 space-y-2 list-disc pl-5">
            <li>
              Jika kamu sudah pernah menyelesaikan quiz ini sebelumnya,
              <span className="font-semibold">
                {" "}
                XP tidak akan ditambahkan lagi
              </span>
              .
            </li>
            <li>
              Jangan curang jawab dengan kemampuan sendiri untuk hasil yang
              lebih akurat.
            </li>
            <li>
              Pertanyaan akan terbuka satu per satu setelah kamu memulai quiz.
            </li>
            <li>Pastikan koneksi stabil saat mengerjakan.</li>
            <li>Tidak ada penalti untuk jawaban salah.</li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Question Preview</h2>

          <div className="flex flex-col gap-4">
            {data.questions.map((q: any, index: number) => (
              <div
                key={index}
                className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 relative overflow-hidden"
              >
                <p className="text-sm select-none">
                  {index + 1}. {q.question}
                </p>

                {index !== 0 && (
                  <div className="absolute inset-0 bg-zinc-800/20 backdrop-blur-xs pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          <p className="text-xs opacity-50 mt-4 text-center">
            Start quiz to reveal full questions
          </p>
        </div>

        <button
          onClick={() => setConfirm(true)}
          className="bg-primary-button p-4 w-full rounded-lg mt-10 cursor-pointer hover:opacity-75 transition text-lg font-semibold"
        >
          Start Quiz
        </button>
      </section>
    );

  if (resultShown) {
    const total = data.questions.length;
    const percent = Math.round((correctCount / total) * 100);

    return (
      <section className="w-full flex flex-col justify-center items-center mt-20 gap-6">
        <div className="bg-secondary-bg p-8 rounded-lg border border-input-border w-[30vw] text-center">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Quiz Selesai
          </h1>

          <ReactConfetti width={width} height={height} />

          <hr className="opacity-20 my-4" />

          <h2 className="text-5xl font-bold text-blue-text mb-2">{percent}%</h2>
          <p className="opacity-60 mb-6">Persentase Jawaban Benar</p>

          <div className="w-full h-4 bg-zinc-700 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            <div className="bg-zinc-800 border border-zinc-700 p-5 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2 text-green-400">
                Benar
              </h3>
              <p className="text-4xl font-bold text-green-500">
                {correctCount}
              </p>
            </div>

            <div className="bg-zinc-800 border border-zinc-700 p-5 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2 text-red-400">Salah</h3>
              <p className="text-4xl font-bold text-red-500">
                {total - correctCount}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <button
              onClick={handleSubmitUserQuiz}
              className="mt-6 bg-primary-button p-2 w-full hover:opacity-75 transition rounded-lg cursor-pointer"
            >
              Submit Quiz Anda
            </button>
            <button
              onClick={() => navigate("/webapp/dashboard")}
              className="mt-6 border-[1px] border-primary-button p-2 w-full hover:opacity-75 transition rounded-lg cursor-pointer"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="w-full flex justify-center items-center flex-col">
      <div className="bg-secondary-bg p-4 w-[40vw] border-input-border border-x-[1px] border-t-[1px] flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold rounded-lg">
          Quiz: {data.title}
        </h1>

        <span className="w-10 h-10 flex justify-center items-center text-sm rounded-full border-white/20 border-[1px]">
          <span className="opacity-50">
            {currentQuestion + 1}/{data.questions.length}
          </span>
        </span>
      </div>

      <div className="bg-secondary-bg p-4 w-[40vw] min-h-[50vh] border-input-border border-[1px]">
        {data.questions.map(
          (item, index) =>
            index === currentQuestion && (
              <div key={index}>
                <h2 className="text-xl mb-6 font-semibold">
                  Pertanyaan :{" "}
                  <span className="font-semibold text-blue-text underline">
                    {item.question}
                  </span>
                </h2>
                <div className="flex flex-col gap-4">
                  {item.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedChoice(idx)}
                      disabled={showJawaban}
                      className={`border-[1px] border-white/20 transition rounded-lg p-4 cursor-pointer text-start ${
                        selectedChoice === idx &&
                        "bg-blue-500/20 border-blue-400"
                      } ${
                        showJawaban &&
                        item.correctAnswer === idx &&
                        "bg-green-600"
                      } ${
                        showJawaban &&
                        selectedChoice === idx &&
                        selectedChoice !== item.correctAnswer &&
                        "bg-red-600"
                      }`}
                    >
                      <p>{choice}</p>
                    </button>
                  ))}
                </div>
              </div>
            )
        )}

        <button
          onClick={handleSubmit}
          className="ml-auto block bg-primary-button p-2 rounded-lg mt-10 cursor-pointer hover:opacity-75 transition"
        >
          {showJawaban
            ? currentQuestion === data.questions.length - 1
              ? "Selesai"
              : "Next Question"
            : "Submit Jawaban"}
        </button>
      </div>
    </section>
  );
};

export default Quiz;
