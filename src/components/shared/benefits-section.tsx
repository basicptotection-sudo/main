import type React from "react";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Benefit = {
  title: string;
  description: string;
  /** optionnel : pour varier l’icon si tu veux */
  icon?: React.ComponentType<{ className?: string }>;
};

type BenefitsSectionProps = {
  id?: string;
  title: string;
  description?: string;
  benefits: Benefit[];
  className?: string;

  /** nombre de colonnes (responsive auto sinon) */
  columns?: 2 | 3;

  /** style visuel */
  variant?: "default" | "card";

  /** réduit les espaces (utile sur pages services) */
  compact?: boolean;
};

export function BenefitsSection({
  id,
  title,
  description,
  benefits,
  className,
  columns = 3,
  variant = "card",
  compact = false,
}: BenefitsSectionProps) {
  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id={id}
      className={cn(
        compact ? "py-12 md:py-16" : "py-16 md:py-24",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary md:text-4xl">
            {title}
          </h2>

          {description ? (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </header>

        <ul className={cn("mt-12 grid grid-cols-1 gap-6", gridCols)}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon ?? CheckCircle;

            if (variant === "default") {
              return (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F8FD8]/12">
                    <Icon className="h-5 w-5 text-[#2F8FD8]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-primary">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              );
            }

            // variant "card" (recommandé)
            return (
              <li
                key={index}
                className={cn(
                  "rounded-2xl border bg-card p-6 shadow-sm transition",
                  "hover:-translate-y-0.5 hover:shadow-md"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2F8FD8]/12">
                    <Icon className="h-5 w-5 text-[#2F8FD8]" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-primary">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
