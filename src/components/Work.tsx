import type { ReactNode } from "react";
import type { FeaturedProject } from "../data/resume";
import { benchResultsUrl, featured, workIntro } from "../data/resume";
import { BenchResults, Figure, PassChart, ScoringFigure, TrainingStrip, TurnFigure } from "./figures";
import { GitHubIcon } from "./icons";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const figures: Record<FeaturedProject["id"], ReactNode> = {
  nutrienv: (
    <Figure
      n={2}
      caption={
        <>
          Scoring and results. Only the end state is compared with the oracle. Below are the three runs
          published in the{" "}
          <a href={benchResultsUrl} target="_blank" rel="noreferrer" className="link-inline">
            NutriEnv README
          </a>
          : passes, and pass rate against average tokens per task. GLM and DeepSeek form the
          observed frontier; Doubao spends the most tokens for the lowest score. One run per model does not
          establish a ranking.
        </>
      }
    >
      <ScoringFigure />
      <div className="mt-6 border-t border-line pt-5">
        <BenchResults />
      </div>
    </Figure>
  ),
  nutribuddy: (
    <Figure
      n={3}
      caption="One turn through NutriBuddy. Every model step is followed by a deterministic check, and saving anything also needs the user's confirmation."
    >
      <TurnFigure />
    </Figure>
  ),
  nutrimind: (
    <Figure
      n={4}
      caption="Qwen3.5-2B on the frozen NutriEnv exam. Each bar is the mean of 8 runs over the same 63 tasks; the RL reward is only whether the end state passes."
    >
      <PassChart />
      <div className="mt-5 border-t border-line pt-5">
        <TrainingStrip />
      </div>
    </Figure>
  ),
};

function ProjectRow({ p, index }: { p: FeaturedProject; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <article className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flipped ? "lg:order-2" : ""}>
        <p className="kicker">
          {p.layer}
          <span className="mx-2 text-line">·</span>
          <span className="text-ink-3">{p.period}</span>
        </p>
        <h3 className="mt-3 flex items-center gap-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-[2.6rem]">
          <a href={p.github} target="_blank" rel="noreferrer" className="hover:text-accent-deep">
            {p.title}
          </a>
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.title} on GitHub`}
            className="text-xl text-ink-3 transition-colors hover:text-ink"
          >
            <GitHubIcon />
          </a>
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">{p.blurb}</p>

        <dl
          className={`mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line ${
            p.stats.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
          }`}
        >
          {p.stats.map((s) => (
            <div key={s.label} className="bg-paper px-4 py-3">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-2xl font-medium text-ink sm:text-[1.7rem]">{s.value}</dd>
              <dd className="mt-0.5 font-mono text-[12px] text-ink-3">{s.label}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-7 space-y-3">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-3 leading-relaxed text-ink-2">
              <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={100} className={`lg:sticky lg:top-24 ${flipped ? "lg:order-1" : ""}`}>
        {figures[p.id]}
      </Reveal>
    </article>
  );
}

export function Work() {
  return (
    <Section id="work">
      <SectionHeading n="01" label="Selected work" title="Three projects, one stack">
        {workIntro}
      </SectionHeading>
      <div className="space-y-24 sm:space-y-32">
        {featured.map((p, i) => (
          <ProjectRow key={p.id} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
