import { contact, profile } from "../data/resume";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_60%,black,transparent_65%)]"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <p className="kicker">
            <span className="text-ink-3">04</span>
            <span className="mx-2 text-line">/</span>
            Contact
          </p>
          <h2 className="mt-4 font-serif text-5xl font-medium tracking-tight text-ink sm:text-6xl">
            {contact.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">{contact.invite}</p>
          <a
            href={`mailto:${profile.email}`}
            className="highlighter mt-10 inline-block font-serif text-3xl break-all text-ink sm:text-4xl"
          >
            {profile.email}
          </a>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <GitHubIcon /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
          <p className="mt-8 font-mono text-[13px] text-ink-3">{profile.location}</p>
        </Reveal>
      </div>
    </section>
  );
}
