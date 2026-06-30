import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Serif display face for section headings (variable font).
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Monospace face for body, navigation and labels (fixed weights).
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description:
    "Backend engineer with 3+ years building production systems in fintech and data platforms — Kotlin/Spring Boot microservices, event-driven pipelines and clean, maintainable design.",
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description:
      "Backend engineer building production systems in fintech and data platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${ibmPlexMono.variable} scroll-smooth antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
