import { Users, MapPin } from "lucide-react";
import type { ParsedProspect } from "../refactored/types";

type Props = {
  data: ParsedProspect;
};

export default function ProspectInfoGrid({ data }: Props) {
  const fields = [
    { label: "Secteur", value: data.secteur, icon: null },
    { label: "CA", value: data.ca, mono: true, icon: null },
    {
      label: "Salariés",
      value: data.nbSalaries,
      mono: true,
      icon: <Users size={12} />,
    },
    {
      label: "Localisation",
      value: data.ville ? `${data.ville} (${data.cp})` : null,
      icon: <MapPin size={12} />,
    },
  ].filter((f) => f.value);

  if (fields.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
      {fields.map((f) => (
        <div key={f.label} className="space-y-1">
          <div className="text-xs text-gray-500 uppercase tracking-wide flex items-center gap-1">
            {f.icon}
            {f.label}
          </div>
          <div
            className={`text-sm text-gray-300 ${f.mono ? "font-mono" : ""}`}
          >
            {f.value}
          </div>
        </div>
      ))}
    </div>
  );
}