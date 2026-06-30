"use client";

import { useState } from "react";
import { EyeIcon } from "./EyeIcon";
import { cn } from "@/lib/utils";

interface AccordionCardProps {
  startDate: string;
  endDate?: string;
  /** Bold left-hand title — a role or project name. */
  title: string;
  /** Right-hand meta — company + location, or a tech stack. */
  subtitle: string;
  highlights: string[];
  link?: string;
  linkLabel?: string;
  defaultOpen?: boolean;
}

/**
 * Collapsible card with the eye open/closed indicator — the site's core
 * content unit for experience and projects. Header toggles the highlight panel.
 */
export function AccordionCard({
  startDate,
  endDate,
  title,
  subtitle,
  highlights,
  link,
  linkLabel = "View Project",
  defaultOpen = false,
}: AccordionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="my-8">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full cursor-pointer border-b-2 border-border py-3 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-8 text-sm text-muted">
            <span>{startDate}</span>
            {endDate && <span>{endDate}</span>}
          </div>
          <EyeIcon
            open={open}
            className={cn(
              "h-5 w-5 shrink-0 text-ink transition-opacity",
              open ? "opacity-100" : "opacity-50",
            )}
          />
        </div>
        <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-semibold text-ink">{title}</h3>
          <em className="text-sm not-italic text-accent sm:italic">
            {subtitle}
          </em>
        </div>
      </button>

      {open && (
        <div className="bg-panel px-5 py-4">
          <ul className="list-disc space-y-3 pl-5 leading-7">
            {highlights.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block border border-ink px-5 py-2 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              {linkLabel}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
