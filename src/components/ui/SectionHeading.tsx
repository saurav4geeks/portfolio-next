import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  /** Override the default teal heading colour (e.g. for the intro statement). */
  tone?: "heading" | "ink";
}

/** Playfair Display section title — teal by default, matching the design language. */
export function SectionHeading({
  children,
  className,
  tone = "heading",
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-serif text-4xl font-normal sm:text-5xl",
        tone === "heading" ? "text-heading" : "text-ink",
        className,
      )}
    >
      {children}
    </h2>
  );
}
