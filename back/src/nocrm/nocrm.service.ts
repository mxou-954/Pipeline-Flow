import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

const EXCLUDED_STEP_IDS = new Set<string>([
  // '551267',
  // '460220',
  // '268215',
  // '45997',     Mettre les identfiants des etapes de pipeline
  // '267808',
  // '45996',
  // '545016'
]);

function getStepId(lead: any): string | undefined {
  if (lead?.step_id != null) return String(lead.step_id);
  if (lead?.step?.id != null) return String(lead.step.id);
  return undefined;
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

@Injectable()
export class NocrmService {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: ConfigService) {
    const subdomain = process.env.SUBDOMAIN;
    const apiKey = process.env.NOCRM_API_KEY;
    if (!subdomain) throw new Error('NOCRM_SUBDOMAIN manquant');
    if (!apiKey) throw new Error('NOCRM_API_KEY manquant');
    this.apiKey = apiKey;
    this.baseUrl = `https://${subdomain}.nocrm.io/api/v2`;
  }

  private headers() {
    return { 'X-API-KEY': this.apiKey, Accept: 'application/json' };
  }

  async listLeads(params: Record<string, any>) {
    const requestedLimit = Number(params.limit ?? 1);
    const fetchLimit = Math.max(50, requestedLimit * 10);

    const res = await axios.get<any[]>(`${this.baseUrl}/leads`, {
      headers: this.headers(),
      params: { ...params, limit: fetchLimit },
      timeout: 30000,
    });

    const filtered = (Array.isArray(res.data) ? res.data : []).filter(
      (lead) => {
        const sid = getStepId(lead);
        return !sid || !EXCLUDED_STEP_IDS.has(sid);
      },
    );

    shuffleInPlace(filtered);
    const leads = filtered.slice(0, requestedLimit);

    return {
      leads,
      total: Number(res.headers['x-total-count'] ?? 0),
      filteredCount: filtered.length,
    };
  }

  async moveLeadToStep(leadId: number, stepId: number) {
    const url = `${this.baseUrl.replace('/api/v2', '')}/api/simple/leads/${leadId}/move_to_step`;

    const res = await axios.get(url, {
      headers: this.headers(),
      params: { step_id: stepId },
      timeout: 30_000,
    });

    return res.data;
  }

  async updateLead(leadId: number, payload: Record<string, any>) {
    const res = await axios.put(`${this.baseUrl}/leads/${leadId}`, payload, {
      headers: { ...this.headers(), 'Content-Type': 'application/json' },
      timeout: 30_000,
    });
    return res.data;
  }

  async getLeadComments(leadId: number) {
    const res = await axios.get(`${this.baseUrl}/leads/${leadId}/comments`, {
      headers: this.headers(),
      timeout: 30_000,
    });

    return Array.isArray(res.data) ? res.data : [];
  }

  async getSpreadsheet(spreadsheetId: number) {
    const res = await axios.get(
      `${this.baseUrl}/spreadsheets/${spreadsheetId}`,
      {
        headers: this.headers(),
        timeout: 30_000,
      },
    );
    return res.data;
  }

  async createLeadFromProspect(spreadsheetId: number, rowId: number) {
    const res = await axios.post(
      `${this.baseUrl}/spreadsheets/${spreadsheetId}/rows/${rowId}/create_lead`,
      null,
      { headers: this.headers(), timeout: 30_000 },
    );
    return res.data;
  }

  async assignLead(leadId: number, userId: number) {
    const res = await axios.post(
      `${this.baseUrl}/leads/${leadId}/assign`,
      { user_id: userId },
      {
        headers: { ...this.headers(), 'Content-Type': 'application/json' },
        timeout: 30_000,
      },
    );
    return res.data;
  }
}
