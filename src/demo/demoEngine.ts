/**
 * Client-side parity helpers for workflow logic from:
 * - app/ui/state.py (batch_operational_status, get_workflow_stage, get_next_action)
 * - app/core/batch_questionnaire.py (questionnaire_missing_fields_for_dict)
 * - app/core/engine.py (build_audit_report_dataframe columns)
 */

import type { DemoBatch, DemoMediaFile, PreprocessStats } from "./types";
import type { DemoTabId } from "./types";

export function fileReviewPending(batch: DemoBatch): boolean {
  return batch.files.some((f) => f.needsReview);
}

/** Mirrors questionnaire_missing_fields_for_dict + file-review event_date rule. */
export function questionnaireMissingLabels(
  q: Record<string, string>,
  fileReviewRequiresEventDate: boolean
): string[] {
  const missing: string[] = [];
  if (!((q.event_name ?? "").trim())) missing.push("Event name");
  if (!((q.event_type ?? "").trim())) missing.push("Event type / category");
  if (!((q.unit_team ?? "").trim())) missing.push("Unit / team");
  if (!((q.intended_usage ?? "").trim())) missing.push("Intended usage");
  if (!((q.sensitivity_level ?? "").trim())) missing.push("Sensitivity level");
  if (fileReviewRequiresEventDate && !((q.event_date ?? "").trim())) {
    missing.push("Event date");
  }
  return missing;
}

export type BatchOperationalStatus = "needs_review" | "incomplete_questionnaire" | "ready";

/** Mirrors app/ui/state.batch_operational_status */
export function batchOperationalStatus(batch: DemoBatch): BatchOperationalStatus {
  if (fileReviewPending(batch)) return "needs_review";
  const miss = questionnaireMissingLabels(batch.questionnaire, fileReviewPending(batch));
  if (miss.length > 0) return "incomplete_questionnaire";
  return "ready";
}

export function batchesNeedingFileReviewCount(batches: DemoBatch[]): number {
  return batches.filter((b) => fileReviewPending(b)).length;
}

export function dashboardMetrics(batches: DemoBatch[], stats: PreprocessStats) {
  return {
    totalScanned: stats.total_scanned,
    usable: stats.usable,
    exifMissing: stats.exif_missing,
    corrupt: stats.corrupt,
    batchCount: batches.length,
    batchesNeedingReview: batchesNeedingFileReviewCount(batches),
  };
}

export type WorkflowStageId =
  | "idle"
  | "scanned"
  | "batched"
  | "ready_for_review"
  | "completed"
  | "processing";

/** Mirrors app/ui/state.get_workflow_stage — adapted for demo session flags */
export function getWorkflowStage(
  batches: DemoBatch[],
  stats: PreprocessStats,
  lastRunIso: string | null,
  status: "idle" | "processing" | "ready" | "reviewed",
  exported: boolean
): { id: WorkflowStageId; label: string } {
  if (status === "processing") return { id: "processing", label: "Processing" };

  const total = stats.total_scanned;
  const nb = batches.length;
  const br = batchesNeedingFileReviewCount(batches);

  if (lastRunIso === null && nb === 0 && total === 0) {
    return { id: "idle", label: "Idle" };
  }

  if (nb > 0 && br > 0) {
    return { id: "ready_for_review", label: "Ready for review" };
  }

  if (nb > 0 && br === 0) {
    if (exported || status === "reviewed") {
      return { id: "completed", label: "Completed" };
    }
    return { id: "batched", label: "Batched" };
  }

  if (lastRunIso !== null || total > 0) {
    return { id: "scanned", label: "Scanned" };
  }

  return { id: "idle", label: "Idle" };
}

/** Mirrors app/ui/state.get_next_action */
export function getNextDemoAction(
  batches: DemoBatch[],
  stats: PreprocessStats,
  lastRunIso: string | null
): { title: string; tab: DemoTabId; description: string } {
  const total = stats.total_scanned;
  const nb = batches.length;
  const br = batchesNeedingFileReviewCount(batches);

  if (lastRunIso === null && nb === 0 && total === 0) {
    return {
      title: "Run New Intake",
      tab: "intake",
      description: "Choose a simulated source folder and run the scan pipeline to populate metrics and batches.",
    };
  }

  if (br > 0) {
    return {
      title: "Go to Batch Review",
      tab: "review",
      description: `${br} batch(es) include files that need timestamp or metadata review.`,
    };
  }

  if (nb > 0) {
    return {
      title: "Export Results",
      tab: "export",
      description: "All batches are clear for export. Generate the audit report for downstream handoff.",
    };
  }

  return {
    title: "Run New Intake",
    tab: "intake",
    description: "No batches were produced. Adjust settings and scan again.",
  };
}

export function filterBatches(
  batches: DemoBatch[],
  view: "all" | "needs_review" | "complete",
  eventFilter: string,
  dateFrom: string,
  dateTo: string
): DemoBatch[] {
  return batches.filter((b) => {
    const st = batchOperationalStatus(b);
    if (view === "needs_review" && st !== "needs_review") return false;
    if (view === "complete" && st !== "ready") return false;

    const start = b.startIso.slice(0, 10);
    if (dateFrom && start < dateFrom) return false;
    if (dateTo && start > dateTo) return false;

    const et = (b.questionnaire.event_type ?? "").trim();
    if (eventFilter && eventFilter !== "(All)") {
      if (eventFilter === "(Not set)") {
        if (et) return false;
      } else if (et !== eventFilter) {
        return false;
      }
    }
    return true;
  });
}

export function eventTypeOptionsFromBatches(batches: DemoBatch[]): string[] {
  const labels = new Set<string>();
  for (const b of batches) {
    const et = (b.questionnaire.event_type ?? "").trim();
    if (et) labels.add(et);
  }
  return [...labels].sort();
}

function auditEventDate(q: Record<string, string>, f: DemoMediaFile): string {
  const manual = (q.event_date ?? "").trim();
  if (manual) return manual;
  if (!f.chosenIso) return "";
  return f.chosenIso.slice(0, 10);
}

function topicTagsCell(q: Record<string, string>): string {
  const raw = q.topic_tags ?? q.tags ?? "";
  if (!raw.trim()) return "";
  return raw;
}

/** Mirrors app/core/engine.build_audit_report_dataframe → CSV row set */
export function buildAuditCsv(batches: DemoBatch[]): string {
  const headers = [
    "batch_id",
    "batch_start",
    "batch_end",
    "file_count",
    "filename",
    "full_path",
    "media_type",
    "timestamp_used",
    "timestamp_source",
    "needs_review",
    "event_name",
    "event_type",
    "unit_team",
    "intended_usage",
    "sensitivity_level",
    "location",
    "topic_tags",
    "notes",
    "needs_review_choice",
    "event_date",
  ];

  const esc = (v: string) => {
    if (v.includes(",") || v.includes('"') || v.includes("\n")) {
      return `"${v.replace(/"/g, '""')}"`;
    }
    return v;
  };

  const lines: string[] = [headers.join(",")];

  for (const b of batches) {
    const q = b.questionnaire;
    for (const f of b.files) {
      const row = [
        b.batchId,
        b.startIso,
        b.endIso,
        String(b.files.length),
        f.filename,
        `[demo]/${b.batchId}/${f.filename}`,
        f.mediaType,
        f.chosenIso,
        f.chosenSource,
        f.needsReview ? "Yes" : "No",
        q.event_name ?? "",
        q.event_type ?? "",
        q.unit_team ?? "",
        q.intended_usage ?? "",
        q.sensitivity_level ?? "",
        q.location ?? "",
        topicTagsCell(q),
        q.notes ?? "",
        q.needs_review_choice ?? "",
        auditEventDate(q, f),
      ];
      lines.push(row.map((c) => esc(String(c))).join(","));
    }
  }

  return "\uFEFF" + lines.join("\n");
}

export function deepCloneBatch(b: DemoBatch): DemoBatch {
  return {
    ...b,
    files: b.files.map((f) => ({ ...f })),
    questionnaire: { ...b.questionnaire },
    aiSuggestions: b.aiSuggestions
      ? {
          ...b.aiSuggestions,
          confidence: b.aiSuggestions.confidence ? { ...b.aiSuggestions.confidence } : undefined,
        }
      : null,
  };
}

export function cloneBatches(list: DemoBatch[]): DemoBatch[] {
  return list.map(deepCloneBatch);
}
