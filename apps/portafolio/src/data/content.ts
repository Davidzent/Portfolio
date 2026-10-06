/* ─────────────────────────────────────────────────────────────
   zntsns.com — single content source of truth.
   Everything editable lives here: copy, links, projects, skills,
   the hero code, the journey timeline, the terminal easter egg.
   Swap in real values and the sections pick them up.
   ───────────────────────────────────────────────────────────── */

export const site = {
  name: "David",
  fullName: "David Guijosa Infante",
  role: "Full-Stack Developer, leveling into Game Dev",
  experience: "3+ yrs experience",
  domain: "zntsns.com",
  email: "davidgin641@gmail.com",
  location: "Riverside, CA",
  availability: "Open to work",
  resumeUrl: "/resume.pdf",
  /** The dual-boot seam: the wordmark splits into the IDE half + the engine half. */
  brand: { base: "znt", accent: "sns" },
  socials: {
    github: "https://github.com/Davidzent",
    linkedin: "https://www.linkedin.com/in/davidguijosa/",
    email: "mailto:davidgin641@gmail.com",
  },
};

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

/* ── Hero ──────────────────────────────────────────────────── */

export type TokenKind =
  | "kw"
  | "fn"
  | "str"
  | "num"
  | "com"
  | "punct"
  | "var"
  | "type"
  | "plain";

export type CodeLine = { indent?: number; tokens: [string, TokenKind][] };

/** Left side of the hero: a live-typing editor. Fake syntax highlighting is
 *  driven by these token kinds. It reads as real TypeScript about David.
 *
 *  This is the only place a recruiter sees actual shipped work above the fold,
 *  so `shipped` sits right under the bio rather than at the bottom. Three
 *  constraints:
 *  - Keep the project names near the top. Lines type out in document order,
 *    and the point is that they land inside a 10-second scan (~4.5s here).
 *  - Keep new lines under ~37 chars. At the default seam (52%) the editor is
 *    clipped at x≈920 and anything longer gets cut mid-token. (The two legacy
 *    `build()` lines below run past it and always have.)
 *  - 19 lines is the ceiling. The editor clips at ~19 rows on a 720px-tall
 *    viewport; adding more silently drops whatever sits at the bottom. */
export const heroCode: CodeLine[] = [
  { tokens: [["const", "kw"], [" david", "var"], [" = ", "punct"], ["{", "punct"]] },
  { indent: 1, tokens: [["role", "plain"], [": ", "punct"], ['"full-stack dev"', "str"], [",", "punct"]] },
  { indent: 1, tokens: [["stack", "plain"], [": ", "punct"], ["[", "punct"], ['"React"', "str"], [", ", "punct"], ['"Node"', "str"], [", ", "punct"], ['"Spring"', "str"], ["]", "punct"], [",", "punct"]] },
  { indent: 1, tokens: [["nowPlaying", "plain"], [": ", "punct"], ['"Unity + C#"', "str"], [",", "punct"]] },
  { tokens: [["}", "punct"]] },
  { tokens: [["", "plain"]] },
  { tokens: [["const", "kw"], [" shipped", "var"], [" = ", "punct"], ["[", "punct"]] },
  { indent: 1, tokens: [['"AwardTrace"', "str"], [",", "punct"], ["      ", "punct"], ["// live on AWS", "com"]] },
  { indent: 1, tokens: [['"Warehouse"', "str"], [",", "punct"], ["       ", "punct"], ["// Spring API", "com"]] },
  { indent: 1, tokens: [['"Portal Pantry"', "str"], [",", "punct"], ["   ", "punct"], ["// live demo", "com"]] },
  { tokens: [["]", "punct"], [";", "punct"]] },
  { tokens: [["", "plain"]] },
  { tokens: [["function", "kw"], [" build", "fn"], ["(", "punct"], ["idea", "var"], [": ", "punct"], ["Idea", "type"], ["): ", "punct"], ["Shipped", "type"], [" {", "punct"]] },
  { indent: 1, tokens: [["const", "kw"], [" api", "var"], [" = ", "punct"], ["secure", "fn"], ["(", "punct"], ["idea", "var"], [")", "punct"], [";", "punct"], ["   // OAuth2 · JWT", "com"]] },
  { indent: 1, tokens: [["return", "kw"], [" deploy", "fn"], ["(", "punct"], ["api", "var"], [", ", "punct"], ["{", "punct"], [" cloud", "plain"], [": ", "punct"], ['"GCP"', "str"], [" }", "punct"], [")", "punct"], [";", "punct"]] },
  { tokens: [["}", "punct"]] },
  { tokens: [["", "plain"]] },
  { tokens: [["// currently: a multiplayer cooking game, solo", "com"]] },
  { tokens: [["while", "kw"], [" (", "punct"], ["awake", "var"], [") ", "punct"], ["david", "var"], [".", "punct"], ["ship", "fn"], ["()", "punct"], [";", "punct"]] },
];

export const hero = {
  /** Two-line headline. The accent word is styled per-line in the component. */
  headline: ["Full-stack systems,", "game-world imagination."],
  tagline: "Production web apps on one boot, games on the other.",
  primaryCta: { label: "View projects", href: "#projects" },
  secondaryCta: { label: "Start co-op", href: "#contact" },
  engineHint: "drag the seam",
};

/* ── About (player card) ───────────────────────────────────── */

export const about = {
  class: "Full-Stack Dev  ·  Lv.1 Game Dev",
  /** Rotating portrait gallery. Each caption shows under its photo; edit freely. */
  gallery: [
    { src: "/travel/uyuni-1.webp", caption: "My travel to bolivia uyuni." },
    { src: "/travel/uyuni-2.webp", caption: "My travel to bolivia uyuni." },
    { src: "/travel/uyuni-3.webp", caption: "My travel to bolivia uyuni." },
    { src: "/travel/uyuni-4.webp", caption: "My travel to bolivia uyuni." },
    { src: "/travel/uyuni-5.webp", caption: "My travel to bolivia uyuni." },
    { src: "/travel/uyuni-6.webp", caption: "My travel to bolivia uyuni." },
  ],
  bio: [
    "I'm a full-stack engineer from Riverside, California. Day to day I work the whole stack: Angular and React on the front, Java / Spring Boot and Node services behind them, and the PostgreSQL, Docker, and CI/CD on Google Cloud that carry them to production.",
    "Off the clock I build games. I'm the sole developer of a multiplayer cooking game in Unity, designing the systems in C# and modeling the 3D assets in Blender myself. I also wrote a neural network from scratch in Java and evolved it until it out-flapped me at Flappy Bird.",
  ],
  /** Stat bars, RPG-style. Values are self-assessed skill, labeled as such. */
  stats: [
    { label: "Backend", value: 90 },
    { label: "Frontend", value: 85 },
    { label: "Cloud / DevOps", value: 80 },
    { label: "Game Dev", value: 55 },
  ],
  facts: [
    { k: "Base", v: "Riverside, CA" },
    { k: "XP", v: "3+ yrs shipping" },
    { k: "Guild", v: "Freelance · ex-Cognizant" },
    { k: "Status", v: "Open to work" },
  ],
};

/* ── Skills (tree) ─────────────────────────────────────────── */

export type SkillState = "core" | "strong" | "learning";
export interface SkillNode {
  id: string;
  label: string;
  state: SkillState;
}
export interface SkillBranch {
  id: "fullstack" | "gamedev";
  title: string;
  subtitle: string;
  nodes: SkillNode[];
}

export const skillTree: SkillBranch[] = [
  {
    id: "fullstack",
    title: "Full-Stack",
    subtitle: "web / api / cloud",
    nodes: [
      { id: "ts", label: "TypeScript", state: "core" },
      { id: "react", label: "React", state: "core" },
      { id: "angular", label: "Angular", state: "strong" },
      { id: "node", label: "Node.js", state: "strong" },
      { id: "spring", label: "Java / Spring Boot", state: "core" },
      { id: "sql", label: "PostgreSQL", state: "strong" },
      { id: "docker", label: "Docker / GCP", state: "strong" },
      { id: "cicd", label: "CI/CD · Jenkins", state: "strong" },
      { id: "rust", label: "Rust", state: "learning" },
    ],
  },
  {
    id: "gamedev",
    title: "Game Dev",
    subtitle: "engine / systems / 3d",
    nodes: [
      { id: "unity", label: "Unity", state: "strong" },
      { id: "csharp", label: "C#", state: "core" },
      { id: "blender", label: "Blender / 3D", state: "strong" },
      { id: "gameplay", label: "Gameplay systems", state: "strong" },
      { id: "ai", label: "Game AI / neural nets", state: "strong" },
      { id: "netcode", label: "Multiplayer netcode", state: "learning" },
      { id: "shaders", label: "Shaders / HLSL", state: "learning" },
      { id: "physics", label: "Physics", state: "learning" },
    ],
  },
];

/* ── Projects (level select) ───────────────────────────────── */

export type ProjectType = "web" | "game";
export type MarkId =
  | "awardtrace"
  | "portal"
  | "simmer"
  | "cooking"
  | "warehouse"
  | "restaurant"
  | "neural"
  | "tetris";

export interface Project {
  id: string;
  title: string;
  short: string;
  type: ProjectType;
  mark: MarkId;
  /** Landing-page screenshot for the featured panel; without one it shows the scene. */
  shot?: string;
  description: string;
  highlight?: string;
  tech: string[];
  links: { github?: string; demo?: string };
  /** Expanded view (the featured panel): what it does + how it works. */
  details: {
    what: string;
    how: string[];
  };
}

export const projects: Project[] = [
  {
    id: "awardtrace",
    title: "AwardTrace",
    short: "Federal contract search",
    type: "web",
    mark: "awardtrace",
    shot: "/projects/awardtrace.webp",
    description:
      "A search site for U.S. federal contract awards. USAspending data streams through a Kafka pipeline into PostgreSQL and Elasticsearch, and a Claude classifier tags each award with a category, but only after it beat the government's own product codes on a hand-labeled set. One Spring Boot codebase run in separate roles on one AWS host, rebuilt from Terraform and S3 in under 7 minutes.",
    highlight: "Live on AWS · search p95 155 ms at 20 req/s",
    tech: [
      "Java 21",
      "Spring Boot",
      "Kafka",
      "Elasticsearch",
      "PostgreSQL",
      "React",
      "Terraform",
      "AWS",
      "Claude API",
    ],
    links: { github: "https://github.com/Davidzent/AwardTrace", demo: "https://awardtrace.zntsns.com/" },
    details: {
      what: "Search for U.S. federal contract awards, built like a production data platform. The government's USAspending files flow through Kafka into PostgreSQL and Elasticsearch, and every award gets a category from a Claude classifier that had to earn its place: it became the default only after beating the government's own product codes on 181 hand-labeled descriptions, 65.7% to 59.7%. Production holds the Department of Agriculture's contracts and runs on weekdays; outside those hours, the landing page can wake it.",
      how: [
        "Java 21 + Spring Boot 4 as a modular monolith: ingest, pipeline, outbox relay, indexer, enricher, and REST API are one codebase started in different roles, with a test enforcing the module boundaries",
        "Kafka keyed by award, version-guarded upserts, and Elasticsearch external versioning, so duplicate and out-of-order events land on the same final state",
        "A transactional outbox writes each change event in the same transaction as its row, so a crash can't lose half of the dual write",
        "Claude Haiku 4.5 classifies award descriptions, backfilled through the Message Batches API: 31,344 descriptions for $3.25",
        "React 19 + TypeScript search UI with shareable URL state, multi-select facets, and a client generated from the OpenAPI contract",
        "Terraform on AWS, deployed from GitHub Actions with automatic rollback; a drill destroyed production and rebuilt it from Terraform and S3 in 6 min 54 s",
        "Measured on production: 155 ms search p95 at 20 requests a second, and 1,068 transactions a second through the pipeline on one 2-vCPU host",
        "138 Testcontainers integration tests, plus Playwright and axe for end-to-end and accessibility checks",
      ],
    },
  },
  {
    id: "warehouse",
    title: "Warehouse API & UI",
    short: "Receiving, end to end",
    type: "web",
    mark: "warehouse",
    description:
      "A Spring Boot receiving system with a React front end on top of it, both live. Clerks record what physically arrived against a purchase order, and only then does stock become pickable. Built around the awkward cases: partial deliveries, 110%-capped over-shipments, damaged units, and two clerks receiving the same PO at once. The API runs on Render against a Supabase Postgres database.",
    highlight: "Live demo · React UI on a real Spring Boot API",
    tech: [
      "Java 17",
      "Spring Boot",
      "MyBatis",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Render",
      "Supabase",
    ],
    links: { github: "https://github.com/Davidzent/Warehouse-API", demo: "/warehouse/" },
    details: {
      what: "The receiving dock, modeled properly, and a front end that actually exercises it. A delivery arrives against a purchase order, a clerk records what showed up, and stock only becomes available to pick once it's booked in. The interesting part is everything that isn't the happy path: shipments arriving in pieces over several trips, suppliers sending too much, pallets arriving crushed, and two clerks working the same PO at the same time. The demo is the real API — not a mock.",
      how: [
        "Java 17 + Spring Boot over MyBatis and PostgreSQL in four layers: controllers validate, services own the domain rules, mappers hold the SQL",
        "React + TypeScript front end for the clerk's side: sign in, pull up a PO, record a receipt line by line, and watch inventory move",
        "Deployed as two halves — the API on Render against a Supabase Postgres instance, the UI as a static build served alongside this portfolio",
        "Cumulative receipts capped at 110% of the ordered quantity, enforced in the service and again by database constraints, with pessimistic locking so concurrent clerks can't race past the ceiling",
        "Damaged units count toward received totals but never reach sellable inventory",
        "JWT auth with method-level WAREHOUSE_CLERK / VIEWER roles; clerk identity comes from the verified token, never the request body",
        "One exception handler turns every domain error into an RFC 7807 ProblemDetail, so no controller decides a status code — the UI renders those straight into field-level errors",
        "JUnit 5 + Mockito unit tests plus integration tests against an in-process PostgreSQL, so the real SQL gets exercised",
      ],
    },
  },
  {
    id: "portal-pantry",
    title: "Portal Pantry",
    short: "Interdimensional Eats",
    type: "web",
    mark: "portal",
    shot: "/projects/portal-pantry.webp",
    description:
      "Food delivery across dimensions: dimension filters, photo menus, a live cart, and a portal-powered checkout. Two roles on a real Node + SQLite backend (or a zero-setup in-browser mock). Customers order, track, and review; owners run menus, a live order queue, and server-computed payouts.",
    highlight: "Live demo · order across the multiverse",
    tech: ["React", "TypeScript", "Node.js", "Express", "Vite", "Vitest", "SQLite"],
    links: { github: "https://github.com/Davidzent/Portal-Pantry", demo: "/portal-pantry/" },
    details: {
      what: "A food-delivery platform played completely straight, except the restaurants span the multiverse. Browse by dimension, build a cart from photo menus, and check out through a portal. It ships two full roles: customers order, track their history, and leave reviews; owners manage menus, work a live order queue, and get payouts computed for them.",
      how: [
        "React + TypeScript front end on Vite, with dimension filters and a live cart",
        "Node + Express + SQLite REST API, or a zero-setup in-browser mock so the demo runs with no backend at all",
        "Role-based flows: customer ordering, history, and reviews vs. owner menus and order-queue management",
        "Order totals and owner payouts are computed server-side, never trusted from the client",
        "Vitest suite covering cart math and API behavior",
      ],
    },
  },
  {
    id: "simmer",
    title: "Simmer",
    short: "Recipe Finder",
    type: "web",
    mark: "simmer",
    shot: "/projects/simmer.webp",
    description:
      "A standalone recipe site on TheMealDB API: search dishes by name, browse categories, hunt by main ingredient, or shuffle random meals, with check-off ingredient lists and step-by-step methods.",
    highlight: "Live demo · try it now",
    tech: ["React", "TypeScript", "REST APIs", "Vite"],
    links: { github: "https://github.com/Davidzent/Simmer", demo: "/simmer/" },
    details: {
      what: "A recipe finder for the nightly \"what do I cook\" problem. Search dishes by name, browse categories, hunt by the main ingredient you already have, or shuffle a random meal when you can't decide. Every recipe opens into a working cook view.",
      how: [
        "React + TypeScript on Vite, talking directly to TheMealDB REST API",
        "Four ways in: name search, category browsing, ingredient hunt, and random shuffle",
        "Check-off ingredient lists so you can tick items while you cook",
        "Methods split into numbered step-by-step instructions",
      ],
    },
  },
  {
    id: "cooking",
    title: "Multiplayer Cooking Game",
    short: "Unity · in development",
    type: "game",
    mark: "cooking",
    description:
      "An Overcooked-inspired co-op cooking game built solo in Unity: recipe classification, player actions, and NPC routing designed as a clean, scalable C# architecture, with every 3D asset modeled in Blender. Currently extending it to real-time multiplayer.",
    highlight: "In development · sole developer",
    tech: ["Unity", "C#", "Blender", "OOP architecture"],
    links: {},
    details: {
      what: "An Overcooked-inspired co-op cooking game: run a kitchen, combine ingredients into recipes, and serve orders before the timer eats you. Built entirely solo in Unity, meaning the code, the game design, and every 3D asset.",
      how: [
        "Clean C# architecture with recipe classification, player interactions, and NPC routing as separate, scalable systems",
        "Every 3D asset modeled in Blender and brought into Unity by hand",
        "Single-player systems currently being extended to real-time multiplayer",
      ],
    },
  },
  {
    id: "restaurant",
    title: "Restaurant Platform",
    short: "Full-stack ordering",
    type: "web",
    mark: "restaurant",
    description:
      "A full-stack restaurant ordering platform: menu browsing, cart management, and checkout. Angular frontend backed by a Java Spring Boot REST API with PostgreSQL persistence.",
    highlight: "JUnit coverage · Postman-validated endpoints",
    tech: ["Angular", "TypeScript", "Spring Boot", "PostgreSQL", "REST APIs"],
    links: { github: "https://github.com/Davidzent/Restaurant_Store_Application" },
    details: {
      what: "A full-stack restaurant ordering platform: browse the menu, manage a cart, and check out. Deliberately the boring-reliable kind of system a real restaurant would actually run.",
      how: [
        "Angular + TypeScript front end over a Java Spring Boot REST API",
        "PostgreSQL persistence behind Spring data access",
        "JUnit tests on the API layer; every endpoint validated with Postman",
      ],
    },
  },
  {
    id: "neural",
    title: "Flappy Bird AI",
    short: "Neural net from scratch",
    type: "game",
    mark: "neural",
    description:
      "A feedforward neural network written from scratch in Java, no ML libraries, evolved with a genetic algorithm (selection, crossover, mutation) until the agent mastered Flappy Bird across hundreds of generations.",
    highlight: "Custom fitness function · real-time game-state pipeline",
    tech: ["Java", "Neural networks", "Genetic algorithms", "OOP"],
    links: { github: "https://github.com/Davidzent/Neural-Network" },
    details: {
      what: "A neural network that taught itself Flappy Bird. Written from scratch in Java with zero ML libraries, then evolved with a genetic algorithm until, hundreds of generations later, the agent flies better than I do.",
      how: [
        "Feedforward network implemented by hand: layers, weights, activations, forward pass",
        "Genetic algorithm evolves the population through selection, crossover, and mutation",
        "A custom fitness function scores each bird from a real-time game-state pipeline",
        "The whole learning loop is hand-written Java, no frameworks anywhere",
      ],
    },
  },
  {
    id: "tetris",
    title: "Tetris",
    short: "Accounts + leaderboard",
    type: "game",
    mark: "tetris",
    description:
      "Browser-based Tetris with a full SQL-backed user system: hashed credential authentication, session management, and a persistent global leaderboard ranked across difficulty levels.",
    highlight: "A game and a full-stack app in one",
    tech: ["JavaScript", "HTML & CSS", "SQL", "Authentication"],
    links: { github: "https://github.com/Davidzent/Tetris" },
    details: {
      what: "Classic browser Tetris wrapped in a real full-stack app: make an account, log in, and fight for a spot on a persistent global leaderboard. A game on the surface, a complete auth system underneath.",
      how: [
        "Game loop, piece logic, and rendering written in vanilla JavaScript",
        "SQL-backed user system with hashed credentials and session management",
        "Global leaderboard persists across sessions, ranked per difficulty level",
      ],
    },
  },
];

/* ── Journey (side-scroll timeline) ────────────────────────── */

export interface Checkpoint {
  year: string;
  title: string;
  org: string;
  type: "work" | "quest";
  points: string[];
}

export const journey: Checkpoint[] = [
  {
    year: "2022",
    title: "Software Engineer",
    org: "Revature",
    type: "work",
    points: [
      "Enterprise training program; placed at Cognizant.",
      "Contributed to 12+ full-stack projects in Java, Spring, Angular, and Node.",
      "Led a team of 5 inside a 15-person cross-functional group.",
    ],
  },
  {
    year: "2022",
    title: "Software Engineer",
    org: "Cognizant",
    type: "work",
    points: [
      "Built RESTful microservices in Java / Spring Boot for enterprise apps.",
      "Owned Jenkins CI/CD pipelines end to end, +25% delivery velocity.",
      "Shipped a production MVP three days ahead of a four-week deadline.",
    ],
  },
  {
    year: "2023",
    title: "Side quest: Flappy Bird AI",
    org: "Self-directed",
    type: "quest",
    points: [
      "Wrote a neural network from scratch in Java, no ML libraries.",
      "Evolved it with a genetic algorithm until it beat the game.",
    ],
  },
  {
    year: "2023",
    title: "Full-Stack Developer",
    org: "Freelance",
    type: "work",
    points: [
      "Architected and shipped full-stack apps for 5+ clients on GCP.",
      "Docker-based CI/CD cut deployment cycles by 50%.",
      "Built secure OAuth 2.0 / JWT flows and reusable component libraries.",
    ],
  },
  {
    year: "Now",
    title: "Building a multiplayer cooking game",
    org: "Solo, in Unity",
    type: "quest",
    points: [
      "Designing gameplay systems in C#, modeling every asset in Blender.",
      "Extending single-player systems to real-time multiplayer.",
    ],
  },
];

/* ── Contact (quest board) ─────────────────────────────────── */

export const contact = {
  kicker: "New quest available",
  heading: "Press start to co-op",
  blurb:
    "I'm open to full-time roles, freelance work, and interesting collaborations, web or games, in Riverside or fully remote. Drop a line and I'll get back within a day or two.",
  note: "// usually responds within 48 hours",
};

/* ── Footer (terminal easter egg) ──────────────────────────── */

export const terminal = {
  command: "whoami --full",
  output: [
    "david guijosa · full-stack + game developer",
    "location: riverside, ca · remote-friendly",
    "status: open to work · press ↑ for more",
  ],
  hint: "type `help` and hit enter",
};
