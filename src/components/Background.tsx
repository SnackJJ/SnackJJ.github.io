import { coursework, education, languages, skillGroups } from "../data/resume";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

export function Background() {
  return (
    <Section id="background">
      <SectionHeading n="03" label="Background" title="From proofs to pipelines" />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <h3 className="kicker mb-5">Education</h3>
          <ol className="relative space-y-8 border-l border-line pl-6">
            {education.map((e) => (
              <li key={e.school} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-[29px] h-2.5 w-2.5 rounded-full border-2 border-accent bg-paper"
                />
                <p className="font-mono text-[12px] text-ink-3">{e.period}</p>
                <p className="mt-1 font-serif text-2xl font-medium text-ink">{e.school}</p>
                <p className="font-medium text-accent-deep">{e.degree}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{e.note}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={80}>
          <h3 className="kicker mb-5">Toolbox</h3>
          <div className="space-y-5">
            {skillGroups.map((g) => (
              <div key={g.label}>
                <p className="mb-2 text-sm font-semibold text-ink">{g.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-sm text-ink-2">
              <span className="font-semibold text-ink">Languages</span>
              <span className="mx-2 text-line">·</span>
              {languages}
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <h3 className="kicker mt-20 mb-6">Coursework & seminars</h3>
      </Reveal>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {coursework.map((c, i) => (
          <li key={c.title}>
            <Reveal delay={i * 60} className="h-full">
              <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent">
                <p className="font-mono text-[12px] text-ink-3">{c.context}</p>
                <h4 className="mt-2 font-serif text-xl font-medium text-ink">{c.title}</h4>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-2">{c.blurb}</p>
                <p className="mt-4 font-mono text-[12px] text-accent-deep">{c.tags.join(" · ")}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
