import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/icons";

type Step = {
  icon: string;
  title: string;
  description: string;
};

type ProcessStepsProps = {
  id?: string;
  title: string;
  description: string;
  steps: Step[];
  className?: string;

  /** Optionnel : afficher une ligne de progression (desktop) */
  showConnector?: boolean;

  /** Optionnel : style */
  variant?: "cards" | "minimal";
};

function makeKey(step: Step, index: number) {
  return `${step.icon}-${step.title}-${index}`;
}

export function ProcessSteps({
  id,
  title,
  description,
  steps,
  className,
  showConnector = true,
  variant = "cards",
}: ProcessStepsProps) {
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

        <div className="relative mx-auto mt-12 max-w-6xl">
          {/* Ligne de progression (desktop) */}
          {showConnector ? (
            <div className="pointer-events-none absolute left-0 right-0 top-[34px] hidden lg:block">
              <div className="mx-auto h-px w-[92%] bg-border" />
            </div>
          ) : null}

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = getLucideIcon(step.icon);
              const stepNumber = index + 1;

              return (
                <li
                  key={makeKey(step, index)}
                  className={cn(
                    "relative",
                    variant === "cards" &&
                      "rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
                    variant === "minimal" && "p-2"
                  )}
                >
                  {/* Badge numéro */}
                  <div className="mb-4 flex items-center justify-center">
                    <div
                      className={cn(
                        "relative flex h-14 w-14 items-center justify-center rounded-2xl",
                        "bg-[#2F8FD8]/12 ring-1 ring-[#2F8FD8]/15"
                      )}
                    >
                      {Icon ? (
                        <Icon className="h-7 w-7 text-[#2F8FD8]" />
                      ) : null}

                      <span
                        className={cn(
                          "absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full",
                          "bg-[#1F2A44] text-white text-xs font-bold shadow"
                        )}
                        aria-label={`Étape ${stepNumber}`}
                      >
                        {stepNumber}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-center font-headline text-lg font-semibold text-primary">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
