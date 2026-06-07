import type { TimelineEntry } from "@/lib/site-config";

export function Timeline({
  title,
  entries,
}: {
  title: string;
  entries: readonly TimelineEntry[];
}) {
  if (entries.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <ol className="mt-6 space-y-8 border-l pl-6">
        {entries.map((entry) => (
          <li key={`${entry.period}-${entry.title}`} className="relative">
            <span className="absolute -left-[1.6rem] top-1.5 size-2.5 rounded-full border-2 border-brand bg-background" />
            <p className="font-mono text-xs uppercase tracking-wider text-brand">
              {entry.period}
            </p>
            <h3 className="mt-1.5 font-semibold tracking-tight">{entry.title}</h3>
            <p className="text-sm text-muted-foreground">{entry.org}</p>
            {entry.detail && (
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {entry.detail}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
