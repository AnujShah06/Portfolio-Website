export const hero = {
  greetingPrefix: "hi,",
  name: "anuj",
  greetingSuffix: "here.",
};

export const links = {
  // TODO: replace these with your real links
  email: "mailto:anujshah7567@gmail.com",
  github: "https://github.com/AnujShah06",
  linkedin: "https://www.linkedin.com/in/anuj-shah107/",
};

export const quotes: string[] = [
  "A lifetime of glory is worth a moment of pain.",
  "You’re free to make decisions but not free from the consequences.",
  "Justice is merely a construct of the current powerbase.",
  "The only history that is worth a tinker's damn is the history we make today.",
];

export const experience = [
  {
    org: "Company / Lab",
    role: "Software Engineer Intern",
    time: "Summer 2025",
    location: "West Lafayette, IN",
    summaryFront:
      "Short summary goes here. Keep it concrete: what you built, who it helped, and the impact.",
    highlights: [
      "Built a feature end-to-end and shipped it.",
      "Improved performance / UX in a measurable way.",
      "Collaborated with a small team and documented decisions.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node"],
    links: [],
  },
  {
    org: "Purdue",
    role: "Research / Project",
    time: "2024 — 2025",
    location: "Purdue University",
    summaryFront:
      "Another short summary. You can keep this light and expand later with a deep-dive page.",
    highlights: [
      "Explored a problem and produced a small report / demo.",
      "Wrote clean code and made it reproducible.",
      "Presented results and collected feedback.",
    ],
    stack: ["R", "Statistics", "Data", "Visualization"],
    links: [],
  },
];

export const projects = [
  {
    title: "Stats Research Report",
    desc: "Advanced statistical methods project with an R codebase and write-up.",
    bullets: [
      "Reproducible analysis with clear assumptions and checks.",
      "Readable plots + a concise report format.",
      "Easy to extend with new datasets.",
    ],
    tags: ["R", "Stats", "Research"],
    link: null as null | { label: string; href: string },
  },
  {
    title: "UI/Tooling Prototype",
    desc: "A calm, minimal tool concept — fast, clean, and documented.",
    bullets: [
      "Focused on interaction details and polish.",
      "Optimized for readability and flow.",
      "Shipped a simple demo users can click through.",
    ],
    tags: ["React", "Next.js", "UI"],
    link: null as null | { label: string; href: string },
  },
  {
    title: "Experiment Shelf",
    desc: "Small experiments that help me learn (and stay consistent).",
    bullets: [
      "Short scoped builds I can finish quickly.",
      "Notes + learnings attached to each.",
      "A place for certificates and links.",
    ],
    tags: ["Learning", "Systems"],
    link: null as null | { label: string; href: string },
  },
];

export const gallery = [
  { title: "hackathon" },
  { title: "travel" },
  { title: "campus" },
  { title: "friends" },
  { title: "builds" },
  { title: "coffee" },
  { title: "misc" },
];
