interface SmallCardProps {
  startDate: string;
  endDate: string;
  title: string;
  subtitle: string;
}

/** Static, non-collapsible row used for education entries. */
export function SmallCard({
  startDate,
  endDate,
  title,
  subtitle,
}: SmallCardProps) {
  return (
    <div className="my-8 border-b-2 border-border py-3">
      <div className="flex gap-8 text-sm text-muted">
        <span>{startDate}</span>
        <span>{endDate}</span>
      </div>
      <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-semibold text-ink">{title}</h3>
        <em className="text-sm not-italic text-accent sm:italic">{subtitle}</em>
      </div>
    </div>
  );
}
