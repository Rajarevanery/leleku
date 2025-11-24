import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { VscAdd } from "react-icons/vsc";
import { useGetAllMaterial } from "../../lib/Tanstack/query/queries";
import { v4 as uuidv4 } from "uuid";
import { usePostQuiz } from "../../lib/Tanstack/mutation/mutations";
import { toast } from "react-toastify";

const CreateQuiz = () => {
  const { data } = useGetAllMaterial();
  const { mutateAsync: createQuiz } = usePostQuiz();

  const [quizInformation, setQuizInformation] = useState({
    title: "",
    summary: "",
    materialId: 0,
  });

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      question: "",
      choices: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions((prevState) => [
      ...prevState,
      {
        id: uuidv4(),
        question: "",
        choices: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setQuizInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, question: value } : q))
    );
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              choices: q.choices.map((choice, idx) =>
                idx === cIndex ? value : choice
              ),
            }
          : q
      )
    );
  };

  const handleSetCorrectAnswer = (qIndex, cIndex) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, correctAnswer: cIndex } : q))
    );
  };

  const handleRemoveQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { title, summary, materialId } = quizInformation;

    try {
      await createQuiz({
        title: title,
        summary: summary,
        materialId: materialId,
        questions: questions,
      });
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  useEffect(() => {
    if (data && data.length > 0 && quizInformation.materialId === 0) {
      setQuizInformation((prev) => ({
        ...prev,
        materialId: data[0].id,
      }));
    }
  }, [data]);

  return (
    <section className="space-y-4 w-full">
      <section className="flex flex-col gap-4 bg-secondary-bg rounded-2xl text-white font-primary p-6">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-4">
            <i className="bg-primary-button p-3 rounded relative">
              <div className="bg-primary-button w-10 h-10 absolute blur-2xl" />{" "}
              <FaQuestion />
            </i>
            <p className="flex flex-col">
              Buat Quiz{" "}
              <span className="text-sm opacity-50 font-normal">
                Buat quiz dengan multiple pertanyaan
              </span>{" "}
            </p>
          </h1>
        </div>
        <hr className="opacity-50" />

        <form action="" className="w-full" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="" className="text-xl font-semibold">
                Title
              </label>
              <p className="text-sm opacity-50">
                Ini bisa judul materi yang diasosiasikan atau sebagai quiz
                tersendiri.
              </p>
              <input
                type="text"
                name="title"
                onChange={handleInput}
                placeholder="Tulis judul quiz..."
                className="outline-none bg-input-bg border-input-border border-b-[2px] p-3 my-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-xl font-semibold">
                Summary
              </label>
              <p className="text-sm opacity-50">
                Tulis Summary dari quiz ini, dari materi/referensi mana, ini
                bisa tersendiri untuk quiz ini atau materi yang diasosiasikan
              </p>
              <textarea
                className="outline-none bg-input-bg border-input-border border-b-[2px] p-3 my-2"
                name="summary"
                onChange={handleInput}
                placeholder="Materi..."
                rows={6}
                id=""
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-xl font-semibold">
                Materi Asosiasi
              </label>
              <p className="text-sm opacity-50">
                Input quiz ini terkait dengan materi apa?
              </p>
              <select
                className="bg-zinc-800 p-2 w-fit outline-none border-0 font-primary my-2"
                name="materialId"
                value={quizInformation.materialId}
                onChange={handleInput}
              >
                {data?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="cursor-pointer bg-primary-button p-2 text-lg rounded-lg font-semibold ml-auto w-40 hover:opacity-75 transition"
            >
              Buat Quiz
            </button>
          </fieldset>
        </form>
      </section>
      <section className="gap-4 rounded-2xl text-white font-primary grid-cols-2 grid">
        {questions.map((item, index) => (
          <div className="p-4 rounded-lg bg-secondary-bg h-96" key={item.id}>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  Questions {index + 1}
                </span>

                <button
                  onClick={() => handleRemoveQuestion(index)}
                  className="bg-red-button p-3 text-2xl rounded-lg cursor-pointer"
                >
                  <i className="w-24">
                    <TbTrash />
                  </i>
                </button>
              </div>
              <input
                type="text"
                placeholder="Tulis pertanyaan..."
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="outline-none bg-input-bg border-input-border border-b-[2px] p-3 my-2"
              />
            </div>

            <hr className="opacity-50 my-4" />

            <p className="opacity-50 text-sm">
              Choices (checklist untuk menandakan kebenaran pertanyaan)
            </p>

            <div className="grid grid-cols-2 gap-4">
              {item.choices.map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-row gap-4 items-center p-2 rounded-lg"
                >
                  <input
                    className="w-4 h-4 appearance-none border-2 border-neutral-200 checked:bg-blue-600 rounded-full"
                    type="radio"
                    name={`isCorrect-${index}`}
                    onChange={() => handleSetCorrectAnswer(index, idx)}
                  />
                  <input
                    type="text"
                    onChange={(e) =>
                      handleChoiceChange(index, idx, e.target.value)
                    }
                    className="outline-none border-input-border bg-input-bg border-[2px] p-3 my-2 w-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div
          onClick={handleAddQuestion}
          className="border-neutral-700 h-96 rounded-lg border-[2px] border-dashed flex justify-center items-center cursor-pointer hover:bg-secondary-bg transition"
        >
          <div className="flex justify-center items-center flex-col gap-2">
            <i className="bg-secondary-bg border-input-border border-2 p-3 rounded-full text-xl">
              <VscAdd />
            </i>
            <p className="text-sm opacity-50">
              Klik untuk menambahkan pertanyaan.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CreateQuiz;
