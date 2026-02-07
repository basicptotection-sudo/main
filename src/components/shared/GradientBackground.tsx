import type React from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  direction?: "to-r" | "to-l" | "to-t" | "to-b" | "to-tr" | "to-tl" | "to-br" | "to-bl";
  fromClass?: string;
  viaClass?: string;
  toClass?: string;
}

const directionClassMap: Record<NonNullable<GradientBackgroundProps["direction"]>, string> = {
  "to-r": "bg-gradient-to-r",
  "to-l": "bg-gradient-to-l",
  "to-t": "bg-gradient-to-t",
  "to-b": "bg-gradient-to-b",
  "to-tr": "bg-gradient-to-tr",
  "to-tl": "bg-gradient-to-tl",
  "to-br": "bg-gradient-to-br",
  "to-bl": "bg-gradient-to-bl",
};

export function GradientBackground({
  children,
  className,
  direction = "to-r",
  fromClass = "from-[#2F8FD8]/10",
  viaClass,
  toClass = "to-background",
}: GradientBackgroundProps) {
  return (
    <div
      className={cn(
        "relative",
        directionClassMap[direction],
        fromClass,
        viaClass,
        toClass,
        className
      )}
    >
      {children}
    </div>
  );
}
