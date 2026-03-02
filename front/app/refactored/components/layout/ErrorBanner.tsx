type Props = {
  error: string;
};

export default function ErrorBanner({ error }: Props) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-red-950/50 border border-red-900/50 rounded-xl backdrop-blur-sm">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="text-red-400 flex-shrink-0"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
        <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-sm text-red-200 font-medium">{error}</span>
    </div>
  );
}