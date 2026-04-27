/**
 * Parity: app/ui/pages/dashboard.py — KPI cards, workflow stage, next action, empty state.
 */

import { dashboardMetrics, getNextDemoAction, getWorkflowStage } from "../demoEngine";
import { useDemo } from "../DemoContext";
import styles from "../InteractiveDemo.module.css";

const stageStyles: Record<string, { bg: string; fg: string; bd: string }> = {
  idle: { bg: "rgba(148,163,184,0.12)", fg: "#94a3b8", bd: "rgba(148,163,184,0.25)" },
  scanned: { bg: "rgba(148,163,184,0.15)", fg: "#e2e8f0", bd: "rgba(148,163,184,0.3)" },
  batched: { bg: "rgba(198,115,77,0.12)", fg: "#fdba74", bd: "rgba(198,115,77,0.35)" },
  ready_for_review: { bg: "rgba(251,191,36,0.12)", fg: "#fcd34d", bd: "rgba(251,191,36,0.35)" },
  completed: { bg: "rgba(52,211,153,0.12)", fg: "#6ee7b7", bd: "rgba(52,211,153,0.35)" },
  processing: { bg: "rgba(99,102,241,0.12)", fg: "#a5b4fc", bd: "rgba(99,102,241,0.3)" },
};

export function DemoDashboardPanel() {
  const { state, dispatch, loadDemo, runIntakeSimulate } = useDemo();
  const { batches, preprocessStats, lastRunIso, sessionStatus, lastError, exportedFlag } = state;

  const isEmpty = !lastRunIso && batches.length === 0 && preprocessStats.total_scanned === 0;
  const metrics = dashboardMetrics(batches, preprocessStats);
  const stage = getWorkflowStage(batches, preprocessStats, lastRunIso, sessionStatus, exportedFlag);
  const next = getNextDemoAction(batches, preprocessStats, lastRunIso);
  const st = stageStyles[stage.id] ?? stageStyles.idle;

  if (isEmpty) {
    return (
      <div className={styles.panel}>
        <h3>Dashboard</h3>
        <p className={styles.muted}>
          Live status and metrics for the current intake session, reflecting the same workflow as the desktop
          application.
        </p>
        <div className={styles.emptyCard}>
          <p className={styles.muted} style={{ marginBottom: "1.25rem" }}>
            No intake loaded yet. Start a simulated scan or load the sample dataset to begin exploring the workflow.
          </p>
          <div className={styles.row} style={{ justifyContent: "center" }}>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => dispatch({ type: "SET_TAB", tab: "intake" })}>
              Start New Intake
            </button>
            <button type="button" className={styles.btn} onClick={loadDemo}>
              Presentation demo (sample batches)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <h3>Dashboard</h3>
      <p className={styles.muted}>
        Mirrors pipeline metrics from <code style={{ fontSize: "0.85em" }}>get_dashboard_metrics</code> in{" "}
        <code style={{ fontSize: "0.85em" }}>app/core/intake_service.py</code>.
      </p>

      {lastError ? (
        <div
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "12px",
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.3)",
            fontSize: "0.9rem",
          }}
        >
          <strong style={{ color: "#fca5a5" }}>Operation failed</strong>
          <div style={{ color: "#fecaca", marginTop: "0.35rem" }}>{lastError}</div>
        </div>
      ) : null}

      <div>
        <span className={styles.metricLabel}>Workflow stage</span>
        <span
          className={styles.stagePill}
          style={{
            background: st.bg,
            color: st.fg,
            border: `1px solid ${st.bd}`,
          }}
        >
          {stage.label}
        </span>
      </div>

      <div className={styles.metricGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total scanned</div>
          <div className={styles.metricValue}>{metrics.totalScanned}</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Usable</div>
          <div className={styles.metricValue}>{metrics.usable}</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>EXIF missing</div>
          <div className={styles.metricValue}>{metrics.exifMissing}</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Corrupt</div>
          <div className={styles.metricValue}>{metrics.corrupt}</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Total batches</div>
          <div className={styles.metricValue}>{metrics.batchCount}</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Batches needing review</div>
          <div className={styles.metricValue}>{metrics.batchesNeedingReview}</div>
        </div>
      </div>

      <div className={styles.row} style={{ alignItems: "stretch" }}>
        <div className={styles.metricCard} style={{ flex: "1 1 280px" }}>
          <div className={styles.metricLabel}>Next action</div>
          <p className={styles.muted} style={{ margin: "0.5rem 0 1rem" }}>
            {next.description}
          </p>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => dispatch({ type: "SET_TAB", tab: next.tab })}
          >
            {next.title} →
          </button>
        </div>
        <div className={styles.metricCard} style={{ flex: "1 1 240px" }}>
          <div className={styles.metricLabel}>Session</div>
          <p className={styles.muted} style={{ margin: "0.5rem 0" }}>
            <strong>Last run:</strong> {lastRunIso ? new Date(lastRunIso).toLocaleString() : "—"}
          </p>
          <p className={styles.muted} style={{ margin: 0 }}>
            <strong>Input:</strong>{" "}
            <span style={{ wordBreak: "break-all" }}>{state.inputDir || "—"}</span>
          </p>
        </div>
      </div>

      <div className={styles.row}>
        <button type="button" className={styles.btn} onClick={loadDemo}>
          Reload demo dataset
        </button>
        <button type="button" className={styles.btn} onClick={runIntakeSimulate}>
          Re-run simulated intake
        </button>
      </div>
    </div>
  );
}
