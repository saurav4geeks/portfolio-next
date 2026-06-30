/** Turn a newline-separated textarea value into a trimmed, non-empty string array. */
export function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Inverse of linesToArray, for pre-filling textareas. */
export function arrayToLines(arr: string[] | null | undefined): string {
  return (arr ?? []).join("\n");
}

/** Parse an integer field, falling back to 0. */
export function toInt(value: FormDataEntryValue | null): number {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : 0;
}

/** Parse a text field; returns null when empty (for nullable columns). */
export function toNullableText(value: FormDataEntryValue | null): string | null {
  const s = String(value ?? "").trim();
  return s.length ? s : null;
}
