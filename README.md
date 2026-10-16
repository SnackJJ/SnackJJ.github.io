# SnackJJ.github.io

Personal homepage, single page: a research-notebook layout (Newsreader serif + Inter + JetBrains Mono)
on the Flexoki palette, with a light/dark theme that follows the system. Every figure is an
inline SVG drawn by hand, coloured only through design tokens, so dark mode is just a token swap.

Live at <https://snackjj.github.io/>. Pushing to `main` builds and deploys via GitHub Actions
(`.github/workflows/deploy.yml`).

All facts come from `/mnt/d/dev/oppo-radar` (`candidate/*.yaml`). Before adding a number, check
`candidate/claim-boundary.yaml` to confirm it can be written.

## Running and checking

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build
npm run preview    # serve dist/ (on WSL with /mnt/d, preview a build — dev may not see file changes)
```

Helper scripts (need the local Playwright Chromium cache; a server must be running on :5173):

```bash
node scripts/screenshot.mjs   # desktop / dark / mobile screenshots → shots/
node scripts/verify.mjs       # DOM checks: tokens, fonts, figures, dark mode, no horizontal scroll at 390px
node scripts/make-favicon-icons.mjs  # render scripts/favicon.html → public/favicon.ico + apple-touch-icon.png
```

The mark is an italic Newsreader "zȷ" on an ink tile with a cyan dot; the navbar draws the same
mark in HTML. `zj.jpeg` is the earlier hand-lettered version, kept as source art.

## Structure

```
src/
  data/resume.ts            # all copy and figure data
  index.css                 # Flexoki tokens (light + dark) and shared figure styles
  components/
    figures.tsx             # Fig. 1–5: stack / NutriEnv scoring + v1.1 results / one NutriBuddy turn /
                            #           NutriMind Pass@1 / Tencent retrieval
    Hero.tsx                # intro + Fig. 1
    Work.tsx                # three featured projects, each with a figure
    Experience.tsx          # Tencent IEG + Fig. 5
    Background.tsx          # education, toolbox, coursework
    Contact.tsx, Footer.tsx, Navbar.tsx, SectionHeading.tsx, Reveal.tsx, icons.tsx
```

## Design tokens

Raw hex values appear only in `src/index.css` (`@theme` plus its dark-mode override). Components
and SVGs use semantic classes (`bg-paper`, `fill-ink`, `stroke-line`, `fill-accent-soft` …).
`good` / `warn` are reserved for status (pass, retry) and always appear with a text label.
