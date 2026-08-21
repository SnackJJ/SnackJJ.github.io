import { about } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-10">
      <SectionHeading index="01" title={about.title} />

      <div className="mt-8 grid gap-12 md:grid-cols-3 md:gap-10">
        <div className="space-y-4 md:col-span-2">
          {about.paragraphs.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 32)}>
              <p className="leading-relaxed">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mb-4 font-mono text-sm tracking-wide text-slate-lightest">
            {about.skillsTitle}
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-[13px] sm:grid-cols-3 md:grid-cols-2">
            {about.skills.map((skill) => (
              <li key={skill} className="flex items-start gap-2">
                <span className="mt-px text-green" aria-hidden="true">
                  ▹
                </span>
                <span className="text-slate-light">{skill}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
