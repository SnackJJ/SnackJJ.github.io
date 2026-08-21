import { profile } from "../data/content.js";
import { GitHubIcon, LinkedInIcon } from "./Icons.jsx";

export default function Footer() {
  return (
    <footer className="px-6 pb-10 text-center">
      <div className="mb-6 flex items-center justify-center gap-6 text-slate-light xl:hidden">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-green">
          <GitHubIcon size={20} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-green">
          <LinkedInIcon size={20} />
        </a>
      </div>

      <a
        href="https://github.com/SnackJJ"
        target="_blank"
        rel="noreferrer"
        className="font-mono text-xs text-slate transition-colors hover:text-green"
      >
        Designed &amp; built by {profile.name}
      </a>
    </footer>
  );
}
