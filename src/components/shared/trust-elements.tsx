
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";

type TrustElement = {
  icon: React.ReactNode | string;
  title: string;
  description: string;
};

type TrustElementsProps = {
  id?: string;
  elements: TrustElement[];
};

export function TrustElements({ id, elements }: TrustElementsProps) {
  return (
    <section id={id} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {elements.map((element, index) => {
            let IconComponent: React.ReactNode;
            if (typeof element.icon === 'string') {
              const Icon = (LucideIcons as any)[element.icon];
              IconComponent = Icon ? <Icon className="w-10 h-10 text-primary" /> : null;
            } else {
              IconComponent = element.icon;
            }
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {IconComponent}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">{element.title}</h3>
                  <p className="mt-1 text-muted-foreground">{element.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
