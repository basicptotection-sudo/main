import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

export type TrustElement = {
  icon: React.ReactNode | string;
  title: string;
  description: string;
};

type TrustElementsProps = {
  elements: TrustElement[];
  className?: string;
};

export function TrustElements({ elements, className }: TrustElementsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12", className)}>
      {elements.map((element, index) => {
        let IconComponent: React.ReactNode;
        if (typeof element.icon === 'string') {
          const Icon = (LucideIcons as any)[element.icon];
          IconComponent = Icon ? <Icon className="w-10 h-10 text-primary" /> : null;
        } else {
          IconComponent = element.icon;
        }
        return (
          <div key={index} className="text-center">
            <div className="inline-block bg-primary/10 rounded-full p-4 mb-4">
                {IconComponent}
            </div>
            <h3 className="text-xl font-bold text-primary">{element.title}</h3>
            <p className="mt-2 text-muted-foreground">{element.description}</p>
          </div>
        )
      })}
    </div>
  );
}
