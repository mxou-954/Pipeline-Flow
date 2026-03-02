"use client";

import { useState } from "react";
import type { AppMode } from "./types";
import OpportunityView from "./components/opportunity/OpportunityView";
import ProspectView from "../prospects/ProspectView";

export default function HomePage() {
  const [mode, setMode] = useState<AppMode>("opportunity");

  if (mode === "opportunity") {
    return <OpportunityView mode={mode} setMode={setMode} />;
  }

  return <ProspectView mode={mode} setMode={setMode} />;
}