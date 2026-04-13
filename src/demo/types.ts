/**
 * Browser-demo types aligned with NiceGUI / Python models:
 * - MediaFileRecord, BatchRecord → app/core/engine.py
 * - Questionnaire keys → app/core/batch_questionnaire.py + Batch Review UI
 */

export type DemoMediaFile = {
  id: string;
  filename: string;
  mediaType: "image" | "video";
  /** ISO 8601 — mirrors MediaFileRecord.chosen_datetime */
  chosenIso: string;
  chosenSource: string;
  exifMissing: boolean;
  needsReview: boolean;
  videoDurationSec?: number;
  videoWidth?: number;
  videoHeight?: number;
};

export type AiSuggestions = {
  event_type?: string;
  location_type?: string;
  confidence?: Record<string, number>;
  confidence_label?: string;
  sample_size?: number;
  event_type_source?: string;
  suggested_additional_tags?: string[];
  suggested_intended_usage?: string;
};

export type DemoBatch = {
  batchId: string;
  startIso: string;
  endIso: string;
  files: DemoMediaFile[];
  /** Mirrors batch.questionnaire — use string values for form binding */
  questionnaire: Record<string, string>;
  aiSuggestions: AiSuggestions | null;
  aiStatus: string;
  aiApplied: boolean;
};

export type PreprocessStats = {
  total_scanned: number;
  usable: number;
  exif_missing: number;
  corrupt: number;
};

export type ExportHistoryEntry = {
  id: string;
  createdIso: string;
  filename: string;
  format: "CSV" | "XLSX";
  /** UTF-8 CSV text (demo); XLSX noted as desktop-app feature */
  csvText: string;
  rowCount: number;
};

export type SharePointMockRow = {
  id: string;
  batchId: string;
  filename: string;
  mediaType: string;
  uploadedIso: string;
  eventType: string;
};

export type DemoTabId = "dashboard" | "intake" | "review" | "export" | "sharepoint";
