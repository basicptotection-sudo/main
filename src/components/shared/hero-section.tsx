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
  cta1: CTA;
  cta2: CTA;

  imageUrl?: string;
  imageAlt?: string;
  imageHint?: string;

  /** Petite ligne au-dessus du H1 (preuve / promesse / zone) */
  kicker?: string;

  /** Breadcrumbs / badge (comme sur ta homepage) */
  breadcrumbs?: React.ReactNode;
  
  /** Stats bar to embed at the bottom */
  stats?: React.ReactNode;

  /** 2-4 points de preuve (conversion) */
  highlights?: HeroHighlight[];

  /** Alignement du bloc texte */
  align?: "left" | "center";
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
}: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden text-white">
      {/* Hauteur : stable, premium, et responsive */}
      <div className="relative flex flex-col h-[85vh] min-h-[680px] md:h-[80vh] md:min-h-[720px]">
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

        {/* Overlays (lisibilité + style) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        <div className="absolute -left-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#2F8FD8]/15 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center">
          <div className="container mx-auto px-4">
            <div
              className={cn(
                "max-w-3xl",
                align === "center" ? "mx-auto text-center" : "text-left"
              )}
            >
              {/* Breadcrumb / badge */}
              {breadcrumbs ? (
                <div
                  className={cn(
                    // Liens en blanc atténué + hover blanc
                    "[&_a]:text-white/75 [&_a:hover]:text-white",
                    // Dernier item en blanc (que ce soit <a> ou <span>)
                    "[&_li:last-child>a]:text-white [&_li:last-child>span]:text-white",
                    // Lisibilité (shadow)
                    "[&_a]:[text-shadow:0_1px_2px_rgba(0,0,0,0.55)]",
                    "[&_span]:[text-shadow:0_1px_2px_rgba(0,0,0,0.55)]"
                  )}
                >
                  {breadcrumbs}
                </div>
              ) : null}

              {/* Kicker */}
              {kicker ? (
                <p className="mt-4 text-sm font-semibold tracking-[0.18em] text-white/85 uppercase">
                  {kicker}
                </p>
              ) : null}

              {/* H1 */}
              <h1 className="mt-4 text-4xl font-headline font-bold tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.55)] md:text-6xl">
                {title}
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-lg text-white/85 [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] md:text-xl">
                {description}
              </p>

              {/* Highlights */}
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
              <div
                className={cn(
                  "mt-10 flex flex-wrap gap-4",
                  align === "center" ? "justify-center" : "justify-start"
                )}
              >
                <Link
                  href={cta1.href}
                  aria-label={cta1.ariaLabel ?? cta1.label}
                  className={cn(
                    buttonVariants({ size: "lg", variant: cta1.variant }),
                    "font-bold rounded-full",
                    "shadow-lg shadow-black/20",
                    cta1.className
                  )}
                >
                  {cta1.label}
                </Link>

                <Link
                  href={cta2.href}
                  aria-label={cta2.ariaLabel ?? cta2.label}
                  className={cn(
                    buttonVariants({ size: "lg", variant: cta2.variant }),
                    "font-bold rounded-full",
                    "bg-white/15 border-white/20 text-white backdrop-blur hover:bg-white/25",
                    cta2.className
                  )}
                >
                  {cta2.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Bar at the bottom */}
        {stats ? (
            <div className="relative mt-auto pb-10 md:pb-16 z-10">
              <div className="container mx-auto px-4">
                {stats}
              </div>
            </div>
          ) : null}
      </div>
    </section>
  );
}
