import { useState, useRef, useEffect, useMemo } from "react";
import { FaBold, FaImage, FaItalic, FaLink } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { approxReadTime, convertExp } from "../../lib/utils";
import { useEditMaterial } from "../../lib/Tanstack/mutation/mutations";
import { useGetMaterialById } from "../../lib/Tanstack/query/queries";
import type { IMaterial } from "../../types/types";
import { IoBook } from "react-icons/io5";

const EditMateri = () => {
  const { id } = useParams();
  const { data, isPending: loading } = useGetMaterialById(id);
  const { mutateAsync: editMaterial, isPending } = useEditMaterial();
  const navigate = useNavigate();

  const [markdownContent, setMarkdownContent] = useState("");
  const [materialInformation, setMaterialInformation] = useState<IMaterial>({
    id: Number(id),
    title: "",
    image_url: "",
    difficulty: "BEGINNER",
    content: "",
    expectedTime: 0,
    expReward: 0,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (data) {
      setMarkdownContent(data.content);
      setMaterialInformation({
        id: data.id,
        title: data.title,
        image_url: data.image_url,
        difficulty: data.difficulty,
        content: data.content,
        expectedTime: data.expectedTime,
        expReward: data.expReward,
      });
    }
  }, [data]);

  const insertMarkdown = (
    before: string,
    placeholder: string = "",
    after: string = ""
  ) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const beforeText = markdownContent.substring(0, start);
    const afterText = markdownContent.substring(end);

    let newText = "";

    if (before === "link") {
      newText = `${beforeText}[${placeholder}](https://example.com)\n${afterText}`;
    } else if (before === "image") {
      newText = `${beforeText}![${placeholder}](https://example.com/image.jpg)\n${afterText}`;
    } else {
      newText = `${beforeText}${before}${placeholder}${after}\n${afterText}`;
    }

    setMarkdownContent(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + newText.length;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }, 0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!textareaRef.current) return;

      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();

        switch (event.key) {
          case "b":
            insertMarkdown("**", "bold text", "**");
            break;
          case "i":
            insertMarkdown("_", "italic text", "_");
            break;
          case "1":
            insertMarkdown("# ", "Heading 1");
            break;
          case "2":
            insertMarkdown("## ", "Heading 2");
            break;
          case "3":
            insertMarkdown("### ", "Heading 3");
            break;
          case "k":
            insertMarkdown("link", "Pencet aku");
            break;
          case "g":
            insertMarkdown("image", "Image Alt Text");
            break;
          default:
            return;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [markdownContent]);

  const readingTime = useMemo(
    () => approxReadTime(markdownContent),
    [markdownContent]
  );

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMaterialInformation((prev) => {
      const newState = {
        ...prev,
        [name]: value,
      };

      if (name === "difficulty" || name === "content") {
        newState.expReward = convertExp({
          difficulty: newState.difficulty,
          readingTime: newState.expectedTime,
        });
      }

      return newState;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const isEmpty = Object.values(materialInformation).some(
        (value) => value === ""
      );

      if (isEmpty) {
        return toast.error("Ada yang belum diisi");
      }

      await editMaterial(materialInformation);
      toast.success("Berhasil mengedit materi!");
      navigate("/webapp/list-materi");
    } catch (error) {
      throw Error("Error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="space-y-4 w-full">
      <section className="flex flex-col gap-4 bg-secondary-bg rounded-2xl text-white font-primary p-6">
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          <i className="bg-primary-button p-3 rounded relative">
            <div className="bg-primary-button w-10 h-10 absolute blur-2xl" />{" "}
            <IoBook />
          </i>
          <p className="flex flex-col">
            Edit Materi{" "}
            <span className="text-sm opacity-50 font-normal">
              Edit materi dengan markdown
            </span>
          </p>
        </h1>

        <hr className="opacity-50" />

        <form className="w-full" onSubmit={handleSubmit}>
          <fieldset className="space-y-4">
            <div>
              <label className="font-bold text-xl">Title Materi</label>
              <input
                type="text"
                name="title"
                value={materialInformation.title}
                onChange={handleInput}
                className="outline-none bg-input-bg border-input-border border-b-[2px] p-3 my-2 w-full"
                placeholder="Title Materi Disini"
              />
            </div>

            <div>
              <label className="font-bold text-xl">Link Image</label>
              <input
                type="text"
                name="image_url"
                value={materialInformation.image_url}
                onChange={handleInput}
                className="outline-none bg-input-bg border-input-border border-b-[2px] p-3 my-2 w-full"
                placeholder="Image (url) Disini"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-xl">Difficulty</label>
              <select
                className="bg-zinc-800 p-2 w-fit outline-none border-0 font-primary"
                name="difficulty"
                value={materialInformation.difficulty}
                onChange={handleInput}
              >
                <option value="BEGINNER">BEGINNER</option>
                <option value="INTERMEDIATE">INTERMEDIATE</option>
                <option value="ADVANCED">ADVANCED</option>
                <option value="PAKARLELE">PAKARLELE</option>
              </select>
            </div>

            <div>
              <p className="text-sm opacity-50">
                Estimated reading time: {readingTime} min
              </p>
              <p className="text-sm opacity-50">
                Estimated EXP:{" "}
                {convertExp({
                  readingTime,
                  difficulty: materialInformation.difficulty,
                })}
              </p>
            </div>

            <div className="top-20 sticky">
              <label>Content Area</label>
              <div className="flex flex-row gap-2">
                <button
                  type="button"
                  onClick={() => insertMarkdown("# ", "Heading 1")}
                  className="bg-primary-button w-7 h-7 rounded-sm cursor-pointer"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("## ", "Heading 2")}
                  className="bg-primary-button w-7 h-7 rounded-sm cursor-pointer"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("### ", "Heading 3")}
                  className="bg-primary-button w-7 h-7 rounded-sm cursor-pointer"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("**", "bold text", "**")}
                  className="bg-primary-button w-7 h-7 rounded-sm cursor-pointer grid place-items-center"
                >
                  <FaBold />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("_", "italic text", "_")}
                  className="bg-primary-button w-7 h-7 rounded-sm cursor-pointer grid place-items-center"
                >
                  <FaItalic />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("link", "Pencet aku")}
                  className="bg-primary-button w-7 h-7 rounded-sm cursor-pointer grid place-items-center"
                >
                  <FaLink />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("image", "Img Alt Text")}
                  className="bg-primary-button w-7 h-7 rounded-sm cursor-pointer grid place-items-center"
                >
                  <FaImage />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <textarea
                ref={textareaRef}
                className="w-full resize-none min-h-[10rem] rounded-lg bg-input-bg border-input-border border-b-[2px] p-3 my-4 text-lg text-white outline-none mt-2"
                placeholder="Tulis Materi disini..."
                value={markdownContent}
                onChange={(e) => {
                  e.currentTarget.style.height = "auto";
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                  setMarkdownContent(e.target.value);
                  setMaterialInformation((prev) => ({
                    ...prev,
                    content: e.target.value,
                    expectedTime: approxReadTime(e.target.value),
                    expReward: convertExp({
                      difficulty: prev.difficulty,
                      readingTime: approxReadTime(e.target.value),
                    }),
                  }));
                }}
              />
            </div>
          </fieldset>

          <button className="bg-primary-button p-2 rounded hover:brightness-75 cursor-pointer transition">
            {isPending ? "Loading..." : "Edit Material"}
          </button>
        </form>
      </section>

      <section className="flex flex-1 mx-auto flex-col gap-4 bg-secondary-bg rounded-2xl text-white font-primary p-6">
        <h2 className="text-xl font-semibold">Preview Materi</h2>

        <hr className="opacity-20" />

        {markdownContent.length === 0 ? (
          <p className="text-sm opacity-50">Your content is currently empty</p>
        ) : (
          <div className="prose prose-invert max-w-full block text-white break-words overflow-hidden">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        )}
      </section>
    </section>
  );
};

export default EditMateri;
