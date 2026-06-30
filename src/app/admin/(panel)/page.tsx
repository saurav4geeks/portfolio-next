import Link from "next/link";
import { getCounts } from "@/db/queries";

export const dynamic = "force-dynamic";

const cards = [
  { href: "/admin/submissions", label: "Submissions", key: "submissions" },
  { href: "/admin/experience", label: "Experience", key: "experience" },
  { href: "/admin/projects", label: "Projects", key: "projects" },
  { href: "/admin/skills", label: "Skill groups", key: "skills" },
  { href: "/admin/education", label: "Education", key: "education" },
] as const;

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">
        Manage your portfolio content and review contact submissions.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <div className="text-3xl font-semibold text-ink">
              {counts[card.key]}
            </div>
            <div className="mt-1 text-sm text-muted">{card.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
