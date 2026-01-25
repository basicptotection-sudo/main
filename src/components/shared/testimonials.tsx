'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type TestimonialsProps = {
  testimonials: Testimonial[];
  className?: string;
};

export function Testimonials({ testimonials, className }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Ce que disent nos clients
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            La confiance et la satisfaction de nos clients sont au cœur de notre démarche.
          </p>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: testimonials.length > 2,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2 h-full">
                    <Card className="flex flex-col h-full shadow-lg text-left">
                      <CardContent className="flex flex-col flex-1 justify-between p-6">
                        <blockquote className="text-base text-muted-foreground italic mb-6 border-l-4 border-primary pl-4">
                          {testimonial.quote}
                        </blockquote>
                        <footer className="text-sm text-right">
                          <p className="font-bold text-primary">{testimonial.name}</p>
                          <p className="text-muted-foreground">{testimonial.role}</p>
                        </footer>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
