import { contact, profile } from "../data/resume";
import { Reveal } from "./Reveal";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

/**
 * Contact: Silkscreen eyebrow (pixel micro-copy #2), one-line invitation,
 * big email link with a highlighter sweep on hover, pixel social icons.
 */
export function Contact() {
  return (
    <section id="contact" className="relative">
      <div className="mx-auto max-w-3xl px-6 py-28 text-center sm:px-8 sm:py-32">
        <Reveal>
          <p className="font-pixel text-[11px] tracking-[0.3em] text-accent-deep uppercase">
            {contact.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {contact.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-2">
            {contact.invite}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10">
            <a
              href={`mailto:${profile.email}`}
              className="highlighter inline-block rounded-[2px] font-mono text-lg font-semibold break-all text-ink sm:text-2xl"
            >
              {profile.email}
            </a>
          </p>

          <ul className="mt-10 flex items-center justify-center gap-6 text-xl">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center transition-colors hover:text-accent-deep"
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
                className="inline-flex h-11 w-11 items-center justify-center transition-colors hover:text-accent-deep"
              >
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="inline-flex h-11 w-11 items-center justify-center transition-colors hover:text-accent-deep"
              >
                <MailIcon />
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
