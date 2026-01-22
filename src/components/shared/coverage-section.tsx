import { MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Zone = {
    name: string;
    href?: string;
}

type CoverageSectionProps = {
  title: string;
  description: string;
  zones: Zone[];
  children?: React.ReactNode;
};

export function CoverageSection({ title, description, zones, children }: CoverageSectionProps) {
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
          {zones.map((zone) => {
            const content = (
              <div key={zone.name} className="flex items-center gap-3 group">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className={cn(
                  "font-medium",
                  zone.href && "group-hover:text-primary group-hover:underline"
                )}>{zone.name}</span>
              </div>
            );

            if (zone.href && zone.href !== '#') {
                return <Link href={zone.href} key={zone.name}>{content}</Link>;
            }
            return content;
          })}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
