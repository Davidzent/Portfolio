export const site = {
  /** Short name used in the navbar brand and terminal. */
  name: "David",
  fullName: "David Guijosa",
  role: "Full-Stack Developer & Game Developer",
  tagline:
    "I build end-to-end web applications and games — secure APIs, cloud-deployed microservices, responsive frontends, and gameplay systems in Unity. Three years of shipping software that holds up in production.",
  email: "davidgin641@gmail.com",
  location: "Riverside, CA — remote friendly",
  availability: "Open to work",
  /** Served from public/resume.pdf. */
  resumeUrl: "/resume.pdf",
  /** The site is hosted at zntsns.com — shown in the navbar brand & footer. */
  domain: "zntsns.com",
  brand: { base: "znt", accent: "sns" },
  socials: {
    github: "https://github.com/Davidzent",
    linkedin: "https://www.linkedin.com/in/davidguijosa/",
  },
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const about = {
  paragraphs: [
    "I'm a full-stack software engineer from Riverside, California, working across the whole stack: Angular and React frontends, Java / Spring Boot and Node.js services, and the PostgreSQL databases, Docker containers, and CI/CD pipelines that carry them to production on Google Cloud.",
    "When I'm not shipping client work, I build games. I'm currently the sole developer of a multiplayer cooking game in Unity — designing the gameplay systems in C# and modeling the 3D assets in Blender myself. I've also written a neural network from scratch in Java and evolved it with a genetic algorithm until it played Flappy Bird better than I can.",
    "Before going independent I built Java microservices and Jenkins pipelines for enterprise clients at Cognizant, where I learned that reliability, testing, and clear communication matter as much as clever code. I bring that discipline to everything I build — for users and for players.",
  ],
  facts: [
    { icon: "map-pin", label: "Based in", value: "Riverside, CA" },
    { icon: "briefcase", label: "Experience", value: "3+ years building software" },
    {
      icon: "graduation",
      label: "Education",
      value: "A.S. Computer Science — Riverside City College",
    },
    { icon: "mail", label: "Availability", value: "Full-time roles & freelance" },
  ],
  stats: [
    { value: "3+", label: "Years experience" },
    { value: "5+", label: "Freelance clients" },
    { value: "12+", label: "Projects built" },
    { value: "1", label: "Game in development" },
  ],
};

export interface SkillGroup {
  icon: string;
  title: string;
  blurb: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    icon: "code",
    title: "Frontend",
    blurb: "Responsive, accessible interfaces in Angular and React.",
    skills: [
      "Angular",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5 & CSS3",
      "Responsive UI",
      "Reusable components",
      "API integration",
    ],
  },
  {
    icon: "server",
    title: "Backend",
    blurb: "Java and Node.js services built to scale — secure, tested, observable.",
    skills: [
      "Java",
      "Spring Boot",
      "Node.js",
      "REST APIs",
      "Microservices",
      "OAuth 2.0 / JWT",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    icon: "gamepad",
    title: "Game Development",
    blurb:
      "Gameplay systems, game AI, and original 3D assets — currently building a multiplayer cooking game.",
    skills: [
      "Unity",
      "C#",
      "C++",
      "Blender",
      "Gameplay systems",
      "Game AI",
      "Neural networks",
      "OOP architecture",
    ],
  },
  {
    icon: "wrench",
    title: "Cloud & DevOps",
    blurb: "From commit to production on GCP — automated, tested, repeatable.",
    skills: [
      "Google Cloud (GCP)",
      "Docker",
      "Jenkins",
      "CI/CD",
      "SonarCloud",
      "Git & GitHub",
      "Postman",
      "JUnit",
      "Agile / Scrum",
    ],
  },
];

export type ProjectType = "web" | "game";

export interface Project {
  title: string;
  type: ProjectType;
  description: string;
  /** Short mono-spaced line under the description — metrics, awards, status. */
  highlight?: string;
  tech: string[];
  github?: string;
  demo?: string;
  /** Optional screenshot (put files in public/ and use e.g. "/shots/cooking.png").
   *  Cards without an image get generated cover art from their `hue`. */
  image?: string;
  /** Optional logo badge drawn on the cover (see components/ProjectLogos.tsx). */
  logo?: string;
  /** Hue (0–360) for the generated cover art when no image is set. */
  hue: number;
}

export const projects: Project[] = [
  {
    title: "Simmer — Recipe Finder",
    type: "web",
    description:
      "A standalone recipe site built on TheMealDB API — search dishes by name, browse categories, hunt by main ingredient, or shuffle random meals, with check-off ingredient lists and step-by-step methods.",
    highlight: "Live demo — try it now",
    tech: ["React", "TypeScript", "REST APIs", "Vite"],
    demo: "/simmer/",
    logo: "simmer",
    hue: 95,
  },
  {
    title: "Portal Pantry — Interdimensional Eats",
    type: "web",
    description:
      "Uber Eats for the multiverse — dimension filters, menus, a live cart, and a portal-powered checkout, plus mock-API auth with two roles: customers get order history, store owners get a dashboard to rename dishes, change prices, and delist items.",
    highlight: "Live demo — order across the multiverse",
    tech: ["React", "TypeScript", "Vite", "CSS animations"],
    demo: "/portal-pantry/",
    logo: "portal-pantry",
    hue: 285,
  },
  {
    title: "Multiplayer Cooking Game",
    type: "game",
    description:
      "Overcooked-inspired co-op cooking game built solo in Unity — recipe classification, player actions, and NPC routing designed as a clean, scalable C# architecture, with all 3D assets modeled in Blender. Currently extending it to real-time multiplayer.",
    highlight: "In development · sole developer — code, design & 3D art",
    tech: ["Unity", "C#", "Blender", "OOP architecture"],
    hue: 25,
  },
  {
    title: "Restaurant Web Application",
    type: "web",
    description:
      "Full-stack restaurant ordering platform with menu browsing, cart management, and checkout — an Angular frontend backed by a Java Spring Boot REST API with PostgreSQL persistence.",
    highlight: "JUnit test coverage · Postman-validated endpoints",
    tech: ["Angular", "TypeScript", "Spring Boot", "PostgreSQL", "REST APIs"],
    github: "https://github.com/Davidzent/Restaurant_Store_Application",
    logo: "restaurant",
    hue: 210,
  },
  {
    title: "Neural Network — Flappy Bird AI",
    type: "game",
    description:
      "A feedforward neural network written from scratch in Java — no ML libraries — evolved with a genetic algorithm (selection, crossover, mutation) until the agent mastered Flappy Bird across hundreds of generations.",
    highlight: "Custom fitness function · real-time game-state pipeline",
    tech: ["Java", "Neural networks", "Genetic algorithms", "OOP"],
    github: "https://github.com/Davidzent/Neural-Network",
    logo: "flappy-bird",
    hue: 130,
  },
  {
    title: "Tetris — Accounts & Leaderboard",
    type: "game",
    description:
      "Browser-based Tetris with a full SQL-backed user system: hashed credential authentication, session management, and a persistent global leaderboard ranked across difficulty levels.",
    highlight: "A game and a full-stack app in one",
    tech: ["JavaScript", "HTML & CSS", "SQL", "Authentication"],
    github: "https://github.com/Davidzent/Tetris",
    logo: "tetris",
    hue: 260,
  },
];

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export const experience: Experience[] = [
  {
    role: "Full-Stack Software Developer",
    company: "Freelance",
    period: "Jun 2023 — Present",
    points: [
      "Architected and deployed full-stack web applications for 5+ clients using Angular, TypeScript, and Node.js — containerized on GCP with Docker-based CI/CD pipelines, reducing deployment cycles by 50%.",
      "Built secure OAuth 2.0 / JWT authentication flows, reusable Angular component libraries, and RESTful API integrations that improved cross-client code reuse.",
      "Designed responsive UIs with dynamic form validation and third-party API integrations to enhance usability and customer engagement.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Cognizant Technology Solutions",
    period: "Apr 2022 — Apr 2023",
    points: [
      "Developed RESTful microservices in Java and Spring Boot handling authentication, authorization, and core business logic for enterprise applications — with JUnit tests and SonarCloud static analysis.",
      "Built and owned Jenkins CI/CD pipelines end to end, improving team delivery velocity by 25%; automated email notification services cut manual operational workload by 40%.",
      "Delivered a production MVP three days ahead of a four-week deadline through modular Spring Boot architecture and proactive stakeholder communication.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Revature",
    period: "Jan 2022 — Apr 2023",
    points: [
      "Enterprise-focused training program; placed at Cognizant Technology Solutions.",
      "Contributed to 12+ full-stack projects in Java, Spring Boot, Angular, Node.js, and PostgreSQL within Agile teams — led a team of 5 developers inside a 15-person cross-functional group.",
      "Implemented REST APIs, relational database schemas, and Angular frontend components across concurrent sprints, consistently meeting milestone deadlines.",
    ],
  },
];

export const contact = {
  heading: "Let's build something together",
  blurb:
    "I'm currently open to full-time roles, freelance projects, and interesting collaborations — web or games, in Riverside or fully remote. My inbox is always open, and I'll get back to you within a day or two.",
  note: "// usually responds within 48 hours",
};
