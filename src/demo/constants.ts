/**
 * Select option lists mirrored from app/core/batch_questionnaire.py
 * (EVENT_TYPE_OPTIONS, UNIT_OPTIONS, INTENDED_USAGE_OPTIONS, SENSITIVITY_OPTIONS).
 */

export const EVENT_TYPE_OPTIONS = [
  "Community Outreach",
  "Press Conference",
  "Court Event",
  "School / Youth Program",
  "Victim Services",
  "Staff / Internal Event",
  "Public Awareness Campaign",
  "Training / CLE",
  "Other",
] as const;

export const UNIT_OPTIONS = [
  "Communications Unit",
  "Community Engagement",
  "Victim Witness Assistance",
  "Major Crimes",
  "Juvenile Division",
  "Administration",
  "Other",
] as const;

export const INTENDED_USAGE_OPTIONS = [
  "Social media",
  "Website / intranet",
  "Press / media kit",
  "Internal briefing",
  "Training / education",
  "Court / legal",
  "Public records response",
  "Community outreach materials",
  "Archived reference only",
  "Other",
] as const;

export const SENSITIVITY_OPTIONS = ["Public", "Internal", "Sensitive"] as const;

export const NEEDS_REVIEW_CHOICES = ["Need Review", "Reviewed"] as const;

/** Human-readable label for Python module paths (mapping doc). */
export const NICEGUI_SOURCE_MAP = {
  routes: "app/ui/main.py — /, /intake, /batches, /export",
  dashboard: "app/ui/pages/dashboard.py",
  intake: "app/ui/pages/new_intake.py",
  batchReview: "app/ui/pages/batch_review.py",
  export: "app/ui/pages/export_page.py",
  demoData: "app/ui/demo_dataset.py",
  engine: "app/core/engine.py",
  questionnaire: "app/core/batch_questionnaire.py",
  sharepointMock: "app/integrations/sharepoint_mock_routes.py",
} as const;

export const DEMO_SOURCE_LABEL = "Demo dataset (simulated — not a real folder)";
