import { site } from "@/content/site";
import { HoverUnderlineLink } from "@/components/ui/HoverUnderlineLink";

/**
 * Fixed left rail: logo, in-page navigation and résumé download.
 * Hidden below the `md` breakpoint, where the main column goes full-width.
 */
export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-1/4 flex-col justify-between p-[3%] md:flex">
      <div>
        <a
          href="#section-banner"
          aria-label={`${site.name} — home`}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent font-mono text-2xl font-bold text-white"
        >
          {site.initials}
        </a>
      </div>

      <nav>
        <ul className="space-y-5">
          {site.nav.map((item) => (
            <li key={item.href}>
              <HoverUnderlineLink
                href={item.href}
                className="text-[15px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors hover:text-accent"
              >
                {item.label}
              </HoverUnderlineLink>
            </li>
          ))}
          <li>
            <HoverUnderlineLink
              href="/blog"
              className="text-[15px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors hover:text-accent"
            >
              Writing
            </HoverUnderlineLink>
          </li>
        </ul>
      </nav>

      <div className="space-y-4">
        <p className="max-w-[85%] text-[13px] leading-6 text-muted">
          {site.sidebarBlurb}
        </p>
        <a
          href={site.resumeHref}
          download
          className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-navy transition-colors hover:text-accent"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          Download Resume
        </a>
      </div>
    </aside>
  );
}
