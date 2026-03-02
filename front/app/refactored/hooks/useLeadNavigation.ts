"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { API_BASE } from "../constants";
import type { LeadCard, Cursor, NextResponse } from "../types";

export function useLeadNavigation() {
  const [lead, setLead] = useState<LeadCard | null>(null);
  const [cursor, setCursor] = useState<Cursor>({ offset: 0, limit: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const status = useMemo(() => "todo,standby", []);

  const fetchNext = useCallback(
    async (offset: number) => {
      setLoading(true);
      setError(null);
      try {
        const url = new URL(`${API_BASE}/cards/next`);
        url.searchParams.set("status", status);
        url.searchParams.set("limit", "1");
        url.searchParams.set("offset", String(offset));

        const res = await fetch(url.toString(), { cache: "no-store" });
        if (!res.ok) throw new Error(`Erreur API (${res.status})`);
        const data = (await res.json()) as NextResponse;

        setLead(data.lead);
        setCursor(data.cursor);
      } catch (e: any) {
        setError(e?.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    },
    [status],
  );

  const swipe = useCallback(
    async (dir: "left" | "right") => {
      if (!lead || busy) return;

      if (dir === "left") {
        const ok = window.confirm(
          "Supprimer cette opportunité ? (action irréversible)",
        );
        if (!ok) return;
      }

      setBusy(true);
      setSwipeDirection(dir);
      setError(null);

      try {
        if (dir === "left") {
          const res = await fetch(`${API_BASE}/cards/${lead.id}/lose`, {
            method: "POST",
          });
          if (!res.ok) throw new Error(`Erreur Perdus (${res.status})`);
        }

        await new Promise((resolve) => setTimeout(resolve, 400));
        const nextOffset = cursor.offset + cursor.limit;
        await fetchNext(nextOffset);
      } catch (e: any) {
        setError(e?.message || "Erreur inconnue");
      } finally {
        setSwipeDirection(null);
        setBusy(false);
      }
    },
    [lead, busy, cursor.offset, cursor.limit, fetchNext],
  );

  const progressPercent = useMemo(() => {
    if (!cursor.total) return 0;
    return ((cursor.offset + 1) / cursor.total) * 100;
  }, [cursor]);

  const progressText = useMemo(() => {
    if (!cursor.total) return "0 / 0";
    const current = Math.min(cursor.offset + 1, cursor.total);
    return `${current} / ${cursor.total}`;
  }, [cursor]);

  // Initial fetch
  useEffect(() => {
    fetchNext(0);
  }, [fetchNext]);

  return {
    lead,
    setLead,
    cursor,
    loading,
    busy,
    error,
    setError,
    swipeDirection,
    swipe,
    fetchNext,
    progressPercent,
    progressText,
  };
}