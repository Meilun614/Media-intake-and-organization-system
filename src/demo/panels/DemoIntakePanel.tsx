/**
 * Parity: app/ui/pages/new_intake.py — source path, recursive scan, batch gap, local AI toggle, Start Scan.
 * Browser cannot open tkinter folder picker; text field simulates chosen path.
 */

import { useState } from "react";
import { useDemo } from "../DemoContext";
import styles from "../InteractiveDemo.module.css";

export function DemoIntakePanel() {
  const { state, dispatch, runIntakeSimulate } = useDemo();
  const [busy, setBusy] = useState(false);

  const onScan = async () => {
    const raw = state.inputDir.trim();
    if (!raw) {
      dispatch({ type: "SET_ERROR", message: "Choose or enter a source folder path before scanning." });
      return;
    }
    dispatch({ type: "SET_ERROR", message: null });
    setBusy(true);
    try {
      await runIntakeSimulate();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.panel}>
      <h3>New intake</h3>
      <p className={styles.muted}>
        Scan a folder and build time-based batches — workflow from{" "}
        <code style={{ fontSize: "0.85em" }}>app/ui/pages/new_intake.py</code>. Here the pipeline is{" "}
        <strong>simulated</strong> with the same demo batches as{" "}
        <code style={{ fontSize: "0.85em" }}>demo_dataset.py</code>.
      </p>

      <div className={styles.row}>
        <div style={{ flex: "1 1 280px" }}>
          <label className={styles.metricLabel} htmlFor="demo-src">
            Source folder
          </label>
          <input
            id="demo-src"
            className={styles.input}
            style={{ width: "100%" }}
            placeholder="e.g. D:\Events\SpringOutreach or any label"
            value={state.inputDir}
            onChange={(e) => dispatch({ type: "SET_INPUT_DIR", path: e.target.value })}
          />
        </div>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => dispatch({ type: "SET_INPUT_DIR", path: "D:\\\\Events\\\\SpringOutreach\\\\RAW" })}>
          Use sample path
        </button>
      </div>

      <div className={styles.row} style={{ alignItems: "center" }}>
        <label className={styles.switchRow}>
          <input
            type="checkbox"
            checked={state.recursive}
            onChange={(e) => dispatch({ type: "SET_RECURSIVE", value: e.target.checked })}
          />
          Recursive scan
        </label>
        <div>
          <label className={styles.metricLabel} htmlFor="gap">
            Batch gap (minutes)
          </label>
          <input
            id="gap"
            type="number"
            min={1}
            max={1440}
            className={styles.input}
            style={{ width: "8rem" }}
            value={state.gapMinutes}
            onChange={(e) => dispatch({ type: "SET_GAP", value: Number(e.target.value) || 60 })}
          />
        </div>
        <label className={styles.switchRow}>
          <input
            type="checkbox"
            checked={state.aiEnabled}
            onChange={(e) => dispatch({ type: "SET_AI_ENABLED", value: e.target.checked })}
          />
          Local AI tagging (demo toggle)
        </label>
      </div>

      {busy || state.sessionStatus === "processing" ? (
        <div style={{ marginTop: "1rem" }}>
          <div
            className={styles.busyBar}
            style={{
              height: 4,
              borderRadius: 4,
              background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
            }}
          />
          <p className={styles.muted} style={{ marginTop: "0.75rem" }}>
            Running intake: scanning files, resolving timestamps, building batches…
          </p>
        </div>
      ) : null}

      <button
        type="button"
        className={`${styles.btn} ${styles.btnPrimary}`}
        style={{ marginTop: "1rem" }}
        disabled={busy || state.sessionStatus === "processing"}
        onClick={onScan}
      >
        Start Scan
      </button>
    </div>
  );
}
