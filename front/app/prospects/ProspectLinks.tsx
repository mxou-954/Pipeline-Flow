import { Globe, Phone, Linkedin, Building2 } from "lucide-react";

type Props = {
  siteWeb?: string;
  telephone?: string;
  linkedinEntreprise?: string;
  siren?: string;
};

export default function ProspectLinks({
  siteWeb,
  telephone,
  linkedinEntreprise,
  siren,
}: Props) {
  const hasAny = siteWeb || telephone || linkedinEntreprise || siren;
  if (!hasAny) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {siteWeb && (
        <a
          href={siteWeb}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 text-sm transition-all"
        >
          <Globe size={16} />
          Site web
        </a>
      )}
      {telephone && (
        <a
          href={`tel:${telephone}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 text-sm transition-all"
        >
          <Phone size={16} />
          {telephone}
        </a>
      )}
      {linkedinEntreprise && (
        <a
          href={linkedinEntreprise}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-lg text-blue-400 text-sm transition-all"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
      )}
      {siren && (
        <a
          href={`https://www.pappers.fr/entreprise/${siren}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-lg text-blue-400 text-sm transition-all"
        >
          <Building2 size={16} />
          Pappers
        </a>
      )}
    </div>
  );
}