import { MapPin } from "lucide-react";

type CoverageSectionProps = {
  title: string;
  description: string;
  zones: string[];
};

export function CoverageSection({ title, description, zones }: CoverageSectionProps) {
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
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 max-w-4xl mx-auto">
          {zones.map((zone) => (
            <div key={zone} className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="font-medium">{zone}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
