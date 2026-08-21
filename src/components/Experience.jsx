import { useState } from "react";
import { experience } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = experience[activeIndex];

  const tabClasses = (isActive) =>
    `relative w-full border-l-2 bg-transparent px-5 py-3 text-left font-mono text-[13px] transition-all duration-300 sm:border-b-2 sm:border-l-0 ${
      isActive
        ? "border-green bg-green/5 text-green"
        : "border-navy-lightest text-slate hover:bg-green/5 hover:text-green"
    }`;

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-10">
      <SectionHeading index="02" title="Where I've Worked" />

      <Reveal className="mt-10">
        {/* Mobile: dropdown. Desktop: vertical tab list beside details. */}
        <div className="sm:hidden">
          <label htmlFor="experience-select" className="sr-only">
            Choose a position
          </label>
          <div className="relative">
            <select
              id="experience-select"
              value={activeIndex}
              onChange={(event) => setActiveIndex(Number(event.target.value))}
              className="w-full appearance-none rounded border border-navy-lightest bg-navy-light p-3 pr-10 font-mono text-sm text-slate-lightest focus:border-green focus:outline-none"
            >
              {experience.map((job, i) => (
                <option key={job.company} value={i}>
                  {job.company}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-green"
              aria-hidden="true"
            >
              ▾
            </span>
          </div>
        </div>

        <div className="hidden gap-8 sm:grid sm:grid-cols-[minmax(140px,180px)_1fr] md:gap-12">
          <div role="tablist" aria-label="Work history" className="flex flex-col self-start">
            {experience.map((job, i) => (
              <button
                key={job.company}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                className={tabClasses(i === activeIndex)}
              >
                {job.company}
              </button>
            ))}
          </div>

          <div role="tabpanel" aria-live="polite">
            <ExperienceDetails job={active} />
          </div>
        </div>

        <div className="mt-6 sm:hidden">
          <ExperienceDetails job={active} />
        </div>
      </Reveal>
    </section>
  );
}

function ExperienceDetails({ job }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-lightest">
        {job.role}{" "}
        <span className="text-green">@ {job.company}</span>
      </h3>
      <p className="mt-1 font-mono text-xs text-slate">
        {job.range} · {job.location}
      </p>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed">{job.summary}</p>

      <ul className="mt-5 max-w-2xl space-y-3">
        {job.highlights.map((highlight) => (
          <li key={highlight.slice(0, 40)} className="flex items-start gap-3">
            <span className="mt-1 shrink-0 text-green" aria-hidden="true">
              ▹
            </span>
            <span className="text-sm leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
