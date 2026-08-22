import { SectionHeading, Section } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { experiences } from "../data/resume";

/**
 * Experience: vertical timeline with pixel-square cyan markers.
 */
export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="02. Experience" title="Where I've worked" />

      <ol className="relative space-y-12 border-l border-line pl-6 sm:pl-10">
        {experiences.map((exp, i) => (
          <li key={exp.company} className="relative">
            {/* pixel square marker on the timeline */}
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[31px] h-2.5 w-2.5 bg-accent sm:-left-[47px]"
            />

            <Reveal delay={i * 80}>
              <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg font-bold text-ink">
                  {exp.role}
                  <span aria-hidden="true" className="mx-2 text-line">
                    @
                  </span>
                  {exp.url ? (
                    <a href={exp.url} target="_blank" rel="noreferrer" className="link-inline">
                      {exp.company}
                    </a>
                  ) : (
                    <span className="text-accent-deep">{exp.company}</span>
                  )}
                </h3>
                <p className="font-mono text-sm text-ink-3">{exp.period}</p>
              </header>
              <p className="mt-1 font-mono text-sm text-ink-3">{exp.location}</p>

              <ul className="mt-4 space-y-2.5">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed text-ink-2">
                    <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {exp.tags.map((t) => (
                  <li key={t} className="chip chip-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
