import { profile } from "../data/content.js";
import { GitHubIcon, LinkedInIcon } from "./Icons.jsx";

export default function Footer() {
  return (
    <footer className="px-6 pb-10 text-center">
      <div className="mb-6 flex items-center justify-center gap-6 text-body xl:hidden">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-accent">
          <GitHubIcon size={20} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-accent">
          <LinkedInIcon size={20} />
        </a>
      </div>

      <a
        href="https://github.com/SnackJJ"
        target="_blank"
        rel="noreferrer"
        className="font-mono text-xs text-faint transition-colors hover:text-accent"
      >
        Designed &amp; built by {profile.name}
      </a>
    </footer>
  );
}
