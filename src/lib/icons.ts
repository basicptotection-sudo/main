// src/lib/icons.ts
import * as LucideIcons from "lucide-react";
import { ShieldCheck } from "lucide-react";

export function getLucideIcon(name?: string) {
  const Icon = (LucideIcons as any)[name ?? ""];
  return Icon ?? ShieldCheck; // fallback sûr
}
