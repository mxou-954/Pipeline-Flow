import type { LeadCard as LeadCardType } from "../../types";
import StepDropdown from "./StepDropdown";
import DescriptionBlock from "./DescriptionBlock";

type Props = {
  lead: LeadCardType;
  setLead: (lead: LeadCardType) => void;
  siren: string | null;
  swipeDirection: "left" | "right" | null;
  busy: boolean;
  loading: boolean;
  setError: (error: string | null) => void;
  // Description editing
  isEditingDesc: boolean;
  editedDesc: string;
  isSavingDesc: boolean;
  onStartEdit: () => void;
  onSaveDesc: () => void;
  onCancelEdit: () => void;
  onChangeDesc: (value: string) => void;
};

export default function LeadCard({
  lead,
  setLead,
  siren,
  swipeDirection,
  busy,
  loading,
  setError,
  isEditingDesc,
  editedDesc,
  isSavingDesc,
  onStartEdit,
  onSaveDesc,
  onCancelEdit,
  onChangeDesc,
}: Props) {
  const animation = swipeDirection
    ? swipeDirection === "left"
      ? "swipeLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
      : "swipeRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
    : "slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

  return (
    <div
      className="gradient-border rounded-3xl overflow-hidden"
      style={{ animation }}
    >
      <div className="p-8 sm:p-10 space-y-6">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          {lead.status && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-lg border border-blue-500/20 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {lead.status}
            </span>
          )}

          <StepDropdown
            lead={lead}
            setLead={setLead}
            busy={busy}
            setError={setError}
          />

          <a
            href={`https://www.pappers.fr/entreprise/${siren}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-gray-300 text-xs font-semibold rounded-lg border border-gray-700 uppercase tracking-wider select-text"
            >
              Pappers
            </span>
          </a>
        </div>

        {/* Title */}
        <h1 className="relative text-3xl sm:text-4xl font-bold leading-tight">
          <span className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent select-text">
            {lead.title}
          </span>
          <span className="absolute inset-0 text-white opacity-0 pointer-events-none select-text">
            {lead.title}
          </span>
        </h1>

        {/* Description */}
        <div className="space-y-3">
          <DescriptionBlock
            description={lead.description}
            isEditing={isEditingDesc}
            editedDesc={editedDesc}
            isSaving={isSavingDesc}
            busy={busy}
            loading={loading}
            onEdit={onStartEdit}
            onSave={onSaveDesc}
            onCancel={onCancelEdit}
            onChange={onChangeDesc}
          />
        </div>

        {/* Meta footer */}
        <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" />
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
            </svg>
            <span className="font-mono">{lead.updated_at || "Date inconnue"}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <a
              href={`https://colisconsult.nocrm.io/leads/${lead.id}`}
              target="_blank"
              className="text-blue"
            >
              <span className="font-mono">ID-{lead.id}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}