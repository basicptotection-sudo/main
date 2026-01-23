import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as LucideIcons from "lucide-react";
import { MapPin } from "lucide-react";

import { locationsData, UseCase, CityLink } from "@/lib/locations-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

import {
  HeroSection,
  ServicesGrid,
  FAQAccordion,
  CTASection,
  Breadcrumbs,
  AnimateOnScroll,
  TrustElements,
} from "@/components/shared";

import LocationJsonLd from "@/components/seo/location-json-ld";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LocationPageProps = {
  params: { slug: string };
};

function normalizeTel(phoneE164?: string, fallback?: string) {
  if (phoneE164) return `tel:${phoneE164}`;
  const raw = (fallback ?? "").replace(/\s/g, "");
  return raw ? `tel:${raw}` : "tel:";
}

function extractDept(locationName: string) {
  const deptName = locationName.split("(")[0].trim();
  const deptCode = locationName.match(/\((\d+)\)/)?.[1] ?? "";
  return { deptName, deptCode };
}

export async function generateStaticParams() {
  return locationsData.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = locationsData.find((l) => l.slug === params.slug);
  if (!location) return {};

  return {
    title: location.title,
    description: location.description,
    keywords: location.keywords,
    alternates: {
      canonical: `${siteConfig.url}/zones/${location.slug}`,
    },
  };
}

const IntroSection = ({ title, content }: { title: string; content: string }) => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">
          {title}
        </h2>
        <div
          className="mt-6 text-lg text-muted-foreground prose prose-lg max-w-none text-center mx-auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  </section>
);

const UseCasesSection = ({ cases }: { cases: UseCase[] }) => (
  <section className="py-16 md:py-24 bg-muted/20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">
        Cas d’usage fréquents dans la zone
      </h2>
      <p className="mt-3 text-center text-muted-foreground max-w-3xl mx-auto">
        Des exemples concrets qui reflètent les besoins réels : flux, horaires, risques, public, et contraintes terrain.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {cases.map((useCase) => {
          const Icon = (LucideIcons as any)[useCase.icon];
          return (
            <Card key={useCase.title} className="rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-4">
                {Icon && <Icon className="w-10 h-10 text-primary" />}
                <CardTitle className="text-base md:text-lg">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{useCase.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

const MainCitiesSection = ({ cities }: { cities: CityLink[] }) => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center">
        Villes principales
      </h2>
      <p className="mt-3 text-center text-muted-foreground max-w-3xl mx-auto">
        Nous publions des pages locales pour les villes et pôles où les besoins sont les plus élevés (luxe, bureaux, chantiers, logistique, événementiel…).
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6 max-w-4xl mx-auto">
        {cities.map((city) => {
          const inner = (
            <div className="flex items-center gap-3 group">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <span
                className={cn(
                  "font-medium",
                  city.href !== "#" && "group-hover:text-primary group-hover:underline"
                )}
              >
                {city.name}
              </span>
            </div>
          );

          if (city.href !== "#") {
            return (
              <Link href={city.href} key={city.name} className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                {inner}
              </Link>
            );
          }
          return (
            <div key={city.name}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default function LocationPage({ params }: LocationPageProps) {
  const location = locationsData.find((l) => l.slug === params.slug);
  if (!location) notFound();

  const heroImage = PlaceHolderImages.find((p) => p.id === location.heroImageId);
  const { deptName, deptCode } = extractDept(location.name);

  const phoneHref = normalizeTel((siteConfig.contact as any).phoneE164, siteConfig.contact.phone);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Zones", href: "/zones" },
    { label: location.name, href: `/zones/${location.slug}` },
  ];

  return (
    <>
      <LocationJsonLd location={location} breadcrumbs={breadcrumbItems} />

      <HeroSection
        title={location.title}
        description={location.description}
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler un expert", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? `Sécurité privée — ${location.title}`}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
      />

      <AnimateOnScroll>
        <IntroSection title={location.intro.title} content={location.intro.content} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ServicesGrid
          id="services-list"
          title={`Nos prestations de sécurité dans ${deptName}${deptCode ? ` (${deptCode})` : ""}`}
          description="Une gamme complète de solutions pour répondre à vos besoins de sûreté : agents qualifiés, cynophile, SSIAP, rondes, protection rapprochée, événementiel, audit."
          services={location.services}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <UseCasesSection cases={location.useCases} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <MainCitiesSection cities={location.mainCities} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-10">
              Pourquoi Basic Protection Privée dans {deptName} ?
            </h2>
            <div className="max-w-5xl mx-auto">
              <TrustElements elements={location.whyUs} />
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FAQAccordion
          title={`Questions fréquentes — sécurité privée dans ${deptName}`}
          description="Avant de demander un devis : délais, organisation, qualité, types de missions, conformité."
          items={location.faq}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          id="contact"
          title={`Obtenez une proposition de sécurité dans ${deptName}`}
          description="Expliquez votre site, vos horaires et vos contraintes. Nous dimensionnons un dispositif clair et adapté."
          cta={{ label: `Devis pour ${deptName}`, href: `/devis?zone=${location.slug}` }}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 pb-16 md:pb-20">
          <div className="text-center text-sm text-muted-foreground">
            Pour une demande urgente :{" "}
            <a className="underline underline-offset-4 hover:text-foreground" href={phoneHref}>
              appelez-nous
            </a>{" "}
            (intervention possible selon mission).
          </div>
        </section>
      </AnimateOnScroll>
    </>
  );
}
