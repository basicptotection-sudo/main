
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

type Service = {
  icon: React.ReactNode | string;
  title: string;
  description: string;
  href?: string;
};

type ServicesGridProps = {
  id?: string;
  title: string;
  description: string;
  services: Service[];
};

export function ServicesGrid({ id, title, description, services }: ServicesGridProps) {
  return (
    <section id={id} className="py-16 md:py-24 bg-background">
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
          {services.map((service, index) => {
             let IconComponent: React.ReactNode;
            if (typeof service.icon === 'string') {
              const Icon = (LucideIcons as any)[service.icon];
              IconComponent = Icon ? <Icon className="w-12 h-12 text-primary" /> : null;
            } else {
              IconComponent = service.icon;
            }
            const cardContent = (
               <Card className="text-center h-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="items-center">
                  {IconComponent}
                  <CardTitle className="mt-4 font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            )
            if (service.href) {
                return (
                    <Link href={service.href} key={index} className="flex">
                        {cardContent}
                    </Link>
                )
            }
            return cardContent;
          })}
        </div>
      </div>
    </section>
  );
}
