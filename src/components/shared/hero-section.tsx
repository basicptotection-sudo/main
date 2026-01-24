import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTA = {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  className?: string;
};

type HeroSectionProps = {
  title: string | React.ReactNode;
  description: string;
  cta1: CTA;
  cta2: CTA;
  imageUrl?: string;
  imageAlt?: string;
  imageHint?: string;
  breadcrumbs?: React.ReactNode;
};

export function HeroSection({
  title,
  description,
  cta1,
  cta2,
  imageUrl,
  imageAlt = "Hero image",
  imageHint,
  breadcrumbs,
}: HeroSectionProps) {
  return (
    <section className="relative w-full h-[75vh] md:h-[70vh] flex items-center text-white">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          data-ai-hint={imageHint}
        />
      )}
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl text-left">
            {breadcrumbs && (
                <div className="[&_a]:text-white/80 [&_a:hover]:text-white [&_li:last-child>a]:text-white [&_a]:[text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                    {breadcrumbs}
                </div>
            )}
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
            {title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
            {description}
            </p>
            <div className="mt-8 flex flex-wrap justify-start gap-4">
            <Link href={cta1.href} className={cn(buttonVariants({ size: "lg", variant: cta1.variant }), "font-bold", cta1.className)}>
                {cta1.label}
            </Link>
            <Link href={cta2.href} className={cn(buttonVariants({ size: "lg", variant: cta2.variant }), "font-bold", cta2.className)}>
                {cta2.label}
            </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
