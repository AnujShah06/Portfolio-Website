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
    org: "Team ACP Racing | World Racing League",
    orglabel: "Team ACP Racing",
    role: "Machine Learning Data Engineer",
    time: "September 2025 - Present",
    location: "Indianapolis, IN",
    highlights: [
      "Engineered Python ETL pipeline (REST APIs, WebSocket/SignalR) to capture live motorsports telemetry in 3 second intervals",
      "Designed an automated 15+ feature extraction system deriving performance metrics, enabling time series analysis for race strategy",
      "Implemented OAuth 2.0 authentication with automated token lifecycle management, securing API access for 6+ hour events",
    ],
    stack: ["ETL Pipeline", "REST APIs", "SignalIR", "Websocket"],
    links: [],
  },
  {
    org: "HH Development | Motorsports Software",
    orglabel: "HH Development",
    role: "Machine Learning Product Engineer",
    time: "June 2025 - September 2025",
    location: "Indianapolis, IN",
    highlights: [
      "Analyzed 300+ metrics using supervised learning (random forests) with k-fold cross-validation identifying critical KPIs",
      "Integrated transformer LLM to parse proprietary expression language with custom syntax trees/rules, supporting 30+ teams",
      "Built BFS-based JSON mapping tool to traverse 20+ layer trees, generating optimal dot-notation queries from user parameters",
    ],
    stack: ["NumPy", "LightGBM", "Python", "RAG"],
    links: [],
  },
  {
    org: "CS240 - Programming in C",
    orglabel: "CS240",
    role: "Teaching Assistant",
    time: "August 2025 - Present",
    location: "West Lafayette, IN",
    highlights: [
      "Led weekly lab sections reinforcing core systems concepts (pointers, memory management, structs, file I/O)",
      "Coached students through debugging and tooling workflows using GDB and Linux CLI (breakpoints, stack traces, segmentation faults, valgrind-style memory reasoning)",
      "Provided technical support at scale by hosting office hours, giving actionable feedback on assignments, and helping students develop clean coding habits",
    ],
    stack: ["C", "GDB", "Linux"],
    links: [],
  },
  {
    org: "Integrated Nanosystems Development Institute",
    orglabel: "INDI",
    role: "Research Intern",
    time: "January 2025 — June 2025",
    location: "Indianapolis, IN",
    highlights: [
      "Debugged breath-simulation setup, finding 3 discrepancies that impaired volatile compound recognition and upstream data quality",
      "Researched breath-analysis technologies, identifying innovative detection approaches for specific health markers",
      "Designed and 3D-printed custom lab molds to standardize experimental setups and ensure precise, reproducible results",
    ],
    stack: ["BamboLabs Studio", "Chemometrics", "Experimental Design"],
    links: [],
  },
  {
    org: "V2X Security @ Purdue Data Mine",
    orglabel: "V2X Security",
    role: "Undergraduate Data Science Researcher",
    time: "August 2024 — June 2025",
    location: "West Lafayette, IN",
    highlights: [
      "Developed transformer-based LLM chatbot for defense troubleshooting, achieving 90% intent classification accuracy via PyTorch",
      "Implemented RAG pipeline with sentence-level embeddings and MongoDB vector database to process 13,000+ scanned documents",
      "Utilized transfer learning to fine-tune BERT/Llama models, integrating Tesseract OCR and NLP for text extraction/preprocessing",
    ],
    stack: ["Hugging Face Transformers", "PyTorch", "NLP", "Tessaract OCR"],
    links: [],
  },
  {
    org: "CS190 - Professional Practice in Computer Science",
    orglabel: "CS190",
    role: "Teaching Assistant",
    time: "August 2025 - Present",
    location: "West Lafayette, IN",
    highlights: [
      "Taught over 120 undergraduates in weekly discussions on career preparation, resumes, interview skills, and professional branding",
      "Lectured on Spontaneous Networking and strategies college students can employ to develop their network",
    ],
    stack: ["Lecturer", "Interview Prep", "Mentoring"],
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
