import { featuredProjects, otherProjects } from "../data/content.js";
import Reveal from "./Reveal.jsx";
import SectionHeading from "./SectionHeading.jsx";
import ProjectArt from "./ProjectArt.jsx";
import { ExternalLinkIcon, FolderIcon, GitHubIcon } from "./Icons.jsx";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-10">
      <SectionHeading index="03" title="What I've Built" />

      {/* Featured projects */}
      <div className="mt-16 space-y-24">
        {featuredProjects.map((project, i) => (
          <FeaturedProject key={project.id} project={project} reverse={i % 2 === 1} />
        ))}
      </div>

      {/* Other noteworthy projects */}
      <Reveal className="mt-28">
        <h3 className="text-center text-2xl font-semibold text-ink sm:text-3xl">
          Other Noteworthy Projects
        </h3>
        <a
          href="https://github.com/SnackJJ?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="mt-2 block text-center font-mono text-[13px] text-accent hover:underline"
        >
          view the full archive on GitHub
        </a>
      </Reveal>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {otherProjects.map((project, i) => (
          <li key={project.title}>
            <Reveal delay={(i % 3) * 120} className="h-full">
              <article className="group flex h-full flex-col rounded-lg border border-transparent bg-surface p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-2 hover:border-accent/40">
                <header className="flex items-center justify-between">
                  <FolderIcon size={38} className="text-accent" strokeWidth={1} />
                  <div className="flex items-center gap-3 text-body">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="transition-colors hover:text-accent"
                      >
                        <GitHubIcon size={20} />
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="transition-colors hover:text-accent"
                      >
                        <ExternalLinkIcon size={20} />
                      </a>
                    )}
                  </div>
                </header>

                <h4 className="mt-6 text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                  {project.links.github ? (
                    <a href={project.links.github} target="_blank" rel="noreferrer">
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h4>

                <p className="mt-3 text-sm leading-relaxed">{project.description}</p>

                <footer className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-6 font-mono text-xs text-faint">
                  {project.tech.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </footer>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FeaturedProject({ project, reverse }) {
  const alignment = reverse ? "md:text-left" : "md:text-right";
  const listAlignment = reverse ? "" : "md:justify-end";

  const art = (
    <div
      className={`overflow-hidden rounded-lg border border-line bg-surface shadow-[var(--shadow-card)] ${
        reverse ? "md:col-span-7 md:-ml-20" : "md:col-span-7"
      }`}
    >
      <div className="group">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <ProjectArt id={project.id} />
        </div>
      </div>
    </div>
  );

  const content = (
    <div
      className={`relative z-10 mt-6 md:mt-0 md:col-span-5 ${
        reverse ? "" : "md:col-start-8"
      } md:-ml-20`}
    >
      <div className={`rounded-lg bg-surface/95 p-7 shadow-[var(--shadow-card)] ${alignment}`}>
        <p className="font-mono text-sm text-accent">{project.eyebrow}</p>

        <h3 className="mt-2 text-2xl font-semibold text-ink">
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-4 text-sm leading-relaxed">{project.description}</p>

        {project.stats && (
          <ul className={`mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-accent/90 ${listAlignment}`}>
            {project.stats.map((stat) => (
              <li key={stat}>{stat}</li>
            ))}
          </ul>
        )}

        <ul className={`mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-body ${listAlignment}`}>
          {project.tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {(project.links.github || project.links.demo) && (
          <div className={`mt-5 flex items-center gap-4 ${listAlignment}`}>
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-body transition-colors hover:text-accent"
              >
                <ExternalLinkIcon size={22} />
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="text-body transition-colors hover:text-accent"
              >
                <GitHubIcon size={22} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Reveal>
      <article className="md:grid md:grid-cols-12 md:items-center">
        {reverse ? (
          <>
            {content}
            {art}
          </>
        ) : (
          <>
            {art}
            {content}
          </>
        )}
      </article>
    </Reveal>
  );
}
