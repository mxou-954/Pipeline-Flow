type Props = {
  progressText: string;
  progressPercent: number;
  onRefresh: () => void;
  disabled: boolean;
};

export default function ProgressBar({
  progressText,
  progressPercent,
  onRefresh,
  disabled,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-2 min-w-[160px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-gray-400">
            {progressText}
          </span>
          <span className="text-xs font-mono text-gray-400">
            {progressPercent.toFixed(0)}%
          </span>
        </div>
        <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <button
        onClick={onRefresh}
        disabled={disabled}
        className="w-11 h-11 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-gray-400 group-hover:text-white transition-colors"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
  );
}