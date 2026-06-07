import { Badge } from "@/components/ui/badge";

export function TechStack({
  technologies,
  tags,
}: {
  technologies: string[];
  tags: string[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Tech stack
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} className="font-mono text-xs font-normal" variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {tags.length > 0 && (
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Topics
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
