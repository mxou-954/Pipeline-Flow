"use client";

import { useState } from "react";
import { useProspectNavigation, useProspectParser } from "../refactored/hooks";
import type { AppMode } from "../refactored/types";
import GlobalStyles from "../refactored/styles/global-styles";
import Header from "../refactored/components/layout/Header";
import ErrorBanner from "../refactored/components/layout/ErrorBanner";
import ProspectCardDisplay from "./ProspectCardDisplay";
import ProspectCardSkeleton from "./ProspectCardSkeleton";
import EmptyProspectList from "./EmptyProspectList";
import ProspectSwipeFooter from "./ProspectSwipeFooter";

type Props = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
};

const DEFAULT_LIST_ID = "265238";

export default function ProspectView({ mode, setMode }: Props) {
  const [listId] = useState(DEFAULT_LIST_ID);
  const nav = useProspectNavigation(listId);
  const parsed = useProspectParser(nav.card);

  const siren = String(parsed?.siren ?? "")
    .replace(/\D/g, "")
    .slice(0, 9);

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-black text-white p-4 sm:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Header
            mode={mode}
            setMode={setMode}
            progressText={
              nav.card?.cursor
                ? `${nav.card.cursor.offset + 1} / ${nav.card.cursor.total}`
                : "0 / 0"
            }
            progressPercent={
              nav.card?.cursor
                ? ((nav.card.cursor.offset + 1) / nav.card.cursor.total) * 100
                : 0
            }
            onRefresh={() => nav.fetchNext()}
            refreshDisabled={nav.loading || nav.busy}
          />

          {nav.error && <ErrorBanner error={nav.error} />}

          <main className="flex items-center justify-center py-8 sm:py-5">
            <div className="w-full max-w-2xl">
              {nav.loading ? (
                <ProspectCardSkeleton />
              ) : !parsed || !nav.card ? (
                <EmptyProspectList />
              ) : (
                <ProspectCardDisplay
                  card={nav.card}
                  parsed={parsed}
                  siren={siren}
                  listId={listId}
                  swipeDirection={nav.swipeDirection}
                />
              )}
            </div>
          </main>

          <ProspectSwipeFooter
            onSwipe={nav.swipe}
            disabled={!parsed || nav.loading || nav.busy}
          />
        </div>
      </div>
    </>
  );
}