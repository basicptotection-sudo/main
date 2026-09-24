
import type React from "react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTA = {
  label: string;
  href: string;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  className?: string;
  ariaLabel?: string;
};

type HeroHighlight = {
  label: string;
};

type HeroSectionProps = {
  title: string | React.ReactNode;
  description: string;
  cta1?: CTA;
  cta2?: CTA;

  imageUrl?: string;
  imageAlt?: string;
  imageHint?: string;

  kicker?: string;
  breadcrumbs?: React.ReactNode;

  /** Cards/stats à chevaucher */
  stats?: React.ReactNode;

  highlights?: HeroHighlight[];
  align?: "left" | "center";
  contentVerticalAlign?: "center" | "bottom";
};

export function HeroSection({
  title,
  description,
  cta1,
  cta2,
  imageUrl,
  imageAlt = "Sécurité privée",
  imageHint,
  kicker,
  breadcrumbs,
  stats,
  highlights,
  align = "left",
  contentVerticalAlign = "bottom",
}: HeroSectionProps) {
  const hasStats = Boolean(stats);

  return (
    <section
      className={cn(
        "relative w-full text-white",
        hasStats ? "overflow-visible" : "overflow-hidden"
      )}
    >
      <div
        className={cn(
          "relative flex flex-col",
          "min-h-[70vh] md:min-h-[75vh]", // Use min-height with vh to allow growth
          hasStats ? "pb-32 md:pb-48" : "pb-20 md:pb-24"
        )}
      >
        {/* Background image */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
            data-ai-hint={imageHint}
          />
        ) : (
          <div className="absolute inset-0 bg-[#0B1220]" />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        {/* ✅ SUPPRIMÉ : le glow oblong bleu */}

        {/* Content */}
        <div
          className={cn(
            "relative z-10 flex flex-1 flex-col",
            contentVerticalAlign === "center"
              ? "justify-center pt-20 md:pt-24"
              : "justify-end pt-28 md:pt-36"
          )}
        >
          <div className="container mx-auto px-4">
            <div
              className={cn(
                "max-w-3xl",
                align === "center" ? "mx-auto text-center" : "text-left"
              )}
            >
              {breadcrumbs ? (
                <div
                  className={cn(
                    "[&_a]:text-white/75 [&_a:hover]:text-white",
                    "[&_li:last-child>a]:text-white [&_li:last-child>span]:text-white",
                    "[&_a]:[text-shadow:0_1px_2px_rgba(0,0,0,0.55)]",
                    "[&_span]:[text-shadow:0_1px_2px_rgba(0,0,0,0.55)]"
                  )}
                >
                  {breadcrumbs}
                </div>
              ) : null}

              {kicker ? (
                <p className="mt-4 text-sm font-semibold tracking-[0.18em] text-white/85 uppercase">
                  {kicker}
                </p>
              ) : null}

              <h1 className="mt-4 text-4xl font-headline font-bold tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.55)] md:text-6xl">
                {title}
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-white/85 [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] md:text-xl">
                {description}
              </p>

              {highlights?.length ? (
                <ul
                  className={cn(
                    "mt-6 flex flex-wrap gap-2",
                    align === "center" ? "justify-center" : "justify-start"
                  )}
                >
                  {highlights.slice(0, 4).map((h, idx) => (
                    <li
                      key={`${h.label}-${idx}`}
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur"
                    >
                      {h.label}
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* CTA */}
              {(cta1 || cta2) && (
                <div
                  className={cn(
                    "mt-10 flex flex-wrap gap-4",
                    align === "center" ? "justify-center" : "justify-start"
                  )}
                >
                  {cta1 && (
                    <Link
                      href={cta1.href}
                      aria-label={cta1.ariaLabel ?? cta1.label}
                      className={cn(
                        buttonVariants({ variant: cta1.variant }),
                        "font-bold rounded-full h-14 px-10 text-base",
                        "shadow-lg shadow-black/20",
                        cta1.className
                      )}
                    >
                      {cta1.label}
                    </Link>
                  )}

                  {cta2 && (
                    <Link
                      href={cta2.href}
                      aria-label={cta2.ariaLabel ?? cta2.label}
                      className={cn(
                        buttonVariants({ variant: cta2.variant }),
                        "font-bold rounded-full h-14 px-10 text-base",
                        "bg-white/15 border-white/20 text-white backdrop-blur hover:bg-white/25",
                        cta2.className
                      )}
                    >
                      {cta2.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar chevauche le body */}
        {stats ? (
          <div
            className={cn(
              "absolute bottom-0 left-1/2 z-20 w-full max-w-7xl -translate-x-1/2 px-4",
              "translate-y-[55%] md:translate-y-[60%]"
            )}
          >
            <div className="container mx-auto px-0">{stats}</div>
          </div>
        ) : null}
      </div>

      {/* Espace sous le hero pour absorber le chevauchement */}
      {hasStats ? <div className="h-28 md:h-32" aria-hidden="true" /> : null}
    </section>
  );
}
