import React, { useState } from "react";
import { useParams } from "react-router";
import { useGetFlashcards } from "../lib/Tanstack/query/queries";
import {
  useDeleteFlashcard,
  useEditFlashcard,
  usePostFlashcard,
} from "../lib/Tanstack/mutation/mutations";
import { GiCardAceSpades } from "react-icons/gi";
import {
  FaArrowLeft,
  FaArrowRight,
  FaLightbulb,
  FaQuestion,
} from "react-icons/fa";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import JSConfetti from "js-confetti";
import { FaRegLightbulb } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

const FlashcardPage = () => {
  const { id } = useParams();
  const { data, isPending } = useGetFlashcards(String(id));
  const { mutateAsync: createFlashcard } = usePostFlashcard();
  const { mutateAsync: editFlashcard } = useEditFlashcard();
  const { mutateAsync: deleteFlashcard } = useDeleteFlashcard();
  const jsConfetti = new JSConfetti();

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const { width, height } = useWindowSize();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [showHint, setShowHint] = useState(false);

  const [shuffledCards, setShuffledCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const cards = data?.data || [];
  console.log(cards);

  const shuffleCards = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const startStudy = () => {
    const shuffled = shuffleCards(cards);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setFinished(false);
    setStudyMode(true);
  };

  const nextCard = () => {
    if (currentIndex + 1 >= shuffledCards.length) {
      setFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const retryStudy = () => {
    const shuffled = shuffleCards(cards);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
    setFinished(false);
  };

  const handleCreate = async () => {
    if (!question.trim() || !answer.trim()) return;
    await createFlashcard({ question, answer, hint, deckId: id });
    setQuestion("");
    setAnswer("");
    setHint("");
    setOpenCreate(false);
  };

  const handleEdit = async () => {
    if (!question.trim() || !answer.trim()) return;
    await editFlashcard({ question, answer, hint, flashcardId: selectedId });
    setSelectedId("");
    setQuestion("");
    setAnswer("");
    setHint("");
    setOpenEdit(false);
  };

  const StudyCard = () => {
    const [flipped, setFlipped] = useState(false);
    const card = shuffledCards[currentIndex];

    if (finished) {
      jsConfetti.addConfetti();
      return (
        <div className="w-full flex flex-col items-center mt-6 text-center space-y-4">
          <Confetti width={width} height={height} />
          <h2 className="text-3xl font-bold">Selesai!</h2>
          <p className="opacity-70">
            Anda telah menyelesaikan {cards.length} flashcard.
          </p>
          <button
            onClick={retryStudy}
            className="px-6 py-3 rounded-lg bg-primary-button hover:brightness-75 transition"
          >
            Retry Flashcard
          </button>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col items-center mt-6">
        <p className="text-sm opacity-70 mb-2">
          {currentIndex + 1} / {shuffledCards.length}
        </p>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: [500, 0], rotate: [30, 0] }}
          exit={{ opacity: 0, x: [0, -500], rotate: [0, 30] }}
          transition={{
            duration: 1,
            type: "tween",
          }}
          onClick={() => setFlipped(!flipped)}
          className="w-full max-w-lg h-72 bg-input-bg border border-white/20 rounded-2xl flex items-center justify-center text-center p-8 text-xl font-semibold cursor-pointer overflow-y-auto scrollbar-thin scrollbar-thumb-white/20"
        >
          {flipped ? (
            <div className="space-y-2 break-words">
              <p className="text-primary-button text-sm mb-1">Answer</p>
              {card.answer}
            </div>
          ) : (
            <div className="break-words">
              <p className="text-primary-button text-sm mb-1">Question</p>
              {card.question}

              {showHint && card.hint && (
                <p className="text-yellow-400 mt-2 text-sm opacity-80">
                  Hint: {card.hint}
                </p>
              )}
            </div>
          )}
        </motion.div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg bg-input-bg hover:opacity-50 transition disabled:opacity-30"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => setFlipped(!flipped)}
            className="px-4 py-2 rounded-lg bg-primary-button hover:brightness-75 transition"
          >
            <FaRegLightbulb />
          </button>
          <button
            onClick={nextCard}
            className="px-4 py-2 rounded-lg bg-input-bg hover:opacity-50 transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="space-y-6 w-full text-white font-primary">
      <div className="bg-secondary-bg rounded-2xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold flex items-center gap-4">
            <i className="bg-primary-button p-3 rounded relative">
              <div className="bg-primary-button w-10 h-10 absolute blur-2xl" />
              <GiCardAceSpades />
            </i>
            <p className="flex flex-col">
              Flashcards
              <span className="text-sm opacity-50 font-normal">
                Manage & study your deck
              </span>
            </p>
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenCreate(true)}
              className="bg-primary-button px-4 py-2 rounded-lg hover:brightness-75 transition"
            >
              + Add Flashcard
            </button>

            {cards.length > 0 && (
              <button
                onClick={studyMode ? () => setStudyMode(false) : startStudy}
                className="bg-primary-button px-4 py-2 rounded-lg hover:brightness-75 transition"
              >
                {studyMode ? "Close Study Mode" : "Start Study"}
              </button>
            )}
          </div>
        </div>

        {studyMode ? (
          <StudyCard />
        ) : isPending ? (
          <p className="opacity-50">Loading...</p>
        ) : cards.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="p-5 bg-input-bg border border-white/20 rounded-xl shadow-lg hover:scale-[1.01] transition-all"
              >
                <div className="space-y-4">
                  <div className="flex flex-row gap-4 items-center">
                    <p className="text-xl font-semibold mb-1 bg-blue-600 rounded-full p-3 grid place-items-center">
                      <FaQuestion size={15} />
                    </p>
                    <h2 className="">{card.question}</h2>
                  </div>
                  <div className="flex flex-row gap-4 items-center">
                    <p className="font-semibold mb-1 bg-green-600 rounded-full p-3 grid place-items-center">
                      <FaLightbulb size={15} />
                    </p>
                    <p className="">{card.answer}</p>
                  </div>
                  <hr className="opacity-20" />
                  {card.hint && (
                    <div className="">
                      <p className="font-semibold mb-1">Hint</p>
                      <p className="text-sm opacity-50">{card.hint}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={() => {
                      setSelectedId(card.id);
                      setQuestion(card.question);
                      setAnswer(card.answer);
                      setHint(card.hint || "");
                      setOpenEdit(true);
                    }}
                    className="p-2 rounded-lg bg-primary-button/70 hover:bg-primary-button transition text-sm"
                  >
                    Modify Flashcard
                  </button>
                  <button
                    onClick={() => deleteFlashcard({ flashcardId: card.id })}
                    className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 transition text-sm"
                  >
                    Delete Flashcard
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="opacity-50">Belum ada flashcard.</p>
        )}
      </div>

      {(openCreate || openEdit) && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-secondary-bg w-full max-w-md rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold">
              {openCreate ? "Create Flashcard" : "Edit Flashcard"}
            </h2>

            <div className="space-y-3">
              <div>
                <p className="text-primary-button text-sm mb-1">Question</p>
                <input
                  className="bg-input-bg border-input-border border-b-2 p-3 w-full outline-none rounded-lg"
                  placeholder="Question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              <div>
                <p className="text-primary-button text-sm mb-1">Answer</p>
                <input
                  className="bg-input-bg border-input-border border-b-2 p-3 w-full outline-none rounded-lg"
                  placeholder="Answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <div>
                <p className="text-primary-button text-sm mb-1">Hint</p>
                <input
                  className="bg-input-bg border-input-border border-b-2 p-3 w-full outline-none rounded-lg"
                  placeholder="Hint (optional)"
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setOpenCreate(false);
                  setOpenEdit(false);
                }}
                className="px-4 py-2 rounded-lg bg-input-bg hover:opacity-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={openCreate ? handleCreate : handleEdit}
                className="px-4 py-2 rounded-lg bg-primary-button hover:brightness-75 transition"
              >
                {openCreate ? "Create" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlashcardPage;
