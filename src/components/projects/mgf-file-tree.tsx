import { mgfTree } from "@/data/mgf-tree";
import { FileTree } from "./file-tree";

export function MgfFileTree() {
  return <FileTree data={mgfTree} meta="7 modules · C++ · UE 5.7 plugin" />;
}
