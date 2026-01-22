import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Step = {
    icon: React.ReactNode;
    title: string;
    description: string;
}

type ProcessStepsProps = {
    title: string;
    description: string;
    steps: Step[];
}

export function ProcessSteps({ title, description, steps }: ProcessStepsProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <Card key={step.title} className="text-center border-none bg-transparent shadow-none">
              <CardHeader className="items-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                    {step.icon}
                </div>
                <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
