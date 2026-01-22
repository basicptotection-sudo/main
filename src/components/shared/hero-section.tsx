
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTA = {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
};

type HeroSectionProps = {
  title: string;
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl text-left">
            {breadcrumbs && (
                <div className="[&_a]:text-white/80 [&_a:hover]:text-white [&_li:last-child>a]:text-white">
                    {breadcrumbs}
                </div>
            )}
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
            {title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
            {description}
            </p>
            <div className="mt-8 flex flex-wrap justify-start gap-4">
            <Link href={cta1.href} className={cn(buttonVariants({ size: "lg" }), "font-bold")}>
                {cta1.label}
            </Link>
            <Link href={cta2.href} className={cn(buttonVariants({ variant: cta2.variant || 'secondary', size: "lg" }), "font-bold")}>
                {cta2.label}
            </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
