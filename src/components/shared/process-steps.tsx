
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/icons";

type Step = {
    icon: string;
    title: string;
    description: string;
}

type ProcessStepsProps = {
    id?: string;
    title: string;
    description: string;
    steps: Step[];
    className?: string;
}

export function ProcessSteps({ id, title, description, steps, className }: ProcessStepsProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const IconComponent = getLucideIcon(step.icon);
            return (
              <Card key={step.title} className="text-center border-none bg-transparent shadow-none">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 rounded-full p-4 mb-4">
                      {IconComponent && <IconComponent className="w-10 h-10 text-primary" />}
                  </div>
                  <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
