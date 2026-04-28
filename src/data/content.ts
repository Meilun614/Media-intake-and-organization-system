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
 * Photo tips: Add JPG/PNG/WebP under public/team/ (e.g. public/team/jane-doe.png)
 *             then set photoSrc: "team/jane-doe.png"
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
    "A metadata-driven system for ingesting, organizing, and retrieving digital media—so outreach teams spend less time searching and more time delivering impact.",

  /** UPDATE: Replace with your finalized elevator pitch (2–4 sentences). */
  purposeStatement:
    "We are building a system that reduces friction from the moment media arrives to the moment it is discoverable—pairing thoughtful information architecture with automation where it helps, and human judgment where it matters.",

  /** UPDATE: Describe the problem space for sponsors and recruiters. */
  problem:
    "Organizations collect photos, videos, and campaign assets across many channels and devices. Without a consistent intake process, content becomes duplicated, hard to find, and difficult to reuse when teams need it most.",

  /** UPDATE: What you are delivering (prototype, API, dashboard, policy kit, etc.). */
  approach:
    "We combine structured metadata, automated intake workflows, and a simple interface for organizing media. Contributors can upload with confidence, and teams can quickly search, review, and reuse assets as the library grows.",

  /** UPDATE: Why this matters beyond the classroom (impact, efficiency, accessibility). */
  whyItMatters:
    "Strong media management supports outreach, reporting, and long-term knowledge retention. By making intake a clear process, we reduce manual effort, improve consistency, and help teams access important assets faster.",

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
    id: "meilun-wu",
    name: "Meilun Wu",
    role: "Team Lead and UI Engineer",
    graduation: "Expected Graduation: December 2026 · GPA: 3.96",
    internshipStatement:
      "Seeking internships across software engineering, UI development, and broader IT roles, where I can contribute to building user-centered systems, develop scalable solutions, and collaborate across teams.",
    dreamJob:
      "UI engineer or product-focused software engineer, with a path toward technical leadership in building scalable, user-driven systems.",
    otherProjects: [
      "LoRaWAN-based sensing system for real-time environmental data collection and transmission",
      "Machine learning system for Parkinson’s disease diagnosis using signal and pattern analysis",
      "Vision Transformer (ViT)-based image matching system for feature alignment and comparison",
    ],
    contactLabel: "KSU email",
    contactEmail: "mwu7@students.kennesaw.edu",
    linkedInUrl: "https://www.linkedin.com/in/meilun-wu",
    photoSrc: "team/meilun-wu.png",
    contributions: [
      "Led the design and implementation of a full-stack media intake system, owning UI architecture, workflow design, and end-to-end user experience.",
    ],
  },
  {
    id: "claude-kangni",
    name: "Claude Kangni",
    role: "Requirements Engineer / Analyst",
    graduation: "Expected Graduation: May 2026 · GPA:",
    internshipStatement:
      "Gain hands-on experience in IT support, cybersecurity, or cloud operations while strengthening technical troubleshooting, scripting, and enterprise systems skills. I’m looking for an internship where I can apply what I’ve learned in the classroom to real-world environments, contribute to meaningful projects, and continue building experience in security, infrastructure, and user support.",
    dreamJob:
      "My dream role is to work in cybersecurity, ideally in a Security Operations Center (SOC) or security engineering role where I can help protect systems, investigate threats, and improve security processes. Long term, I’m interested in growing into a cybersecurity analyst or cloud security engineer position focused on threat detection, incident response, and securing enterprise environments.",
    otherProjects: [
      "In addition to coursework, I’ve built experience through academic, professional, and personal projects.",
      "My prior coursework includes networking, systems administration, information security, database management, cloud fundamentals, and scripting.",
      "Through my IT Service Desk experience, I’ve worked on troubleshooting hardware and software issues, supporting end users, resolving account access issues, and documenting technical solutions in a fast-paced environment.",
      "I’ve also worked on side projects involving home lab environments, Active Directory, basic vulnerability testing, and security-focused simulations to strengthen my hands-on technical skills.",
    ],
    contactLabel: "KSU email",
    contactEmail: "ckangni@students.kennesaw.edu",
    linkedInUrl: "https://www.linkedin.com/in/claude-kangni/",
    photoSrc: "team/claude-kangni.png",
    contributions: [
      "Requirements elicitation, process and gap analysis, and documentation for traceability and system alignment.",
    ],
  },
  {
    id: "fatima-ahmed",
    name: "Fatima Ahmed",
    role: "SharePoint Configuration & Architecture Lead",
    graduation: "Expected Graduation: May 2026 · GPA: 3.96",
    internshipStatement:
      "My goal for an internship is to gain hands-on experience applying IT concepts in a real-world environment. I want to build practical skills across areas like system administration, technical support, databases, and general IT operations while becoming more familiar with industry tools and workflows. I am also looking to improve my problem-solving abilities, learn how teams manage and maintain systems, and develop a better understanding of how IT supports business needs.",
    dreamJob:
      "My dream role is to work in an IT-related position such as a systems administrator, IT support specialist, or IT analyst, where I can manage systems, troubleshoot issues, and help maintain efficient technology operations. In the long term, I am interested in continuing to grow my technical skills and possibly specializing in areas like systems management, cloud computing, or cybersecurity.",
    otherProjects: [
      "I have completed several coursework projects related to system administration, databases, and general IT concepts, where I worked on configuring systems, managing data, and solving technical problems.",
      "I also developed a project focused on creating an IT solution for a company, which involved analyzing needs and proposing effective technical approaches.",
      "In addition, I have gained hands-on experience through technical labs involving tools like MongoDB, basic networking, and system setup. Outside of coursework, I have practiced using command-line tools and explored different technologies to continue building my technical skills.",
    ],
    contactLabel: "KSU email",
    contactEmail: "fahmed19@students.kennesaw.edu",
    linkedInUrl: "https://www.linkedin.com/in/fatima-ahmed-a057b33a9/",
    photoSrc: "team/fatima-ahmed.png",
    contributions: ["SharePoint configuration, site and library architecture design, and governance alignment."],
  },
  {
    id: "isaiah-higgins",
    name: "Isaiah Higgins",
    role: "Legacy Media Intake Workflow Designer",
    graduation: "Expected Graduation: May 2026 · GPA:",
    internshipStatement:
      "Interested in internships involving workflow redesign, operations, and bridging legacy processes with modern intake practices.",
    dreamJob: "Process or workflow designer / analyst improving how teams move work from intake through delivery.",
    otherProjects: [],
    contactLabel: "KSU email",
    contactEmail: "ihiggin3@students.kennesaw.edu",
    linkedInUrl: "https://www.linkedin.com/in/isaiah-higgins-9600a5241/",
    photoSrc: "team/isaiah_higgins.png",
    contributions: [
      "Current-state and future-state workflow design, legacy media intake mapping, and implementation handoff support.",
    ],
  },
  {
    id: "nevaeh-branham",
    name: "Nevaeh Branham",
    role: "Documentation & Quality Lead",
    graduation: "Expected Graduation: May 2026 · GPA:",
    internshipStatement:
      "My goal is to gain hands-on experience applying my technical skills in a real-world setting. I am particularly interested in strengthening my ability to work with data, understand how it informs decision-making, and contribute to projects that have practical impact. I also want to continue developing professionally by improving my collaboration, communication, and problem-solving skills.",
    dreamJob:
      "My ideal role is one where I can work at the intersection of data, AI, and IT to support decision-making. I’m interested in using data analysis and machine learning to help organizations make informed, effective choices. With my background in IT, I want to be in a role where I can both understand technical systems and translate data into insights that are useful and actionable.",
    otherProjects: [
      "I am part of an AI and animal advocacy fellowship, exploring applications of AI in areas such as exotic animal ownership and conservation, with a focus on real world impact and ethical considerations.",
      "In addition, I have completed multiple machine learning projects involving model development, data preprocessing, and evaluation, while building a strong foundation in IT and problem solving.",
    ],
    contactLabel: "KSU email",
    contactEmail: "nbranha1@students.kennesaw.edu",
    linkedInUrl: "https://www.linkedin.com/in/nevaeh-branham-900864301",
    photoSrc: "team/neveah_branham.png",
    contributions: [
      "Test planning, quality assurance processes, and development of knowledge base and operational documentation.",
    ],
  },
];

export const skillsShowcase = {
  intro:
    "Our team combines research, engineering, and delivery practices to build a system that is both understandable to stakeholders and strong enough to showcase in real-world technical interviews.",
  pillars: [
    {
      title: "Research & UX",
      items: [
        "User journey mapping and workflow analysis",
        "Usability testing and iteration",
        "Information architecture and metadata design",
      ],
    },
    {
      title: "Engineering",
      items: [
        "Frontend development with React and TypeScript",
        "API design and system integration",
        "Structured data processing and automation",
      ],
    },
    {
      title: "Operations",
      items: [
        "Agile collaboration and sprint coordination",
        "Technical documentation and knowledge sharing",
        "Stakeholder demos and feedback integration",
      ],
    },
  ],
};

export const systemPipeline = {
  eyebrow: "System pipeline",
  title: "From raw media to structured, audit-ready output",
  intro:
    "The system follows a structured, end-to-end pipeline that transforms raw media into organized, searchable, and audit-ready data. It scans files from a selected directory, extracts capture timestamps (EXIF, video metadata, or filesystem fallback), groups content into time-based batches, captures structured metadata through guided input, supports optional local AI tagging, and produces export-ready CSV or XLSX outputs for downstream systems.",
  steps: [
    {
      title: "Scan & preprocess",
      body: "Scan and validate images and videos, then extract or infer capture timestamps to establish a reliable temporal foundation for processing.",
    },
    {
      title: "Time-based batching",
      body: "Automatically group media into batches based on configurable time gaps, allowing related files from the same event to be processed together.",
    },
    {
      title: "Questionnaire & AI assist",
      body: "Capture structured metadata at the batch level, including event, unit, usage, and sensitivity. Optional local AI suggestions assist tagging while keeping users in control.",
    },
    {
      title: "Batch review & file flags",
      body: "Review grouped media with visual previews and filtering tools, resolve items that require attention, and refine metadata before finalizing batches.",
    },
    {
      title: "Export & handoff",
      body: "Generate structured audit reports with per-file and batch-level metadata, and optionally simulate downstream integration such as SharePoint uploads.",
    },
  ],
};

/** Stack summary for sponsors and technical readers */
export const technologyOverview = {
  eyebrow: "Technology overview",
  title: "Technology behind the system and demo experience",
  intro:
    "The core system is built as a Python-based desktop application using NiceGUI, designed to handle media intake, processing, and export workflows. This website complements the application with a lightweight React layer that presents the system through an interactive, browser-based demo, simulating real user workflows and dataset processing.",
  columns: [
    {
      title: "Production app",
      items: [
        "Python 3.x with NiceGUI (built on Quasar and Vue)",
        "Structured data processing and audit export using pandas and openpyxl",
        "Metadata extraction via Pillow, with optional exiftool and ffprobe support",
        "Optional local OpenCLIP for privacy-preserving AI tagging (no cloud dependency)",
        "SharePoint mock integration for safe demonstration workflows",
      ],
    },
    {
      title: "This showcase site",
      items: [
        "Vite, React, and TypeScript for a fast and modular frontend",
        "Reusable UI components with scoped styling",
        "Interactive demo that mirrors real application workflows in the browser",
        "Clear mapping between UI behavior and underlying system logic",
      ],
    },
  ],
};

export const interactiveDemoIntro = {
  eyebrow: "Interactive demo",
  title: "Try the system in your browser",
  subtitle:
    "Explore the full workflow, including dashboard metrics, simulated intake, batch review, structured metadata entry, AI-assisted tagging, CSV export, and SharePoint-style upload — all mirroring the core NiceGUI application.",
  noteLead: "Ground truth:",
  noteBody:
    "This demo is derived directly from the project repository and reflects the same data structures, batch logic, and workflows used in the desktop application. To support a browser environment, file system operations and media previews are simulated, while the overall behavior and user flow remain consistent.",
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
