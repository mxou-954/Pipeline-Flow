"use client";

import { useEffect, useState } from "react";
import { stepPipelines, API_BASE } from "../../constants";
import type { LeadCard } from "../../types";

type Props = {
  lead: LeadCard;
  setLead: (lead: LeadCard) => void;
  busy: boolean;
  setError: (error: string | null) => void;
};

export default function StepDropdown({ lead, setLead, busy, setError }: Props) {
  const [open, setOpen] = useState(false);
  const [localBusy, setLocalBusy] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    if (open) window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);

  const handleChange = async (pipelineID: string) => {
    if (!lead || busy || localBusy) return;

    setLocalBusy(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/cards/${lead.id}/step`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: pipelineID }),
      });

      if (!res.ok) throw new Error(`Erreur changement step (${res.status})`);

      const chosen = stepPipelines.find((x) => x.id === pipelineID);
      if (chosen) setLead({ ...lead, step: chosen.name });

      setOpen(false);
    } catch (e: any) {
      setError(e?.message || "Erreur lors du changement d'étape");
    } finally {
      setLocalBusy(false);
    }
  };

  if (!lead.step) return null;

  return (
    <div className="relative inline-block pointer-events-auto">
      <span
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="cursor-pointer px-3 py-1.5 bg-gray-800 text-gray-300 text-xs font-semibold rounded-lg border border-gray-700 uppercase tracking-wider select-text"
      >
        {lead.step}
      </span>

      {open && (
        <div className="absolute mb-7 left-0 z-50 w-56 rounded-xl border border-gray-700 bg-gray-900 shadow-xl pointer-events-auto">
          {stepPipelines.map((x) => (
            <button
              key={x.id}
              onClick={(e) => {
                e.stopPropagation();
                handleChange(x.id);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
            >
              {x.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}