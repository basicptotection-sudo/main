import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTASectionProps = {
  id?: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  className?: string;
};

export function CTASection({ id, title, description, cta, className }: CTASectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24 bg-background", className)}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
          {title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
        <Button asChild size="lg" className="mt-8 font-bold">
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}
