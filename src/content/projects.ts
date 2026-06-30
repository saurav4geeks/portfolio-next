import type { ProjectItem } from "@/types/content";

export const projects: ProjectItem[] = [
  {
    id: "social-media-app",
    date: "March 2023",
    title: "Social Media App",
    stack: "React, Redux, Material UI, Node, Express, MongoDB, Multer",
    highlights: [
      "Built a social media web app where users create a profile and post images with location, comment on and like other users' posts.",
      "Designed a clean, user-friendly UI with token authentication and password hashing.",
      "Analyzed and optimized website performance by 500ms.",
    ],
    link: "https://mediafy-tg62v.ondigitalocean.app/",
  },
  {
    id: "ai-image-generation",
    date: "February 2023",
    title: "AI Image Generation App",
    stack: "Tailwind, ReactJS, Node, EJS, MongoDB, Cloudinary, OpenAI",
    highlights: [
      "Built a full-stack, cross-platform web app where users enter a prompt to generate images with AI.",
      "Integrated the OpenAI API for image generation and added the ability to share generated images to a community page.",
      "Used Cloudinary to store images, also available for users to download.",
    ],
    link: "https://imagigo-deployment-production.up.railway.app/",
  },
  {
    id: "safety-band-companion",
    date: "December 2022",
    title: "Companion Web App for Safety Band",
    stack: "HTML, CSS, JavaScript, Maps JS API, Python, Django",
    highlights: [
      "Built a mobile-first full-stack web app for an Arduino Pro Mini based automated safety band.",
      "Integrated Arduino over Bluetooth to send automated SMS with the user's location.",
      "Integrated the Maps JavaScript API to display location, with an authentication system and SOS-contact management.",
    ],
  },
];
