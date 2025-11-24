import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { FaBold, FaItalic, FaLink, FaImage } from "react-icons/fa6";
import { toast } from "react-toastify";
import { usePostNotebook } from "../../lib/Tanstack/mutation/mutations";
import { useAuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router";
import { BsArrowLeft } from "react-icons/bs";

const CreateNotebook = () => {
  const { mutateAsync: createNotebook, isPending } = usePostNotebook();
  const { id: userId } = useAuthContext();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (before: string, placeholder = "", after = "") => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const beforeText = markdownContent.substring(0, start);
    const afterText = markdownContent.substring(end);

    let newText = "";

    if (before === "link") {
      newText = `${beforeText}[${placeholder}](https://example.com)${afterText}`;
    } else if (before === "image") {
      newText = `${beforeText}![${placeholder}](https://example.com/image.jpg)${afterText}`;
    } else {
      newText = `${beforeText}${before}${placeholder}${after}${afterText}`;
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
    const handleKey = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;

      switch (e.key) {
        case "b":
          e.preventDefault();
          insertMarkdown("**", "bold text", "**");
          break;
        case "i":
          e.preventDefault();
          insertMarkdown("_", "italic text", "_");
          break;
        case "1":
          e.preventDefault();
          insertMarkdown("# ", "Heading 1");
          break;
        case "2":
          e.preventDefault();
          insertMarkdown("## ", "Heading 2");
          break;
        case "3":
          e.preventDefault();
          insertMarkdown("### ", "Heading 3");
          break;
        case "k":
          e.preventDefault();
          insertMarkdown("link", "Pencet aku");
          break;
        case "g":
          e.preventDefault();
          insertMarkdown("image", "Alt Text");
          break;
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [markdownContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !markdownContent.trim()) {
      return toast.error("Title dan konten tidak boleh kosong.");
    }

    await createNotebook({
      title,
      content: markdownContent,
      userId,
    });

    toast.success("Notebook berhasil dibuat!");
    setTitle("");
    setMarkdownContent("");
  };

  return (
    <section className="space-y-4 w-full">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-secondary-bg hover:opacity-50 px-4 py-2 rounded-lg hover:bg-secondary-hover transition cursor-pointer"
      >
        <BsArrowLeft />
        <span className="font-medium">Kembali</span>
      </button>
      <section className="flex flex-col gap-4 bg-secondary-bg rounded-2xl text-white p-6 font-primary">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-xl">
              Title Notebook
            </label>
            <input
              className="bg-input-bg border-input-border border-b-2 p-3 mt-1 w-full outline-none"
              placeholder="Tulis judul notebook…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="bg-primary-button p-2 rounded"
              onClick={() => insertMarkdown("**", "bold", "**")}
            >
              <FaBold />
            </button>
            <button
              type="button"
              className="bg-primary-button p-2 rounded"
              onClick={() => insertMarkdown("_", "italic", "_")}
            >
              <FaItalic />
            </button>
            <button
              type="button"
              className="bg-primary-button p-2 rounded"
              onClick={() => insertMarkdown("link", "Click Here")}
            >
              <FaLink />
            </button>
            <button
              type="button"
              className="bg-primary-button p-2 rounded"
              onClick={() => insertMarkdown("image", "Image Alt")}
            >
              <FaImage />
            </button>
          </div>

          <textarea
            ref={textareaRef}
            className="w-full bg-input-bg border-input-border border-b-2 p-3 text-white rounded-lg min-h-[200px] resize-none outline-none"
            placeholder="Tulis isi notebook di sini..."
            value={markdownContent}
            onChange={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
              setMarkdownContent(e.target.value);
            }}
          />

          <button className="bg-primary-button p-2 rounded hover:brightness-75 transition">
            {isPending ? "Loading..." : "Create Notebook"}
          </button>
        </form>
      </section>

      <section className="bg-secondary-bg p-6 rounded-2xl text-white font-primary">
        <h2 className="text-xl font-semibold">Preview Notebook</h2>
        <hr className="opacity-20 my-2" />

        {markdownContent ? (
          <div className="prose prose-invert max-w-full text-white">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="opacity-50 text-sm">Notebook content is empty…</p>
        )}
      </section>
    </section>
  );
};

export default CreateNotebook;
