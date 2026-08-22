import { footerNote } from "../data/resume";

/** Footer: hairline + weak meta line (Ink-3, 14px — contrast-safe usage). */
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-6 py-8 text-center sm:px-8">
        <p className="font-mono text-sm text-ink-3">© 2026 Zeqing Jiang · 蒋泽庆</p>
        <p className="font-mono text-sm text-ink-3">{footerNote}</p>
      </div>
    </footer>
  );
}
