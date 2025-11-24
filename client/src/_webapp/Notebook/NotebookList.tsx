import { useNavigate } from "react-router";
import { useGetAllNotebooks } from "../../lib/Tanstack/query/queries";
import { MdLibraryBooks } from "react-icons/md";
import { ImBooks } from "react-icons/im";

const NotebookList = () => {
  const navigate = useNavigate();
  const { data, isPending } = useGetAllNotebooks();

  return (
    <section className="w-full mx-auto bg-secondary-bg p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-3xl font-semibold flex items-center gap-4">
            <i className="bg-primary-button p-3 rounded relative">
              <div className="bg-primary-button w-10 h-10 absolute blur-xl animate-pulse" />{" "}
              <ImBooks />
            </i>
            <p className="flex flex-col">
              Notebook
              <span className="text-sm opacity-50 font-normal">
                Mulai perjalanan belajarmu dengan mencatat hal yang penting!
              </span>{" "}
            </p>
          </h1>
        </div>

        <button
          onClick={() => navigate("create")}
          className="px-4 py-2 bg-primary-button rounded-lg text-white hover:opacity-80 transition"
        >
          + Create Notebook
        </button>
      </div>
      <hr className="opacity-50 my-6" />

      {isPending && (
        <p className="text-center text-gray-400">Loading notebooks...</p>
      )}

      {!isPending && data?.data.length === 0 && (
        <div className="text-center mt-20">
          <p>No notebooks yet.</p>
          <button
            onClick={() => navigate("create")}
            className="mt-4 px-4 py-2 bg-primary-button text-white rounded-lg hover:opacity-80 cursor-pointer"
          >
            Create your first notebook
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.data.map((notebook: any) => (
          <div
            key={notebook.id}
            className="p-5 rounded-lg bg-secondary-bg border-[1px] border-white/20 cursor-pointer hover:opacity-50 transition"
            onClick={() => navigate(`${notebook.id}`)}
          >
            <h2 className="text-xl font-semibold mb-2">{notebook.title}</h2>
            <p className="opacity-60 text-sm line-clamp-3">
              {notebook.content || "No content yet"}
            </p>

            <div className="mt-4 text-xs opacity-50">
              {new Date(notebook.updatedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotebookList;
