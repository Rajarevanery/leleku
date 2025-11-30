import React, { useState, useMemo } from "react";
import { useGetAllMaterial } from "../../lib/Tanstack/query/queries";
import { ImBooks } from "react-icons/im";
import Card from "../../components/Card";

const MateriList = () => {
  const { data, isPending } = useGetAllMaterial();

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesDifficulty = difficulty
        ? item.difficulty === difficulty
        : true;
      return matchesSearch && matchesDifficulty;
    });
  }, [data, search, difficulty]);

  if (isPending)
    return (
      <div>
        <h1 className="text-4xl font-semibold">Loading Page...</h1>
      </div>
    );

  return (
    <section className="w-full bg-secondary-bg p-6 rounded-2xl">
      <div>
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          <i className="bg-primary-button p-3 rounded relative">
            <div className="bg-primary-button w-10 h-10 absolute blur-xl animate-pulse" />
            <ImBooks />
          </i>
          <p className="flex flex-col">
            Materi
            <span className="text-sm opacity-50 font-normal">
              Mulai perjalanan belajarmu dengan mempelajari semua materi di
              sini!
            </span>
          </p>
        </h1>
      </div>

      <hr className="opacity-50 my-6" />

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="bg-input-bg border border-input-border px-4 py-2 rounded-lg focus:outline-none flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-input-bg border border-input-border px-4 py-2 rounded-lg focus:outline-none flex-1"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">All Difficulty</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
          <option value="PAKARLELE">Pakarlele</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredData.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
            difficulty={item.difficulty}
            expReward={item.expReward}
            expectedTime={item.expectedTime}
            image_url={item.image_url}
            quiz={item.quiz}
          />
        ))}
      </div>
    </section>
  );
};

export default MateriList;
