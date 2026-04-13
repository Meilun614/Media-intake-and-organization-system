/**
 * Session state for the embedded demo. Mirrors NiceGUI AppState fields used across
 * dashboard / intake / batch review / export (see app/models/app_state.py).
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { DEMO_SOURCE_LABEL } from "./constants";
import { buildPresentationBatches, DEMO_PREPROCESS_STATS } from "./demoDataset";
import { buildAuditCsv, cloneBatches, deepCloneBatch } from "./demoEngine";
import type { AiSuggestions } from "./types";
import type { DemoBatch, DemoTabId, ExportHistoryEntry, PreprocessStats, SharePointMockRow } from "./types";

type SessionStatus = "idle" | "processing" | "ready" | "reviewed";

type State = {
  tab: DemoTabId;
  batches: DemoBatch[];
  preprocessStats: PreprocessStats;
  lastRunIso: string | null;
  inputDir: string;
  recursive: boolean;
  gapMinutes: number;
  aiEnabled: boolean;
  sessionStatus: SessionStatus;
  lastError: string | null;
  exportHistory: ExportHistoryEntry[];
  sharepointRows: SharePointMockRow[];
  exportedFlag: boolean;
  demoChromeTheme: "site" | "opsLight";
};

const initialStats: PreprocessStats = {
  total_scanned: 0,
  usable: 0,
  exif_missing: 0,
  corrupt: 0,
};

const initialState: State = {
  tab: "dashboard",
  batches: [],
  preprocessStats: { ...initialStats },
  lastRunIso: null,
  inputDir: "",
  recursive: true,
  gapMinutes: 60,
  aiEnabled: true,
  sessionStatus: "idle",
  lastError: null,
  exportHistory: [],
  sharepointRows: [],
  exportedFlag: false,
  demoChromeTheme: "site",
};

export type Action =
  | { type: "SET_TAB"; tab: DemoTabId }
  | { type: "LOAD_DEMO" }
  | { type: "RESET_SESSION" }
  | { type: "SET_PROCESSING"; value: boolean }
  | { type: "INTAKE_SIMULATE_COMPLETE" }
  | { type: "SET_INPUT_DIR"; path: string }
  | { type: "SET_RECURSIVE"; value: boolean }
  | { type: "SET_GAP"; value: number }
  | { type: "SET_AI_ENABLED"; value: boolean }
  | { type: "SET_QUESTIONNAIRE"; batchId: string; key: string; value: string }
  | { type: "MARK_FILE_REVIEWED"; batchId: string; fileId: string }
  | { type: "MARK_BATCH_FILES_REVIEWED"; batchId: string }
  | { type: "APPLY_AI"; batchId: string }
  | { type: "EXPORT_CSV" }
  | { type: "PUSH_SHAREPOINT_MOCK" }
  | { type: "SET_DEMO_THEME"; theme: "site" | "opsLight" }
  | { type: "SET_ERROR"; message: string | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TAB":
      return { ...state, tab: action.tab };
    case "SET_DEMO_THEME":
      return { ...state, demoChromeTheme: action.theme };
    case "SET_ERROR":
      return { ...state, lastError: action.message };
    case "SET_INPUT_DIR":
      return { ...state, inputDir: action.path };
    case "SET_RECURSIVE":
      return { ...state, recursive: action.value };
    case "SET_GAP":
      return { ...state, gapMinutes: action.value };
    case "SET_AI_ENABLED":
      return { ...state, aiEnabled: action.value };
    case "LOAD_DEMO": {
      const batches = cloneBatches(buildPresentationBatches());
      return {
        ...state,
        batches,
        preprocessStats: { ...DEMO_PREPROCESS_STATS },
        lastRunIso: new Date().toISOString(),
        inputDir: DEMO_SOURCE_LABEL,
        sessionStatus: "ready",
        lastError: null,
        exportedFlag: false,
      };
    }
    case "RESET_SESSION":
      return { ...initialState, demoChromeTheme: state.demoChromeTheme };
    case "SET_PROCESSING":
      if (action.value) {
        return { ...state, sessionStatus: "processing" };
      }
      return {
        ...state,
        sessionStatus: state.batches.length > 0 ? "ready" : "idle",
      };
    case "INTAKE_SIMULATE_COMPLETE": {
      const batches = cloneBatches(buildPresentationBatches());
      const dir = state.inputDir.trim() || DEMO_SOURCE_LABEL;
      return {
        ...state,
        batches,
        preprocessStats: { ...DEMO_PREPROCESS_STATS },
        lastRunIso: new Date().toISOString(),
        inputDir: dir,
        sessionStatus: "ready",
        lastError: null,
        exportedFlag: false,
        tab: "dashboard",
      };
    }
    case "SET_QUESTIONNAIRE": {
      const batches = state.batches.map((b) => {
        if (b.batchId !== action.batchId) return b;
        const next = deepCloneBatch(b);
        next.questionnaire = { ...next.questionnaire, [action.key]: action.value };
        return next;
      });
      return { ...state, batches };
    }
    case "MARK_FILE_REVIEWED": {
      const batches = state.batches.map((b) => {
        if (b.batchId !== action.batchId) return b;
        const next = deepCloneBatch(b);
        next.files = next.files.map((f) =>
          f.id === action.fileId ? { ...f, needsReview: false } : f
        );
        return next;
      });
      return { ...state, batches };
    }
    case "MARK_BATCH_FILES_REVIEWED": {
      const batches = state.batches.map((b) => {
        if (b.batchId !== action.batchId) return b;
        const next = deepCloneBatch(b);
        next.files = next.files.map((f) => ({ ...f, needsReview: false }));
        return next;
      });
      return { ...state, batches };
    }
    case "APPLY_AI": {
      const batches = state.batches.map((b) => {
        if (b.batchId !== action.batchId) return b;
        const next = deepCloneBatch(b);
        const ai: AiSuggestions | null = next.aiSuggestions;
        if (!ai) return next;
        if (ai.event_type) next.questionnaire.event_type = ai.event_type;
        if (ai.suggested_intended_usage) {
          next.questionnaire.intended_usage = ai.suggested_intended_usage;
        }
        const extra = ai.suggested_additional_tags ?? [];
        if (extra.length) {
          const cur = (next.questionnaire.tags ?? "").trim();
          const merged = [cur, ...extra].filter(Boolean).join(", ");
          next.questionnaire.tags = merged;
        }
        next.aiApplied = true;
        return next;
      });
      return { ...state, batches };
    }
    case "EXPORT_CSV": {
      if (!state.batches.length) return state;
      const csvText = buildAuditCsv(state.batches);
      const ts = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      const fname = `audit_report_${ts.getFullYear()}${pad(ts.getMonth() + 1)}${pad(ts.getDate())}_${pad(ts.getHours())}${pad(ts.getMinutes())}${pad(ts.getSeconds())}.csv`;
      const rowCount = state.batches.reduce((n, b) => n + b.files.length, 0);
      const entry: ExportHistoryEntry = {
        id: `${fname}-${ts.getTime()}`,
        createdIso: ts.toISOString(),
        filename: fname,
        format: "CSV",
        csvText,
        rowCount,
      };
      return {
        ...state,
        exportHistory: [entry, ...state.exportHistory].slice(0, 25),
        exportedFlag: true,
        sessionStatus: "reviewed",
      };
    }
    case "PUSH_SHAREPOINT_MOCK": {
      if (!state.batches.length) return state;
      const now = new Date().toISOString();
      const added: SharePointMockRow[] = [];
      for (const b of state.batches) {
        for (const f of b.files) {
          added.push({
            id: `${b.batchId}-${f.id}-${now}`,
            batchId: b.batchId,
            filename: f.filename,
            mediaType: f.mediaType,
            uploadedIso: now,
            eventType: b.questionnaire.event_type ?? "—",
          });
        }
      }
      return {
        ...state,
        sharepointRows: [...added, ...state.sharepointRows],
      };
    }
    default:
      return state;
  }
}

type DemoCtx = {
  state: State;
  dispatch: React.Dispatch<Action>;
  loadDemo: () => void;
  resetSession: () => void;
  runIntakeSimulate: () => Promise<void>;
  downloadExport: (entry: ExportHistoryEntry) => void;
};

const Ctx = createContext<DemoCtx | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadDemo = useCallback(() => dispatch({ type: "LOAD_DEMO" }), []);
  const resetSession = useCallback(() => dispatch({ type: "RESET_SESSION" }), []);

  const runIntakeSimulate = useCallback(async () => {
    dispatch({ type: "SET_ERROR", message: null });
    dispatch({ type: "SET_PROCESSING", value: true });
    dispatch({ type: "SET_TAB", tab: "intake" });
    await new Promise((r) => setTimeout(r, 1400));
    dispatch({ type: "INTAKE_SIMULATE_COMPLETE" });
    dispatch({ type: "SET_PROCESSING", value: false });
  }, []);

  const downloadExport = useCallback((entry: ExportHistoryEntry) => {
    const blob = new Blob([entry.csvText], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = entry.filename;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const value = useMemo(
    () => ({ state, dispatch, loadDemo, resetSession, runIntakeSimulate, downloadExport }),
    [state, dispatch, loadDemo, resetSession, runIntakeSimulate, downloadExport]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemo() {
  const x = useContext(Ctx);
  if (!x) throw new Error("useDemo requires DemoProvider");
  return x;
}
