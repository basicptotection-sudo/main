import type React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTA = {
  label: string;
  href: string;
};

type CTASectionProps = {
  id?: string;
  title: string;
  description: string;

  /** CTA principal (compatible avec ton code actuel) */
  cta: CTA;

  /** Optionnel : 2e CTA (appel, rappel, urgence…) */
  secondaryCta?: CTA;

  /** Optionnel : petites preuves sous les boutons */
  highlights?: string[];

  /** Optionnel : microcopy sous le CTA (réassurance) */
  hint?: string;

  /** Optionnel : style */
  variant?: "simple" | "boxed";

  className?: string;
};

export function CTASection({
  id,
  title,
  description,
  cta,
  secondaryCta,
  highlights = ["Devis structuré", "Réponse rapide", "Confidentialité"],
  hint = "Expliquez votre besoin (site, horaires, effectifs). Nous revenons vers vous avec une proposition claire.",
  variant = "boxed",
  className,
}: CTASectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "mx-auto max-w-4xl text-center",
            variant === "boxed" &&
              cn(
                "rounded-3xl border bg-card p-8 shadow-sm md:p-12",
                "relative overflow-hidden"
              )
          )}
        >
          {/* Glow décoratif (premium, discret) */}
          {variant === "boxed" ? (
            <>
              <div className="pointer-events-none absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#2F8FD8]/18 blur-3xl" />
              <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#1F2A44]/10 blur-3xl" />
            </>
          ) : null}

          <div className="relative z-10">
            <h2 className="text-3xl font-headline font-bold tracking-tight text-primary md:text-4xl">
              {title}
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            {/* Highlights */}
            {highlights?.length ? (
              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {highlights.slice(0, 5).map((h, idx) => (
                  <li
                    key={`${h}-${idx}`}
                    className="rounded-full border bg-background/60 px-4 py-2 text-sm text-muted-foreground"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Boutons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-7 font-bold">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>

              {secondaryCta ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7 font-bold"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>

            {/* Réassurance */}
            {hint ? (
              <p className="mt-4 text-sm text-muted-foreground">{hint}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
