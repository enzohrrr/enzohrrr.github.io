"use client";

import { useState } from "react";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

export type TreeNode = {
  name: string;
  type: "dir" | "file";
  children?: TreeNode[];
};

function extColor(name: string): string {
  if (name.endsWith(".h")) return "text-violet-400";
  if (name.endsWith(".cpp")) return "text-sky-400";
  if (name.endsWith(".Build.cs")) return "text-amber-400";
  if (name.endsWith(".uplugin")) return "text-emerald-400";
  return "text-muted-foreground";
}

function TreeItem({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = useState(depth <= 2);
  const isEmpty = node.type === "dir" && !node.children?.length;

  if (node.type === "file") {
    return (
      <div
        className={cn(
          "py-[2px] pl-1 font-mono text-[11px] leading-relaxed select-none",
          extColor(node.name)
        )}
      >
        {node.name}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => !isEmpty && setOpen((o) => !o)}
        disabled={isEmpty}
        className={cn(
          "flex w-full items-center gap-1 py-[2px] pl-0.5 text-left font-mono text-[11px] leading-relaxed transition-colors duration-100",
          "text-muted-foreground hover:text-foreground",
          isEmpty && "cursor-default opacity-40"
        )}
      >
        <ChevronRight
          className={cn(
            "size-[11px] shrink-0 transition-transform duration-150",
            open && !isEmpty && "rotate-90"
          )}
        />
        {open && !isEmpty ? (
          <FolderOpen className="size-[11px] shrink-0 text-muted-foreground/60" />
        ) : (
          <Folder className="size-[11px] shrink-0 text-muted-foreground/60" />
        )}
        <span>{node.name}/</span>
      </button>

      <AnimatePresence initial={false}>
        {open && !isEmpty && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-[7px] border-l border-border/25 pl-2.5">
              {node.children!.map((child) => (
                <TreeItem key={`${child.type}:${child.name}`} node={child} depth={depth + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const LEGEND = [
  { label: ".h", dot: "bg-violet-400" },
  { label: ".cpp", dot: "bg-sky-400" },
  { label: ".cs", dot: "bg-amber-400" },
  { label: ".uplugin", dot: "bg-emerald-400" },
] as const;

export function FileTree({
  data,
  meta,
}: {
  data: TreeNode;
  meta?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-muted/10">
      {meta && (
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <span className="font-mono text-[11px] font-medium text-foreground/80">
            {data.name}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">{meta}</span>
        </div>
      )}

      <div className="max-h-[520px] overflow-y-auto p-4 scrollbar-thin">
        <TreeItem node={data} depth={0} />
      </div>

      <div className="flex items-center gap-5 border-t px-4 py-2.5">
        {LEGEND.map(({ label, dot }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", dot)} />
            <span className="font-mono text-[10px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
