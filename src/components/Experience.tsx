import { tencent } from "../data/resume";
import { Figure, RetrievalFigure } from "./figures";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

export function Experience() {
  const t = tencent;
  return (
    <Section id="experience" className="bg-surface/50">
      <SectionHeading n="02" label="Experience" title="In industry" />
      <article className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="kicker">
            {t.period}
            <span className="mx-2 text-line">·</span>
            <span className="text-ink-3">{t.location}</span>
          </p>
          <h3 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-[2.6rem]">
            {t.company}
          </h3>
          <p className="mt-1 font-medium text-ink-2">{t.role}</p>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">{t.summary}</p>

          <div className="mt-7 flex items-end gap-4 rounded-xl border border-line bg-paper px-5 py-4">
            <p className="font-serif text-5xl font-medium tracking-tight text-ink">
              <span className="text-ink-3">{t.stat.from}</span>
              <span className="mx-2 text-accent">→</span>
              {t.stat.to}
              <span className="ml-1.5 text-2xl text-ink-2">{t.stat.unit}</span>
            </p>
            <p className="pb-1.5 font-mono text-[12px] leading-snug text-ink-3">{t.stat.label}</p>
          </div>

          <ul className="mt-7 space-y-3">
            {t.points.map((pt) => (
              <li key={pt} className="flex gap-3 leading-relaxed text-ink-2">
                <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {t.tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="lg:sticky lg:top-24">
          <Figure
            n={5}
            caption="Supplier screening at Tencent IEG. Case studies outweigh self-reported claims in the fusion step; weak evidence sends the query back for reformulation instead of passing with a lower bar."
          >
            <RetrievalFigure />
          </Figure>
        </Reveal>
      </article>
    </Section>
  );
}
