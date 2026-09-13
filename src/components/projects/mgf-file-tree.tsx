import { mgfTree } from "@/data/mgf-tree";
import { FileTree } from "./file-tree";

export function MgfFileTree() {
  return <FileTree data={mgfTree} meta="26 modules · 1,742 files · C++ · UE 5.8 plugin" />;
}
