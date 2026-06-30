import type { Metadata } from "next";
import Link from "next/link";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/education", label: "Education" },
];

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r border-border bg-surface p-6">
        <Link href="/admin" className="font-serif text-2xl text-ink">
          Admin
        </Link>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded px-3 py-2 text-sm text-ink transition-colors hover:bg-panel"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="mt-8">
          <button
            type="submit"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Sign out
          </button>
        </form>
        <Link
          href="/"
          target="_blank"
          className="mt-4 block text-sm text-muted transition-colors hover:text-accent"
        >
          View site ↗
        </Link>
      </aside>
      <main className="flex-1 p-8 lg:p-12">{children}</main>
    </div>
  );
}
