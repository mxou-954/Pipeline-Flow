export type LeadCard = {
  id: number;
  title?: string;
  status?: string;
  step?: string;
  amount?: number | string;
  description?: string;
  updated_at?: string;
};

export type NextResponse = {
  lead: LeadCard | null;
  cursor: Cursor;
};

export type Cursor = {
  offset: number;
  limit: number;
  total: number;
};

export type Comment = {
  id: number;
  content?: string;
  createdAt: string;
  user?: { firstname: string; lastname: string };
};

export type AppMode = "opportunity" | "prospect";

// ── Prospects ──

export type ProspectCard = {
  prospect: {
    rowId: number;
    spreadsheetId?: string;
    data: any[];
  };
  spreadsheet: {
    title: string;
  };
  cursor: {
    offset: number;
    total: number;
  };
};

export type ParsedProspect = {
  nom: string;
  budget: string;
  secteur: string;
  ca: string;
  nbSalaries: string;
  cp: string;
  ville: string;
  budgetExpress: string;
  siteWeb: string;
  telephone: string;
  linkedinEntreprise: string;
  siren: string;
  contacts: ProspectContact[];
};

export type ProspectContact = {
  name: string;
  email: string;
  linkedin: string;
};