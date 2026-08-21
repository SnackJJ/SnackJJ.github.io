import { contact, profile } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import { GitHubIcon, LinkedInIcon } from "./Icons.jsx";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl scroll-mt-24 px-6 py-32 text-center md:px-10"
    >
      <Reveal>
        <p className="font-mono text-sm text-accent">{contact.eyebrow}</p>
        <h2 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">
          {contact.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed">{contact.body}</p>

        <div className="mt-10 flex items-center justify-center gap-8">
          <a
            href={`mailto:${profile.email}`}
            className="rounded border border-accent px-7 py-4 font-mono text-sm text-accent transition-all duration-300 hover:-translate-y-1 hover:bg-accent/10 hover:shadow-[var(--shadow-accent)]"
          >
            {contact.cta}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-body transition-all duration-300 hover:-translate-y-1 hover:text-accent"
          >
            <GitHubIcon size={26} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="text-body transition-all duration-300 hover:-translate-y-1 hover:text-accent"
          >
            <LinkedInIcon size={26} />
          </a>
        </div>

        <p className="mt-10 font-mono text-xs text-faint">
          {profile.location} · {profile.email}
        </p>
      </Reveal>
    </section>
  );
}
