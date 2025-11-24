import React from "react";
import { convertDifficultyToColor } from "../lib/utils";
import type { IQuiz } from "../types/types";
import { GiNotebook } from "react-icons/gi";
import { TbClockHour10Filled } from "react-icons/tb";
import { useNavigate } from "react-router";

const stripMarkdown = (text: string) => {
  return text
    .replace(/[#>*_`~-]/g, "")
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
};

const Card = ({
  content,
  difficulty,
  expReward,
  expectedTime,
  id,
  image_url,
  quiz,
  title,
}: {
  title: string;
  content: string;
  expReward: number;
  expectedTime: number;
  id: number;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "PAKARLELE";
  image_url: string;
  quiz: IQuiz;
}) => {
  const navigate = useNavigate();
  const summary = quiz[0]?.summary || stripMarkdown(content);

  return (
    <div className="flex flex-col bg-secondary-bg p-4 rounded-lg relative overflow-hidden group border-white/20 border-[1px]">
      <img
        src={image_url}
        className="absolute inset-0 bg-cover bg-center opacity-40 blur-xl group-hover:blur-none transition"
        alt=""
      />

      <div className="absolute inset-0 bg-gradient-to-t from-secondary-bg/95 via-secondary-bg/80 to-transparent" />

      <div className="relative z-10">
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold capitalize text-lg line-clamp-1">
            {title}
          </h2>
          <div className="flex flex-row">
            <span
              className={`${convertDifficultyToColor(
                difficulty
              )} font-semibold normal-case rounded-full px-2 py-1 text-sm`}
            >
              {difficulty}
            </span>
          </div>
        </div>

        <p className="text-sm opacity-50 line-clamp-3 text-prettier w-[45ch] my-4">
          {summary}
        </p>

        <div className="flex flex-row gap-6">
          <div className="flex flex-row gap-2 items-center">
            <i className="text-2xl text-yellow-400">
              <GiNotebook />
            </i>
            <span>{expReward} EXP</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <i className="text-2xl text-blue-text">
              <TbClockHour10Filled />
            </i>
            <span>{expectedTime} min</span>
          </div>
        </div>

        <button
          onClick={() => navigate(id.toString())}
          className="mt-14 bg-primary-button rounded-lg text-lg py-2 w-full cursor-pointer hover:opacity-75 transition"
        >
          Mulai Pelajari
        </button>
      </div>
    </div>
  );
};

export default Card;
