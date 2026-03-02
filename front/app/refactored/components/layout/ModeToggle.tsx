import type { AppMode } from "../../types";

type Props = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
};

export default function ModeToggle({ mode, setMode }: Props) {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-gray-900 border border-gray-800 rounded-xl">
      <button
        onClick={() => setMode("opportunity")}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          mode === "opportunity"
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        Opportunités
      </button>
      <button
        onClick={() => setMode("prospect")}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          mode === "prospect"
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        Prospects
      </button>
    </div>
  );
}