"use client";

import { useMemo } from "react";
import type { ProspectCard, ParsedProspect } from "../types";

export function useProspectParser(card: ProspectCard | null): ParsedProspect | null {
  return useMemo(() => {
    if (!card?.prospect?.data) return null;

    const data = card.prospect.data;
    const infoString = data[2] || "";
    const infoRegex =
      /secteur : (.+?) \| CA : (.+?) \| nb salariés : (.+?) \| CP : (.+?) \| ville : (.+?) \| budget express : (.+?) \|/;
    const match = infoString.match(infoRegex);

    let secteur = "",
      ca = "",
      nbSalaries = "",
      cp = "",
      ville = "",
      budgetExpress = "";

    if (match) {
      [, secteur, ca, nbSalaries, cp, ville, budgetExpress] = match;
    }

    const contacts: Array<{ name: string; email: string; linkedin: string }> = [];
    for (let i = 7; i < data.length; i += 4) {
      const name = data[i];
      const email = data[i + 1];
      const linkedin = data[i + 2];

      if (name && typeof name === "string" && name.trim()) {
        contacts.push({ name, email: email || "", linkedin: linkedin || "" });
      }
    }

    return {
      nom: data[0] || "",
      budget: data[1] || "",
      secteur,
      ca,
      nbSalaries,
      cp,
      ville,
      budgetExpress,
      siteWeb: data[3] || "",
      telephone: data[4] || "",
      linkedinEntreprise: data[5] || "",
      siren: data[23] || "",
      contacts,
    };
  }, [card]);
}