import { Check, Target } from "lucide-react";

/**
 * Structured objective / result lists for the detail page. Rendered only when
 * the project provides the corresponding frontmatter arrays.
 */

export function ObjectivesList({ objectives }: { objectives: string[] }) {
  if (objectives.length === 0) return null;
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight">Objectives</h2>
      <ul className="mt-5 space-y-3">
        {objectives.map((item) => (
          <li key={item} className="flex gap-3">
            <Target className="mt-0.5 size-5 shrink-0 text-brand" />
            <span className="leading-7 text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ResultsList({ results }: { results: string[] }) {
  if (results.length === 0) return null;
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight">Results & highlights</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {results.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-xl border bg-card/50 p-4"
          >
            <Check className="mt-0.5 size-5 shrink-0 text-brand" />
            <span className="text-sm leading-6 text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
