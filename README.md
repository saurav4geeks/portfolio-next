# Saurav Suman — Portfolio

Personal portfolio site. A rebuild of the original Create React App version on a
modern, modular stack, designed to be extended (blog, more pages, theming) over
time. The visual language of the original is preserved — see
[`DESIGN.md`](DESIGN.md).

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config, design tokens via `@theme`)
- **next/font** — self-hosted Playfair Display + IBM Plex Mono
- **Formspree** for the contact form

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Project structure

```
src/
  app/            # App Router: layout (fonts/metadata), page, global tokens
  components/
    layout/       # Sidebar, Footer
    sections/     # Banner, Intro, Experience, Education, Projects, Contact
    ui/           # AccordionCard, SmallCard, SectionHeading, HoverUnderlineLink, …
  content/        # all site copy, as typed data (site, intro, experience, …)
  types/          # content interfaces
  lib/            # cn() class helper
public/
  images/         # banner + intro images
  resume/         # downloadable résumé PDF
```

**Content is data-driven** — components are presentational and read from
`src/content/*.ts`. To update copy (a new role, project, or skill), edit the
relevant content file; no component changes needed. See
[`DESIGN.md`](DESIGN.md) for the full design system and extension guide.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is detected
   automatically; no configuration required.
3. Every push to the default branch deploys to production; PRs get previews.

The contact form posts to Formspree (form id in
[`src/components/sections/Contact.tsx`](src/components/sections/Contact.tsx)).
