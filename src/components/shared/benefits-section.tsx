import { CheckCircle } from "lucide-react";

type Benefit = {
    title: string;
    description: string;
};

type BenefitsSectionProps = {
    title: string;
    description: string;
    benefits: Benefit[];
};

export function BenefitsSection({ title, description, benefits }: BenefitsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-primary">{benefit.title}</h3>
                    <p className="mt-1 text-muted-foreground">{benefit.description}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
