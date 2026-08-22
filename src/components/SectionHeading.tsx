import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Numbered section header: Silkscreen eyebrow ("01. About") + big sans title
 * + hairline. The Silkscreen eyebrow is one of the two sanctioned pixel-font
 * micro-copy spots on the whole page.
 */
export function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id?: string;
}) {
  return (
    <Reveal>
      <div className="mb-10 flex items-end gap-4 sm:mb-12">
        <div>
          <p className="font-pixel text-[11px] tracking-[0.3em] text-accent-deep uppercase">
            {eyebrow}
          </p>
          <h2
            id={id}
            className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            {title}
          </h2>
        </div>
        <div aria-hidden="true" className="mb-2 h-px flex-1 bg-line" />
      </div>
    </Reveal>
  );
}

/** Convenience wrapper for a full page section with consistent rhythm. */
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
    <section id={id} className={`mx-auto max-w-5xl px-6 py-24 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}
