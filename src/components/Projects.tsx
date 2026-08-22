import type { Project } from "../data/resume";
import { projects } from "../data/resume";
import { SectionHeading, Section } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ExternalLinkIcon, FolderIcon, GitHubIcon, PixelScene } from "./icons";

function ProjectLinks({ project, className = "" }: { project: Project; className?: string }) {
  if (!project.github && !project.demo) return null;
  return (
    <div className={`flex items-center gap-4 text-lg text-ink-2 ${className}`}>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="transition-colors hover:text-accent-deep"
        >
          <GitHubIcon />
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} live demo`}
          className="transition-colors hover:text-accent-deep"
        >
          <ExternalLinkIcon />
        </a>
      )}
    </div>
  );
}

/** Featured: alternating image/text rows with decorative pixel panels. */
function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <Reveal>
      <article className="card card-hover grid overflow-hidden md:grid-cols-[5fr_6fr]">
        {/* Decorative pixel panel — TODO: replace with a pixelated screenshot */}
        <div
          className={`relative flex min-h-48 items-center justify-center bg-surface-2/60 p-8 sm:p-10 ${
            flipped ? "md:order-2" : ""
          }`}
        >
          <div
            aria-hidden="true"
            className="pixel-grid absolute inset-0"
          />
          <div className="relative w-full max-w-72">
            <PixelScene scene={project.art} label={`${project.title} pixel illustration`} />
          </div>
        </div>

        <div className={`p-7 sm:p-9 ${flipped ? "md:order-1" : ""}`}>
          <header className="flex items-start justify-between gap-4">
            <p className="mt-1 text-accent">
              <FolderIcon />
            </p>
            <ProjectLinks project={project} />
          </header>

          <h3 className="mt-3 text-xl font-bold text-ink">
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noreferrer" className="link-inline">
                {project.title}
              </a>
            ) : project.github ? (
              <a href={project.github} target="_blank" rel="noreferrer" className="link-inline">
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>

          <p className="mt-3 leading-relaxed text-ink-2">{project.blurb}</p>

          {project.highlights && (
            <ul className="mt-4 space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-2">
                  <span aria-hidden="true" className="mt-[8px] h-1.5 w-1.5 shrink-0 bg-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="chip chip-sm">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

/** Grid card for the remaining projects. */
function SmallProjectCard({ project }: { project: Project }) {
  return (
    <Reveal className="h-full">
      <article className="card card-hover group flex h-full flex-col p-6">
        <header className="flex items-start justify-between gap-4">
          <p className="text-accent">
            <FolderIcon />
          </p>
          <ProjectLinks project={project} />
        </header>

        <h3 className="mt-4 text-lg font-bold text-ink">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="link-inline">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{project.blurb}</p>

        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
          {project.tags.map((t) => (
            <li key={t} className="font-mono text-xs text-accent-deep">
              {t}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeading eyebrow="03. Projects" title="Things I've built" />

      <div className="space-y-10">
        {featured.map((p, i) => (
          <FeaturedProject key={p.title} project={p} index={i} />
        ))}
      </div>

      <h3 className="mt-16 mb-6 font-mono text-sm font-semibold tracking-wide text-accent-deep uppercase">
        Other noteworthy projects
      </h3>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <li key={p.title}>
            <SmallProjectCard project={p} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
