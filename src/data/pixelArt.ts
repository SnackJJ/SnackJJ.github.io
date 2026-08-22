/**
 * Pixel-art sprites & palette.
 *
 * The pixel layer is intentionally tiny (<=10% of the visual weight):
 *   - ROBOT  : the single strong pixel element (hero avatar, 16x16)
 *   - STAR   : the one Yellow micro-accent pinned to the avatar
 *   - SCENES : decorative placeholders for featured project panels
 *              (TODO: replace with real pixelated screenshots)
 *
 * These are the only places where raw Flexoki hex values appear outside
 * src/index.css — they ARE the palette definition for sprites.
 */

/** Flexoki light palette (https://stephango.com/flexoki) */
export const FLEXOKI = {
  paper: "#FFFCF0",
  surface: "#F2F0E5",
  surface2: "#E6E4D9",
  line: "#DAD8CE",
  ink: "#100F0F",
  ink2: "#575653",
  ink3: "#878580",
  cyan: "#24837B",
  cyanDeep: "#1C6C66",
  yellow: "#AD8301",
} as const;

const PALETTE: Record<string, string> = {
  K: FLEXOKI.ink,
  S: FLEXOKI.surface2,
  L: FLEXOKI.line,
  P: FLEXOKI.paper,
  C: FLEXOKI.cyan,
  D: FLEXOKI.cyanDeep,
  Y: FLEXOKI.yellow,
};

/* ------------------------------------------------------------------ */
/* Sprite maps ('.' = transparent)                                     */
/* ------------------------------------------------------------------ */

/** Hero avatar — friendly pixel robot, 16x16 */
export const ROBOT: string[] = [
  "................",
  ".......YY.......",
  ".......KK.......",
  ".......KK.......",
  "...KKKKKKKKKK...",
  "..KSSSSSSSSSSK..",
  "..KSSSSSSSSSSK..",
  "..KSCCSSSSCCSK..",
  "..KSCCSSSSCCSK..",
  "..KSSSSSSSSSSK..",
  "..KSSKKKKKKSSK..",
  "..KSSSSSSSSSSK..",
  "..KSSSSSSSSSSK..",
  "...KKKKKKKKKK...",
  "................",
  "................",
];

/** Yellow sparkle badge (7x7) — the single Yellow micro-decoration */
export const STAR: string[] = [
  "...Y...",
  "...Y...",
  "...Y...",
  "YYYYYYY",
  "...Y...",
  "...Y...",
  "...Y...",
];

/* ------------------------------------------------------------------ */
/* Featured-project decorative scenes (32x16), drawn with helpers      */
/* ------------------------------------------------------------------ */

function grid(w: number, h: number): string[][] {
  return Array.from({ length: h }, () => Array<string>(w).fill("."));
}

function rect(
  g: string[][],
  x: number,
  y: number,
  w: number,
  h: number,
  ch: string,
): void {
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      const py = y + dy;
      const px = x + dx;
      if (py >= 0 && py < g.length && px >= 0 && px < g[0].length) {
        g[py][px] = ch;
      }
    }
  }
}

function toStrings(g: string[][]): string[] {
  return g.map((row) => row.join(""));
}

/** "Deterministic gates" motif: framed checklist with cyan bullets */
function harnessScene(): string[] {
  const g = grid(32, 16);
  rect(g, 3, 1, 26, 14, "K"); // frame
  rect(g, 4, 2, 24, 12, "."); // hollow interior
  rect(g, 6, 3, 3, 3, "C");
  rect(g, 11, 4, 14, 1, "K");
  rect(g, 6, 7, 3, 3, "C");
  rect(g, 11, 8, 14, 1, "K");
  rect(g, 6, 11, 3, 3, "D");
  rect(g, 11, 12, 14, 1, "K");
  return toStrings(g);
}

/** "Small-model training" motif: chip with pins and drifting activations */
function mindScene(): string[] {
  const g = grid(32, 16);
  rect(g, 12, 5, 8, 6, "K"); // chip body
  rect(g, 13, 6, 6, 4, "."); // chip interior
  rect(g, 15, 7, 2, 2, "C"); // core
  rect(g, 9, 6, 3, 1, "K"); // left pins
  rect(g, 9, 9, 3, 1, "K");
  rect(g, 20, 6, 3, 1, "K"); // right pins
  rect(g, 20, 9, 3, 1, "K");
  rect(g, 13, 3, 1, 2, "K"); // top pins
  rect(g, 18, 3, 1, 2, "K");
  rect(g, 13, 11, 1, 2, "K"); // bottom pins
  rect(g, 18, 11, 1, 2, "K");
  rect(g, 5, 4, 1, 1, "C"); // ambient nodes
  rect(g, 26, 3, 1, 1, "C");
  rect(g, 4, 12, 1, 1, "D");
  rect(g, 27, 11, 1, 1, "D");
  rect(g, 25, 7, 2, 1, "L");
  rect(g, 5, 8, 2, 1, "L");
  return toStrings(g);
}

export const SCENES: Record<"harness" | "mind", string[]> = {
  harness: harnessScene(),
  mind: mindScene(),
};

/* ------------------------------------------------------------------ */
/* Renderers                                                           */
/* ------------------------------------------------------------------ */

/** CSS box-shadow pixel rendering: one shadow per non-empty pixel. */
export function boxShadowFromMap(map: string[], px: number): string {
  const shadows: string[] = [];
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch !== "." && PALETTE[ch]) {
        shadows.push(`${x * px}px ${y * px}px 0 0 ${PALETTE[ch]}`);
      }
    }
  });
  return shadows.join(", ");
}

export interface PixelCell {
  x: number;
  y: number;
  w: number;
  fill: string;
}

/**
 * Horizontal-run-merged cell list for crisp SVG rendering
 * (<rect shape-rendering="crispEdges">).
 */
export function svgCellsFromMap(map: string[]): PixelCell[] {
  const cells: PixelCell[] = [];
  map.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === "." || !PALETTE[ch]) {
        x++;
        continue;
      }
      let w = 1;
      while (x + w < row.length && row[x + w] === ch) w++;
      cells.push({ x, y, w, fill: PALETTE[ch] });
      x += w;
    }
  });
  return cells;
}
