import { useEffect, useState } from "react";
import { nav, profile } from "../data/content.js";
import { CloseIcon, GitHubIcon, LinkedInIcon, MailIcon, MenuIcon } from "./Icons.jsx";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Elevate the bar once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight the section currently in view.
  useEffect(() => {
    const sections = nav
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open; close on Escape.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClasses = (id) =>
    `font-mono text-[13px] transition-colors duration-300 ${
      activeSection === id ? "text-accent" : "text-ink hover:text-accent"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-surface/85 shadow-[0_10px_30px_-14px_rgba(20,36,63,0.18)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10"
        aria-label="Primary"
      >
        {/* Monogram */}
        <a
          href="#top"
          className="font-mono text-lg font-semibold text-accent transition-colors hover:text-accent/80"
          aria-label="Back to top"
        >
          &lt;{profile.monogram} /&gt;
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {nav.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} className={linkClasses(id)}>
              <span className="mr-1 text-accent">0{i + 1}.</span>
              {label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="p-2 text-accent md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <MenuIcon size={26} />
        </button>
      </nav>

      {/* Mobile slide-in panel */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 w-full cursor-default bg-ink/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <div className="animate-panel-in absolute top-0 right-0 flex h-full w-3/4 min-w-[260px] flex-col bg-surface p-8 shadow-[var(--shadow-card)]">
            <button
              type="button"
              className="mb-10 self-end p-2 text-accent"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon size={26} />
            </button>

            <ul className="flex flex-col gap-5">
              {nav.map(({ id, label }, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-2 font-mono text-base text-ink transition-colors hover:text-accent"
                  >
                    <span className="text-sm text-accent">0{i + 1}.</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-6 text-body">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-accent">
                <GitHubIcon size={22} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-accent">
                <LinkedInIcon size={22} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-accent">
                <MailIcon size={22} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
