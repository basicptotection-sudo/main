
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/icons";

type Sector = {
  icon: string;
  name: string;
};

type SectorsGridProps = {
  id?: string;
  sectors: Sector[];
  className?: string;
};

export function SectorsGrid({ id, sectors, className }: SectorsGridProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Nos Secteurs d'Intervention
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nous mettons notre expertise au service d'une grande variété de secteurs professionnels.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {sectors.map((sector) => {
             const IconComponent = getLucideIcon(sector.icon);
            return (
              <Card key={sector.name} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center pb-2">
                  {IconComponent && <IconComponent className="w-10 h-10" />}
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-base">{sector.name}</h3>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}
