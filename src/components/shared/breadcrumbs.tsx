import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  centered?: boolean;
};

export function Breadcrumbs({ items, className, centered }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("py-3", className)}>
      <ol
        className={cn(
          "flex items-center space-x-2 text-sm text-muted-foreground",
          centered && "justify-center"
        )}
      >
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            <Link
              href={item.href}
              className={cn(
                "hover:text-primary",
                index === items.length - 1 && "font-medium text-foreground"
              )}
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
