import { SectionHeading, Section } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { bio, education, skillGroups } from "../data/resume";

/** About: bio paragraphs + education on the left, grouped tech chips right. */
export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="01. About" title="Math in, agents out" />

      <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
        {/* Bio + education */}
        <div>
          {bio.map((p, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className="mb-4 leading-relaxed text-ink-2">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={140}>
            <h3 className="mt-10 mb-4 font-mono text-sm font-semibold tracking-wide text-accent-deep uppercase">
              Education
            </h3>
            <ul className="space-y-4">
              {education.map((e) => (
                <li
                  key={e.school}
                  className="card card-hover rounded-lg p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-semibold text-ink">{e.school}</p>
                    <p className="font-mono text-sm text-ink-3">{e.period}</p>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-accent-deep">
                    {e.degree}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{e.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Toolbox */}
        <Reveal delay={100}>
          <aside className="card h-fit p-6" aria-label="Technology toolbox">
            <h3 className="mb-5 font-mono text-sm font-semibold tracking-wide text-accent-deep uppercase">
              Toolbox
            </h3>
            <div className="space-y-5">
              {skillGroups.map((g) => (
                <div key={g.label}>
                  <p className="mb-2 font-mono text-xs tracking-wider text-ink-2 uppercase">
                    {g.label}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {g.skills.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
