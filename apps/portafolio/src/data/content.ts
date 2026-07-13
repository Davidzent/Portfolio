/* ─────────────────────────────────────────────────────────────
   zntsns.com — single content source of truth.
   Everything editable lives here: copy, links, projects, skills,
   the hero code, the journey timeline, the terminal easter egg.
   Swap in real values and the sections pick them up.
   ───────────────────────────────────────────────────────────── */

export const site = {
  name: "David",
  fullName: "David Guijosa",
  role: "Full-Stack Developer, leveling into Game Dev",
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
 *  driven by these token kinds. It reads as real TypeScript about David. */
export const heroCode: CodeLine[] = [
  { tokens: [["const", "kw"], [" david", "var"], [" = ", "punct"], ["{", "punct"]] },
  { indent: 1, tokens: [["role", "plain"], [": ", "punct"], ['"full-stack dev"', "str"], [",", "punct"]] },
  { indent: 1, tokens: [["stack", "plain"], [": ", "punct"], ["[", "punct"], ['"React"', "str"], [", ", "punct"], ['"Node"', "str"], [", ", "punct"], ['"Spring"', "str"], ["]", "punct"], [",", "punct"]] },
  { indent: 1, tokens: [["nowPlaying", "plain"], [": ", "punct"], ['"Unity + C#"', "str"], [",", "punct"]] },
  { tokens: [["}", "punct"]] },
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
  eyebrow: "znt // full-stack   ·   sns // game engine",
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
  /** Set to a real portrait path (e.g. "/portrait.jpg") to replace the placeholder. */
  photo: "",
  photoAlt: "David Guijosa",
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
  | "portal"
  | "simmer"
  | "cooking"
  | "restaurant"
  | "neural"
  | "tetris";

export interface Project {
  id: string;
  title: string;
  short: string;
  type: ProjectType;
  mark: MarkId;
  /** One-line "preview" shown on hover, arcade blurb voice. */
  preview: string;
  description: string;
  highlight?: string;
  tech: string[];
  links: { github?: string; demo?: string };
}

export const projects: Project[] = [
  {
    id: "portal-pantry",
    title: "Portal Pantry",
    short: "Interdimensional Eats",
    type: "web",
    mark: "portal",
    preview: "Uber Eats for the multiverse. Two roles, live cart, portal checkout.",
    description:
      "Food delivery across dimensions: dimension filters, photo menus, a live cart, and a portal-powered checkout. Two roles on a real Node + SQLite backend (or a zero-setup in-browser mock). Customers order, track, and review; owners run menus, a live order queue, and server-computed payouts.",
    highlight: "Live demo · order across the multiverse",
    tech: ["React", "TypeScript", "Node.js", "Express", "Vite", "Vitest", "SQLite"],
    links: { github: "https://github.com/Davidzent/Portal-Pantry", demo: "/portal-pantry/" },
  },
  {
    id: "simmer",
    title: "Simmer",
    short: "Recipe Finder",
    type: "web",
    mark: "simmer",
    preview: "Search 300+ dishes by name, ingredient, or pure chaos (random).",
    description:
      "A standalone recipe site on TheMealDB API: search dishes by name, browse categories, hunt by main ingredient, or shuffle random meals, with check-off ingredient lists and step-by-step methods.",
    highlight: "Live demo · try it now",
    tech: ["React", "TypeScript", "REST APIs", "Vite"],
    links: { github: "https://github.com/Davidzent/Simmer", demo: "/simmer/" },
  },
  {
    id: "cooking",
    title: "Multiplayer Cooking Game",
    short: "Unity · in development",
    type: "game",
    mark: "cooking",
    preview: "Overcooked-style co-op. Solo build: code, design, and 3D art.",
    description:
      "An Overcooked-inspired co-op cooking game built solo in Unity: recipe classification, player actions, and NPC routing designed as a clean, scalable C# architecture, with every 3D asset modeled in Blender. Currently extending it to real-time multiplayer.",
    highlight: "In development · sole developer",
    tech: ["Unity", "C#", "Blender", "OOP architecture"],
    links: {},
  },
  {
    id: "restaurant",
    title: "Restaurant Platform",
    short: "Full-stack ordering",
    type: "web",
    mark: "restaurant",
    preview: "Angular front, Spring Boot API, Postgres. Tested end to end.",
    description:
      "A full-stack restaurant ordering platform: menu browsing, cart management, and checkout. Angular frontend backed by a Java Spring Boot REST API with PostgreSQL persistence.",
    highlight: "JUnit coverage · Postman-validated endpoints",
    tech: ["Angular", "TypeScript", "Spring Boot", "PostgreSQL", "REST APIs"],
    links: { github: "https://github.com/Davidzent/Restaurant_Store_Application" },
  },
  {
    id: "neural",
    title: "Flappy Bird AI",
    short: "Neural net from scratch",
    type: "game",
    mark: "neural",
    preview: "A hand-built net, evolved by a genetic algorithm, beats the game.",
    description:
      "A feedforward neural network written from scratch in Java, no ML libraries, evolved with a genetic algorithm (selection, crossover, mutation) until the agent mastered Flappy Bird across hundreds of generations.",
    highlight: "Custom fitness function · real-time game-state pipeline",
    tech: ["Java", "Neural networks", "Genetic algorithms", "OOP"],
    links: { github: "https://github.com/Davidzent/Neural-Network" },
  },
  {
    id: "tetris",
    title: "Tetris",
    short: "Accounts + leaderboard",
    type: "game",
    mark: "tetris",
    preview: "Classic Tetris with hashed auth and a persistent global ladder.",
    description:
      "Browser-based Tetris with a full SQL-backed user system: hashed credential authentication, session management, and a persistent global leaderboard ranked across difficulty levels.",
    highlight: "A game and a full-stack app in one",
    tech: ["JavaScript", "HTML & CSS", "SQL", "Authentication"],
    links: { github: "https://github.com/Davidzent/Tetris" },
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
