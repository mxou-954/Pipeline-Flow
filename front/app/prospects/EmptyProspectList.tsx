export default function EmptyProspectList() {
  return (
    <div className="gradient-border rounded-3xl overflow-hidden">
      <div className="p-12 text-center space-y-6">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Liste terminée</h2>
          <p className="text-gray-400">
            Tous les prospects ont été qualifiés.
          </p>
        </div>
      </div>
    </div>
  );
}