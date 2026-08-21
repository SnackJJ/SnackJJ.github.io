import { hero, profile } from "../data/content.js";
import { ArrowDownIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons.jsx";

const stagger = [0, 120, 240, 360, 480];

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-24 pb-20 md:px-10"
    >
      {[
        <p key="greeting" className="font-mono text-accent">
          {hero.greeting}
        </p>,
        <h1
          key="name"
          className="mt-4 text-4xl font-semibold text-balance text-ink sm:text-6xl lg:text-7xl"
        >
          {hero.name}
        </h1>,
        <h2
          key="tagline"
          className="mt-4 text-2xl font-semibold text-balance text-faint sm:text-5xl"
        >
          {hero.tagline}
        </h2>,
        <p key="intro" className="mt-6 max-w-xl leading-relaxed">
          {hero.intro}
        </p>,
        <div key="ctas" className="mt-10 flex flex-wrap items-center gap-5">
          <a
            href={hero.primaryCta.href}
            className="rounded border border-accent px-7 py-4 font-mono text-sm text-accent transition-all duration-300 hover:-translate-y-1 hover:bg-accent/10 hover:shadow-[var(--shadow-accent)]"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="rounded border border-line px-7 py-4 font-mono text-sm text-ink transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent"
          >
            {hero.secondaryCta.label}
          </a>
        </div>,
      ].map((child, i) => (
        <div key={stagger[i]} className="animate-fade-up" style={{ animationDelay: `${stagger[i]}ms` }}>
          {child}
        </div>
      ))}

      {/* Scroll hint */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-accent animate-scroll-hint sm:block"
      >
        <ArrowDownIcon size={22} />
      </a>

      {/* Socials for small screens (rails take over on xl) */}
      <div className="mt-12 flex items-center gap-6 text-body xl:hidden">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-accent">
          <GitHubIcon size={22} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-accent">
          <LinkedInIcon size={22} />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-accent">
          <MailIcon size={22} />
        </a>
      </div>
    </section>
  );
}
