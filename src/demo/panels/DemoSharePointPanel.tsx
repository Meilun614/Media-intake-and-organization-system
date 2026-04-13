/**
 * Parity: in-memory library surfaced in export_page.py + sharepoint_mock routes
 * (app/integrations/sharepoint_mock_routes.py). Browser demo lists rows pushed from Export.
 */

import { useDemo } from "../DemoContext";
import styles from "../InteractiveDemo.module.css";

export function DemoSharePointPanel() {
  const { state } = useDemo();

  return (
    <div className={styles.panel}>
      <h3>SharePoint preview (mock)</h3>
      <p className={styles.muted}>
        Mirrors the mock library concept from the Python app. Real deployment uses{" "}
        <code style={{ fontSize: "0.85em" }}>sharepoint_upload.py</code> / Graph; this tab only shows session uploads from the demo.
      </p>

      {state.sharepointRows.length === 0 ? (
        <div className={styles.emptyCard}>
          <p className={styles.muted}>No mock uploads yet. From Export, choose “Upload to SharePoint (mock)”.</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Uploaded</th>
                <th>Batch</th>
                <th>Filename</th>
                <th>Type</th>
                <th>Event type (from questionnaire)</th>
              </tr>
            </thead>
            <tbody>
              {state.sharepointRows.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.uploadedIso).toLocaleString()}</td>
                  <td>{r.batchId}</td>
                  <td>{r.filename}</td>
                  <td>{r.mediaType}</td>
                  <td>{r.eventType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
