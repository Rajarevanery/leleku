import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { VscAdd } from "react-icons/vsc";
import {
  useGetAllMaterial,
  useGetQuizById,
} from "../../lib/Tanstack/query/queries";
import { v4 as uuidv4 } from "uuid";
import { useEditQuiz } from "../../lib/Tanstack/mutation/mutations";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const EditQuiz = () => {
  const { id } = useParams();
  const quizId = Number(id);

  const { data: materials } = useGetAllMaterial();
  const { data: quizData } = useGetQuizById(quizId);

  const { mutateAsync: editQuiz } = useEditQuiz();

  const [quizInformation, setQuizInformation] = useState({
    title: "",
    summary: "",
    materialId: 0,
  });

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quizData) {
      setQuizInformation({
        title: quizData.title,
        summary: quizData.summary,
        materialId: quizData.materialId,
      });

      setQuestions(
        quizData.questions.map((q) => ({
          id: q.id,
          question: q.question,
          choices: q.choices,
          correctAnswer: q.correctAnswer,
        }))
      );
    }
  }, [quizData]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: uuidv4(),
        question: "",
        choices: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setQuizInformation((prev) => ({ ...prev, [name]: value }));
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
              choices: q.choices.map((c, idx) => (idx === cIndex ? value : c)),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editQuiz({
        id: quizId,
        data: {
          title: quizInformation.title,
          summary: quizInformation.summary,
          materialId: quizInformation.materialId,
          questions: questions,
        },
      });

      toast.success("Quiz updated");
    } catch (err) {
      toast.error("Error");
    }
  };

  return (
    <section className="space-y-4 w-full">
      <section className="flex flex-col gap-4 bg-secondary-bg rounded-2xl text-white font-primary p-6">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-4">
            <i className="bg-primary-button p-3 rounded relative">
              <div className="bg-primary-button w-10 h-10 absolute blur-2xl" />
              <FaQuestion />
            </i>
            <p className="flex flex-col">
              Edit Quiz
              <span className="text-sm opacity-50 font-normal">
                Edit quiz dengan multiple pertanyaan
              </span>
            </p>
          </h1>
        </div>

        <hr className="opacity-50" />

        <form onSubmit={handleSubmit} className="w-full">
          <fieldset className="flex flex-col">
            <div className="flex flex-col">
              <label className="text-xl font-semibold">Title</label>
              <p className="text-sm opacity-50">Judul quiz ini.</p>
              <input
                type="text"
                name="title"
                value={quizInformation.title}
                onChange={handleInput}
                className="outline-none bg-input-bg border-input-border border-b-[2px] p-3 my-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xl font-semibold">Summary</label>
              <p className="text-sm opacity-50">Summary dari quiz ini.</p>
              <textarea
                name="summary"
                value={quizInformation.summary}
                onChange={handleInput}
                rows={6}
                className="outline-none bg-input-bg border-input-border border-b-[2px] p-3 my-2"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label className="text-xl font-semibold">Materi Asosiasi</label>
              <p className="text-sm opacity-50">
                Quiz ini terkait dengan materi apa?
              </p>

              <select
                name="materialId"
                value={quizInformation.materialId}
                onChange={handleInput}
                className="bg-zinc-800 p-2 w-fit outline-none border-0 font-primary my-2"
              >
                {materials?.map((m, idx) => (
                  <option key={idx} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-primary-button p-2 text-lg rounded-lg font-semibold ml-auto w-40 hover:opacity-75 transition"
            >
              Edit Quiz
            </button>
          </fieldset>
        </form>
      </section>

      <section className="gap-4 rounded-2xl text-white font-primary grid-cols-2 grid">
        {questions.map((item, index) => (
          <div key={item.id} className="p-4 rounded-lg bg-secondary-bg h-96">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  Questions {index + 1}
                </span>

                <button
                  onClick={() => handleRemoveQuestion(index)}
                  className="bg-red-button p-3 text-2xl rounded-lg cursor-pointer"
                >
                  <TbTrash />
                </button>
              </div>

              <input
                type="text"
                value={item.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="outline-none bg-input-bg border-input-border border-b-[2px] p-3 my-2"
              />
            </div>

            <hr className="opacity-50 my-4" />

            <p className="opacity-50 text-sm">
              Choices (checklist untuk menandakan kebenaran pertanyaan)
            </p>

            <div className="grid grid-cols-2 gap-4">
              {item.choices.map((c, idx) => (
                <div
                  key={idx}
                  className="flex flex-row gap-4 items-center p-2 rounded-lg"
                >
                  <input
                    type="radio"
                    name={`isCorrect-${index}`}
                    checked={item.correctAnswer === idx}
                    onChange={() => handleSetCorrectAnswer(index, idx)}
                    className="w-4 h-4 appearance-none border-2 border-neutral-200 checked:bg-blue-600 rounded-full"
                  />

                  <input
                    type="text"
                    value={c}
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

export default EditQuiz;
