import { useState } from "react";
import { FaFishFins } from "react-icons/fa6";

const LeleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
    fixed bottom-6 right-6 w-32 h-14
    bg-[var(--color-secondary-bg)] border border-white/30 text-white
    rounded-full flex items-center flex-row justify-center gap-2 px-4
    shadow-xl hover:scale-110 active:scale-95 transition-all
    z-[60]
  "
      >
        <i><FaFishFins size={25} /></i>
        <span className="text-sm font-medium">Leleku</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="
              w-full max-w-2xl h-[600px]
              bg-[var(--color-secondary-bg)]
              rounded-2xl overflow-hidden
              shadow-2xl border border-[var(--color-input-border)]
              flex flex-col animate-scaleIn
            "
          >
            <div
              className="
                flex justify-between items-center
                px-4 h-14
                bg-[var(--color-primary-bg)]
                border-b border-[var(--color-input-border)]
                text-[var(--color-primary-text)]
              "
            >
              <h2 className="text-lg font-semibold">Asisten Lele</h2>

              <button
                onClick={() => setIsOpen(false)}
                className="
                  w-8 h-8 rounded-full
                  flex items-center justify-center
                  bg-[var(--color-secondary-bg)]
                  hover:bg-[var(--color-input-bg)]
                  transition
                  text-[var(--color-secondary-text)]
                  text-lg
                "
              >
                ✕
              </button>
            </div>

            <div className="flex-1">
              <iframe
                src="https://www.chatbase.co/chatbot-iframe/pNDCgY3BEjHQlBVW753QB"
                width="100%"
                height="100%"
                frameBorder="0"
                className="rounded-b-2xl"
                title="Asisten Lele Chatbot"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn .2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn .2s ease-out;
        }
      `}</style>
    </>
  );
};

export default LeleChatbot;
