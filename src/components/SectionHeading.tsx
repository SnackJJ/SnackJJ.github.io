import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Numbered section header: mono number + serif title + optional lede. */
export function SectionHeading({
  n,
  label,
  title,
  children,
}: {
  n: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Reveal>
      <header className="mb-12 max-w-3xl sm:mb-16">
        <p className="kicker">
          <span className="text-ink-3">{n}</span>
          <span className="mx-2 text-line">/</span>
          {label}
        </p>
        <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
        {children && <p className="mt-5 text-lg leading-relaxed text-ink-2">{children}</p>}
      </header>
    </Reveal>
  );
}

/** Full-width page section with consistent rhythm and a top rule. */
export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-line ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">{children}</div>
    </section>
  );
}
