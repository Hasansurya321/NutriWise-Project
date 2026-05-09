export function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        {eyebrow ? <p className="text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p> : null}
        <h2 className="text-xl font-semibold text-textPrimary">{title}</h2>
        {description ? <p className="max-w-2xl text-sm text-textSecondary">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
