// Shared content types. All site copy is data-driven and typed against these
// interfaces so sections stay presentational and new entries are one-liners.

export interface NavItem {
  label: string;
  /** In-page anchor, e.g. "#section-intro" */
  href: string;
}

export interface SocialLink {
  /** Short label shown on the banner, e.g. "LN", "GH" */
  label: string;
  /** Full name used for accessible labels and the contact list */
  name: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  initials: string;
  role: string;
  email: string;
  /** Digits only, for tel: links */
  phone: string;
  phoneDisplay: string;
  location: string;
  resumeHref: string;
  sidebarBlurb: string;
  nav: NavItem[];
  socials: SocialLink[];
}

export interface IntroContent {
  heading: string;
  paragraphs: string[];
  side: {
    heading: string;
    body: string;
    /** Words inside `body` to render in the accent colour */
    emphasis?: string;
  };
}

export interface ExperienceItem {
  id: string;
  startDate: string;
  endDate: string;
  position: string;
  company: string;
  location: string;
  highlights: string[];
  /** Optional external link rendered as a "View" button when present */
  link?: string;
}

export interface ProjectItem {
  id: string;
  date: string;
  title: string;
  /** Tech stack, shown italicised on the right of the card header */
  stack: string;
  highlights: string[];
  link?: string;
}

export interface EducationItem {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  institution: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}
