import type { AppMode } from "../../types";
import ModeToggle from "./ModeToggle";
import ProgressBar from "./ProgressBar";

type Props = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  progressText: string;
  progressPercent: number;
  onRefresh: () => void;
  refreshDisabled: boolean;
};

export default function Header({
  mode,
  setMode,
  progressText,
  progressPercent,
  onRefresh,
  refreshDisabled,
}: Props) {
  return (
    <header className="flex items-center justify-between gap-6 flex-wrap">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M9 6L15 12L9 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Pipeline Flow
            </h1>
            <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
              Qualification Rapide
            </p>
          </div>
        </div>
      </div>

      <ModeToggle mode={mode} setMode={setMode} />

      <ProgressBar
        progressText={progressText}
        progressPercent={progressPercent}
        onRefresh={onRefresh}
        disabled={refreshDisabled}
      />
    </header>
  );
}