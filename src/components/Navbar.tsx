import { useEffect, useState } from "react";
import { navLinks, profile } from "../data/resume";
import { CloseIcon, MenuIcon } from "./icons";

/**
 * Fixed top navbar: paper/blur at rest; after scrolling it gains a 1px Line
 * bottom border and a very soft shadow. Collapses to a hamburger panel on
 * mobile (touch targets >= 44px).
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel when a link is chosen
  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/85 "
          : "border-b border-transparent bg-paper/70"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <a
          href="#top"
          onClick={close}
          className="flex min-h-[44px] items-center gap-2.5 font-serif text-xl font-medium tracking-tight text-ink"
          aria-label="Back to top"
        >
          {/* same mark as the favicon (scripts/favicon.html) */}
          <span
            aria-hidden="true"
            className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-[22%] bg-ink"
          >
            <span className="-translate-x-[4%] -translate-y-[5%] font-serif text-[20px] leading-none font-semibold tracking-[-0.04em] text-paper italic">
              z&#x0237;
            </span>
            <span className="absolute top-[19%] right-[25%] h-[13%] w-[13%] rounded-full bg-accent" />
          </span>
          {profile.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="flex min-h-[44px] items-center rounded-full px-3.5 text-sm font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-accent-deep"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger (44px+ touch target) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-[3px] text-xl text-ink hover:bg-surface-2 md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-paper md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="flex min-h-[44px] items-center border-b border-line/60 font-mono text-sm text-ink last:border-b-0 hover:text-accent-deep"
                >
                  <span className="mr-3 text-accent">›</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
