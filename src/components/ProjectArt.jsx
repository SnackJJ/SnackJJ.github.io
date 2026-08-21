/**
 * Abstract, decorative artwork for featured projects.
 * Deliberately geometric and palette-bound — no fake screenshots.
 */

const stroke = "#8892b0";
const faint = "#233554";
const green = "#64ffda";

function Frame({ children }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className="h-auto w-full"
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="800" height="500" fill="#112240" />
      {/* faint grid */}
      {Array.from({ length: 15 }, (_, i) => (
        <line key={`v${i}`} x1={i * 57} y1="0" x2={i * 57} y2="500" stroke={faint} strokeWidth="1" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 62} x2="800" y2={i * 62} stroke={faint} strokeWidth="1" />
      ))}
      {children}
    </svg>
  );
}

/** NutriBuddy — deterministic gate pipeline around a model. */
export function NutriBuddyArt() {
  const gates = [
    { x: 90, label: "input" },
    { x: 330, label: "tool" },
    { x: 570, label: "output" },
  ];
  return (
    <Frame>
      <circle cx="400" cy="250" r="86" fill="none" stroke={stroke} strokeWidth="2" />
      <text
        x="400"
        y="245"
        textAnchor="middle"
        fill="#ccd6f6"
        fontFamily="ui-monospace, monospace"
        fontSize="26"
      >
        model
      </text>
      <text
        x="400"
        y="278"
        textAnchor="middle"
        fill={green}
        fontFamily="ui-monospace, monospace"
        fontSize="15"
      >
        chooses &amp; narrates
      </text>

      {gates.map(({ x, label }) => (
        <g key={label}>
          <rect
            x={x}
            y="215"
            width="140"
            height="70"
            rx="10"
            fill="#0a192f"
            stroke={green}
            strokeWidth="2"
          />
          <text
            x={x + 70}
            y="245"
            textAnchor="middle"
            fill={green}
            fontFamily="ui-monospace, monospace"
            fontSize="16"
          >
            gate()
          </text>
          <text
            x={x + 70}
            y="270"
            textAnchor="middle"
            fill={stroke}
            fontFamily="ui-monospace, monospace"
            fontSize="13"
          >
            {label}
          </text>
          <line
            x1={label === "output" ? x - 100 : x + 140}
            y1="250"
            x2={label === "output" ? x : x + 190}
            y2="250"
            stroke={stroke}
            strokeWidth="2"
            strokeDasharray="6 8"
          />
        </g>
      ))}

      <text
        x="400"
        y="380"
        textAnchor="middle"
        fill={stroke}
        fontFamily="ui-monospace, monospace"
        fontSize="14"
      >
        code owns facts · provenance · state
      </text>
    </Frame>
  );
}

/** NutriMind — multi-turn RL training curve over an agent loop. */
export function NutriMindArt() {
  return (
    <Frame>
      {/* axes */}
      <line x1="110" y1="90" x2="110" y2="390" stroke={stroke} strokeWidth="2" />
      <line x1="110" y1="390" x2="700" y2="390" stroke={stroke} strokeWidth="2" />

      {/* GRPO baseline */}
      <path
        d="M130 360 C 240 340, 320 320, 420 300 S 620 260, 680 250"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeDasharray="4 8"
      />
      {/* GiGPO curve */}
      <path
        d="M130 365 C 220 350, 280 310, 360 270 S 520 180, 600 150 S 660 135, 685 128"
        fill="none"
        stroke={green}
        strokeWidth="3"
      />
      <circle cx="685" cy="128" r="6" fill={green} />

      <text x="140" y="120" fill={green} fontFamily="ui-monospace, monospace" fontSize="15">
        step-level credit assignment
      </text>
      <text x="430" y="330" fill={stroke} fontFamily="ui-monospace, monospace" fontSize="14">
        GRPO baseline
      </text>
      <text x="560" y="105" fill={green} fontFamily="ui-monospace, monospace" fontSize="14">
        GiGPO
      </text>
      <text x="110" y="430" fill={stroke} fontFamily="ui-monospace, monospace" fontSize="14">
        SFT → GRPO/GiGPO · reward v1→v3
      </text>
    </Frame>
  );
}

/** Adaptive English Teacher — annotated reading spans. */
export function AdaptiveEnglishArt() {
  const rows = [
    { y: 120, spans: [[210, 120], [480, 90]] },
    { y: 185, spans: [[150, 80], [420, 160]] },
    { y: 250, spans: [[260, 200]] },
    { y: 315, spans: [[140, 110], [520, 120]] },
  ];
  return (
    <Frame>
      {rows.map((row) => (
        <g key={row.y}>
          <rect x="110" y={row.y} width={row.spans[0][0] - 130} height="22" rx="11" fill={faint} />
          {row.spans.map(([x, w]) => (
            <rect key={`${row.y}-${x}`} x={x} y={row.y} width={w} height="22" rx="11" fill={green} opacity="0.85" />
          ))}
          <rect
            x={(row.spans.at(-1)[0] + row.spans.at(-1)[1] + 20)}
            y={row.y}
            width={Math.max(690 - row.spans.at(-1)[0] - row.spans.at(-1)[1], 40)}
            height="22"
            rx="11"
            fill={faint}
          />
        </g>
      ))}
      <text x="110" y="395" fill={stroke} fontFamily="ui-monospace, monospace" fontSize="14">
        CEFR-aware labeling · span-level annotations
      </text>
    </Frame>
  );
}

const artById = {
  nutribuddy: NutriBuddyArt,
  nutrimind: NutriMindArt,
  "adaptive-english": AdaptiveEnglishArt,
};

export default function ProjectArt({ id }) {
  const Art = artById[id];
  return Art ? <Art /> : null;
}
