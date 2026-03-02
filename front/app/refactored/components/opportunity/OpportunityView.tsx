"use client";

import {
  useLeadNavigation,
  useComments,
  useDescriptionEditor,
  useSirenDetector,
  useKeyboardNavigation,
} from "../../hooks";
import type { AppMode } from "../../types";
import GlobalStyles from "../../styles/global-styles";
import Header from "../../components/layout/Header";
import ErrorBanner from "../../components/layout/ErrorBanner";
import LeadCard from "./LeadCard";
import LeadCardSkeleton from "./LeadCardSkeleton";
import EmptyPipeline from "./EmptyPipeline";
import CommentsSidebar from "./CommentsSidebar";
import SwipeFooter from "./SwipeFooter";

type Props = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
};

export default function OpportunityView({ mode, setMode }: Props) {
  const nav = useLeadNavigation();
  const { comments, commentsRef } = useComments(nav.lead?.id);
  const siren = useSirenDetector(nav.lead?.description);

  const desc = useDescriptionEditor(
    nav.lead,
    (updated) => nav.setLead(updated),
    nav.setError,
    nav.busy,
  );

  useKeyboardNavigation(nav.swipe, desc.cancelEdit, {
    busy: nav.busy,
    loading: nav.loading,
    isEditingDesc: desc.isEditingDesc,
  });

  // Reset editing state on card change
  // (handled inside useLeadNavigation via fetchNext)

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-black text-white p-4 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <Header
            mode={mode}
            setMode={setMode}
            progressText={nav.progressText}
            progressPercent={nav.progressPercent}
            onRefresh={() => nav.fetchNext(nav.cursor.offset)}
            refreshDisabled={nav.loading || nav.busy}
          />

          {nav.error && <ErrorBanner error={nav.error} />}

          <main className="flex justify-center py-8 sm:py-5">
            <div className="flex w-full max-w-6xl gap-6 px-4">
              <div className="w-full max-w-2xl">
                {nav.loading ? (
                  <LeadCardSkeleton />
                ) : !nav.lead ? (
                  <EmptyPipeline />
                ) : (
                  <LeadCard
                    lead={nav.lead}
                    setLead={nav.setLead}
                    siren={siren}
                    swipeDirection={nav.swipeDirection}
                    busy={nav.busy}
                    loading={nav.loading}
                    setError={nav.setError}
                    isEditingDesc={desc.isEditingDesc}
                    editedDesc={desc.editedDesc}
                    isSavingDesc={desc.isSavingDesc}
                    onStartEdit={desc.startEditing}
                    onSaveDesc={desc.saveDescription}
                    onCancelEdit={desc.cancelEdit}
                    onChangeDesc={desc.setEditedDesc}
                  />
                )}
              </div>

              <CommentsSidebar ref={commentsRef} comments={comments} />
            </div>
          </main>

          <SwipeFooter
            onSwipe={nav.swipe}
            disabled={!nav.lead || nav.loading || nav.busy}
          />
        </div>
      </div>
    </>
  );
}