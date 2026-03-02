"use client";

import { useEffect, useState } from "react";

export function useSirenDetector(description: string | undefined) {
  const [siren, setSiren] = useState<string | null>(null);

  useEffect(() => {
    if (!description) return;

    const cleaned = description.replace(/\D/g, " ");
    const match = cleaned.match(/\b\d{9}\b/);

    if (match) {
      setSiren(match[0]);
    } else {
      setSiren(null);
    }
  }, [description]);

  return siren;
}