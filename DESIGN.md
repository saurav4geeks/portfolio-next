# Design System & Instructions

This document is the source of truth for the portfolio's visual language. Follow
it when adding sections, components, or pages so the site stays coherent as it
grows. The original design (a warm, editorial, monospace-meets-serif aesthetic)
is preserved from the v1 portfolio and codified into tokens here.

## 1. Design tokens

All colours and fonts are CSS variables defined in
[`src/app/globals.css`](src/app/globals.css) and exposed to Tailwind via
`@theme`. **Never hard-code hex values in components** — use the token utilities
(`bg-bg`, `text-ink`, `text-accent`, `border-border`, `font-serif`, …).

| Token            | Utility            | Light value | Role                                   |
| ---------------- | ------------------ | ----------- | -------------------------------------- |
| `--bg`           | `bg-bg`            | `#faf2f0`   | Page background (cream)                |
| `--surface`      | `bg-surface`       | `#ffffff`   | Elevated surfaces                      |
| `--panel`        | `bg-panel`         | `#f1e7e3`   | Expanded accordion panels, hairlines   |
| `--ink`          | `text-ink`         | `#232323`   | Primary text & dark headings           |
| `--navy`         | `text-navy`        | `#0a1a2b`   | Sidebar nav links                      |
| `--muted`        | `text-muted`       | `#595959`   | Secondary text, dates                  |
| `--accent`       | `text-accent`      | `#ab5232`   | Terracotta — primary accent            |
| `--accent-hover` | `bg-accent-hover`  | `#e8604c`   | Hover/active accent                    |
| `--heading`      | `text-heading`     | `#629489`   | Teal section headings                  |
| `--border`       | `border-border`    | `#f1e7e3`   | Card/section dividers                  |

### Theming (dark mode)

The `.dark` block in `globals.css` mirrors every token, and dark mode is wired as
a **class-based variant** (`@custom-variant dark`). To ship a toggle later: add
`dark` to `<html>` (e.g. via a theme provider) — no component changes needed,
because components reference tokens, not raw colours.

## 2. Typography

- **Playfair Display** (`font-serif`) — section headings only (`<h2>` via
  [`SectionHeading`](src/components/ui/SectionHeading.tsx)) and the intro
  statement. Weight 400, large (`text-4xl`/`text-5xl`).
- **IBM Plex Mono** (`font-mono`) — everything else: body, nav, labels, dates.
  Loaded in [`layout.tsx`](src/app/layout.tsx) with `next/font` (self-hosted).
- Labels/eyebrows: uppercase, `tracking-[0.1em]`, `font-semibold`, small.

## 3. Layout

- **Two-column shell** ([`page.tsx`](src/app/page.tsx)): a `fixed` 25% left
  `Sidebar` + a 75% scrolling `<main>` (`md:ml-[25%] md:w-3/4`).
- **Responsive:** below `md` (768px) the sidebar is hidden and `<main>` goes
  full-width. Mobile-only banner overlays are hidden with `lg:` guards.
- **Section rhythm:** each `<section>` uses `mt-[8%]` and `scroll-mt-12` (so
  anchored nav clears the top). Content sections cap width at `max-w-[90%]` or
  use the `lg:grid-cols-[2fr_1fr]` split (main + aside) used by Intro/Projects/Contact.
- **Anchors:** section ids are stable and referenced by the sidebar nav —
  `#section-banner`, `#section-intro`, `#section-expertise`, `#section-education`,
  `#section-projects`, `#section-contact`.

## 4. Signature interactions

1. **Hover underline** — `.hover-underline` (in `globals.css`) draws an underline
   left-to-right on hover using `currentColor`, so it adapts to light text on the
   banner and dark text in the sidebar. Use via
   [`HoverUnderlineLink`](src/components/ui/HoverUnderlineLink.tsx).
2. **Accordion eye toggle** — [`AccordionCard`](src/components/ui/AccordionCard.tsx)
   collapses content behind a header; an open/closed eye glyph
   ([`EyeIcon`](src/components/ui/EyeIcon.tsx)) signals state. This is the core
   content unit for experience and projects.

## 5. Component conventions

- **Presentational + data-driven.** Components render props; copy lives in
  [`src/content/*.ts`](src/content), typed against
  [`src/types/content.ts`](src/types/content.ts). A section component should
  `map` over a content array — it should contain no literal copy.
- **Server by default.** Only mark `"use client"` when state/effects are needed
  (`AccordionCard`, `Contact`). Keep client boundaries small.
- **Class merging:** use [`cn()`](src/lib/utils.ts) for conditional classes.
- **Images:** `next/image` with explicit `sizes`; assets live in `public/images`.

## 6. How to extend

| Goal                  | Do this                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| Add a job / project   | Append an entry to `content/experience.ts` / `content/projects.ts`.     |
| Add a skill           | Edit a group in `content/skills.ts`.                                     |
| Change contact/socials| Edit `content/site.ts` (single source for name, email, nav, socials).   |
| Add a new section     | New `components/sections/X.tsx` + `content/x.ts`; render it in `page.tsx`; add a nav item with a matching `#section-x` id. |
| Add a new page (blog) | New folder under `src/app/` — the token system and components carry over.|
| Add a theme toggle    | Toggle the `dark` class on `<html>`; tokens already defined.            |
