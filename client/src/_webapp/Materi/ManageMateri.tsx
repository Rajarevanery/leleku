import React, { useState } from "react";
import { useGetAllMaterial } from "../../lib/Tanstack/query/queries";
import { useDeleteMaterial } from "../../lib/Tanstack/mutation/mutations";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaQuestion } from "react-icons/fa";
import { RiSettings6Fill } from "react-icons/ri";

const ManageMateri = () => {
  const { data, isPending } = useGetAllMaterial();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const { mutateAsync: deleteMaterial } = useDeleteMaterial();

  const handleEdit = (id) => {
    console.log("edit", id);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setConfirmDelete(true);
  };

  const confirmDeleteAction = () => {
    console.log("delete", selectedId);
    deleteMaterial(Number(selectedId));
    setConfirmDelete(false);
    setSelectedId(null);
    toast.success("Successfully Deleted");
  };

  const openQuizModal = (material) => {
    setSelectedMaterial(material);
    setShowQuizModal(true);
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
            <div className="bg-primary-button w-10 h-10 absolute blur-2xl" />{" "}
            <RiSettings6Fill />
          </i>
          <p className="flex flex-col">
            Manage Materi
            <span className="text-sm opacity-50 font-normal">
              Edit, Delete, Manage materi anda serta cek relasi quiz
            </span>{" "}
          </p>
        </h1>
      </div>
      <hr className="opacity-50 my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-[var(--color-secondary-bg)] border border-[var(--color-input-border)] p-4 flex flex-col"
          >
            <img
              src={item.image_url}
              className="w-full h-40 object-cover rounded-md"
            />

            <h2 className="text-xl font-semibold mt-4">{item.title}</h2>

            <p className="text-[var(--color-secondary-text)] text-sm mt-2 line-clamp-3">
              {item.content.replace(/<[^>]*>?/gm, "").slice(0, 150)}...
            </p>

            <div className="mt-4 text-sm text-[var(--color-blue-text)]">
              {item.quiz?.length > 0
                ? `${item.quiz.length} quiz related`
                : "No quiz related"}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => openQuizModal(item)}
                className="w-full px-4 py-2 bg-[var(--color-input-border)] rounded-md hover:opacity-80 transition cursor-pointer"
              >
                View Quiz
              </button>

              <div className="flex justify-between gap-3">
                <button
                  onClick={() =>
                    navigate(`/webapp/list-materi/${item.id}/edit`)
                  }
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
            <h2 className="text-xl font-semibold">Delete Material?</h2>
            <p className="text-[var(--color-secondary-text)] mt-2">
              Are you sure you want to delete this material?
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

      {showQuizModal && selectedMaterial && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[var(--color-secondary-bg)] border border-[var(--color-input-border)] p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-2xl font-semibold mb-3">
              {selectedMaterial.title}
            </h2>
            <p className="text-[var(--color-secondary-text)] mb-4">
              Related Quizzes
            </p>

            {selectedMaterial.quiz?.length > 0 ? (
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
                {selectedMaterial.quiz.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 rounded-md bg-[var(--color-input-border)]"
                  >
                    <p className="text-lg font-medium">{q.title}</p>
                    <p className="text-sm text-[var(--color-secondary-text-2)] mt-1">
                      {q.summary.slice(0, 100)}...
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[var(--color-secondary-text)]">
                No quiz available for this material.
              </p>
            )}

            <button
              onClick={() => setShowQuizModal(false)}
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

export default ManageMateri;
