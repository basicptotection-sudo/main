import type React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/icons";

type Sector = {
  icon: string;
  name: string;
  href?: string;
};

type SectorsGridProps = {
  id?: string;
  sectors: Sector[];
  className?: string;

  /** Optionnels */
  title?: string;
  description?: string;
  variant?: "cards" | "minimal";
};

function makeKey(sector: Sector, index: number) {
  return `${sector.icon}-${sector.name}-${sector.href ?? "nohref"}-${index}`;
}

export function SectorsGrid({
  id,
  sectors,
  className,
  title = "Nos secteurs d’intervention",
  description = "Nous mettons notre expertise au service d’une grande variété de secteurs professionnels.",
  variant = "cards",
}: SectorsGridProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </header>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {sectors.map((sector, index) => {
            const Icon = getLucideIcon(sector.icon);
            const isLink = !!sector.href && sector.href !== "#";
            const key = makeKey(sector, index);

            const Inner = (
              <div
                className={cn(
                  "group h-full rounded-2xl border bg-card p-5 shadow-sm transition-all",
                  "hover:-translate-y-0.5 hover:shadow-md",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8FD8]/60",
                  variant === "minimal" && "p-4 shadow-none hover:shadow-none"
                )}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl",
                      "bg-[#2F8FD8]/12 ring-1 ring-[#2F8FD8]/15"
                    )}
                  >
                    {Icon ? <Icon className="h-6 w-6 text-[#2F8FD8]" /> : null}
                  </div>

                  <h3 className="text-sm font-semibold text-primary md:text-base">
                    {sector.name}
                  </h3>

                  {/* Microcopy discret (optionnel) : améliore le CTR */}
                  {isLink ? (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Découvrir nos solutions
                    </p>
                  ) : null}
                </div>
              </div>
            );

            return (
              <li key={key} className="h-full">
                {isLink ? (
                  <Link href={sector.href!} className="block h-full">
                    {Inner}
                  </Link>
                ) : (
                  <div className="h-full">{Inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
