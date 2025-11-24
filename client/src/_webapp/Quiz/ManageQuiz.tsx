import React, { useState } from "react";
import { useGetAllQuiz } from "../../lib/Tanstack/query/queries";
import { useNavigate } from "react-router";
import { RiSettings6Fill } from "react-icons/ri";
import { TbSettingsQuestion } from "react-icons/tb";
import { useDeleteQuiz } from "../../lib/Tanstack/mutation/mutations";
import { toast } from "react-toastify";

const ManageQuiz = () => {
  const { data, isPending } = useGetAllQuiz();
  const { mutateAsync: deleteQuiz } = useDeleteQuiz();
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleDelete = (id) => {
    setSelectedQuizId(id);
    setConfirmDelete(true);
  };

  const confirmDeleteAction = () => {
    console.log("delete quiz", selectedQuizId);
    deleteQuiz(Number(selectedQuizId));
    setConfirmDelete(false);
    setSelectedQuizId(null);
    toast.success("Deleted Quiz")
  };

  const openMaterialModal = (quiz) => {
    setSelectedQuiz(quiz);
    setShowMaterialModal(true);
  };

  if (isPending)
    return (
      <div className="w-full flex items-center justify-center h-[60vh] text-white text-xl">
        Loading...
      </div>
    );

  return (
    <div className="w-full min-h-screen p-6 text-[var(--color-primary-text)] font-[var(--font-primary)] bg-secondary-bg rounded-2xl">
      <div>
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          <i className="bg-primary-button p-3 rounded relative">
            <div className="bg-primary-button w-10 h-10 absolute blur-2xl" />
            <TbSettingsQuestion />
          </i>
          <p className="flex flex-col">
            Manage Quiz
            <span className="text-sm opacity-50 font-normal">
              Edit, Delete, Manage quiz serta cek relasi materi
            </span>
          </p>
        </h1>
      </div>

      <hr className="opacity-50 my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.quiz?.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-[var(--color-secondary-bg)] border border-[var(--color-input-border)] p-4 flex flex-col"
          >
            <img
              src={item.material?.image_url}
              className="w-full h-40 object-cover rounded-md"
            />

            <h2 className="text-xl font-semibold mt-4">{item.title}</h2>

            <p className="text-[var(--color-secondary-text)] text-sm mt-2 line-clamp-3">
              {item.summary?.slice(0, 150) ||
                item.material?.content.replace(/<[^>]*>?/gm, "").slice(0, 150)}
              ...
            </p>

            <div className="mt-4 text-sm text-[var(--color-blue-text)]">
              {item.questions?.length > 0
                ? `${item.questions.length} questions`
                : "No questions"}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => openMaterialModal(item)}
                className="w-full px-4 py-2 bg-[var(--color-input-border)] rounded-md hover:opacity-80 transition cursor-pointer"
              >
                View Material
              </button>

              <div className="flex justify-between gap-3">
                <button
                  onClick={() => navigate(`/webapp/list-quiz/${item.id}/edit`)}
                  className="w-full px-4 py-2 bg-[var(--color-primary-button)] rounded-md hover:opacity-80 transition cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-full px-4 py-2 bg-[var(--color-red-button)] rounded-md hover:opacity-80 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[var(--color-secondary-bg)] border border-[var(--color-input-border)] p-6 rounded-xl w-[90%] max-w-sm text-center">
            <h2 className="text-xl font-semibold">Delete Quiz?</h2>
            <p className="text-[var(--color-secondary-text)] mt-2">
              Are you sure you want to delete this quiz?
            </p>

            <div className="flex gap-4 mt-6 justify-center">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 bg-[var(--color-input-border)] rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteAction}
                className="px-4 py-2 bg-[var(--color-red-button)] rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showMaterialModal && selectedQuiz && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[var(--color-secondary-bg)] border border-[var(--color-input-border)] p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold mb-3">
              {selectedQuiz.material?.title}
            </h2>
            <p className="text-[var(--color-secondary-text)] mb-4">
              Material Information
            </p>

            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
              <div className="p-3 rounded-md bg-[var(--color-input-border)]">
                <p className="text-lg font-medium">
                  {selectedQuiz.material?.title}
                </p>
                <p className="text-sm text-[var(--color-secondary-text-2)] mt-1">
                  {selectedQuiz.material?.content
                    .replace(/<[^>]*>?/gm, "")
                    .slice(0, 150)}
                  ...
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowMaterialModal(false)}
              className="w-full mt-6 px-4 py-2 bg-[var(--color-primary-button)] rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQuiz;
