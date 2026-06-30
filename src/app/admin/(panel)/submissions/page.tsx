import { getSubmissions } from "@/db/queries";
import { deleteSubmission } from "./actions";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink">Submissions</h1>
      <p className="mt-2 text-sm text-muted">
        {submissions.length} message{submissions.length === 1 ? "" : "s"} from
        the contact form.
      </p>

      {submissions.length === 0 ? (
        <p className="mt-8 text-muted">No submissions yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {submissions.map((s) => (
            <li
              key={s.id}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-ink">{s.name}</p>
                  <p className="text-sm text-muted">
                    <a
                      href={`mailto:${s.email}`}
                      className="hover:text-accent"
                    >
                      {s.email}
                    </a>
                    {s.phone ? ` · ${s.phone}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <time className="text-xs text-muted">
                    {s.createdAt.toLocaleString()}
                  </time>
                  <form action={deleteSubmission}>
                    <input type="hidden" name="id" value={s.id} />
                    <button
                      type="submit"
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-ink">
                {s.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
