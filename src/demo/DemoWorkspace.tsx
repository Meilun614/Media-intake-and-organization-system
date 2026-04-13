/**
 * Tab shell mapping to NiceGUI routes: / → dashboard, /intake, /batches, /export, + mock library.
 */

import { DemoDashboardPanel } from "./panels/DemoDashboardPanel";
import { DemoIntakePanel } from "./panels/DemoIntakePanel";
import { DemoReviewPanel } from "./panels/DemoReviewPanel";
import { DemoExportPanel } from "./panels/DemoExportPanel";
import { DemoSharePointPanel } from "./panels/DemoSharePointPanel";
import { useDemo } from "./DemoContext";
import { NICEGUI_SOURCE_MAP } from "./constants";
import styles from "./InteractiveDemo.module.css";
import type { DemoTabId } from "./types";

const TABS: { id: DemoTabId; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "intake", label: "Intake" },
  { id: "review", label: "Batch review" },
  { id: "export", label: "Export" },
  { id: "sharepoint", label: "SharePoint preview" },
];

export function DemoWorkspace() {
  const { state, dispatch, resetSession } = useDemo();
  const shellClass = `${styles.shell} ${state.demoChromeTheme === "opsLight" ? styles.opsLight : ""}`;

  return (
    <div className={shellClass}>
      <div className={styles.topBar}>
        <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
          Mapping:{" "}
          <code style={{ fontSize: "0.75em" }}>
            {state.tab === "dashboard"
              ? NICEGUI_SOURCE_MAP.dashboard
              : state.tab === "intake"
                ? NICEGUI_SOURCE_MAP.intake
                : state.tab === "review"
                  ? NICEGUI_SOURCE_MAP.batchReview
                  : state.tab === "export"
                    ? NICEGUI_SOURCE_MAP.export
                    : NICEGUI_SOURCE_MAP.sharepointMock}
          </code>
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <label>
            <input
              type="radio"
              name="demo-theme"
              checked={state.demoChromeTheme === "site"}
              onChange={() => dispatch({ type: "SET_DEMO_THEME", theme: "site" })}
            />{" "}
            Match site theme
          </label>
          <label>
            <input
              type="radio"
              name="demo-theme"
              checked={state.demoChromeTheme === "opsLight"}
              onChange={() => dispatch({ type: "SET_DEMO_THEME", theme: "opsLight" })}
            />{" "}
            Ops console (light)
          </label>
          <button type="button" className={styles.btn} onClick={resetSession}>
            Reset session
          </button>
        </div>
      </div>
      <div className={styles.tabBar} role="tablist" aria-label="Demo areas">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={state.tab === t.id}
            className={`${styles.tab} ${state.tab === t.id ? styles.tabActive : ""}`}
            onClick={() => dispatch({ type: "SET_TAB", tab: t.id })}
          >
            {t.label}
          </button>
        ))}
      </div>
      {state.tab === "dashboard" ? <DemoDashboardPanel /> : null}
      {state.tab === "intake" ? <DemoIntakePanel /> : null}
      {state.tab === "review" ? <DemoReviewPanel /> : null}
      {state.tab === "export" ? <DemoExportPanel /> : null}
      {state.tab === "sharepoint" ? <DemoSharePointPanel /> : null}
    </div>
  );
}
