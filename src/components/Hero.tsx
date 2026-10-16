import { profile } from "../data/resume";
import { Figure, StackFigure } from "./figures";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden" aria-label="Introduction">
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-28 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-36 lg:pb-28">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-[13px] text-ink-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-good" />
              </span>
              {profile.availability}
            </p>
            <p className="kicker mt-8">{profile.eyebrow}</p>
            <h1 className="mt-3 font-serif text-5xl font-medium tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {profile.name}
              <span className="ml-3 align-middle font-sans text-xl font-normal tracking-normal text-ink-3 sm:text-2xl">
                {profile.nameZh}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 font-serif text-2xl leading-snug text-ink sm:text-[1.75rem]">
              I build LLM agents whose claims can be <em className="text-accent-deep">checked</em> — the
              runtime, the benchmark that scores it, and the small model trained inside it.
            </p>
            <p className="mt-5 leading-relaxed text-ink-2">{profile.intro}</p>
          </Reveal>

          <Reveal delay={160}>
            <blockquote className="mt-7 border-l-2 border-accent pl-4">
              <p className="kicker text-ink-3!">The question behind it</p>
              <p className="mt-1.5 font-serif text-xl leading-snug text-ink italic">{profile.question}</p>
            </blockquote>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-primary">
                See the work
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                Email me
              </a>
              <span className="flex items-center">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-xl text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <GitHubIcon />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-xl text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <LinkedInIcon />
                </a>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <Figure
            n={1}
            caption="The stack. The model only chooses actions, the harness checks them, and the environment owns the state and decides pass or fail from the end state alone."
          >
            <StackFigure />
          </Figure>
        </Reveal>
      </div>
    </section>
  );
}
