import React from "react";
import { useGetAllMaterial } from "../../lib/Tanstack/query/queries";
import { ImBooks } from "react-icons/im";
import Card from "../../components/Card";

const MateriList = () => {
  const { data, isPending } = useGetAllMaterial();

  if (isPending)
    return (
      <div>
        <h1 className="text-4xl font-semibold">Loading Page...</h1>
      </div>
    );

  return (
    <section className="w-full bg-secondary-bg p-6 rounded-2xl" >
      <div className="">
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          <i className="bg-primary-button p-3 rounded relative">
            <div className="bg-primary-button w-10 h-10 absolute blur-xl animate-pulse" />{" "}
            <ImBooks />
          </i>
          <p className="flex flex-col">
            Materi
            <span className="text-sm opacity-50 font-normal">
              Mulai perjalanan belajarmu dengan mempelajari semua materi di
              sini!
            </span>{" "}
          </p>
        </h1>
      </div>
      <hr className="opacity-50 my-6" />

      <div className="grid grid-cols-3 gap-10">
        {data.map((item) => (
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
