"use client";

import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../constants";
import type { ProspectCard } from "../types";

export function useProspectNavigation(listId: string) {
  const [card, setCard] = useState<ProspectCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const fetchNext = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_BASE}/cards/next/prospectList?listId=${listId}`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error(`Erreur API (${res.status})`);
      const data = await res.json();
      setCard(data);
    } catch (e: any) {
      setError(e?.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, [listId]);

  const qualifyProspect = useCallback(async () => {
    if (!card?.prospect || busy) return;

    setBusy(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/cards/qualify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spreadsheetId: card.prospect.spreadsheetId,
          rowId: card.prospect.rowId,
        }),
      });

      if (!res.ok) throw new Error(`Erreur qualify (${res.status})`);
      await fetchNext();
    } catch (e: any) {
      setError(e?.message || "Erreur lors de la qualification");
    } finally {
      setBusy(false);
    }
  }, [card, busy, fetchNext]);

  const swipe = useCallback(
    async (direction: "left" | "right") => {
      if (!card || busy) return;

      setBusy(true);
      setSwipeDirection(direction);

      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        if (direction === "right") {
          await qualifyProspect();
        } else {
          await fetchNext();
        }
      } catch (e: any) {
        setError(e?.message || "Erreur");
      } finally {
        setSwipeDirection(null);
        setBusy(false);
      }
    },
    [card, busy, fetchNext, qualifyProspect],
  );

  // Initial fetch
  useEffect(() => {
    fetchNext();
  }, [fetchNext]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (busy || loading) return;
      if (e.key === "ArrowLeft") swipe("left");
      if (e.key === "ArrowRight") swipe("right");
      if (e.key === " ") {
        e.preventDefault();
        swipe("right");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [busy, loading, swipe]);

  return {
    card,
    loading,
    busy,
    error,
    swipeDirection,
    swipe,
    fetchNext,
  };
}