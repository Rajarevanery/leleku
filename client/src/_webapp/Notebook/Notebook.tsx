import React from "react";
import { useParams, useNavigate } from "react-router";
import { useGetSingleNotebook } from "../../lib/Tanstack/query/queries";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { FiEdit3 } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { useDeleteNotebook } from "../../lib/Tanstack/mutation/mutations";
import { toast } from "react-toastify";

const Notebook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isPending } = useGetSingleNotebook(Number(id));
  const { mutateAsync: deleteNotebook } = useDeleteNotebook();

  const handleDelete = async () => {
    try {
      await deleteNotebook(Number(id));
      navigate("/webapp/notebook");
      toast.success("Deleted Notebook");
    } catch {
      toast.error("Notebook Failed to Delete");
    }
  };

  if (isPending)
    return (
      <div className="w-full text-center mt-20 opacity-50">
        Loading notebook...
      </div>
    );

  if (!data.data)
    return <p className="text-center mt-20 opacity-60">Notebook not found.</p>;

  return (
    <section className="w-full mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-secondary-bg hover:opacity-50 px-4 py-2 rounded-lg hover:bg-secondary-hover transition cursor-pointer"
        >
          <BsArrowLeft />
          <span className="font-medium">Kembali</span>
        </button>

        <div className="flex flex-col text-right">
          <h1 className="text-4xl font-bold">{data.data.title}</h1>
          <p className="text-sm opacity-50">
            Updated at {new Date(data.data.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-button px-4 py-2 rounded-lg hover:opacity-75 transition cursor-pointer"
        >
          <BiTrash />
          Delete
        </button>

        <button
          onClick={() => navigate(`edit`)}
          className="flex items-center gap-2 bg-primary-button px-4 py-2 rounded-lg hover:opacity-75 transition cursor-pointer"
        >
          <FiEdit3 />
          Edit
        </button>
      </div>

      <div className="prose prose-invert max-w-full text-white bg-secondary-bg p-6 rounded-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {data.data.content}
        </ReactMarkdown>
      </div>
    </section>
  );
};

export default Notebook;
