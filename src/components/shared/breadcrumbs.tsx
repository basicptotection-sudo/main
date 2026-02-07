import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string; // pas de href = page courante
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  centered?: boolean;
  variant?: "default" | "onDark";
};

export function Breadcrumbs({
  items,
  className,
  centered,
  variant = "default",
}: BreadcrumbsProps) {
  if (!items?.length) return null;

  const isDark = variant === "onDark";

  return (
    <nav aria-label="Fil d’Ariane" className={cn("py-3", className)}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-2 text-sm",
          centered && "justify-center",
          isDark ? "text-white/75" : "text-muted-foreground"
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <ChevronRight
                  className={cn("h-4 w-4", isDark ? "text-white/45" : "text-muted-foreground")}
                  aria-hidden="true"
                />
              ) : null}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    isDark ? "hover:text-white" : "hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "font-medium",
                    isDark ? "text-white" : "text-foreground"
                  )}
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
