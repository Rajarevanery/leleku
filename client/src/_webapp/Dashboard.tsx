import { useNavigate } from "react-router";
import { useAuthContext } from "../context/auth-context";
import {
  useGetAllNotebooks,
  useGetAllQuiz,
} from "../lib/Tanstack/query/queries";
import { convertDifficultyToColor } from "../lib/utils";

const Dashboard = () => {
  const { email, exp, completedQuizzes, full_name, role } = useAuthContext();
  const { data: quizData, isPending: quizPending } = useGetAllQuiz();
  const { data: notebookData, isPending: notebookPending } =
    useGetAllNotebooks();

  const navigate = useNavigate();

  if (quizPending || notebookPending) return <h1>Loading...</h1>;

  const baseXpPerLevel = 500;
  const level = Math.floor(exp / baseXpPerLevel);
  const currentLevelXp = level * baseXpPerLevel;
  const nextLevelXp = (level + 1) * baseXpPerLevel;
  const xpInCurrentLevel = exp - currentLevelXp;
  const xpNeededForNextLevel = nextLevelXp - currentLevelXp;
  const progressPercent = Math.min(
    (xpInCurrentLevel / xpNeededForNextLevel) * 100,
    100
  );

  const totalCompleted = completedQuizzes?.length || 0;

  let rank = "Newbie";
  if (level >= 1 && level <= 2) rank = "Beginner";
  else if (level >= 3 && level <= 5) rank = "Intermediate";
  else if (level >= 6 && level <= 9) rank = "Advanced";
  else if (level >= 10) rank = "Master";

  const lastTwoNotebooks =
    notebookData?.data?.slice()?.reverse()?.slice(0, 2) || [];

  return (
    <section className="relative w-full p-6 flex flex-col gap-12">
      <div className="pointer-events-none absolute -top-10 -left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-[140px]"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[180px]"></div>

      <div className="relative w-full p-8 rounded-3xl bg-secondary-bg/50 border border-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.2)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-button/10 to-transparent opacity-40"></div>

        <div className="relative flex items-center gap-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary-button/20 text-3xl font-bold shadow-inner shadow-white/10">
            {full_name?.[0] || "U"}
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">{full_name}</h1>
            <p className="opacity-70 text-sm">{email}</p>
            <p className="text-primary-button font-semibold text-sm mt-1">
              {role}
            </p>
          </div>

          <div className="ml-auto relative w-24 h-24">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="url(#xpGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={
                  2 * Math.PI * 40 -
                  (progressPercent / 100) * (2 * Math.PI * 40)
                }
                fill="none"
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient
                  id="xpGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs opacity-70">LVL</p>
              <p className="text-xl font-bold">{level}</p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm opacity-70">
          {xpInCurrentLevel} / {xpNeededForNextLevel} XP to level {level + 1}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-secondary-bg/40 border border-white/10 backdrop-blur-lg hover:border-primary-button/40 transition">
          <p className="text-lg font-semibold">Quizzes Completed</p>
          <p className="text-5xl font-bold mt-2">{totalCompleted}</p>
          <p className="opacity-50 text-sm mt-1">Total done</p>
        </div>

        <div className="relative group p-6 rounded-2xl bg-secondary-bg/40 border border-white/10 backdrop-blur-lg hover:border-primary-button/40 transition">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">Rank</p>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-sm cursor-pointer group-hover:bg-primary-button transition">
              ?
            </div>
          </div>

          <div className="text-5xl font-bold mt-2">{rank}</div>
          <p className="opacity-50 text-sm mt-1">Based on level</p>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex-col p-3 rounded-lg bg-secondary-bg transition backdrop-blur-lg border border-white/10 text-xs w-40 z-20">
            <p className="opacity-90">Newbie: Level 0</p>
            <p className="opacity-90">Beginner: Level 1-2</p>
            <p className="opacity-90">Intermediate: Level 3-5</p>
            <p className="opacity-90">Advanced: Level 6-9</p>
            <p className="opacity-90">Master: Level 10+</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Available Quizzes</h2>
          <button
            onClick={() => navigate("/webapp/list-quiz")}
            className="text-primary-button hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {quizData.quiz.slice(0, 4).map((quiz) => (
            <div
              key={quiz.id}
              onClick={() => navigate(`/webapp/list-quiz/${quiz.id}`)}
              className="relative p-5 rounded-2xl bg-secondary-bg/40 border border-white/10 backdrop-blur-lg cursor-pointer hover:scale-[1.04] hover:border-primary-button/50 transition shadow-[0_0_25px_rgba(0,0,0,0.25)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-button/10 to-transparent opacity-30 rounded-2xl"></div>

              <h3 className="relative text-xl font-semibold">{quiz.title}</h3>

              <p className="relative text-sm opacity-70 mt-1 line-clamp-2">
                {quiz.summary}
              </p>

              <div className="relative flex justify-between items-center mt-4">
                <p className="text-primary-button font-semibold">
                  {quiz.material.expReward} XP
                </p>
                <span
                  className={`px-2 py-1 rounded-md text-sm text-white ${convertDifficultyToColor(
                    quiz.material.difficulty
                  )}`}
                >
                  {quiz.material.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">Your Latest Notebooks</h2>
        <p className="opacity-70 text-sm">
          Recent notebook, cek 2 terakhir catatan kamu.
        </p>

        <div className="grid grid-cols-2 gap-6">
          {lastTwoNotebooks.map((nb) => (
            <div
              key={nb.id}
              onClick={() => navigate(`/webapp/notebook/${nb.id}`)}
              className="p-5 rounded-2xl bg-secondary-bg/40 backdrop-blur-lg border border-white/10 cursor-pointer hover:scale-[1.04] hover:border-primary-button/40 transition shadow-[0_0_25px_rgba(0,0,0,0.25)]"
            >
              <h3 className="text-xl font-semibold">{nb.title}</h3>
              <p className="opacity-70 text-sm line-clamp-3 mt-1">
                {nb.content}
              </p>
              <p className="text-primary-button text-xs mt-3">
                {new Date(nb.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
