/**
 * Single source of truth for all page content.
 * Facts are extracted from the Opportunity Radar fact base
 * (/mnt/d/dev/oppo-radar → profile.yaml, candidate/*.yaml).
 * Missing items are marked with `TODO:` comments.
 */

export const profile = {
  greeting: "Hi, my name is",
  name: "Zeqing Jiang",
  nameZh: "蒋泽庆",
  role: "Agent systems & machine learning",
  headline:
    "I build verifiable agent harnesses and post-train small models.",
  intro:
    "I'm a Mathematics in Data Science master's student at the Technical University of Munich, coming from a pure-math background. My focus is making LLM agents measurable and reliable: harness design, agentic RAG, evaluation & observability, and post-training small models with SFT and GRPO/GiGPO.",
  intro2:
    "I like shipping the whole stack myself — from the agent runtime and its evals, down to data pipelines and training loops. Most recently I brought that playbook into industry as an AI-enablement intern at Tencent IEG.",
  email: "zeqing.jiang@tum.de",
  location: "Munich, Germany",
  github: "https://github.com/SnackJJ",
  linkedin: "https://www.linkedin.com/in/zeqing-jiang/",
  // TODO: add resume PDF download link when available
  resumeUrl: null as string | null,
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const bio = [
  "My path into AI started in pure math — competition math, PDEs, random matrix theory — which now shows up as an obsession with making agents measurable, verifiable, and reliable rather than merely impressive.",
  "These days I work across the full agent stack: harness design (ReAct loops, native function calling, deterministic gates), agentic RAG, schema-versioned tracing and evaluation, plus post-training small models with SFT and GRPO/GiGPO. At Tencent IEG I turned that playbook into procurement agent workflows that my team actually adopted.",
  "Outside of coursework you'll find me turning research papers into running code — currently pushing a 4B model through multi-turn reinforcement learning, one reward ablation at a time.",
];

export const education = [
  {
    school: "Technical University of Munich (TUM)",
    degree: "M.Sc. Mathematics in Data Science",
    period: "2024 — 2027 (exp.)",
    note: "Deep Learning · Advanced ML (deep generative models) · Foundations of ML · JL Lemma ⇄ RIP seminar report",
  },
  {
    school: "China Agricultural University (985)",
    degree: "B.Sc. Mathematics and Applied Mathematics",
    period: "2018 — 2023",
    note: "Minor in Data Science & Big Data · 3rd Prize, 12th National College Mathematics Competition (Math A)",
  },
];

export const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "TypeScript", "C++", "SQL"],
  },
  {
    label: "Agents & LLM",
    skills: [
      "Agent Harness",
      "MCP / FastMCP",
      "Function Calling",
      "Agentic RAG",
      "Hybrid Retrieval",
      "Prompt Engineering",
    ],
  },
  {
    label: "Post-Training",
    skills: [
      "SFT",
      "GRPO / GiGPO",
      "RLHF & Reward Design",
      "LoRA / PEFT",
      "Unsloth",
      "trl / veRL",
      "vLLM",
    ],
  },
  {
    label: "Data & Infra",
    skills: [
      "PyTorch",
      "HF Transformers",
      "Pandas / NumPy",
      "ChromaDB",
      "SQLite",
      "Docker",
      "Linux",
      "Azure",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export interface ExperienceItem {
  company: string;
  url: string | null;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
}

export const experiences: ExperienceItem[] = [
  {
    company: "Tencent · IEG",
    url: null,
    role: "Procurement Business Intern — AI Enablement",
    period: "Jan 2026 — Jun 2026",
    location: "Shenzhen, China",
    bullets: [
      "Designed and shipped a vendor-screening agent workflow — hybrid multi-view retrieval, source-aware rank fusion and cross-encoder reranking — cutting one screening cycle from ~30 minutes to ~5 minutes (~6×).",
      "Implemented evaluation-driven recovery: weak retrieval triggers bounded strategy switches (query rewriting / HyDE) instead of lowering evidence thresholds.",
      "Built a multi-source sourcing agent routing ~10 heterogeneous channels by industry × geography, with quality gates and durable task state; a Chrome extension keeps anti-bot handling out of the agent decision loop.",
      "Shipped 10+ reusable AI skills (clause comparison, structured extraction, form automation) adopted within the team, and started a knowledge-QA assistant over policies, contracts and SOPs.",
    ],
    tags: [
      "Python",
      "FastMCP / MCP",
      "Hybrid RAG",
      "ChromaDB",
      "BGE-M3 + Reranker",
      "ONNX",
      "Chrome Extension",
    ],
  },
  {
    company: "Independent Projects",
    url: null,
    role: "Solo Developer — Agent Research & Engineering",
    period: "Feb 2026 — Present",
    location: "Munich, Germany",
    bullets: [
      "NutriBuddy: built a verifiable, auditable agent harness from scratch in TypeScript — deterministic code owns facts and state mutations while the model only selects tools and narrates; 870 automated tests stay green.",
      "NutriMind: post-training Qwen3-4B for domain tool use — teacher-distilled SFT pipeline, hybrid RAG over a curated KB, and multi-turn RL with GRPO/GiGPO step-level credit-assignment ablations.",
    ],
    tags: ["TypeScript", "Next.js", "PyTorch", "Qwen3-4B", "veRL", "Vitest"],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface Project {
  title: string;
  blurb: string;
  highlights?: string[];
  tags: string[];
  github: string | null;
  demo: string | null;
  featured: boolean;
  /** key of the decorative pixel-art scene shown for featured cards */
  art: "harness" | "mind";
}

// TODO: add live-demo URLs once deployments exist; links render only when set.
export const projects: Project[] = [
  {
    title: "NutriBuddy",
    blurb:
      "A verifiable, auditable agent harness built from scratch in TypeScript — no LangGraph, no CrewAI.",
    highlights: [
      "ReAct loop + native function calling; the model selects tools and narrates while deterministic code owns facts, numeric provenance and state mutations.",
      "Input/tool/output gates (schema checks, conflict scans, allergen & drug-interaction rules) with bounded regenerate-then-refuse.",
      "Schema-versioned typed event traces power zero-LLM-cost regression evals — 870 tests across 36 files, all green.",
    ],
    tags: ["TypeScript", "Next.js", "Supabase", "Zod", "Vitest"],
    github: "https://github.com/SnackJJ/NutriBuddy",
    demo: null,
    featured: true,
    art: "harness",
  },
  {
    title: "NutriMind",
    blurb:
      "How far can SFT + GRPO/GiGPO push a 4B model toward reliable agentic problem-solving?",
    highlights: [
      "Teacher-distilled SFT pipeline (Qwen-Max / Gemini 2.5 Flash) with reasoning-quality checks and semantic + rule validation.",
      "Multi-turn environment-in-the-loop RL in veRL; GiGPO step-level credit assignment ablated head-to-head against GRPO.",
      "7-dimensional reward design iterated v1→v3, with documented reward-hacking case studies.",
    ],
    tags: ["Python", "PyTorch", "Qwen3-4B", "LoRA / Unsloth", "veRL", "vLLM"],
    github: "https://github.com/SnackJJ/NutriMind",
    demo: null,
    featured: true,
    art: "mind",
  },
  {
    title: "Adaptive English Teacher",
    blurb:
      "TUM Generative AI course project (team of 6): LLM-powered reading platform — I owned the data pipelines, LLM annotation service and the dual-mode reader algorithm.",
    tags: ["Flask", "FAISS", "Gemini", "React"],
    github: null, // TODO: private course repo — link if made public
    demo: null,
    featured: false,
    art: "harness",
  },
  {
    title: "Distributed Query Engine",
    blurb:
      "C++ multi-worker distributed query execution on Azure: heartbeat-based shared state, partitioned aggregation and fault tolerance.",
    tags: ["C++", "Azure"],
    github: null, // TODO: add repo link if published
    demo: null,
    featured: false,
    art: "harness",
  },
  {
    title: "Deep Generative Models from Scratch",
    blurb:
      "VAE, Normalizing Flow and DDPM implemented and compared in PyTorch, evaluated with FID.",
    tags: ["Python", "PyTorch"],
    github: null, // TODO: add repo link if published
    demo: null,
    featured: false,
    art: "mind",
  },
  {
    title: "JL Lemma ⇄ RIP Seminar Report",
    blurb:
      "17-page LaTeX report on the two-way mathematical relationship between dimensionality reduction (JL) and compressed sensing (RIP).",
    tags: ["LaTeX", "Random Matrices"],
    github: null,
    demo: null,
    featured: false,
    art: "mind",
  },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: "04. Contact",
  heading: "Let's build agents we can actually trust.",
  invite:
    "I'm open to research internships, master theses and collaborations around agent reliability, evaluation and post-training. My inbox is always open — I'll reply.",
};

export const footerNote =
  "Designed & built by Zeqing Jiang · React + Tailwind CSS · Palette: Flexoki";
