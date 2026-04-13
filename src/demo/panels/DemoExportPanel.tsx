/**
 * Parity: app/ui/pages/export_page.py — audit CSV download, session history, SharePoint mock push entry point.
 * Full desktop app also emits XLSX via pandas/openpyxl (app/core/engine.py).
 */

import { useDemo } from "../DemoContext";
import styles from "../InteractiveDemo.module.css";

function formatSize(n: number) {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${n} B`;
}

export function DemoExportPanel() {
  const { state, dispatch, downloadExport } = useDemo();
  const rows = state.batches.reduce((n, b) => n + b.files.length, 0);

  if (!state.batches.length) {
    return (
      <div className={styles.panel}>
        <h3>Export</h3>
        <p className={styles.muted}>Nothing to export — run intake first (same empty state as NiceGUI `/export`).</p>
        <div className={styles.emptyCard}>
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => dispatch({ type: "SET_TAB", tab: "intake" })}>
            New Intake
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <h3>Export</h3>
      <p className={styles.muted}>
        Audit columns mirror <code style={{ fontSize: "0.85em" }}>AUDIT_REPORT_COLUMNS</code> in{" "}
        <code style={{ fontSize: "0.85em" }}>app/core/engine.py</code>. This browser demo downloads UTF-8 CSV only; the NiceGUI app also offers XLSX.
      </p>
      <p className={styles.muted}>
        <strong>
          {state.batches.length} batch(es) · {rows} file row(s) in export
        </strong>
      </p>

      <div className={styles.metricCard} style={{ maxWidth: 520 }}>
        <div className={styles.metricLabel}>Report format</div>
        <p className={styles.muted} style={{ fontSize: "0.85rem" }}>
          CSV (browser). Select XLSX in the desktop app for Excel-ready workbooks.
        </p>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => dispatch({ type: "EXPORT_CSV" })}>
          Download audit report (CSV)
        </button>
      </div>

      <h4 style={{ marginTop: "2rem", fontSize: "1rem" }}>Export history (this session)</h4>
      {state.exportHistory.length === 0 ? (
        <p className={styles.muted}>Each download appears here (max 25) — same pattern as export_page.py history panel.</p>
      ) : (
        <ul className={styles.fileList}>
          {state.exportHistory.map((e) => (
            <li key={e.id} style={{ border: "none", padding: "0.65rem 0" }}>
              <span>
                {e.filename} · {new Date(e.createdIso).toLocaleString()} · {formatSize(new Blob([e.csvText]).size)} · {e.rowCount} rows
              </span>
              <button type="button" className={styles.btn} style={{ padding: "0.4rem 0.75rem", fontSize: "0.8rem" }} onClick={() => downloadExport(e)}>
                Download
              </button>
            </li>
          ))}
        </ul>
      )}

      <h4 style={{ marginTop: "2rem", fontSize: "1rem" }}>SharePoint (mock)</h4>
      <p className={styles.muted}>
        Desktop app pushes to in-memory mock via <code style={{ fontSize: "0.85em" }}>push_session_batches_to_mock</code>. Here we append rows to the{" "}
        <strong>SharePoint preview</strong> tab.
      </p>
      <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => dispatch({ type: "PUSH_SHAREPOINT_MOCK" })}>
        Upload to SharePoint (mock)
      </button>
      <button type="button" className={styles.btn} style={{ marginLeft: "0.5rem" }} onClick={() => dispatch({ type: "SET_TAB", tab: "sharepoint" })}>
        Open SharePoint preview →
      </button>
    </div>
  );
}
