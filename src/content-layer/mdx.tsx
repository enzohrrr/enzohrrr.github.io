import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Children, type ComponentProps } from "react";

import { MgfFileTree } from "@/components/projects/mgf-file-tree";
import { cn, slugify } from "@/lib/utils";

function headingText(children: React.ReactNode): string {
  return Children.toArray(children)
    .map((c) => (typeof c === "string" ? c : ""))
    .join("");
}

const mdxComponents = {
  MgfFileTree,
  h2: ({ className, children, ...props }: ComponentProps<"h2">) => (
    <h2
      id={slugify(headingText(children))}
      className={cn(
        "scroll-mt-28 text-2xl font-semibold tracking-tight mt-14 mb-4 first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ className, ...props }: ComponentProps<"h3">) => (
    <h3
      className={cn(
        "scroll-mt-28 text-lg font-semibold tracking-tight mt-10 mb-3",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps<"p">) => (
    <p
      className={cn("leading-7 text-muted-foreground [&:not(:first-child)]:mt-5", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: ComponentProps<"a">) => (
    <a
      className={cn(
        "font-medium text-brand underline underline-offset-4 decoration-brand/40 hover:decoration-brand transition-colors",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentProps<"ul">) => (
    <ul className={cn("my-5 ml-5 list-disc space-y-2 text-muted-foreground marker:text-brand/60", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps<"ol">) => (
    <ol className={cn("my-5 ml-5 list-decimal space-y-2 text-muted-foreground", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps<"li">) => (
    <li className={cn("leading-7 pl-1.5", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps<"blockquote">) => (
    <blockquote
      className={cn(
        "my-6 rounded-r-lg border-l-2 border-brand/60 bg-muted/40 py-3 pl-5 pr-4 text-foreground/90 italic",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentProps<"code">) => (
    <code
      className={cn(
        "rounded-md bg-muted px-[0.4rem] py-[0.2rem] font-mono text-[0.85em] text-foreground",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<"pre">) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-xl border bg-muted/60 p-4 font-mono text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentProps<"hr">) => (
    <hr className={cn("my-10 border-border", className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentProps<"strong">) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  table: ({ className, ...props }: ComponentProps<"table">) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }: ComponentProps<"th">) => (
    <th className={cn("border-b px-4 py-2 text-left font-semibold", className)} {...props} />
  ),
  td: ({ className, ...props }: ComponentProps<"td">) => (
    <td className={cn("border-b px-4 py-2 text-muted-foreground", className)} {...props} />
  ),
};

export async function MdxContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return content;
}
