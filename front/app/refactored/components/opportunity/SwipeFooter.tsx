type Props = {
  onSwipe: (dir: "left" | "right") => void;
  disabled: boolean;
};

export default function SwipeFooter({ onSwipe, disabled }: Props) {
  return (
    <>
      <footer className="flex gap-4">
        <button
          onClick={() => onSwipe("left")}
          disabled={disabled}
          className="flex-1 group relative overflow-hidden px-6 py-4 bg-gradient-to-br from-red-950/50 to-red-900/30 hover:from-red-900/60 hover:to-red-800/40 border-2 border-red-900/50 hover:border-red-800 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-between relative z-10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div className="flex items-center gap-3">
              <span className="text-red-300 font-semibold">Supprimer</span>
              <kbd className="px-2.5 py-1 bg-black/40 border border-red-900/50 rounded-lg text-xs font-mono text-red-400">
                ←
              </kbd>
            </div>
          </div>
        </button>
        <button
          onClick={() => onSwipe("right")}
          disabled={disabled}
          className="flex-1 group relative overflow-hidden px-6 py-4 bg-gradient-to-br from-emerald-950/50 to-emerald-900/30 hover:from-emerald-900/60 hover:to-emerald-800/40 border-2 border-emerald-900/50 hover:border-emerald-800 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <kbd className="px-2.5 py-1 bg-black/40 border border-emerald-900/50 rounded-lg text-xs font-mono text-emerald-400">
                →
              </kbd>
              <span className="text-emerald-300 font-semibold">Conserver</span>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-emerald-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </button>
      </footer>

      <div className="flex items-center justify-center gap-6 pt-2 pb-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <kbd className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-gray-500 font-mono">
            ←
          </kbd>
          <span>Supprimer</span>
        </div>
        <div className="w-px h-4 bg-gray-800" />
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <kbd className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-gray-500 font-mono">
            →
          </kbd>
          <span>Conserver</span>
        </div>
        <div className="w-px h-4 bg-gray-800" />
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <kbd className="px-2 py-1 bg-gray-900 border border-gray-800 rounded text-gray-500 font-mono">
            Espace
          </kbd>
          <span>Conserver</span>
        </div>
      </div>
    </>
  );
}