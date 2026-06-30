"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const inputClasses =
  "w-full border border-ink/30 bg-surface px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-accent";

export function LoginForm({ from }: { from: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="from" value={from} />
      <div>
        <label htmlFor="username" className="mb-1 block text-sm text-muted">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          className={inputClasses}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-muted">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className={inputClasses}
          required
        />
      </div>

      {state.error && <p className="text-sm text-accent">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-accent px-6 py-3 font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
