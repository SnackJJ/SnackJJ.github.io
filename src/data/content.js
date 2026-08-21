/**
 * Single source of truth for all site copy.
 * Sourced from the candidate profile in /mnt/d/dev/oppo-radar.
 */

export const profile = {
  name: "Zeqing Jiang",
  monogram: "ZJ",
  email: "zeqing.jiang@tum.de",
  location: "Munich, Germany",
  github: "https://github.com/SnackJJ",
  linkedin: "https://www.linkedin.com/in/zeqing-jiang/",
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  greeting: "Hi, my name is",
  name: "Zeqing Jiang.",
  tagline: "I turn large language models into reliable agents.",
  intro:
    "I'm an M.Sc. Mathematics in Data Science candidate at TUM focused on agent harnesses, agentic RAG and small-model post-training. I like problems where correctness is checkable: deterministic gates around a model that chooses and narrates, retrieval that stays evidence-backed, and RL that makes a 4B model a dependable tool user.",
  primaryCta: { label: "View My Work", href: "#projects" },
  secondaryCta: { label: "Get In Touch", href: "#contact" },
};

export const about = {
  title: "About Me",
  paragraphs: [
    "Hello! I'm Zeqing, an engineer-researcher based in Munich who enjoys making small language models do real, verifiable work. My route into machine learning ran through mathematics — a B.Sc. in Mathematics at China Agricultural University, now an M.Sc. in Mathematics in Data Science at TUM — with coursework spanning deep learning, reinforcement learning, probabilistic ML and optimization.",
    "My work sits at the intersection of LLM systems and reliability engineering. On NutriBuddy I built a framework-free TypeScript agent harness where deterministic code owns facts, numeric provenance and state mutations while the model only chooses tools and narrates. On NutriMind I'm post-training Qwen3-4B with SFT and multi-turn RL (GRPO/GiGPO), studying step-level credit assignment and iterated reward design for agentic tasks.",
    "As an AI-enablement intern at Tencent IEG, I designed multi-stage agent workflows — self-built MCP servers, hybrid retrieval with source-aware rank fusion, evaluation-driven recovery — that cut a vendor-screening workflow from roughly 30 minutes to 5. When a system can't show its evidence, I don't ship it.",
  ],
  skillsTitle: "Technologies I work with",
  skills: [
    "Python",
    "TypeScript",
    "PyTorch",
    "Hugging Face Transformers",
    "peft / LoRA / Unsloth",
    "veRL / TRL — GRPO · GiGPO",
    "vLLM",
    "Hybrid RAG — ChromaDB · BM25",
    "FastMCP / Function Calling",
    "Next.js / React",
    "Supabase / PostgreSQL",
    "Docker / Linux / Azure",
  ],
};

export const experience = [
  {
    company: "Tencent IEG",
    role: "Procurement Business Intern — AI Enablement",
    range: "Jan 2026 – Jun 2026",
    location: "Shenzhen, China",
    summary:
      "Bottom-up AI enablement for procurement: identified pain points myself, shipped agent workflows end to end, and drove trial adoption across the team.",
    highlights: [
      "Designed and shipped agent workflows covering the full loop — multi-source vendor discovery, evidence retrieval and evaluation, through to decision reports — adopted for trial use within the department.",
      "Built a vendor-screening agent with hybrid multi-view retrieval (dense BGE-M3 + sparse BM25 + tag match), source-aware weighted rank fusion and cross-encoder reranking that prioritizes evidence-backed candidates.",
      "Implemented evaluation-driven recovery: when retrieval quality drops, the system switches strategies within bounds (query rewriting, HyDE-style reformulation) instead of relaxing evidence thresholds — cutting one screening workflow from ~30 minutes to ~5 minutes.",
      "Built a multi-source sourcing agent that routes heterogeneous channels by industry and geography, with quality gates and durable task state; a Chrome extension isolates authenticated and anti-bot sources so rate limits never pollute the agent decision loop.",
      "Shipped 10+ reusable AI skills for recurring procurement tasks (clause comparison, structured extraction, form automation) and self-built FastMCP servers exposing ~17 structured tools to internal LLM agents.",
    ],
  },
  {
    company: "Independent Projects",
    role: "AI/ML Engineer & Researcher — Self-directed",
    range: "Feb 2026 – Present",
    location: "Munich, Germany",
    summary:
      "Two long-running open-source systems built from first principles: a verifiable agent runtime and a small-model post-training lab.",
    highlights: [
      "NutriBuddy: built a framework-free TypeScript agent harness — ReAct loop, native function calling, deterministic input/tool/output gates with numeric provenance, and schema-versioned traces; 870 automated tests across 36 files pass.",
      "NutriMind: post-training Qwen3-4B for domain tool use — teacher-distilled SFT pipeline (~1.5k validated trajectories), LoRA fine-tuning, and environment-in-the-loop multi-turn RL with GRPO/GiGPO step-level credit assignment under reward designs iterated v1 → v3.",
      "Engineered hybrid RAG over a curated nutrition knowledge base (contextual retrieval + semantic + lexical + reranker) and a T1–T4 agentic-complexity taxonomy that doubles as the SFT data distribution and the RL evaluation suite.",
    ],
  },
];

export const featuredProjects = [
  {
    id: "nutribuddy",
    eyebrow: "Featured Project",
    title: "NutriBuddy — Verifiable Agent Harness",
    description:
      "A framework-free TypeScript agent harness that confines the model to selection and narration while deterministic code owns facts, numeric provenance and state mutations. Typed input/tool/output gates enforce schema validity, conflict checks and allergen safety with bounded regenerate-then-refuse; schema-versioned traces make every decision auditable and enable zero-LLM-cost regression testing.",
    tech: ["TypeScript", "Next.js", "Supabase", "PostgreSQL", "Function Calling", "Vitest", "Zod"],
    links: { github: "https://github.com/SnackJJ/NutriBuddy" },
    stats: ["870 tests passing", "0 frameworks", "Full audit trail"],
  },
  {
    id: "nutrimind",
    eyebrow: "Featured Project",
    title: "NutriMind — 4B LLM Post-Training (SFT + RL)",
    description:
      "A research system exploring how far RL can push a 4B model as a reliable domain agent. Hybrid RAG over a curated nutrition KB feeds a teacher-distilled SFT pipeline (~1.5k validated trajectories) fine-tuned onto Qwen3-4B with LoRA; multi-turn tool-use RL runs in veRL with GRPO and GiGPO head-to-head ablations on step-level credit assignment across reward designs v1 → v3.",
    tech: ["Python", "PyTorch", "veRL", "GRPO / GiGPO", "LoRA", "vLLM", "ChromaDB"],
    links: { github: "https://github.com/SnackJJ/NutriMind" },
    stats: ["Qwen3-4B + LoRA", "7-dim reward design", "GiGPO vs GRPO ablation"],
  },
  {
    id: "adaptive-english",
    eyebrow: "Featured Project",
    title: "Personalized Adaptive English Teacher",
    description:
      "TUM GenAI course project (team of 6): a React + Flask learning platform covering reading, writing, speaking, vocabulary and dialogue. I owned the FAISS hybrid recommender (5-factor weighted scoring over sentence embeddings), the Gemini article-labeling service whose Pydantic schema enforcement cut malformed LLM output from ~15% to <3%, and a character-level span-rendering algorithm for the dual-mode reader.",
    tech: ["Python", "Flask", "FAISS", "Gemini API", "Pydantic", "React"],
    links: {},
    stats: ["5-factor recommender", "15% → <3% malformed output", "Team of 6"],
  },
];

export const otherProjects = [
  {
    title: "Deep Generative Models from Scratch",
    description:
      "VAE, normalizing flows and DDPM implemented and trained in PyTorch from first principles, with FID-based quantitative comparison of generation quality across the three families.",
    tech: ["Python", "PyTorch"],
    links: {},
  },
  {
    title: "Distributed Query Engine on Azure",
    description:
      "C++ distributed query execution engine with multi-worker coordination via heartbeats over shared state, partitioned aggregation pipelines, elastic scaling and fault tolerance on Azure.",
    tech: ["C++", "Azure"],
    links: {},
  },
  {
    title: "JL Lemma × Restricted Isometry",
    description:
      "17-page seminar report for TUM's Mathematics of Data Science, working through both directions of the equivalence between Johnson–Lindenstrauss embedding and RIP, including Krahmer–Ward's randomized-column improvement.",
    tech: ["LaTeX", "Random Matrix Theory"],
    links: {},
  },
];

export const contact = {
  eyebrow: "What's Next?",
  title: "Get In Touch",
  body: "I'm currently looking for research internships, industry master's theses and PhD opportunities in agentic AI, reinforcement learning and LLM post-training. If that overlaps with what you're working on — or you just want to talk agent reliability — my inbox is always open.",
  cta: "Say Hello",
};
