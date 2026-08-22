import { profile } from "../data/resume";
import { PixelAvatar } from "./PixelAvatar";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { Reveal } from "./Reveal";

/**
 * Hero: Silkscreen greeting (pixel micro-copy #1), name, positioning line,
 * short intro, two pixel buttons; pixel avatar on the right with the single
 * Yellow sparkle. Ultra-faint pixel-grid texture on the background.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="pixel-grid relative overflow-hidden"
      aria-label="Introduction"
    >
      <div className="relative mx-auto flex max-w-5xl flex-col-reverse items-center gap-12 px-6 pt-36 pb-20 sm:px-8 md:pt-44 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pb-28">
        {/* Copy */}
        <div className="max-w-2xl text-center lg:text-left">
          <Reveal>
            <p className="font-pixel text-xs tracking-[0.35em] text-accent-deep uppercase">
              {profile.greeting}
            </p>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {profile.name}
              <span aria-hidden="true" className="text-accent">
                .
              </span>
            </h1>
            <p className="mt-4 text-xl font-semibold break-words text-ink-2 sm:text-2xl lg:text-[1.7rem]">
              {profile.headline}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-6 leading-relaxed text-ink-2">{profile.intro}</p>
            <p className="mt-3 leading-relaxed text-ink-2">{profile.intro2}</p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a href="#projects" className="btn-pixel btn-primary">
                View My Work
              </a>
              <a href={`mailto:${profile.email}`} className="btn-pixel btn-secondary">
                Get In Touch
              </a>
            </div>

            <ul className="mt-10 flex items-center justify-center gap-5 text-ink-2 lg:justify-start">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-11 w-11 items-center justify-center text-[22px] transition-colors hover:text-accent-deep"
                >
                  <GitHubIcon />
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center text-[22px] transition-colors hover:text-accent-deep"
                >
                  <LinkedInIcon />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="inline-flex h-11 w-11 items-center justify-center text-[22px] transition-colors hover:text-accent-deep"
                >
                  <MailIcon />
                </a>
              </li>
              <li className="ml-2 hidden font-mono text-sm text-ink-3 sm:block">
                {profile.location}
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Avatar */}
        <Reveal delay={140} className="shrink-0">
          <div className="rotate-1 transition-transform duration-300 hover:rotate-0">
            <PixelAvatar size={168} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
