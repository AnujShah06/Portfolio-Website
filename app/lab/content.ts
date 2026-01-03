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
  "Eternal vigilance is the price of liberty",
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
    title: "Ames Housing Price Analysis",
    desc: "Statistical and ML analysis of how basement, first-floor, and second-floor square footage differently impact home prices.",
    bullets: [
      "Diagnosed multicollinearity (VIF > 100) and heteroscedasticity (Breusch-Pagan test); applied log transformation and bootstrap inference (2,000 reps) for robust standard errors.",
      "Validated with 10-fold cross-validation and Extra Sum of Squares F-tests; extended with Elastic Net regularization (R² improved from 0.62 to 0.79).",
      "Modular R codebase with reproducible figures, Shapiro-Wilk normality checks, and clear documentation.",
    ],
    tags: ["R", "Regression", "Bootstrap", "Regularization", "Cross-Validation"],
    link: { label: "GitHub", href: "https://github.com/AnujShah06/ML-ames-housing-analysis" },
  },
  {
    title: "Radar Signal Processing Simulator",
    desc: "Real-time radar simulation demonstrating signal processing pipelines, target detection algorithms, and multi-target tracking with Kalman filtering.",
    bullets: [
      "Implemented 4-state Kalman filter (position + velocity) with prediction/update cycles; built track lifecycle management (tentative → confirmed → terminated) using nearest-neighbor data association.",
      "Designed modular signal processing pipeline: radar range equation → noise filtering (moving average, exponential smoothing) → SNR-based threshold detection → clustering → target classification (aircraft/ship/weather).",
      "Built interactive PPI radar display with 10 Hz animation, phosphor trail effects, and real-time track visualization; includes comprehensive test suite (5 component tests) and clean entry point with CLI arguments."
    ],
    tags: ["Python", "NumPy", "Kalman Filter", "Signal Processing", "Matplotlib", "OOP"],
    link: { label: "GitHub", href: "https://github.com/AnujShah06?tab=overview&from=2026-01-01&to=2026-01-02" }
  },
  {
    title: "Java Chat Application",
    desc: "Real-time client-server messaging system with Swing GUI and optional MySQL persistence.",
    bullets: [
      "Multi-threaded server using ConcurrentHashMap and ExecutorService for concurrent client handling; TCP sockets with Java serialization for message passing.",
      "Swing GUI with live online status indicators, chat history, and user registration; falls back to in-memory storage when database unavailable.",
      "Gradle build with configurable run tasks; supports environment-based database configuration for production deployment.",
    ],
    tags: ["Java", "Sockets", "Swing", "MySQL", "Concurrency"],
    link: { label: "GitHub", href: "https://github.com/AnujShah06/Chat-Application" },
  },
];

export const gallery = [
  { title: "Purdue x Google AI Summit", src: "/gallery/ai.png" },
  { title: "Meeting with Senator Young!", src: "/gallery/senator.png" },
  { title: "Full Access to Battle of the Bricks at IMS", src: "/gallery/ims.png" },
  { title: "Final Presentation for V2X x Data Mine", src: "/gallery/v2x.png" },
  { title: "PURDUE PETE!!!", src: "/gallery/pete.png" },
  { title: "MIRA Awards Tech Show ", src: "/gallery/mira.png" },
  { title: "Performance Racing Industry Convention", src: "/gallery/pri.png" },
  { title: "International Manufacturing and Technology Show in Chicago", src: "/gallery/imts.png" },
  { title: "First Day of College", src: "/gallery/firstday.png" },
  { title: "HS Graduation!!!", src: "/gallery/lastday.png" },
];
