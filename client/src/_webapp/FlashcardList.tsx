import React, { useState } from "react";
import { useAuthContext } from "../context/auth-context";
import {
  usePostDeck,
  useDeleteDeck,
  useEditDeck,
} from "../lib/Tanstack/mutation/mutations";
import { useGetAllDeckByUserId } from "../lib/Tanstack/query/queries";
import { GiCardAceSpades } from "react-icons/gi";
import { RiSettings6Fill } from "react-icons/ri";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router";

const FlashcardList = () => {
  const { id: userId } = useAuthContext();
  const { mutateAsync: createDeck } = usePostDeck();
  const { mutateAsync: deleteDeck } = useDeleteDeck();
  const { mutateAsync: editDeck } = useEditDeck();
  const { data: deckData, isPending } = useGetAllDeckByUserId(userId);
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [selectedDeckId, setSelectedDeckId] = useState("");

  const handleCreate = async () => {
    if (!title.trim()) return;
    await createDeck({ title, userId });
    setTitle("");
    setOpenCreate(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDeck(id);
  };

  const handleOpenEdit = (deck) => {
    setSelectedDeckId(deck.id);
    setEditTitle(deck.title);
    setOpenEdit(true);
  };

  const handleEdit = async () => {
    if (!editTitle.trim()) return;
    await editDeck({ title: editTitle, deckId: selectedDeckId });
    setOpenEdit(false);
  };

  return (
    <section className="space-y-4 w-full">
      <section className="bg-secondary-bg h-fit rounded-2xl p-6 text-white font-primary space-y-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold flex items-center gap-4">
            <i className="bg-primary-button p-3 rounded relative">
              <div className="bg-primary-button w-10 h-10 absolute blur-2xl" />{" "}
              <GiCardAceSpades />
            </i>
            <p className="flex flex-col">
              Buat Deck{" "}
              <span className="text-sm opacity-50 font-normal">
                Buat Deck dengan multiple flashcard
              </span>{" "}
            </p>
          </h1>

          <button
            onClick={() => setOpenCreate(true)}
            className="bg-primary-button px-4 py-2 rounded-lg hover:brightness-75 transition"
          >
            + Create Deck
          </button>
        </div>
        <hr className="opacity-50" />

        {isPending ? (
          <p className="opacity-50">Loading...</p>
        ) : deckData?.data.length ? (
          deckData.data.map((deck) => (
            <div
              key={deck.id}
              onClick={() => navigate(`${deck.id}`)}
              className="p-5 bg-input-bg/50 border border-white/20 rounded-xl 
             flex items-center justify-between hover:bg-input-bg/70 transition
             shadow-sm cursor-pointer"
            >
              <div>
                <h3 className="text-lg font-semibold">{deck.title}</h3>
                <p className="opacity-50 text-sm">
                  {deck.cards?.length ?? 0} Cards
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEdit(deck);
                  }}
                  className="p-2 rounded-lg bg-primary-button/70 hover:bg-primary-button transition cursor-pointer"
                >
                  Modify Deck
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(deck.id);
                  }}
                  className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 transition cursor-pointer"
                >
                  Delete Deck
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="opacity-50">Belum ada deck, buat dulu.</p>
        )}
      </section>

      {openCreate && (
        <div className="fixed inset-0 top-0 left-0 bg-black/20 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-secondary-bg w-full max-w-md rounded-2xl p-6 text-white font-primary space-y-4 shadow-xl">
            <h2 className="text-xl font-semibold">Create New Deck</h2>

            <div>
              <label className="block font-semibold text-lg">Deck Title</label>
              <input
                className="bg-input-bg border-input-border border-b-2 p-3 mt-1 w-full outline-none rounded-lg"
                placeholder="Masukkan nama deck…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenCreate(false)}
                className="px-4 py-2 rounded-lg bg-input-bg hover:opacity-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded-lg bg-primary-button hover:brightness-75 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {openEdit && (
        <div className="fixed inset-0 top-0 left-0 bg-black/20 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-secondary-bg w-full max-w-md rounded-2xl p-6 text-white font-primary space-y-4 shadow-xl">
            <h2 className="text-xl font-semibold">Edit Deck</h2>

            <div>
              <label className="block font-semibold text-lg">Deck Title</label>
              <input
                className="bg-input-bg border-input-border border-b-2 p-3 mt-1 w-full outline-none rounded-lg"
                placeholder="Ubah nama deck…"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-4 py-2 rounded-lg bg-input-bg hover:opacity-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleEdit}
                className="px-4 py-2 rounded-lg bg-primary-button hover:brightness-75 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlashcardList;
