import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Patch,
  Body,
} from '@nestjs/common';
import { NocrmService } from './nocrm.service';

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

@Controller('cards')
export class NocrmController {
  constructor(
    private readonly nocrm: NocrmService,
  ) {}

  @Get('next')
  async next(
    @Query('status') status = 'todo,standby',
    @Query('offset') offset = '0',
    @Query('limit') limit = '1',
  ) {
    const { leads, total } = await this.nocrm.listLeads({
      status,
      limit: Number(limit),
      offset: Number(offset),
    });

    const lead = leads[0] ?? null;

    return {
      lead: lead
        ? {
            id: lead.id,
            title: lead.title,
            status: lead.status,
            step: lead.step,
            amount: lead.amount,
            description: lead.description,
            updated_at: lead.updated_at,
          }
        : null,
      cursor: { offset: Number(offset), limit: Number(limit), total },
    };
  }

  @Post(':id/lose')
  async lose(@Param('id') id: string) {
    const stepId = 460220;
    if (!stepId) throw new Error('NOCRM_STEP_PERDUS_ID manquant');

    const moved = await this.nocrm.moveLeadToStep(Number(id), stepId);
    return { ok: true, moved };
  }

  @Patch(':leadID')
  async saveDescription(
    @Param('leadID') leadID: string,
    @Body() body: { description?: string },
  ) {
    const id = Number(leadID);
    if (!Number.isFinite(id)) {
      return { ok: false, error: 'leadID invalide' };
    }

    const description = (body.description ?? '').toString();
    const updated = await this.nocrm.updateLead(id, { description });

    return { ok: true, updated };
  }

  @Post(':leadID/step')
  async changeStep(
    @Param('leadID') leadID: string,
    @Body() body: { stepId?: string | number },
  ) {
    const id = Number(leadID);
    if (!Number.isFinite(id)) return { ok: false, error: 'leadID invalide' };

    const stepId = Number(body.stepId);
    if (!Number.isFinite(stepId))
      return { ok: false, error: 'stepId invalide' };

    const moved = await this.nocrm.moveLeadToStep(id, stepId);
    return { ok: true, moved };
  }

  @Get(':leadID/comments')
  async comments(@Param('leadID') leadID: string) {
    const id = Number(leadID);
    if (!Number.isFinite(id)) {
      return { ok: false, error: 'leadID invalide' };
    }

    const comments = await this.nocrm.getLeadComments(id);

    return comments.map((c) => ({
      id: c.id,
      content: c.content ?? c.raw_content,
      createdAt: c.created_at,
      isPinned: c.is_pinned,
      attachments: c.attachments ?? [],
      user: c.user
        ? {
            id: c.user.id,
            firstname: c.user.firstname,
            lastname: c.user.lastname,
            email: c.user.email,
          }
        : null,
      activity: c.activity ?? null,
      extendedInfo: c.extended_info ?? null,
    }));
  }

  @Get('next/prospectList')
  async nexte(@Query('listId') listId: string) {
    const spreadsheetId = Number(listId);
    if (!Number.isFinite(spreadsheetId)) {
      return { ok: false, error: 'listId invalide' };
    }

    const sheet = await this.nocrm.getSpreadsheet(spreadsheetId);
    const rows = Array.isArray(sheet?.spreadsheet_rows)
      ? sheet.spreadsheet_rows
      : [];

    const candidates = rows.filter((r: any) => {
      const isActive = r?.is_active !== false;
      const notConverted = r?.lead_id == null;
      return isActive && notConverted;
    });

    shuffleInPlace(candidates);
    const row = candidates[0] ?? null;

    return {
      ok: true,
      spreadsheet: {
        id: sheet?.id,
        title: sheet?.title,
        column_names: sheet?.column_names ?? [],
      },
      prospect: row
        ? {
            spreadsheetId,
            rowId: row.id,
            leadId: row.lead_id ?? null,
            isActive: row.is_active ?? true,
            data: row.content ?? row.values ?? row.cells ?? row,
          }
        : null,
      counts: {
        totalRows: rows.length,
        candidates: candidates.length,
      },
    };
  }

  @Post('qualify')
  async qualify(@Body() body: { spreadsheetId: number; rowId: number }) {
    const spreadsheetId = Number(body.spreadsheetId);
    const rowId = Number(body.rowId);

    const ASSIGNEE_USER_ID = 18533;
    const TARGET_STEP_ID = 545016;

    const lead = await this.nocrm.createLeadFromProspect(spreadsheetId, rowId);
    const leadId = Number(lead?.id);

    await this.nocrm.assignLead(leadId, ASSIGNEE_USER_ID);
    await this.nocrm.moveLeadToStep(leadId, TARGET_STEP_ID);

    return { ok: true, leadId };
  }
}