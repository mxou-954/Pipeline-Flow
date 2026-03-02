"use client";

import { useState } from "react";
import { API_BASE } from "../constants";
import type { LeadCard } from "../types";

export function useDescriptionEditor(
  lead: LeadCard | null,
  setLead: (lead: LeadCard) => void,
  setError: (error: string | null) => void,
  busy: boolean,
) {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [editedDesc, setEditedDesc] = useState("");
  const [isSavingDesc, setIsSavingDesc] = useState(false);

  const startEditing = () => {
    if (!lead || busy) return;
    setEditedDesc(lead.description || "");
    setIsEditingDesc(true);
  };

  const cancelEdit = () => {
    setIsEditingDesc(false);
    setEditedDesc("");
  };

  const saveDescription = async () => {
    if (!lead || isSavingDesc) return;

    setIsSavingDesc(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/cards/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: editedDesc }),
      });

      if (!res.ok) throw new Error(`Erreur sauvegarde (${res.status})`);

      setLead({ ...lead, description: editedDesc });
      setIsEditingDesc(false);
    } catch (e: any) {
      setError(e?.message || "Erreur lors de la sauvegarde");
    } finally {
      setIsSavingDesc(false);
    }
  };

  return {
    isEditingDesc,
    setIsEditingDesc,
    editedDesc,
    setEditedDesc,
    isSavingDesc,
    startEditing,
    cancelEdit,
    saveDescription,
  };
}