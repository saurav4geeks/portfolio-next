"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children = "Save",
  variant = "primary",
  formAction,
  confirm,
}: {
  children?: React.ReactNode;
  variant?: "primary" | "ghost";
  formAction?: (formData: FormData) => void | Promise<void>;
  confirm?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      formAction={formAction}
      disabled={pending}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      className={cn(
        "px-5 py-2 text-sm font-semibold transition-colors disabled:opacity-60",
        variant === "primary"
          ? "bg-accent text-white hover:bg-accent-hover"
          : "text-muted hover:text-accent",
      )}
    >
      {pending ? "Working…" : children}
    </button>
  );
}
