/**
 * =============================================================================
 * CONTENT HUB — Edit this file to update the public showcase site.
 * =============================================================================
 *
 * PROJECT INFO:     Update `project` below when scope, outcomes, or copy changes.
 * TEAM:             Update `teamMembers` — swap `photoSrc` to files in /public/team/
 * LINKEDIN / EMAIL: Update `linkedInUrl`, `contactEmail`, `contactLabel` per person.
 * SKILLS:           Update `skillsShowcase` and each member's `contributions`.
 * CONTACT:          Update `contactSection` for a shared inbox or faculty sponsor line.
 *
 * Photo tips: Add JPG/PNG/WebP under public/team/ (e.g. public/team/jane-doe.jpg)
 *             then set photoSrc: "/team/jane-doe.jpg"
 * =============================================================================
 */

export const siteMeta = {
  /** Shown in nav / footer — e.g. your school or unit name */
  affiliation: "Kennesaw State University · CCSE · Information Technology Capstone",
  /** Short label for SEO / sharing */
  tagline: "Streamlining how teams capture, classify, and retrieve media at scale.",
};

export const project = {
  title: "Media Intake & Organization System",
  subtitle:
    "A capstone initiative to design reliable workflows for ingesting, tagging, and surfacing digital media—so outreach teams spend less time searching and more time creating impact.",

  /** UPDATE: Replace with your finalized elevator pitch (2–4 sentences). */
  purposeStatement:
    "We are building a system that reduces friction from the moment media arrives to the moment it is discoverable—pairing thoughtful information architecture with automation where it helps, and human judgment where it matters.",

  /** UPDATE: Describe the problem space for sponsors and recruiters. */
  problem:
    "Organizations collect large volumes of photos, video, and campaign assets across channels and devices. Without consistent intake rules, metadata, and search, valuable content is duplicated, lost, or impossible to reuse under deadlines.",

  /** UPDATE: What you are delivering (prototype, API, dashboard, policy kit, etc.). */
  approach:
    "Our team is combining user research, a structured data model, and an approachable interface so contributors can upload confidently and stakeholders can find assets quickly—even as the library grows.",

  /** UPDATE: Why this matters beyond the classroom (impact, efficiency, accessibility). */
  whyItMatters:
    "Strong media operations underpin outreach, fundraising, and brand trust. By treating intake and organization as a first-class product problem, we aim to save hours each week for communications teams and improve consistency across campaigns.",

  /** Public GitHub repository (NiceGUI / Python application) */
  githubRepoUrl:
    "https://github.com/nevaehbranham/Team-S26-36-02-Media-Sharing-Platform-for-Outreach-and-Engagement",
  /** Clone URL — same remote as githubRepoUrl */
  githubCloneUrl:
    "https://github.com/nevaehbranham/Team-S26-36-02-Media-Sharing-Platform-for-Outreach-and-Engagement.git",
};

export const missionHighlight = {
  /** Featured band — team mission / career-forward message */
  eyebrow: "Team mission",
  title: "Ship something real. Learn in public. Open doors.",
  body: "We treat this capstone like an early-career product team: clear ownership, documented decisions, and outcomes we can show to faculty, sponsors, and future employers.",
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  graduation: string;
  internshipStatement: string;
  dreamJob: string;
  otherProjects: string[];
  /** e.g. "Email" or "KSU email" */
  contactLabel: string;
  contactEmail: string;
  linkedInUrl: string;
  /** Path under /public or absolute URL — UPDATE with real headshots */
  photoSrc: string;
  contributions: string[];
};

export const teamMembers: TeamMember[] = [
  {
    id: "claude-kangni",
    name: "Claude Kangni",
    role: "Requirements Engineer / Analyst",
    graduation: "UPDATE: add graduation term",
    internshipStatement:
      "Open to internships where I can translate stakeholder needs into clear requirements, traceability, and actionable specs for delivery teams.",
    dreamJob: "Business analyst or requirements engineer on cross-functional product initiatives.",
    otherProjects: ["UPDATE: add prior coursework, work, or side projects"],
    contactLabel: "KSU email",
    contactEmail: "ckangni@students.kennesaw.edu",
    linkedInUrl: "https://www.linkedin.com/in/claude-kangni/",
    photoSrc: "/team/claude-kangni.png",
    contributions: ["Requirements elicitation", "Process & gap analysis", "Documentation for traceability"],
  },
  {
    id: "fatima-ahmed",
    name: "Fatima Ahmed",
    role: "SharePoint Configuration & Architecture Lead",
    graduation: "UPDATE: add graduation term",
    internshipStatement:
      "Seeking internships focused on Microsoft 365 / SharePoint solutions, information architecture, and scalable collaboration platforms.",
    dreamJob: "SharePoint or M365 solutions architect helping organizations structure content and permissions with confidence.",
    otherProjects: ["UPDATE: add prior coursework, work, or side projects"],
    contactLabel: "KSU email",
    contactEmail: "fahmed19@students.kennesaw.edu",
    linkedInUrl: "https://www.linkedin.com/in/fatima-ahmed-a057b33a9/",
    photoSrc: "/team/fatima-ahmed.png",
    contributions: ["SharePoint configuration", "Site & library architecture", "Governance alignment"],
  },
  {
    id: "isaiah-higgins",
    name: "Isaiah Higgins",
    role: "Legacy Media Intake Workflow Designer",
    graduation: "UPDATE: add graduation term",
    internshipStatement:
      "Interested in internships involving workflow redesign, operations, and bridging legacy processes with modern intake practices.",
    dreamJob: "Process or workflow designer / analyst improving how teams move work from intake through delivery.",
    otherProjects: ["UPDATE: add prior coursework, work, or side projects"],
    contactLabel: "KSU email",
    contactEmail: "ihiggin3@students.kennesaw.edu",
    linkedInUrl: "https://www.linkedin.com/in/isaiah-higgins-9600a5241/",
    photoSrc: "/team/placeholder-3.svg",
    contributions: ["As-is / to-be workflows", "Legacy intake mapping", "Handoff clarity for builders"],
  },
  {
    id: "meilun-wu",
    name: "Meilun Wu",
    role: "Team Lead and UI Developer",
    graduation: "UPDATE: add graduation term",
    internshipStatement:
      "Looking for internships that blend front-end development with collaboration—shipping polished UI while coordinating milestones and demos.",
    dreamJob: "UI engineer or tech lead track with strong product sense and team communication.",
    otherProjects: ["UPDATE: add prior coursework, work, or side projects"],
    contactLabel: "KSU email",
    contactEmail: "mwu7@students.kennesaw.edu",
    linkedInUrl: "https://www.linkedin.com/in/meilun-wu-366585316/",
    photoSrc: "/team/meilun-wu.png",
    contributions: ["Team leadership", "UI implementation", "Design–dev alignment"],
  },
  {
    id: "nevaeh-branham",
    name: "Nevaeh Branham",
    role: "Documentation & Quality Lead",
    graduation: "UPDATE: add graduation term",
    internshipStatement:
      "Seeking internships in QA, technical writing, or delivery roles where documentation and quality gates keep releases predictable.",
    dreamJob: "QA engineer or technical writer embedded with engineering to keep standards high and users supported.",
    otherProjects: ["UPDATE: add prior coursework, work, or side projects"],
    contactLabel: "KSU email",
    contactEmail: "nbranha1@students.kennesaw.edu",
    linkedInUrl: "https://www.linkedin.com/in/nevaeh-branham900864301/",
    photoSrc: "/team/placeholder-5.svg",
    contributions: ["Test planning", "Knowledge base & runbooks", "Quality checkpoints"],
  },
];

export const skillsShowcase = {
  intro:
    "We combine research, engineering, and delivery discipline so the project stays legible to sponsors—and interview-ready for each of us.",
  pillars: [
    {
      title: "Research & UX",
      items: ["Journey mapping", "Usability testing", "Information architecture"],
    },
    {
      title: "Engineering",
      items: ["TypeScript / React", "REST & API design", "Automated testing"],
    },
    {
      title: "Operations",
      items: ["Agile ceremonies", "Documentation", "Stakeholder demos"],
    },
  ],
};

/** End-to-end flow — aligns with app/core/engine.py + intake_service.py documentation */
export const systemPipeline = {
  eyebrow: "System pipeline",
  title: "From folder scan to audit export",
  intro:
    "The production application implements a deterministic pipeline: scan supported media under a chosen directory, resolve capture timestamps (EXIF, video tags, or filesystem fallback), group files into time-based batches, capture structured questionnaire metadata per batch, support optional local CLIP tagging, and export audit-ready CSV/XLSX for downstream systems.",
  steps: [
    {
      title: "Scan & preprocess",
      body: "Enumerate images and videos, validate integrity, and resolve timestamps — see scan_media_files / preprocess in app/core/engine.py.",
    },
    {
      title: "Time-based batching",
      body: "Group consecutive captures when gaps exceed the operator-configured threshold (batch gap in minutes), producing BatchRecord groups.",
    },
    {
      title: "Questionnaire & AI assist",
      body: "Operators complete required fields (event, unit, usage, sensitivity). Optional local OpenCLIP suggestions map into the same form vocabulary (app/core/tag_service.py, batch_questionnaire.py).",
    },
    {
      title: "Batch review & file flags",
      body: "Review queue with filters; per-batch drawer for thumbnails, lightbox previews, clearing needs_review flags, and applying AI suggestions (app/ui/pages/batch_review.py).",
    },
    {
      title: "Export & handoff",
      body: "Audit report rows per file with batch context and questionnaire columns; optional push to SharePoint mock for demos (app/ui/pages/export_page.py).",
    },
  ],
};

/** Stack summary for sponsors and technical readers */
export const technologyOverview = {
  eyebrow: "Technology overview",
  title: "What powers the real system — and this website demo",
  intro:
    "The capstone deliverable is a Python NiceGUI operations console with a packaged desktop build. This public site adds a React layer for storytelling; the Interactive Demo section simulates the same session model and demo_dataset batches in the browser.",
  columns: [
    {
      title: "Production app",
      items: [
        "Python 3.x, NiceGUI (Quasar/Vue under the hood)",
        "pandas / openpyxl audit exports",
        "Pillow + optional exiftool / ffprobe for metadata",
        "Optional local OpenCLIP (no cloud inference)",
        "SharePoint mock routes for safe demonstrations",
      ],
    },
    {
      title: "This showcase site",
      items: [
        "Vite + React + TypeScript",
        "Reusable section components + CSS modules",
        "Embedded demo: client-side state mirroring AppState workflows",
        "Mapped comments to Python modules for maintainability",
      ],
    },
  ],
};

export const interactiveDemoIntro = {
  eyebrow: "Interactive demo",
  title: "Try the system — browser session",
  subtitle:
    "Walk through dashboard metrics, simulated intake, batch review, questionnaire + local AI suggestions, CSV export, and SharePoint mock upload — aligned with the Team-S26-36-02 NiceGUI application.",
  noteLead: "Ground truth:",
  noteBody:
    "This experience is derived from the repository folder Team-S26-36-02-Media-Sharing-Platform-for-Outreach-and-Engagement (NiceGUI routes in app/ui/main.py). File names, batch IDs (B001–B004), questionnaire shapes, and AI payloads follow app/ui/demo_dataset.py. Where the desktop app uses native folder pickers, ffmpeg, or on-disk previews, the web demo substitutes text paths and seeded placeholder imagery — behavior and operator flow stay the same.",
};

/** Shared team contact — currently Team Lead inbox */
export const contactSection = {
  headline: "Start a conversation",
  sub:
    "Whether you are a sponsor, faculty mentor, or recruiter, we would love to share our progress and learn from your experience.",
  teamEmail: "mwu7@students.kennesaw.edu",
  teamEmailLabel: "Team inbox",
  note: "This address reaches Meilun Wu (Team Lead). You can also contact members via LinkedIn in the directory below.",
};
