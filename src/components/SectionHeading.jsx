import Reveal from "./Reveal.jsx";

/**
 * Numbered section heading with a trailing rule, e.g. "01. About Me ———".
 */
export default function SectionHeading({ index, title }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 sm:gap-4">
        <h2 className="flex items-baseline whitespace-nowrap text-2xl font-semibold text-slate-lightest sm:text-3xl">
          <span className="mr-2 font-mono text-base font-normal text-green sm:text-lg">
            {index}.
          </span>
          {title}
        </h2>
        <div className="mt-1 h-px flex-1 bg-navy-lightest" aria-hidden="true" />
      </div>
    </Reveal>
  );
}
