/**
 * Parity: app/ui/pages/batch_review.py — filters, summary strip, review queue table,
 * batch modal (metadata, file list with risk flags, questionnaire, local AI panel, previews).
 */

import { useMemo, useState, type Dispatch } from "react";
import {
  batchOperationalStatus,
  filterBatches,
  eventTypeOptionsFromBatches,
  questionnaireMissingLabels,
} from "../demoEngine";
import { previewImageUrl } from "../demoDataset";
import { useDemo, type Action } from "../DemoContext";
import {
  EVENT_TYPE_OPTIONS,
  INTENDED_USAGE_OPTIONS,
  SENSITIVITY_OPTIONS,
  UNIT_OPTIONS,
} from "../constants";
import type { DemoBatch, DemoMediaFile } from "../types";
import styles from "../InteractiveDemo.module.css";

function fmtTs(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fileFlags(f: DemoMediaFile): string[] {
  const flags: string[] = [];
  if (f.exifMissing) flags.push("EXIF / metadata missing");
  if (f.chosenSource === "fallback") flags.push("Fallback timestamp");
  return flags;
}

function statusPill(st: ReturnType<typeof batchOperationalStatus>) {
  if (st === "needs_review") return <span className={`${styles.pill} ${styles.pillWarn}`}>Needs review</span>;
  if (st === "incomplete_questionnaire")
    return <span className={`${styles.pill} ${styles.pillWarn}`}>Incomplete form</span>;
  return <span className={`${styles.pill} ${styles.pillOk}`}>Ready</span>;
}

export function DemoReviewPanel() {
  const { state, dispatch } = useDemo();
  const [view, setView] = useState<"all" | "needs_review" | "complete">("all");
  const [eventFilter, setEventFilter] = useState("(All)");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<{ batchId: string; file: DemoMediaFile; idx: number; total: number } | null>(null);

  const batches = state.batches;
  const eventOpts = useMemo(() => {
    const dyn = eventTypeOptionsFromBatches(batches);
    const hasBlank = batches.some((b) => !(b.questionnaire.event_type ?? "").trim());
    const base = ["(All)", ...(hasBlank ? ["(Not set)"] : []), ...dyn];
    return base;
  }, [batches]);

  const filtered = useMemo(
    () => filterBatches(batches, view, eventFilter, dateFrom, dateTo),
    [batches, view, eventFilter, dateFrom, dateTo]
  );

  const stats = useMemo(() => {
    let nr = 0,
      inc = 0,
      ok = 0;
    for (const b of filtered) {
      const s = batchOperationalStatus(b);
      if (s === "needs_review") nr++;
      else if (s === "incomplete_questionnaire") inc++;
      else ok++;
    }
    return { n: filtered.length, nr, inc, ok };
  }, [filtered]);

  const selected = batches.find((b) => b.batchId === selectedId) ?? null;

  if (!batches.length) {
    return (
      <div className={styles.panel}>
        <h3>Batch review</h3>
        <p className={styles.muted}>Complete an intake run first — same gate as NiceGUI `/batches`.</p>
        <div className={styles.emptyCard}>
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => dispatch({ type: "SET_TAB", tab: "intake" })}>
            Go to New Intake
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <h3>Batch review</h3>
      <p className={styles.muted}>
        Filterable queue and per-batch drawer — mirrors{" "}
        <code style={{ fontSize: "0.85em" }}>batch_review.py</code> (AG Grid replaced with an accessible HTML table for the web).
      </p>

      <div className={styles.metricCard} style={{ marginBottom: "1rem" }}>
        <div className={styles.metricLabel}>Filters & controls</div>
        <div className={styles.row} style={{ marginTop: "0.75rem" }}>
          <select className={styles.select} value={view} onChange={(e) => setView(e.target.value as typeof view)}>
            <option value="all">All batches</option>
            <option value="needs_review">Needs review only</option>
            <option value="complete">Complete / ready</option>
          </select>
          <select className={styles.select} value={eventFilter} onChange={(e) => setEventFilter(e.target.value)}>
            {eventOpts.map((o) => (
              <option key={o} value={o}>
                {o === "(All)" ? "Event type: (All)" : o}
              </option>
            ))}
          </select>
          <input className={styles.input} type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} aria-label="From date" />
          <input className={styles.input} type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} aria-label="To date" />
          <button type="button" className={styles.btn} onClick={() => { setDateFrom(""); setDateTo(""); }}>
            Clear dates
          </button>
        </div>
        <label className={styles.switchRow} style={{ marginTop: "0.75rem" }}>
          <input
            type="checkbox"
            checked={state.aiEnabled}
            onChange={(e) => dispatch({ type: "SET_AI_ENABLED", value: e.target.checked })}
          />
          Local AI tagging (reflects NiceGUI switch — suggestions shown when AI data exists)
        </label>
      </div>

      <div className={styles.metricLabel}>Summary</div>
      <div className={styles.strip}>
        <div className={styles.statTile}>
          <span>In view</span>
          <strong>{stats.n}</strong>
        </div>
        <div className={styles.statTile}>
          <span>Need review</span>
          <strong>{stats.nr}</strong>
        </div>
        <div className={styles.statTile}>
          <span>Form incomplete</span>
          <strong>{stats.inc}</strong>
        </div>
        <div className={styles.statTile}>
          <span>Ready</span>
          <strong>{stats.ok}</strong>
        </div>
      </div>
      <p className={styles.summaryHint}>
        {batches.length} batch(es) in session
        {stats.n !== batches.length ? " · filters narrow the list below" : ""}.
      </p>

      <div className={styles.metricLabel} style={{ marginTop: "1.25rem" }}>
        Review queue
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Start</th>
              <th>End</th>
              <th>Files</th>
              <th>File review</th>
              <th>Questionnaire</th>
              <th>Event type</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => {
              const qMiss = questionnaireMissingLabels(b.questionnaire, b.files.some((f) => f.needsReview));
              return (
                <tr key={b.batchId} onClick={() => setSelectedId(b.batchId)}>
                  <td>
                    <strong>{b.batchId}</strong>
                  </td>
                  <td>{fmtTs(b.startIso)}</td>
                  <td>{fmtTs(b.endIso)}</td>
                  <td>{b.files.length}</td>
                  <td>{b.files.some((f) => f.needsReview) ? "Needs review" : "OK"}</td>
                  <td>{qMiss.length ? "Incomplete" : "Complete"}</td>
                  <td>{b.questionnaire.event_type?.trim() || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected ? (
        <BatchModal
          batch={selected}
          filtered={filtered}
          onClose={() => setSelectedId(null)}
          onNavigate={(id) => setSelectedId(id)}
          onPreview={(batchId, file, idx, total) => setPreviewFile({ batchId, file, idx, total })}
          dispatch={dispatch}
          aiEnabled={state.aiEnabled}
        />
      ) : null}

      {previewFile && previewFile.file.mediaType === "image" ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal
          aria-label="Photo preview"
          onClick={() => setPreviewFile(null)}
        >
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <div className={styles.row} style={{ justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ wordBreak: "break-all" }}>{previewFile.file.filename}</strong>
              <button type="button" className={styles.btn} onClick={() => setPreviewFile(null)}>
                Close
              </button>
            </div>
            <img src={previewImageUrl(previewFile.batchId, previewFile.file.filename)} alt="" />
            <div className={styles.row} style={{ justifyContent: "center", marginTop: "0.75rem" }}>
              <button
                type="button"
                className={styles.btn}
                disabled={previewFile.idx <= 0}
                onClick={() => {
                  const b = batches.find((x) => x.batchId === previewFile.batchId);
                  if (!b) return;
                  const imgs = b.files.filter((f) => f.mediaType === "image");
                  const j = previewFile.idx - 1;
                  if (j >= 0) setPreviewFile({ batchId: b.batchId, file: imgs[j], idx: j, total: imgs.length });
                }}
              >
                Previous
              </button>
              <span className={styles.muted} style={{ margin: 0 }}>
                {previewFile.idx + 1} / {previewFile.total}
              </span>
              <button
                type="button"
                className={styles.btn}
                disabled={previewFile.idx >= previewFile.total - 1}
                onClick={() => {
                  const b = batches.find((x) => x.batchId === previewFile.batchId);
                  if (!b) return;
                  const imgs = b.files.filter((f) => f.mediaType === "image");
                  const j = previewFile.idx + 1;
                  if (j < imgs.length) setPreviewFile({ batchId: b.batchId, file: imgs[j], idx: j, total: imgs.length });
                }}
              >
                Next
              </button>
            </div>
            <p className={styles.muted} style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Stand-in imagery via picsum.photos (seeded by batch + filename). NiceGUI uses real files from{" "}
              <code style={{ fontSize: "0.85em" }}>preview_src_for_path</code>.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function BatchModal({
  batch,
  filtered,
  onClose,
  onNavigate,
  onPreview,
  dispatch,
  aiEnabled,
}: {
  batch: DemoBatch;
  filtered: DemoBatch[];
  onClose: () => void;
  onNavigate: (id: string) => void;
  onPreview: (batchId: string, file: DemoMediaFile, idx: number, total: number) => void;
  dispatch: Dispatch<Action>;
  aiEnabled: boolean;
}) {
  const idx = filtered.findIndex((b) => b.batchId === batch.batchId);
  const prev = idx > 0 ? filtered[idx - 1] : null;
  const next = idx >= 0 && idx < filtered.length - 1 ? filtered[idx + 1] : null;
  const st = batchOperationalStatus(batch);
  const needEd = batch.files.some((f) => f.needsReview);
  const missing = questionnaireMissingLabels(batch.questionnaire, needEd);
  const imageFiles = batch.files.filter((f) => f.mediaType === "image");

  const setQ = (key: string, value: string) => dispatch({ type: "SET_QUESTIONNAIRE", batchId: batch.batchId, key, value });

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHead}>
          <div>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>{batch.batchId}</h3>
            <div className={styles.row} style={{ marginTop: "0.5rem", gap: "0.5rem" }}>
              {statusPill(st)}
            </div>
          </div>
          <button type="button" className={styles.btn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.strip}>
            <div className={styles.statTile}>
              <span>Start</span>
              <strong style={{ fontSize: "0.85rem" }}>{fmtTs(batch.startIso)}</strong>
            </div>
            <div className={styles.statTile}>
              <span>End</span>
              <strong style={{ fontSize: "0.85rem" }}>{fmtTs(batch.endIso)}</strong>
            </div>
            <div className={styles.statTile}>
              <span>Files</span>
              <strong>{batch.files.length}</strong>
            </div>
          </div>

          <div className={styles.row}>
            <button type="button" className={styles.btn} disabled={!prev} onClick={() => prev && onNavigate(prev.batchId)}>
              ← Previous batch
            </button>
            <button type="button" className={styles.btn} disabled={!next} onClick={() => next && onNavigate(next.batchId)}>
              Next batch →
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => dispatch({ type: "MARK_BATCH_FILES_REVIEWED", batchId: batch.batchId })}>
              Mark all files reviewed
            </button>
          </div>

          {missing.length ? (
            <div style={{ padding: "0.65rem 0.75rem", borderRadius: 8, background: "rgba(251,191,36,0.12)", marginBottom: "1rem" }}>
              <strong style={{ color: "#fbbf24", fontSize: "0.8rem" }}>Missing required fields · </strong>
              <span style={{ color: "#fcd34d", fontSize: "0.85rem" }}>{missing.join(", ")}</span>
            </div>
          ) : null}

          <h4 style={{ margin: "1rem 0 0.5rem", fontSize: "1rem" }}>Batch summary — files</h4>
          <ul className={styles.fileList}>
            {batch.files.map((f) => (
              <li key={f.id}>
                <span>
                  <strong>{f.filename}</strong>{" "}
                  <span className={styles.muted} style={{ fontSize: "0.78rem" }}>
                    {f.mediaType} · {f.chosenSource}
                    {fileFlags(f).length ? ` · ${fileFlags(f).join("; ")}` : ""}
                  </span>
                </span>
                <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {f.needsReview ? <span className={`${styles.pill} ${styles.pillWarn}`}>Review</span> : <span className={`${styles.pill} ${styles.pillOk}`}>OK</span>}
                  {f.mediaType === "image" ? (
                    <button
                      type="button"
                      className={styles.btn}
                      style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}
                      onClick={() => {
                        const i = imageFiles.findIndex((x) => x.id === f.id);
                        onPreview(batch.batchId, f, i, imageFiles.length);
                      }}
                    >
                      Preview
                    </button>
                  ) : null}
                  {f.needsReview ? (
                    <button
                      type="button"
                      className={styles.btn}
                      style={{ padding: "0.35rem 0.65rem", fontSize: "0.75rem" }}
                      onClick={() => dispatch({ type: "MARK_FILE_REVIEWED", batchId: batch.batchId, fileId: f.id })}
                    >
                      Clear flag
                    </button>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>

          <h4 style={{ margin: "1.25rem 0 0.5rem", fontSize: "1rem" }}>Questionnaire</h4>
          <p className={styles.muted} style={{ fontSize: "0.82rem" }}>
            Required fields match NiceGUI Batch Review (see <code style={{ fontSize: "0.85em" }}>questionnaire_missing_fields_for_dict</code>).
          </p>
          <div className={styles.formGrid}>
            <label>
              Event name
              <input className={styles.input} value={batch.questionnaire.event_name ?? ""} onChange={(e) => setQ("event_name", e.target.value)} />
            </label>
            <label>
              Event type
              <select className={styles.select} value={batch.questionnaire.event_type ?? ""} onChange={(e) => setQ("event_type", e.target.value)}>
                <option value="">—</option>
                {EVENT_TYPE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Unit / team
              <select className={styles.select} value={batch.questionnaire.unit_team ?? ""} onChange={(e) => setQ("unit_team", e.target.value)}>
                <option value="">—</option>
                {UNIT_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Intended usage
              <select className={styles.select} value={batch.questionnaire.intended_usage ?? ""} onChange={(e) => setQ("intended_usage", e.target.value)}>
                <option value="">—</option>
                {INTENDED_USAGE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Sensitivity
              <select className={styles.select} value={batch.questionnaire.sensitivity_level ?? ""} onChange={(e) => setQ("sensitivity_level", e.target.value)}>
                <option value="">—</option>
                {SENSITIVITY_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Event date {needEd ? "(required while files need review)" : ""}
              <input className={styles.input} type="date" value={batch.questionnaire.event_date ?? ""} onChange={(e) => setQ("event_date", e.target.value)} />
            </label>
            <label style={{ gridColumn: "1 / -1" }}>
              Tags / topic
              <input className={styles.input} value={batch.questionnaire.tags ?? ""} onChange={(e) => setQ("tags", e.target.value)} />
            </label>
            <label style={{ gridColumn: "1 / -1" }}>
              Notes
              <input className={styles.input} value={batch.questionnaire.notes ?? ""} onChange={(e) => setQ("notes", e.target.value)} />
            </label>
          </div>

          {batch.aiSuggestions && aiEnabled ? (
            <div className={styles.aiCard}>
              <strong>Local AI suggestions</strong>
              <p className={styles.muted} style={{ fontSize: "0.85rem" }}>
                Mirrors <code style={{ fontSize: "0.85em" }}>ai_suggestions</code> / CLIP aggregates from{" "}
                <code style={{ fontSize: "0.85em" }}>tag_service.py</code>. Confidence: {batch.aiSuggestions.confidence_label} (
                {batch.aiSuggestions.event_type_source}).
              </p>
              <ul className={styles.muted} style={{ fontSize: "0.85rem" }}>
                <li>Suggested event type: {batch.aiSuggestions.event_type}</li>
                <li>Suggested usage: {batch.aiSuggestions.suggested_intended_usage}</li>
                <li>Extra tags: {(batch.aiSuggestions.suggested_additional_tags ?? []).join(", ")}</li>
              </ul>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
                disabled={batch.aiApplied}
                onClick={() => dispatch({ type: "APPLY_AI", batchId: batch.batchId })}
              >
                {batch.aiApplied ? "Applied" : "Apply suggestions to questionnaire"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
