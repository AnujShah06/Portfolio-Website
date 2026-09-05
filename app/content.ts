export const hero = {
  greetingPrefix: "hi,",
  name: "anuj",
  greetingSuffix: "here.",
};

/** Rotating role line under the greeting. */
export const roles: string[] = [
  "ML systems engineer",
  "defense tech builder",
  "self-supervised learning researcher",
  "streaming data architect",
  "purdue cs '28",
];

export const profile = {
  school: "Purdue University",
  degree: "B.S. Computer Science",
  grad: "May 2028",
  gpa: "3.78",
  location: "West Lafayette, IN",
  citizenship: "US Citizen",
  clearance: "Active Secret Clearance",
  objective:
    "Seeking a software / machine learning internship in the defense industry.",
};

export const links = {
  email: "mailto:anujshah7567@gmail.com",
  emailSchool: "mailto:shah1054@purdue.edu",
  github: "https://github.com/AnujShah06",
  linkedin: "https://www.linkedin.com/in/anuj-shah107/",
};

/** Small HUD chips rendered next to the hero. */
export const statusChips = [
  { label: "US Citizen", tone: "cyan" },
  { label: "Active Secret Clearance", tone: "cyan" },
  { label: "West Lafayette, IN", tone: "dim" },
  { label: "Open to Summer '27", tone: "green" },
];

/** Animated counters in the hero telemetry strip. */
export const telemetry = [
  { value: 3.78, decimals: 2, suffix: "", label: "GPA / Purdue CS" },
  { value: 1, decimals: 0, suffix: "M+", label: "data points modeled" },
  { value: 13, decimals: 0, suffix: "K+", label: "documents indexed" },
  { value: 35, decimals: 0, suffix: "×", label: "LLM cost reduction" },
  { value: 7420, decimals: 0, suffix: "", label: "unlabeled images trained" },
];

export const skillGroups = [
  {
    name: "languages",
    items: ["Python", "Java", "C", "R", "SQL"],
  },
  {
    name: "ml / ai",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Hugging Face Transformers",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "SHAP",
      "MLflow",
    ],
  },
  {
    name: "data",
    items: [
      "pandas",
      "NumPy",
      "Matplotlib",
      "PySpark",
      "Databricks",
      "Kafka",
      "Flink",
      "Apache Iceberg",
      "PostgreSQL",
      "pgvector",
    ],
  },
  {
    name: "platform",
    items: [
      "AWS Bedrock",
      "AWS ECS",
      "Terraform",
      "Docker",
      "FastAPI",
      "Git",
      "Linux",
      "OpenTelemetry",
      "Agile",
    ],
  },
  {
    name: "focus",
    items: ["LLMs", "RAG", "NLP", "MLOps", "Self-Supervised Learning"],
  },
];

/** Flat ticker feed for the marquee. */
export const skillTicker: string[] = skillGroups.flatMap((g) => g.items);

export const coursework = [
  "Data Mining and Machine Learning",
  "Applied Regression Analysis",
  "Probability and Statistics",
  "Data Structures and Algorithms",
  "Linear Algebra",
  "Operating Systems",
  "Programming in C",
  "Object-Oriented Programming",
  "Relational Databases",
  "Competitive Programming",
];

export const credentials = [
  {
    title: "Purdue Presidential Scholarship",
    detail: "Merit award, Purdue University",
  },
  {
    title: "Active Secret Clearance",
    detail: "US Citizen · Department of War sponsored",
  },
  {
    title: "Computer Vision Target Localization — Team Lead",
    detail: "Purdue National Security and Defense Society",
  },
  {
    title: "Teaching Assistant",
    detail: "Data Structures and Algorithms · Programming in C",
  },
  {
    title: "FCC Amateur Radio Technician License",
    detail: "Licensed operator",
  },
];

export const experience = [
  {
    org: "Stealth Startup | Defense Market Intelligence SaaS",
    orglabel: "Stealth Startup",
    role: "ML Systems Engineer Intern (CUI)",
    time: "July 2026 — Present",
    location: "Quantico, VA",
    highlights: [
      "Architected OSINT ingestion over 50+ RSS/GDELT sources with an SSRF-safe fetcher, MinHash dedup, and 8K+ article clustering",
      "Built pgvector + BM25 hybrid retrieval with MiniLM embeddings and tenant-scoped dismissals feeding a gpt-oss-20b LLM judge",
      "Cut LLM profile ingestion cost to 1/35th by migrating to AWS Bedrock; shipped token telemetry and CI golden-set evals",
      "Deployed FastAPI and PostgreSQL services on AWS ECS via Terraform with SQLAlchemy and Alembic schema migrations",
    ],
    stack: ["pgvector", "AWS Bedrock", "FastAPI", "Terraform", "PostgreSQL"],
    links: [],
  },
  {
    org: "U.S. Marine Corps Systems Command | Department of War",
    orglabel: "USMC SysCom",
    role: "MLOps Intern (Secret / CUI)",
    time: "June 2026 — August 2026",
    location: "Quantico, VA",
    highlights: [
      "Built a machine learning prediction system processing 1M+ data points for decision support with PySpark on Databricks",
      "Improved evaluation reliability across AutoML, XGBoost, and LightGBM models by implementing GroupKFold cross-validation",
      "Deployed a decision support dashboard with SHAP explainability and real-time probability scoring for mission planners",
      "Transitioned models from prototype to production with MLflow experiment tracking and temporal leakage prevention",
    ],
    stack: ["PySpark", "Databricks", "MLflow", "SHAP", "XGBoost"],
    links: [],
  },
  {
    org: "Independent Research | Self-Supervised Energy-Based Coherence Model",
    orglabel: "JEPA Research",
    role: "Independent Researcher",
    time: "May 2026 — Present",
    location: "West Lafayette, IN",
    highlights: [
      "Trained a self-supervised JEPA energy model in PyTorch on 7,420 unlabeled images, flagging incoherent inputs at 0.70 AUROC",
      "Benchmarked MAE, contrastive, and PMI baselines with multi-seed ablations, isolating training duration over model capacity",
      "Transferred the frozen encoder to label-scarce classification, beating from-scratch training in 12 of 12 evaluation cells",
      "Implemented Set Transformer encoders for anomaly detection and tracked the full scaling study in Weights & Biases",
    ],
    stack: ["PyTorch", "JEPA", "Set Transformer", "Weights & Biases"],
    links: [],
  },
  {
    org: "Team ACP Racing | World Racing League",
    orglabel: "Team ACP Racing",
    role: "Race Systems Engineer",
    time: "September 2025 — May 2026",
    location: "Indianapolis, IN",
    highlights: [
      "Architected an event-driven streaming pipeline in Kafka and Flink ingesting live telemetry with exactly-once processing",
      "Built a feature store materializing 15+ performance features, unifying real-time serving with historical model training",
      "Structured a bronze-silver-gold lakehouse on Apache Iceberg with OpenTelemetry observability across live race events",
      "Served time-series race strategy features to team engineers through REST APIs secured with OAuth 2.0 authentication",
    ],
    stack: ["Kafka", "Flink", "Apache Iceberg", "OpenTelemetry", "OAuth 2.0"],
    links: [],
  },
  {
    org: "Purdue Data Mine @ V2X Security",
    orglabel: "V2X Security",
    role: "Undergraduate Data Science Researcher",
    time: "August 2024 — June 2025",
    location: "West Lafayette, IN",
    highlights: [
      "Developed a defense maintenance-troubleshooting LLM chatbot reaching 90% intent classification accuracy with cited answers",
      "Engineered a hybrid retrieval-augmented generation (RAG) pipeline over 13,000+ documents with dense embeddings and BM25",
      "Built an OCR-to-embedding ingestion pipeline with Tesseract and contextual chunking, evaluated on RAGAS faithfulness",
      "Fine-tuned BERT and Llama models with transfer learning and integrated them into a React interface with audio/image inputs",
    ],
    stack: ["Hugging Face Transformers", "PyTorch", "RAG", "Tesseract OCR"],
    links: [],
  },
  {
    org: "HH Development | Motorsports Software",
    orglabel: "HH Development",
    role: "Machine Learning Product Engineer",
    time: "June 2025 — September 2025",
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
    stack: ["Bambu Lab Studio", "Chemometrics", "Experimental Design"],
    links: [],
  },
  {
    org: "CS251 — Data Structures and Algorithms",
    orglabel: "CS251",
    role: "Teaching Assistant",
    time: "August 2026 — Present",
    location: "West Lafayette, IN",
    highlights: [
      "Ran lab sections on core data structures — trees, hash tables, graphs — and the algorithmic analysis behind them",
      "Held office hours walking students through algorithm design, asymptotic reasoning, and debugging their own implementations",
      "Graded and gave written feedback on projects, focusing on correctness, complexity, and readable structure",
    ],
    stack: ["Java", "Algorithms", "Mentoring"],
    links: [],
  },
  {
    org: "CS240 — Programming in C",
    orglabel: "CS240",
    role: "Teaching Assistant",
    time: "August 2025 — Present",
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
    org: "CS190 — Professional Practice in Computer Science",
    orglabel: "CS190",
    role: "Teaching Assistant",
    time: "August 2025 — May 2026",
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
    title: "JEPA Coherence Model",
    desc: "Self-supervised energy-based model that scores whether an image is internally coherent, with no labels at training time.",
    bullets: [
      "Trained a joint-embedding predictive architecture in PyTorch on 7,420 unlabeled images; incoherent inputs separate at 0.70 AUROC.",
      "Ran multi-seed ablations against MAE, contrastive, and PMI baselines — training duration mattered more than model capacity.",
      "Frozen encoder transferred to label-scarce classification and beat from-scratch training in all 12 evaluation cells.",
      "Set Transformer encoders for set-level anomaly detection; full scaling study tracked in Weights & Biases.",
    ],
    tags: ["PyTorch", "Self-Supervised", "Energy-Based Models", "Set Transformer", "W&B"],
    link: { label: "GitHub", href: "https://github.com/AnujShah06" },
  },
  {
    title: "Ames Housing Price Analysis",
    desc: "Statistical and ML analysis of how basement, first-floor, and second-floor square footage differently impact home prices.",
    bullets: [
      "Diagnosed multicollinearity (VIF > 100) and heteroscedasticity (Breusch-Pagan test); applied log transformation and bootstrap inference (2,000 reps) for robust standard errors.",
      "Validated with 10-fold cross-validation and Extra Sum of Squares F-tests; confirmed model generalization with identical training/CV RMSE.",
      "Extended with Ridge, Lasso, and Elastic Net regularization; expanded to 10 predictors and improved R² from 0.62 to 0.79.",
    ],
    tags: ["R", "Regression", "Bootstrap", "Regularization", "Cross-Validation"],
    link: { label: "GitHub", href: "https://github.com/AnujShah06/ML-ames-housing-analysis" },
  },
  {
    title: "Radar Signal Processing Simulator",
    desc: "Radar simulation demonstrating signal processing pipelines, target detection algorithms, and multi-target tracking with Kalman filtering.",
    bullets: [
      "Implemented 4-state Kalman filter (position + velocity) with prediction/update cycles; built track lifecycle management (tentative → confirmed → terminated) using nearest-neighbor data association.",
      "Designed modular signal processing pipeline: radar range equation → noise filtering (moving average, exponential smoothing) → SNR-based threshold detection → clustering → target classification (aircraft/ship/weather).",
      "Built interactive PPI radar display with 10 Hz animation, phosphor trail effects, and real-time track visualization; includes comprehensive test suite (5 component tests) and clean entry point with CLI arguments.",
    ],
    tags: ["Python", "NumPy", "Kalman Filter", "Signal Processing", "Matplotlib", "OOP"],
    link: { label: "GitHub", href: "https://github.com/AnujShah06/radar-simulator" },
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

export const quotes: string[] = [
  "A lifetime of glory is worth a moment of pain.",
  "You’re free to make decisions but not free from the consequences.",
  "Justice is merely a construct of the current powerbase.",
  "The only history that is worth a tinker's damn is the history we make today.",
  "Eternal vigilance is the price of liberty",
];
