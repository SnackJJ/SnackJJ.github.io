/**
 * Single source of truth for all page content.
 * Facts come from the Opportunity Radar fact base
 * (/mnt/d/dev/oppo-radar → candidate/*.yaml, checked against
 * candidate/claim-boundary.yaml). Re-check that file before adding numbers.
 */

export const profile = {
  name: "Zeqing Jiang",
  nameZh: "蒋泽庆",
  eyebrow: "M.Sc. Mathematics in Data Science · TUM",
  lede: "I build LLM agents whose claims can be checked — the runtime, the benchmark that scores it, and the small model trained inside it.",
  intro:
    "Coming from pure mathematics, I work across the agent stack: runtimes where deterministic code owns facts and writes, frozen benchmarks scored by end state, and SFT + GRPO on a 2B model. In 2026 I spent six months at Tencent IEG putting retrieval agents to work in procurement.",
  question:
    "How much of an agent's capability comes from the model, and how much from the harness around it?",
  availability: "Looking for a master's thesis or research internship",
  email: "zeqing.jiang@tum.de",
  location: "Munich, Germany",
  github: "https://github.com/SnackJJ",
  linkedin: "https://www.linkedin.com/in/zeqing-jiang/",
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Featured projects                                                   */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: string;
  label: string;
}

export interface FeaturedProject {
  id: "nutrienv" | "nutribuddy" | "nutrimind";
  layer: string;
  title: string;
  period: string;
  blurb: string;
  points: string[];
  stats: Stat[];
  tags: string[];
  github: string;
}

export const workIntro =
  "NutriEnv defines a nutrition world and a frozen exam scored by end state. NutriBuddy is an agent runtime in which code, not the model, owns facts and writes. NutriMind post-trains a 2B model against the NutriEnv exam.";

export const featured: FeaturedProject[] = [
  {
    id: "nutrienv",
    layer: "Environment & benchmark",
    title: "NutriEnv",
    period: "Jul 2026 — present",
    blurb:
      "A steppable nutrition world and a frozen 63-task tool-use exam, scored by a deterministic end-state oracle instead of an LLM judge.",
    points: [
      "Structured state — profile, meal ledger, food catalog — behind 11 typed tools. Illegal actions fail immediately; plan quality is settled only at hand-in.",
      "Pass ⇔ the final state matches the oracle: allergens are hard vetoes, portions get ±15% tolerance, meals are compared as unordered multisets. Scores are reproducible by construction.",
      "The 63 tasks converged from a 128-task baseline through construct-validity audits; goal-specific intake ranges replaced minimum-requirement ceilings that had rejected valid plans.",
      "Every task is proven solvable by legal-action replay. Split, catalog and prompt are pinned by SHA-256 and loading fails closed on a mismatch.",
    ],
    stats: [
      { value: "63", label: "frozen tasks" },
      { value: "11", label: "typed tools" },
      { value: "5,431", label: "USDA foods" },
      { value: "0", label: "unreachable" },
    ],
    tags: ["Python", "SQLite", "Pydantic", "MIT"],
    github: "https://github.com/SnackJJ/NutriEnv",
  },
  {
    id: "nutribuddy",
    layer: "Agent runtime",
    title: "NutriBuddy",
    period: "Jun 2026 — present",
    blurb:
      "A health-QA agent runtime written from scratch in TypeScript — no LangGraph, no CrewAI. The model picks tools and writes the prose; deterministic code owns facts, numbers and every write.",
    points: [
      "ReAct with native function calling and four pure-function gates: input, tool, output, commit. A failed gate triggers a retry; if it cannot recover, the agent refuses instead of returning an unverified answer.",
      "Persistent writes need a stored proposal, the user's confirmation and a transactional commit with ownership, state and expiry checks.",
      "Hybrid retrieval (Postgres full-text + pgvector) over 13 federal nutrition references, with per-turn citation identity and version checks.",
      "Scoring audit: refusing answerable questions had been counted as a pass. Under strict scoring the runtime's net gain over the bare model fell from +25 pp to +7 pp (same model, 38 cases × 3 runs).",
    ],
    stats: [
      { value: "4", label: "deterministic gates" },
      { value: "13", label: "cited references" },
      { value: "+25→+7", label: "pp after audit" },
    ],
    tags: ["TypeScript", "Next.js", "Supabase", "pgvector", "Zod", "Vitest"],
    github: "https://github.com/SnackJJ/NutriBuddy",
  },
  {
    id: "nutrimind",
    layer: "Post-training",
    title: "NutriMind",
    period: "Feb 2026 — present",
    blurb:
      "How far can supervised fine-tuning and RL with a verifiable reward push a 2B model on multi-step tool use?",
    points: [
      "A data factory (author → gate → materialize) produced 418 end-state-verified training traces (2.33M tokens), with loss masking and train/exam isolation enforced by hashes rather than convention.",
      "LoRA SFT on Qwen3.5-2B, then GRPO in veRL where the only reward is whether the final state passes.",
      "On the 63-task NutriEnv exam (8 runs per checkpoint), mean Pass@1 rose from ~10% to ~29% after SFT and ~47% after GRPO; most of the gain is on multi-step composite tasks.",
      "Earlier run: diagnosed a GRPO shortcut collapse — reward terms saturated after one tool call, so a 1-step shortcut earned as much as the correct 3-step path.",
    ],
    stats: [
      { value: "418", label: "verified traces" },
      { value: "2.33M", label: "training tokens" },
      { value: "~47%", label: "Pass@1 after RL" },
    ],
    tags: ["PyTorch", "Qwen3.5-2B", "LoRA", "veRL", "GRPO", "vLLM"],
    github: "https://github.com/SnackJJ/NutriMind",
  },
];

/** NutriEnv exam composition (v1.1 split, 63 tasks). */
export const examMix = [
  { family: "Composite", n: 36 },
  { family: "Recommend", n: 11 },
  { family: "Evaluate", n: 8 },
  { family: "Log", n: 6 },
  { family: "Update", n: 2 },
];

/** NutriMind mean Pass@1, Qwen3.5-2B, 63 tasks × 8 runs. */
export const passAt1 = [
  { stage: "Base", value: 10.1, label: "~10%" },
  { stage: "LoRA SFT", value: 29.4, label: "~29%" },
  { stage: "+ GRPO", value: 47.2, label: "~47%" },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const tencent = {
  company: "Tencent IEG",
  role: "Procurement Business Intern — AI Enablement",
  period: "Jan 2026 — Jun 2026",
  location: "Shenzhen, China",
  summary:
    "Found the slow, evidence-heavy steps in procurement and shipped agent workflows for them, from vendor discovery to decision reports. The tools were adopted for trial use within the team.",
  points: [
    "Supplier screening as a FastMCP tool chain over 10+ heterogeneous sources: discovery, retrieval, evaluation and reporting.",
    "Profiles, capabilities and case studies kept in separate indices; BM25 and BGE-M3 retrieval merged with source-weighted RRF and cross-encoder reranking, so case evidence outranks self-reported claims.",
    "When evidence is too weak, evaluation feedback triggers query expansion or HyDE instead of lowering the admission threshold; stage outputs persist for recovery and tracing.",
    "A multi-source sourcing agent routes channels by industry × region; a browser extension handles authenticated sources so rate limits stay out of the agent loop. Plus 10+ reusable skills for clause comparison, extraction and form filling.",
  ],
  stat: { from: "~30", to: "~5", unit: "min", label: "per supplier-screening run, in team trials" },
  tags: ["Python", "FastMCP", "BM25", "BGE-M3", "Reranker", "ONNX", "TypeScript"],
};

/* ------------------------------------------------------------------ */
/* Background                                                          */
/* ------------------------------------------------------------------ */

export const education = [
  {
    school: "Technical University of Munich",
    degree: "M.Sc. Mathematics in Data Science",
    period: "Apr 2024 — expected 2027",
    note: "Deep Learning · Machine Learning · Foundations of ML · Deep Generative Models · Data Engineering · seminar on the Johnson–Lindenstrauss lemma and RIP",
  },
  {
    school: "China Agricultural University",
    degree: "B.Sc. Mathematics and Applied Mathematics",
    period: "Sep 2018 — Jul 2023",
    note: "Minor in Data Science and Big Data · 3rd Prize, 12th National College Mathematics Competition (Math A) · thesis on symbolic PDE simplification with Transformer seq2seq",
  },
];

export const skillGroups = [
  {
    label: "Agent systems",
    skills: ["MCP / FastMCP", "ReAct runtimes", "Function calling", "Deterministic gates", "Workflow recovery"],
  },
  {
    label: "Retrieval",
    skills: ["BM25 + dense", "RRF", "Cross-encoder rerank", "pgvector", "HyDE"],
  },
  {
    label: "Evaluation & ML",
    skills: ["End-state scoring", "Frozen benchmarks", "Scoring audits", "SFT / LoRA", "GRPO / RLVR"],
  },
  {
    label: "Engineering",
    skills: ["Python", "TypeScript", "PyTorch", "veRL / vLLM", "Docker", "Git"],
  },
];

export const languages = "Chinese (native) · English (fluent)";

export interface Coursework {
  title: string;
  context: string;
  blurb: string;
  tags: string[];
}

export const coursework: Coursework[] = [
  {
    title: "Adaptive English Teacher",
    context: "TUM Generative AI · team of 6",
    blurb:
      "My part: three-source content pipeline, a Gemini annotation service with Pydantic-validated output, and a FAISS-based reading recommender.",
    tags: ["Flask", "FAISS", "Gemini", "React"],
  },
  {
    title: "Distributed Query Engine",
    context: "TUM Cloud Data Processing",
    blurb:
      "Multi-worker query execution on Azure in C++: heartbeat-based shared state, partitioned aggregation and fault tolerance.",
    tags: ["C++", "Azure"],
  },
  {
    title: "Deep Generative Models",
    context: "TUM Advanced ML",
    blurb: "VAE, normalizing flows and DDPM implemented from scratch in PyTorch and compared by FID.",
    tags: ["PyTorch"],
  },
  {
    title: "JL Lemma ⇄ RIP",
    context: "TUM Mathematics seminar",
    blurb:
      "17-page report on the two-way link between Johnson–Lindenstrauss embeddings and the restricted isometry property.",
    tags: ["Random matrices", "LaTeX"],
  },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  heading: "Say hello.",
  invite:
    "I'm looking for a master's thesis or research internship around agent evaluation, tool use and post-training. Email is the fastest way to reach me.",
};
