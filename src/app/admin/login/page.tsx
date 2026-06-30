import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin — Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 font-serif text-3xl text-ink">Admin</h1>
        <p className="mb-8 text-sm text-muted">
          Sign in to manage your portfolio.
        </p>
        <LoginForm from={from ?? "/admin"} />
      </div>
    </main>
  );
}
