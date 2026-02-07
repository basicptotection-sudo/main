import type React from "react";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/icons";

export type TrustElement = {
  icon: React.ReactNode | string;
  title: string;
  description: string;

  /** Optionnel */
  href?: string; // si un jour tu veux pointer vers une page (méthode, conformité, etc.)
};

type TrustElementsProps = {
  elements: TrustElement[];
  className?: string;

  /** Optionnels */
  variant?: "cards" | "minimal";
  align?: "center" | "left";
};

function makeKey(el: TrustElement, index: number) {
  return `${el.title}-${el.href ?? "nohref"}-${index}`;
}

function resolveIcon(icon: TrustElement["icon"]) {
  if (!icon) return null;
  if (typeof icon !== "string") return icon;
  const Icon = getLucideIcon(icon);
  return Icon ? <Icon className="h-5 w-5 text-[#2F8FD8]" /> : null;
}

export function TrustElements({
  elements,
  className,
  variant = "cards",
  align = "center",
}: TrustElementsProps) {
  if (!elements?.length) return null;

  const isLeft = align === "left";

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {elements.map((el, index) => {
        const iconNode = resolveIcon(el.icon);

        return (
          <li
            key={makeKey(el, index)}
            className={cn(
              variant === "cards" &&
                "rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
              variant === "minimal" && "p-2"
            )}
          >
            <div
              className={cn(
                "flex h-full flex-col",
                isLeft ? "items-start text-left" : "items-center text-center"
              )}
            >
              <div
                className={cn(
                  "mb-4 flex h-11 w-11 items-center justify-center rounded-2xl",
                  "bg-[#2F8FD8]/12 ring-1 ring-[#2F8FD8]/15"
                )}
              >
                {iconNode}
              </div>

              <h3 className="text-lg font-semibold text-primary">{el.title}</h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {el.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
