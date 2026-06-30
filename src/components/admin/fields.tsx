const inputClasses =
  "w-full border border-ink/20 bg-bg px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent";

const labelClasses = "mb-1 block text-xs font-semibold uppercase tracking-wide text-muted";

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelClasses}>{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? undefined}
        required={required}
        placeholder={placeholder}
        className={inputClasses}
      />
    </label>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
  hint,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClasses}>{label}</span>
      {hint && <span className="mb-1 block text-xs text-muted">{hint}</span>}
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        required={required}
        className={`${inputClasses} resize-y`}
      />
    </label>
  );
}
