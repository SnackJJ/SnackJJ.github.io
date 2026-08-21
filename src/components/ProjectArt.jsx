/**
 * Abstract, decorative artwork for featured projects (light theme).
 * Deliberately geometric and palette-bound — no fake screenshots.
 */

const ink = "#14243f";
const slate = "#94a3bd";
const faint = "#66779a";
const teal = "#14b8a6";
const tealDeep = "#0f766e";
const amber = "#e8b64c";

function Frame({ tint, children }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className="h-auto w-full"
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="800" height="500" fill={tint} />
      {/* dot grid */}
      {Array.from({ length: 16 }, (_, x) =>
        Array.from({ length: 10 }, (_, y) => (
          <circle key={`${x}-${y}`} cx={25 + x * 50} cy={25 + y * 50} r="1.5" fill="#d5dfe9" />
        )),
      )}
      {children}
    </svg>
  );
}

function Mono({ x, y, size = 14, fill = faint, anchor = "middle", children }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={fill}
      fontFamily="ui-monospace, monospace"
      fontSize={size}
    >
      {children}
    </text>
  );
}

/** NutriBuddy — deterministic gates feeding a verified shield. */
export function NutriBuddyArt() {
  const gates = [
    { y: 140, label: "input" },
    { y: 224, label: "tool" },
    { y: 308, label: "output" },
  ];
  return (
    <Frame tint="#ecf6f4">
      {gates.map(({ y, label }) => (
        <g key={label}>
          <rect x="80" y={y} width="130" height="52" rx="10" fill="#ffffff" stroke={teal} strokeWidth="2" />
          <Mono x={145} y={y + 22} size={15} fill={tealDeep}>
            gate()
          </Mono>
          <Mono x={145} y={y + 41} size={12}>
            {label}
          </Mono>
          <line
            x1="210"
            y1={y + 26}
            x2="303"
            y2={y === 224 ? 256 : y + 26 - (y - 224) * 0.62}
            stroke={slate}
            strokeWidth="2"
            strokeDasharray="5 7"
          />
        </g>
      ))}

      {/* shield */}
      <path
        d="M400 120 L495 158 V245 C495 330 450 372 400 392 C350 372 305 330 305 245 V158 Z"
        fill="#ffffff"
        stroke={tealDeep}
        strokeWidth="3"
      />
      <polyline
        points="355,255 388,288 448,212"
        fill="none"
        stroke={teal}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* certification seal */}
      <line x1="495" y1="250" x2="562" y2="288" stroke={slate} strokeWidth="2" strokeDasharray="5 7" />
      <g transform="translate(600 300)">
        <polygon points="-8,30 8,30 12,58 0,48 -12,58" fill={amber} />
        <circle r="34" fill="#ffffff" stroke={amber} strokeWidth="3" />
        <Mono y={6} size={18} fill={tealDeep}>
          ✓
        </Mono>
      </g>

      <Mono x={400} y={455}>
        {"code owns facts · provenance · state"}
      </Mono>
    </Frame>
  );
}

/** NutriMind — policy network paired with an ascending reward signal. */
export function NutriMindArt() {
  const layers = [
    { x: 140, ys: [180, 250, 320] },
    { x: 280, ys: [140, 215, 290, 365] },
    { x: 420, ys: [205, 295] },
  ];
  const links = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const y1 of layers[l].ys) {
      for (const y2 of layers[l + 1].ys) {
        links.push({ x1: layers[l].x, y1, x2: layers[l + 1].x, y2 });
      }
    }
  }
  const bars = [
    { x: 560, h: 60 },
    { x: 602, h: 95 },
    { x: 644, h: 135 },
    { x: 686, h: 180 },
  ];
  return (
    <Frame tint="#edf2fb">
      {links.map(({ x1, y1, x2, y2 }, i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a9b8d6" strokeWidth="1.5" opacity="0.7" />
      ))}
      {layers.map(({ x, ys }) =>
        ys.map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="13" fill="#ffffff" stroke={tealDeep} strokeWidth="2.5" />),
      )}

      <Mono x={140} y={104} anchor="start" size={15} fill={tealDeep}>
        SFT → RL
      </Mono>

      {/* ascending reward */}
      <line x1="540" y1="400" x2="724" y2="400" stroke={slate} strokeWidth="2" />
      {bars.map(({ x, h }, i) => (
        <rect key={x} x={x} y={400 - h} width="26" height={h} rx="4" fill={teal} opacity={0.55 + i * 0.15} />
      ))}
      <polyline
        points="573,318 615,282 657,242 694,200"
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon points="694,200 678,202 688,214" fill={ink} />
      <Mono x={648} y={178} anchor="end" size={14} fill={ink}>
        reward
      </Mono>

      <Mono x={400} y={455}>
        {"GRPO / GiGPO · credit assignment v1→v3"}
      </Mono>
    </Frame>
  );
}

/** Adaptive English Teacher — open reader with highlighted spans. */
export function AdaptiveEnglishArt() {
  const sparkles = [
    [270, 58],
    [505, 52],
    [700, 138],
    [118, 168],
  ];
  return (
    <Frame tint="#fbf3e8">
      {/* floating word chips */}
      <g>
        <rect x="150" y="86" width="130" height="36" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="168" y="100" width="60" height="8" rx="4" fill="#dbe3ee" />
        <rect x="236" y="100" width="28" height="8" rx="4" fill="#fcd34d" />

        <rect x="330" y="66" width="150" height="36" rx="18" fill="#ffffff" stroke={teal} strokeWidth="2" />
        <rect x="348" y="80" width="72" height="8" rx="4" fill="#dbe3ee" />
        <rect x="428" y="80" width="34" height="8" rx="4" fill="#99f6e4" />
        <path
          d="M462 76 l3.2 6.5 7.2 1 -5.2 5 1.2 7.1 -6.4 -3.4 -6.4 3.4 1.2 -7.1 -5.2 -5 7.2 -1 z"
          fill={amber}
        />

        <rect x="530" y="92" width="120" height="36" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="548" y="106" width="54" height="8" rx="4" fill="#dbe3ee" />
        <rect x="610" y="106" width="24" height="8" rx="4" fill="#fcd34d" />
      </g>

      {sparkles.map(([x, y]) => (
        <g key={`${x}-${y}`} stroke={amber} strokeWidth="2.5" strokeLinecap="round">
          <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
          <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
        </g>
      ))}

      {/* open book */}
      <ellipse cx="400" cy="398" rx="175" ry="12" fill={ink} opacity="0.07" />
      <path
        d="M400 218 C345 194 285 190 225 202 V350 C285 338 345 342 400 366 Z"
        fill="#ffffff"
        stroke="#b9c6d8"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M400 218 C455 194 515 190 575 202 V350 C515 338 455 342 400 366 Z"
        fill="#ffffff"
        stroke="#b9c6d8"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* left page lines */}
      {[
        [250, 238, 120],
        [250, 260, 132],
        [250, 282, 96, "#fcd34d"],
        [250, 304, 126],
        [250, 326, 84],
      ].map(([x, y, w, c]) => (
        <rect key={`l${y}`} x={x} y={y} width={w} height="10" rx="5" fill={c || "#dbe3ee"} />
      ))}
      {/* right page lines */}
      {[
        [422, 238, 116],
        [422, 260, 128, "#99f6e4"],
        [422, 282, 92],
        [422, 304, 122],
        [422, 326, 78],
      ].map(([x, y, w, c]) => (
        <rect key={`r${y}`} x={x} y={y} width={w} height="10" rx="5" fill={c || "#dbe3ee"} />
      ))}

      <Mono x={400} y={455}>
        {"CEFR-aware labeling · span annotations"}
      </Mono>
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
