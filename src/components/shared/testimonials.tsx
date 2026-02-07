"use client";

import type React from "react";
import { useEffect, useMemo, useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;

  /** Optionnel */
  rating?: number; // 1..5
};

type TestimonialsProps = {
  testimonials: Testimonial[];
  className?: string;

  /** Optionnels */
  title?: string;
  description?: string;

  /** Auto-play (subtil) */
  autoplay?: boolean;
  autoplayDelayMs?: number;

  /** Affichage en grille si peu d’avis */
  gridWhenSmall?: boolean;
};

function makeKey(t: Testimonial, index: number) {
  return `${t.name}-${t.role}-${t.quote.slice(0, 24)}-${index}`;
}

function Stars({ rating = 5 }: { rating?: number }) {
  const value = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1" aria-label={`${value} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "text-sm",
            i < value ? "text-[#2F8FD8]" : "text-muted-foreground/40"
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials({
  testimonials,
  className,
  title = "Ce que disent nos clients",
  description = "La confiance et la satisfaction de nos clients sont au cœur de notre démarche.",
  autoplay = false,
  autoplayDelayMs = 4500,
  gridWhenSmall = true,
}: TestimonialsProps) {
  const items = testimonials ?? [];
  const hasEnoughForCarousel = items.length >= 3;

  // Tentative d’autoplay via click sur next (sans dépendre d’un API interne du Carousel)
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!autoplay || !hasEnoughForCarousel) return;

    const id = window.setInterval(() => {
      nextRef.current?.click();
    }, autoplayDelayMs);

    return () => window.clearInterval(id);
  }, [autoplay, autoplayDelayMs, hasEnoughForCarousel]);

  const content = useMemo(() => {
    if (!items.length) return null;

    // Grille si 1–2 avis
    if (gridWhenSmall && items.length <= 2) {
      return (
        <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((t, idx) => (
            <li key={makeKey(t, idx)} className="h-full">
              <Card className="h-full rounded-2xl border bg-card shadow-sm">
                <CardContent className="flex h-full flex-col justify-between p-6">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <Stars rating={t.rating ?? 5} />
                      <span className="text-xs text-muted-foreground">
                        Avis vérifié
                      </span>
                    </div>

                    <blockquote className="relative text-base leading-relaxed text-muted-foreground">
                      <span className="absolute -left-1 -top-4 text-5xl text-[#2F8FD8]/25">
                        “
                      </span>
                      <p className="pl-4 italic">{t.quote}</p>
                    </blockquote>
                  </div>

                  <footer className="mt-6 text-sm">
                    <p className="font-semibold text-primary">{t.name}</p>
                    <p className="text-muted-foreground">{t.role}</p>
                  </footer>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      );
    }

    // Carousel
    return (
      <div className="mt-12">
        <Carousel
          opts={{
            align: "start",
            loop: items.length > 2,
          }}
          className="mx-auto w-full max-w-5xl"
          aria-label="Avis clients"
        >
          <CarouselContent>
            {items.map((t, idx) => (
              <CarouselItem
                key={makeKey(t, idx)}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full p-2">
                  <Card className="flex h-full flex-col rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <CardContent className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <Stars rating={t.rating ?? 5} />
                          <span className="text-xs text-muted-foreground">
                            Avis vérifié
                          </span>
                        </div>

                        <blockquote className="relative text-base leading-relaxed text-muted-foreground">
                          <span className="absolute -left-1 -top-4 text-5xl text-[#2F8FD8]/25">
                            “
                          </span>
                          <p className="pl-4 italic">{t.quote}</p>
                        </blockquote>
                      </div>

                      <footer className="mt-6 text-sm">
                        <p className="font-semibold text-primary">{t.name}</p>
                        <p className="text-muted-foreground">{t.role}</p>
                      </footer>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Prev/Next + support autoplay */}
          <CarouselPrevious className="hidden sm:flex" aria-label="Avis précédent" />
          <CarouselNext
            className="hidden sm:flex"
            aria-label="Avis suivant"
            ref={(el) => {
              // on capture le bouton pour autoplay (si rendu)
              nextRef.current = el;
            }}
          />
        </Carousel>
      </div>
    );
  }, [gridWhenSmall, items]);

  if (!items.length) return null;

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </header>

        {content}
      </div>
    </section>
  );
}
