import type React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type Zone = {
  name: string;
  href?: string;
};

type CoverageSectionProps = {
  title: string;
  description: string;
  zones: Zone[];
  children?: React.ReactNode;
  className?: string;

  /** Optionnels (tu peux ignorer) */
  align?: "center" | "left";
  variant?: "simple" | "cards";
};

export function CoverageSection({
  title,
  description,
  zones,
  children,
  className,
  align = "center",
  variant = "simple",
}: CoverageSectionProps) {
  const headerAlign = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <header className={cn("max-w-3xl", headerAlign)}>
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </header>

        {variant === "cards" ? (
          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {zones.map((zone) => {
              const isLink = !!zone.href && zone.href !== "#";
              const key = zone.href ? `${zone.name}-${zone.href}` : zone.name;

              const CardInner = (
                <div
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-sm transition-all",
                    isLink && "hover:-translate-y-0.5 hover:shadow-md",
                    !isLink && "opacity-90"
                  )}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2F8FD8]/12 ring-1 ring-[#2F8FD8]/15">
                    <MapPin className="h-4 w-4 text-[#2F8FD8]" />
                  </span>

                  <span
                    className={cn(
                      "font-medium text-primary/90",
                      isLink &&
                        "group-hover:text-primary group-hover:underline underline-offset-4"
                    )}
                  >
                    {zone.name}
                  </span>
                </div>
              );

              return (
                <li key={key}>
                  {isLink ? (
                    <Link
                      href={zone.href!}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8FD8]/60 rounded-2xl"
                    >
                      {CardInner}
                    </Link>
                  ) : (
                    CardInner
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
            {zones.map((zone) => {
              const isLink = !!zone.href && zone.href !== "#";
              const key = zone.href ? `${zone.name}-${zone.href}` : zone.name;

              const RowInner = (
                <div className="group flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2F8FD8]/12 ring-1 ring-[#2F8FD8]/15">
                    <MapPin className="h-4 w-4 text-[#2F8FD8]" />
                  </span>
                  <span
                    className={cn(
                      "font-medium text-primary/90",
                      isLink &&
                        "group-hover:text-primary group-hover:underline underline-offset-4"
                    )}
                  >
                    {zone.name}
                  </span>
                </div>
              );

              return (
                <li key={key}>
                  {isLink ? (
                    <Link
                      href={zone.href!}
                      className="inline-flex rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8FD8]/60"
                    >
                      {RowInner}
                    </Link>
                  ) : (
                    RowInner
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  );
}
