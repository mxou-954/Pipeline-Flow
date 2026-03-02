import { Euro } from "lucide-react";
import type { ParsedProspect, ProspectCard as ProspectCardType } from "../refactored/types";
import ProspectInfoGrid from "./ProspectInfoGrid";
import ProspectLinks from "./ProspectLinks";
import ContactsList from "./ContactsList";

type Props = {
  card: ProspectCardType;
  parsed: ParsedProspect;
  siren: string;
  listId: string;
  swipeDirection: "left" | "right" | null;
};

export default function ProspectCardDisplay({
  card,
  parsed,
  siren,
  listId,
  swipeDirection,
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
      <div className="p-8 space-y-6">
        {/* Meta */}
        <div className="text-xs text-gray-500 font-mono">
          {card.spreadsheet?.title} •{" "}
          <a
            href={`https://colisconsult.nocrm.io/spreadsheets/${listId}/rows/${card.prospect?.rowId}`}
            target="_blank"
          >
            Row #{card.prospect?.rowId}
          </a>
        </div>

        {/* Nom */}
        <h1 className="text-4xl font-bold leading-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
          {parsed.nom}
        </h1>

        {/* Budget */}
        {parsed.budget && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 text-lg font-bold rounded-xl border border-emerald-500/20">
            <Euro size={20} />
            {parsed.budget} K€
          </div>
        )}

        {/* Info grid */}
        <ProspectInfoGrid data={parsed} />

        {/* External links */}
        <ProspectLinks
          siteWeb={parsed.siteWeb}
          telephone={parsed.telephone}
          linkedinEntreprise={parsed.linkedinEntreprise}
          siren={siren}
        />

        {/* Contacts */}
        <ContactsList contacts={parsed.contacts} />
      </div>
    </div>
  );
}