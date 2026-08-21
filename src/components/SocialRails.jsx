import { profile } from "../data/content.js";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons.jsx";

const socials = [
  { label: "GitHub", href: profile.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
  { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon },
];

/**
 * Fixed side rails (desktop only), mirroring the reference layout:
 * social icons on the left, vertical email on the right.
 */
export default function SocialRails() {
  return (
    <>
      <div className="fixed bottom-0 left-8 z-30 hidden flex-col items-center gap-6 xl:flex">
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={label}
            className="text-slate-light transition-all duration-300 hover:-translate-y-1 hover:text-green"
          >
            <Icon size={20} />
          </a>
        ))}
        <div className="h-24 w-px bg-slate" aria-hidden="true" />
      </div>

      <div className="fixed bottom-0 right-8 z-30 hidden flex-col items-center gap-6 xl:flex">
        <a
          href={`mailto:${profile.email}`}
          className="font-mono text-[13px] tracking-widest text-slate-light transition-colors hover:text-green"
          style={{ writingMode: "vertical-rl" }}
        >
          {profile.email}
        </a>
        <div className="h-24 w-px bg-slate" aria-hidden="true" />
      </div>
    </>
  );
}
