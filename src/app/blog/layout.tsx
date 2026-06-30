import Link from "next/link";
import { site } from "@/content/site";
import "highlight.js/styles/github-dark.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="hover-underline font-serif text-xl text-ink"
          >
            {site.name}
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            ← Back to portfolio
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>
    </div>
  );
}
