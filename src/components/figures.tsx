import { useId, useState, type ReactNode } from "react";
import { examMix, passAt1 } from "../data/resume";

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

export function Figure({
  n,
  caption,
  children,
  className = "",
}: {
  n: number;
  caption: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`fig rounded-2xl border border-line bg-surface p-3 sm:p-6 ${className}`}>
      {children}
      <figcaption className="mt-4 border-t border-line pt-3 text-[13px] leading-relaxed text-ink-2">
        <span className="font-mono font-semibold text-ink">Fig. {n}</span>
        <span className="mx-1.5 text-ink-3">—</span>
        {caption}
      </figcaption>
    </figure>
  );
}

/** Arrowhead marker; reference it with `url(#id)`. */
function ArrowDef({ id, className = "fill-ink-3" }: { id: string; className?: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" className={className} />
    </marker>
  );
}

/** Rounded pill with centred label. */
function Pill({
  x,
  y,
  w,
  h = 28,
  label,
  tone = "paper",
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  tone?: "paper" | "ink" | "gate";
}) {
  const rect =
    tone === "ink"
      ? "fill-ink"
      : tone === "gate"
        ? "fill-accent-soft stroke-accent"
        : "fill-paper stroke-line";
  const text = tone === "ink" ? "t-inverse" : tone === "gate" ? "t-strong t-accent" : "";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} className={rect} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" className={text}>
        {tone === "gate" ? `◆ ${label}` : label}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Fig. 0 — the stack (hero)                                           */
/* ------------------------------------------------------------------ */

export function StackFigure() {
  const a = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 440 430" role="img" aria-labelledby={`${a}-t`}>
      <title id={`${a}-t`}>
        Diagram: the model sits inside the harness, which sits inside the environment; the environment holds state and an oracle scores the end state.
      </title>
      <defs>
        <ArrowDef id={`${a}-ar`} />
        <ArrowDef id={`${a}-arA`} className="fill-accent" />
      </defs>

      {/* environment */}
      <rect x="1" y="1" width="438" height="428" rx="22" className="fill-surface stroke-line" />
      <text x="24" y="34" className="t-small t-accent">ENVIRONMENT</text>
      <text x="24" y="58" className="t-serif">NutriEnv</text>

      {/* oracle */}
      <rect x="268" y="20" width="150" height="52" rx="10" className="fill-paper stroke-line" />
      <text x="343" y="41" textAnchor="middle" className="t-strong">oracle</text>
      <text x="343" y="59" textAnchor="middle">end state = pass?</text>
      <line x1="343" y1="96" x2="343" y2="76" className="stroke-accent" strokeWidth="1.5" markerEnd={`url(#${a}-arA)`} />
      <text x="351" y="90" className="t-mute t-small">hand-in</text>

      {/* harness */}
      <rect x="24" y="96" width="392" height="232" rx="16" className="fill-paper stroke-accent" strokeWidth="1.5" />
      <text x="44" y="124" className="t-small t-accent">HARNESS</text>
      <text x="44" y="148" className="t-serif">NutriBuddy</text>
      <text x="44" y="196" className="t-mute">model:</text>
      <text x="44" y="212" className="t-mute">picks tools,</text>
      <text x="44" y="228" className="t-mute">writes prose</text>
      <text x="396" y="196" textAnchor="end" className="t-mute">code:</text>
      <text x="396" y="212" textAnchor="end" className="t-mute">owns facts,</text>
      <text x="396" y="228" textAnchor="end" className="t-mute">numbers,</text>
      <text x="396" y="244" textAnchor="end" className="t-mute">writes</text>

      {/* model */}
      <rect x="160" y="162" width="120" height="96" rx="12" className="fill-ink" />
      <text x="220" y="188" textAnchor="middle" className="t-small t-inverse" opacity="0.7">MODEL</text>
      <text x="220" y="214" textAnchor="middle" className="t-serif t-inverse">NutriMind</text>
      <text x="220" y="237" textAnchor="middle" className="t-inverse" opacity="0.8">Qwen3.5-2B</text>
      <line x1="220" y1="260" x2="220" y2="276" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />

      {/* gates */}
      {["input", "tool", "output", "commit"].map((g, i) => (
        <Pill key={g} x={42 + i * 92} y={280} w={80} h={28} label={g} tone="gate" />
      ))}

      {/* actions / observations */}
      <line x1="170" y1="330" x2="170" y2="354" className="stroke-accent flow" strokeWidth="1.5" markerEnd={`url(#${a}-arA)`} />
      <text x="162" y="347" textAnchor="end" className="t-small">tool calls</text>
      <line x1="270" y1="354" x2="270" y2="330" className="stroke-ink-3 flow" strokeWidth="1.5" markerEnd={`url(#${a}-ar)`} />
      <text x="278" y="347" className="t-small">observations</text>

      {/* state */}
      <Pill x={24} y={358} w={96} h={30} label="profile" />
      <Pill x={132} y={358} w={96} h={30} label="ledger" />
      <Pill x={240} y={358} w={176} h={30} label="catalog · 5,431 foods" />
      <text x="220" y="414" textAnchor="middle" className="t-mute">state behind 11 typed tools · scored at hand-in</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Fig. 1 — NutriEnv scoring                                           */
/* ------------------------------------------------------------------ */

export function ScoringFigure() {
  const a = useId().replace(/:/g, "");
  const steps = ["search_foods", "get_profile", "log_meal", "submit_plan", "finish"];
  return (
    <svg viewBox="0 0 440 230" role="img" aria-labelledby={`${a}-t`}>
      <title id={`${a}-t`}>
        Diagram: an episode of tool calls produces an end state; the oracle compares that end state, not the path, and returns pass or fail.
      </title>
      <defs>
        <ArrowDef id={`${a}-ar`} />
      </defs>

      <text x="8" y="16" className="t-small t-accent">EPISODE</text>
      {steps.map((s, i) => (
        <g key={s}>
          <rect x="8" y={28 + i * 32} width="134" height="26" rx="6" className="fill-paper stroke-line" />
          <text x="20" y={45 + i * 32}>{`${i + 1}  ${s}`}</text>
        </g>
      ))}
      <text x="75" y="212" textAnchor="middle" className="t-mute">path is not graded</text>

      <line x1="146" y1="108" x2="164" y2="108" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />

      <text x="168" y="16" className="t-small t-accent">END STATE</text>
      <rect x="168" y="28" width="112" height="154" rx="10" className="fill-paper stroke-line" />
      {["profile", "ledger", "plan"].map((s, i) => (
        <g key={s}>
          <rect x="180" y={44 + i * 44} width="88" height="30" rx="6" className="fill-surface-2" />
          <text x="224" y={63 + i * 44} textAnchor="middle">{s}</text>
        </g>
      ))}
      <text x="224" y="212" textAnchor="middle" className="t-mute">SHA-256 pinned</text>

      <line x1="284" y1="108" x2="296" y2="108" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />

      <text x="300" y="16" className="t-small t-accent">ORACLE</text>
      <rect x="300" y="28" width="132" height="154" rx="10" className="fill-paper stroke-accent" strokeWidth="1.5" />
      {["allergen veto", "portion ±15%", "meal multiset"].map((s, i) => (
        <g key={s}>
          <rect x="312" y={46 + i * 24} width="7" height="7" className="fill-accent" />
          <text x="326" y={53 + i * 24}>{s}</text>
        </g>
      ))}
      <rect x="312" y="134" width="52" height="30" rx="15" className="fill-good" />
      <text x="338" y="153" textAnchor="middle" className="t-strong t-inverse">PASS</text>
      <rect x="370" y="134" width="52" height="30" rx="15" className="fill-paper stroke-line" />
      <text x="396" y="153" textAnchor="middle" className="t-mute">FAIL</text>
      <text x="366" y="212" textAnchor="middle" className="t-mute">no LLM judge</text>
    </svg>
  );
}

/** Horizontal bars: how the 63 frozen tasks split by family. */
export function ExamMix() {
  const total = examMix.reduce((s, r) => s + r.n, 0);
  const max = Math.max(...examMix.map((r) => r.n));
  return (
    <div>
      <p className="mb-3 font-mono text-[12px] text-ink-3">
        Exam composition · {total} tasks
      </p>
      <ul className="space-y-1.5">
        {examMix.map((r) => (
          <li
            key={r.family}
            className="group grid grid-cols-[6.5rem_1fr_4.5rem] items-center gap-3 rounded-md px-1 py-1 transition-colors hover:bg-surface-2"
          >
            <span className="font-mono text-[13px] text-ink-2">{r.family}</span>
            <span className="h-3.5">
              <span
                className="block h-full rounded-r bg-accent transition-opacity group-hover:opacity-80"
                style={{ width: `${(r.n / max) * 100}%` }}
              />
            </span>
            <span className="text-right font-mono text-[13px] text-ink">
              {r.n}
              <span className="ml-1.5 text-ink-3 opacity-0 transition-opacity group-hover:opacity-100">
                {Math.round((r.n / total) * 100)}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fig. 2 — NutriBuddy gates                                           */
/* ------------------------------------------------------------------ */

export function GateFigure() {
  const a = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 440 290" role="img" aria-labelledby={`${a}-t`}>
      <title id={`${a}-t`}>
        Diagram: a message passes the input gate into the ReAct loop, tool calls pass the tool gate, answers pass the output gate; writes become proposals that need user confirmation and the commit gate before reaching Postgres.
      </title>
      <defs>
        <ArrowDef id={`${a}-ar`} />
      </defs>

      {/* row A: message → input → loop */}
      <Pill x={8} y={30} w={84} label="message" />
      <line x1="92" y1="44" x2="108" y2="44" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />
      <Pill x={112} y={30} w={74} label="input" tone="gate" />
      <line x1="186" y1="44" x2="200" y2="44" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />

      {/* ReAct loop */}
      <rect x="204" y="8" width="228" height="152" rx="14" className="fill-paper stroke-line" />
      <text x="220" y="30" className="t-small t-accent">REACT LOOP</text>
      <rect x="220" y="42" width="78" height="44" rx="8" className="fill-ink" />
      <text x="259" y="69" textAnchor="middle" className="t-inverse t-strong">model</text>
      <rect x="342" y="42" width="78" height="44" rx="8" className="fill-surface-2" />
      <text x="381" y="69" textAnchor="middle" className="t-strong">tools</text>
      <line x1="300" y1="56" x2="338" y2="56" className="stroke-accent flow" strokeWidth="1.5" markerEnd={`url(#${a}-ar)`} />
      <line x1="340" y1="74" x2="302" y2="74" className="stroke-ink-3 flow" strokeWidth="1.5" markerEnd={`url(#${a}-ar)`} />
      <line x1="320" y1="78" x2="320" y2="100" className="stroke-accent" strokeDasharray="2 3" />
      <Pill x={280} y={100} w={80} h={26} label="tool" tone="gate" />
      <text x="220" y="148" className="t-mute">model picks · code checks</text>

      {/* row B: output → answer */}
      <line x1="318" y1="160" x2="318" y2="172" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />
      <Pill x={278} y={176} w={80} label="output" tone="gate" />
      <line x1="278" y1="190" x2="162" y2="190" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />
      <Pill x={8} y={176} w={150} label="answer + citations" />

      {/* writes: proposal → confirm → commit → db */}
      <path d="M232 160 V224 H51 V238" className="fill-none stroke-ink-3" strokeDasharray="3 3" markerEnd={`url(#${a}-ar)`} />
      <text x="224" y="218" textAnchor="end" className="t-mute t-small">a write becomes a proposal</text>
      <Pill x={8} y={242} w={86} label="proposal" />
      <line x1="94" y1="256" x2="110" y2="256" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />
      <Pill x={114} y={242} w={112} label="user confirms" />
      <line x1="226" y1="256" x2="240" y2="256" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />
      <Pill x={244} y={242} w={84} label="commit" tone="gate" />
      <line x1="328" y1="256" x2="342" y2="256" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />
      <Pill x={346} y={242} w={86} label="Postgres" tone="ink" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Fig. 3 — NutriMind Pass@1                                           */
/* ------------------------------------------------------------------ */

export function PassChart() {
  const [hover, setHover] = useState<number | null>(null);
  const x0 = 52;
  const x1 = 424;
  const base = 206;
  const top = 26;
  const yMax = 60;
  const scale = (base - top) / yMax;
  const slot = (x1 - x0) / passAt1.length;
  const bw = 76;
  const opacity = [0.35, 0.65, 1];

  const barPath = (cx: number, h: number) => {
    const l = cx - bw / 2;
    const r = cx + bw / 2;
    const t = base - h;
    const rr = 4;
    return `M${l} ${base} V${t + rr} Q${l} ${t} ${l + rr} ${t} H${r - rr} Q${r} ${t} ${r} ${t + rr} V${base} Z`;
  };

  const readout =
    hover === null
      ? "Hover a bar for the exact mean."
      : `${passAt1[hover].stage}: ${passAt1[hover].value.toFixed(1)}% mean Pass@1 over 8 runs`;

  return (
    <div>
      <svg viewBox="0 0 440 240" role="img" aria-label="Bar chart of mean Pass@1: base about 10%, after LoRA SFT about 29%, after GRPO about 47%.">
        <text x={x0} y="12" className="t-mute">mean Pass@1 · 63 tasks × 8 runs</text>
        {[0, 20, 40, 60].map((v) => (
          <g key={v}>
            <line x1={x0} x2={x1} y1={base - v * scale} y2={base - v * scale} className={v === 0 ? "stroke-ink-3" : "stroke-line"} strokeDasharray={v === 0 ? undefined : "2 4"} />
            <text x={x0 - 8} y={base - v * scale + 4} textAnchor="end" className="t-mute">
              {v}
            </text>
          </g>
        ))}
        {passAt1.map((d, i) => {
          const cx = x0 + slot * (i + 0.5);
          const h = d.value * scale;
          return (
            <g
              key={d.stage}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="cursor-default"
            >
              {/* hit target larger than the mark */}
              <rect x={cx - slot / 2} y={top} width={slot} height={base - top + 24} fill="transparent" />
              <path d={barPath(cx, h)} className="fill-accent transition-opacity" opacity={hover === null || hover === i ? opacity[i] : opacity[i] * 0.5} />
              <text x={cx} y={base - h - 8} textAnchor="middle" className="t-strong">
                {d.label}
              </text>
              <text x={cx} y={base + 20} textAnchor="middle">
                {d.stage}
              </text>
            </g>
          );
        })}
        <text x={x0 + slot} y={base - 22 * scale} textAnchor="middle" className="t-accent t-strong">+19 pp</text>
        <text x={x0 + slot * 2} y={base - 40 * scale} textAnchor="middle" className="t-accent t-strong">+18 pp</text>
      </svg>
      <p className="mt-1 min-h-5 font-mono text-[12px] text-ink-3" aria-live="polite">
        {readout}
      </p>
    </div>
  );
}

/** The NutriMind pipeline as wrapping chips. */
export function TrainingStrip() {
  const steps = ["author", "gate", "materialize", "418 traces", "LoRA SFT", "GRPO · reward = end state passes"];
  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2 font-mono text-[12px]">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-1.5">
          <span
            className={`rounded-full border px-2.5 py-1 ${
              i >= 4 ? "border-accent bg-accent-soft text-ink" : "border-line bg-paper text-ink-2"
            }`}
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="text-ink-3">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Fig. 4 — Tencent supplier-screening retrieval                       */
/* ------------------------------------------------------------------ */

export function RetrievalFigure() {
  const a = useId().replace(/:/g, "");
  const idx = [
    { x: 36, name: "profiles" },
    { x: 160, name: "capabilities" },
    { x: 284, name: "cases ×1.5", accent: true },
  ];
  return (
    <svg viewBox="0 0 440 312" role="img" aria-labelledby={`${a}-t`}>
      <title id={`${a}-t`}>
        Diagram: a supplier query fans out to three indices, merged by source-weighted RRF, reranked, then evaluated; weak evidence loops back through HyDE or query rewriting, strong evidence goes to the report.
      </title>
      <defs>
        <ArrowDef id={`${a}-ar`} />
        <ArrowDef id={`${a}-arW`} className="fill-warn" />
      </defs>

      <Pill x={150} y={8} w={140} label="supplier query" tone="ink" />
      {idx.map((b) => (
        <g key={b.name}>
          <path d={`M220 36 C220 54 ${b.x + 60} 52 ${b.x + 60} 66`} className="fill-none stroke-ink-3" markerEnd={`url(#${a}-ar)`} />
          <rect x={b.x} y="70" width="120" height="50" rx="10" className={b.accent ? "fill-paper stroke-accent" : "fill-paper stroke-line"} strokeWidth={b.accent ? 1.5 : 1} />
          <text x={b.x + 60} y="91" textAnchor="middle" className={b.accent ? "t-strong t-accent" : "t-strong"}>
            {b.name}
          </text>
          <text x={b.x + 60} y="109" textAnchor="middle" className="t-mute">BM25 + dense</text>
          <path d={`M${b.x + 60} 120 C${b.x + 60} 136 220 132 220 146`} className="fill-none stroke-ink-3" markerEnd={`url(#${a}-ar)`} />
        </g>
      ))}

      <rect x="120" y="150" width="200" height="30" rx="8" className="fill-surface-2" />
      <text x="220" y="169" textAnchor="middle">source-weighted RRF</text>
      <line x1="220" y1="180" x2="220" y2="196" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />
      <rect x="120" y="200" width="200" height="30" rx="8" className="fill-surface-2" />
      <text x="220" y="219" textAnchor="middle">cross-encoder rerank</text>
      <line x1="220" y1="230" x2="220" y2="246" className="stroke-ink-3" markerEnd={`url(#${a}-ar)`} />
      <rect x="120" y="250" width="200" height="30" rx="8" className="fill-paper stroke-accent" strokeWidth="1.5" />
      <text x="220" y="269" textAnchor="middle" className="t-strong">evaluate evidence</text>

      {/* strong → report */}
      <line x1="320" y1="265" x2="342" y2="265" className="stroke-good" strokeWidth="1.5" markerEnd={`url(#${a}-ar)`} />
      <text x="331" y="246" textAnchor="middle" className="t-small" style={{ fill: "var(--color-good)" }}>ok</text>
      <Pill x={346} y={251} w={86} label="report" tone="ink" />

      {/* weak → reformulate → query */}
      <path d="M120 265 H14 V22 H146" className="fill-none stroke-warn flow" strokeWidth="1.5" markerEnd={`url(#${a}-arW)`} />
      <text x="24" y="150" className="t-small" style={{ fill: "var(--color-warn)" }}>too weak:</text>
      <text x="24" y="166" className="t-small" style={{ fill: "var(--color-warn)" }}>HyDE /</text>
      <text x="24" y="182" className="t-small" style={{ fill: "var(--color-warn)" }}>rewrite</text>
      <text x="220" y="304" textAnchor="middle" className="t-mute">the admission threshold is never lowered</text>
    </svg>
  );
}
