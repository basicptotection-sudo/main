import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string | React.ReactNode;
  /** Optionnel : identifiant stable (sinon dérivé de la question) */
  id?: string;
};

type FAQAccordionProps = {
  title: string;
  description: string;
  items: FAQItem[];
  className?: string;
  id?: string;

  /** Option : ouvrir un item par défaut (index) */
  defaultOpenIndex?: number;

  /** Option : injecter FAQPage JSON-LD */
  withSchema?: boolean;

  /** Option : afficher un CTA sous la FAQ */
  cta?: {
    label: string;
    href: string;
    hint?: string;
  };
};

function slugifyKey(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export function FAQAccordion({
  id,
  title,
  description,
  items,
  className,
  defaultOpenIndex,
  withSchema = true,
  cta,
}: FAQAccordionProps) {
  const defaultValue =
    typeof defaultOpenIndex === "number" && items[defaultOpenIndex]
      ? `item-${items[defaultOpenIndex].id ?? slugifyKey(items[defaultOpenIndex].question)}`
      : undefined;

  // JSON-LD : uniquement si toutes les réponses sont des strings
  const canSchema =
    withSchema && items.every((i) => typeof i.answer === "string");

  const faqJsonLd = canSchema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: String(f.answer),
          },
        })),
      }
    : null;

  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      {/* Schema.org FAQPage */}
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultValue}
            className="w-full"
          >
            {items.map((item) => {
              const stableId = item.id ?? slugifyKey(item.question);
              const value = `item-${stableId}`;

              return (
                <AccordionItem key={stableId} value={value}>
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* CTA sous FAQ (conversion) */}
          {cta ? (
            <div className="mt-10 rounded-2xl border bg-card p-6 text-center shadow-sm">
              <p className="text-base font-semibold text-primary">
                Vous avez un besoin spécifique ?
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {cta.hint ??
                  "Expliquez votre contexte (site, horaires, effectifs). Réponse rapide avec proposition structurée."}
              </p>
              <div className="mt-5">
                <Link
                  href={cta.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold",
                    "bg-[#2F8FD8] text-white hover:bg-[#2F8FD8]/90"
                  )}
                >
                  {cta.label}
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
