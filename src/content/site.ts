import type { SiteConfig } from "@/types/content";

export const site: SiteConfig = {
  name: "Saurav Suman",
  initials: "S",
  role: "Backend Engineer",
  email: "sauravsuman5980@gmail.com",
  phone: "+919155962770",
  phoneDisplay: "(+91) 9155962770",
  location: "Gurugram, IN",
  resumeHref: "/resume/Resume_Saurav_Suman.pdf",
  sidebarBlurb:
    "Backend engineer building production systems in fintech and data platforms. Feel free to reach out if you'd like to work together.",
  nav: [
    { label: "Biography", href: "#section-intro" },
    { label: "Expertise", href: "#section-expertise" },
    { label: "Projects", href: "#section-projects" },
    { label: "Get in touch", href: "#section-contact" },
  ],
  socials: [
    {
      label: "LN",
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/saurav-suman-ind/",
    },
    { label: "GH", name: "GitHub", href: "https://github.com/saurav4geeks" },
  ],
};
