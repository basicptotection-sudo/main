"use client";

import type React from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/icons";

type Service = {
  icon: React.ReactNode | string;
  title: string;
  description: string;
  href?: string;

  /** Optionnel */
  badge?: string; // ex: "Le plus demandé"
};

type ServicesGridProps = {
  id?: string;
  title: string;
  description: string;
  services: Service[];
  className?: string;
  gridClassName?: string;

  /** Optionnels */
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };

  /** Mettre un service en avant */
  featuredIndex?: number;

  /** Style */
  variant?: "clean" | "minimal";
};

function makeKey(service: Service, index: number) {
  return `${service.title}-${service.href ?? "nohref"}-${index}`;
}

function resolveIcon(icon: Service["icon"]) {
  if (!icon) return null;
  if (typeof icon !== "string") return icon;

  const Icon = getLucideIcon(icon);
  return Icon ? <Icon className="h-5 w-5 text-[#2F8FD8]" /> : null;
}

export function ServicesGrid({
  id,
  title,
  description,
  services,
  className,
  gridClassName,
  cta,
  secondaryCta,
  featuredIndex = 0,
  variant = "clean",
}: ServicesGridProps) {
  if (!services?.length) return null;

  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>

          {(cta || secondaryCta) ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {cta ? (
                <Link
                  href={cta.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold",
                    "bg-[#2F8FD8] text-white hover:bg-[#2F8FD8]/90",
                    "shadow-sm"
                  )}
                >
                  {cta.label}
                </Link>
              ) : null}

              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold",
                    "border bg-background hover:bg-muted/30"
                  )}
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </header>

        <ul
          className={cn(
            "mt-12 grid grid-cols-1 gap-6 md:grid-cols-2",
            gridClassName || "lg:grid-cols-4"
          )}
        >
          {services.map((service, index) => {
            const key = makeKey(service, index);
            const isLink = !!service.href && service.href !== "#";
            const iconNode = resolveIcon(service.icon);
            const isFeatured = typeof featuredIndex === "number" && index === featuredIndex;

            const inner = (
              <Card
                className={cn(
                  "group relative h-full overflow-hidden rounded-2xl",
                  // look épuré
                  "border bg-card shadow-sm transition-all",
                  "hover:-translate-y-0.5 hover:shadow-md",
                  // focus ring si lien
                  isLink && "focus-within:ring-2 focus-within:ring-[#2F8FD8]/45",
                  // featured élégant : bande latérale + léger fond
                  isFeatured &&
                    "border-[#2F8FD8]/25 bg-gradient-to-b from-[#2F8FD8]/6 to-background"
                )}
              >
                {/* bande latérale featured */}
                {isFeatured ? (
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#2F8FD8]" />
                ) : null}

                <CardContent className={cn("p-6", isFeatured && "pl-7")}>
                  {/* Ligne haute : icon + badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-2xl",
                          "bg-[#2F8FD8]/10 ring-1 ring-[#2F8FD8]/15",
                          "transition-transform group-hover:scale-[1.02]"
                        )}
                      >
                        {iconNode}
                      </div>

                      {/* Mini label optionnel */}
                      {service.badge ? (
                        <span className="rounded-full border bg-background/70 px-3 py-1 text-xs font-semibold text-primary">
                          {service.badge}
                        </span>
                      ) : null}
                    </div>

                    {/* flèche très discrète */}
                    {isLink ? (
                      <span className="text-sm text-muted-foreground transition-all group-hover:text-[#2F8FD8]">
                        →
                      </span>
                    ) : null}
                  </div>

                  {/* Titre */}
                  <h3 className="mt-5 font-headline text-lg font-semibold leading-snug text-primary">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  {/* micro CTA minimal */}
                  {isLink ? (
                    <div className="mt-5 text-sm font-semibold text-[#2F8FD8] opacity-90 group-hover:opacity-100">
                      En savoir plus
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );

            return (
              <li key={key} className="h-full">
                {isLink ? (
                  <Link
                    href={service.href!}
                    className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8FD8]/60"
                    aria-label={`Découvrir ${service.title}`}
                  >
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>

        {/* Variante ultra minimaliste */}
        {variant === "minimal" ? (
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted-foreground">
            Besoin d’un cadrage rapide ? Décrivez votre contexte : nous proposons un dispositif dimensionné et un devis structuré.
          </p>
        ) : null}
      </div>
    </section>
  );
}
