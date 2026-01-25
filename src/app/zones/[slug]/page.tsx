import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as LucideIcons from "lucide-react";
import { MapPin, ArrowRight, ShieldCheck, Layers } from "lucide-react";

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

function getLucideIcon(iconName?: string) {
  if (!iconName) return null;
  const Icon = (LucideIcons as any)[iconName];
  return typeof Icon === "function" ? Icon : null;
}

export async function generateStaticParams() {
  return locationsData.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = locationsData.find((l) => l.slug === params.slug);
  if (!location) return {};

  const { deptName } = extractDept(location.name);
  const url = `${siteConfig.url}/zones/${location.slug}`;

  return {
    title: location.title,
    description: location.description,
    keywords: location.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: location.title,
      description: location.description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: location.title,
      description: location.description,
    },
  };
}

/* ---------- Sections UI ---------- */

const IntroSection = ({ title, content }: { title: string; content: string }) => (
  <section className="bg-background py-14 md:py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        <div
          className="prose prose-lg mx-auto mt-5 max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  </section>
);

const UseCasesSection = ({ cases }: { cases: UseCase[] }) => (
  <section className="bg-muted/20 py-14 md:py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">
            Besoins terrain • Flux • Accès • Contraintes
          </span>
        </div>

        <h2 className="mt-6 font-headline text-3xl font-bold tracking-tight md:text-4xl">
          Cas d’usage fréquents dans la zone
        </h2>
        <p className="mt-3 text-muted-foreground">
          Des exemples concrets qui reflètent les besoins réels : horaires, risques, public, et
          contraintes d’exploitation.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        {cases.map((useCase) => {
          const Icon = getLucideIcon(useCase.icon);
          return (
            <Card key={useCase.title} className="rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-4">
                {Icon ? (
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                )}
                <div>
                  <CardTitle className="text-base md:text-lg">{useCase.title}</CardTitle>
                  <CardDescription>Contexte typique et dispositif recommandé</CardDescription>
                </div>
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
  <section className="bg-background py-14 md:py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          Villes principales
        </h2>
        <p className="mt-3 text-muted-foreground">
          Pages locales pour les pôles où les besoins sont les plus élevés (bureaux, chantiers,
          logistique, événementiel, ERP…).
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3 lg:grid-cols-4">
        {cities.map((city) => {
          const inner = (
            <div className="group flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted/10">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
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
              <Link
                href={city.href}
                key={city.name}
                className="rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {inner}
              </Link>
            );
          }

          return <div key={city.name}>{inner}</div>;
        })}
      </div>
    </div>
  </section>
);

function LocalNav({ currentSlug }: { currentSlug: string }) {
  const idf = [
    { name: "Paris (75)", href: "/zones/paris-75" },
    { name: "Hauts-de-Seine (92)", href: "/zones/hauts-de-seine-92" },
    { name: "Seine-Saint-Denis (93)", href: "/zones/seine-saint-denis-93" },
    { name: "Val-de-Marne (94)", href: "/zones/val-de-marne-94" },
    { name: "Val-d’Oise (95)", href: "/zones/val-doise-95" },
    { name: "Yvelines (78)", href: "/zones/yvelines-78" },
    { name: "Seine-et-Marne (77)", href: "/zones/seine-et-marne-77" },
    { name: "Essonne (91)", href: "/zones/essonne-91" },
  ].filter((x) => !x.href.endsWith(`/${currentSlug}`));

  return (
    <section className="bg-background py-10">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="rounded-2xl border border-border bg-muted/10 p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">Navigation Île-de-France</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Explorer les autres départements (maillage interne).
              </div>
            </div>

            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/zones">
                Retour aux zones <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Separator className="my-5" />

          <div className="flex flex-wrap gap-2">
            {idf.map((z) => (
              <Badge key={z.href} variant="secondary" asChild>
                <Link href={z.href}>{z.name}</Link>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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

  // Fallbacks safe
  const introTitle = location.intro?.title ?? `Sécurité privée dans ${deptName}`;
  const introContent =
    location.intro?.content ??
    `<p>Nous intervenons dans <strong>${deptName}</strong> avec des dispositifs adaptés à vos contraintes : gardiennage, rondes, SSIAP, cynophile, événementiel et audit.</p>`;

  const useCases = Array.isArray(location.useCases) ? location.useCases : [];
  const mainCities = Array.isArray(location.mainCities) ? location.mainCities : [];
  const whyUs = Array.isArray(location.whyUs) ? location.whyUs : [];
  const faq = Array.isArray(location.faq) ? location.faq : [];
  const services = Array.isArray(location.services) ? location.services : [];

  return (
    <>
      <LocationJsonLd location={location} breadcrumbs={breadcrumbItems} />

      <HeroSection
        title={location.title}
        description={location.description}
        cta1={{ label: "Demander un devis", href: `/devis?zone=${location.slug}` }}
        cta2={{ label: "Appeler un expert", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? `Sécurité privée — ${location.title}`}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="mb-4 py-0" />}
      />

      <AnimateOnScroll>
        <IntroSection title={introTitle} content={introContent} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ServicesGrid
          id="services-list"
          title={`Nos prestations de sécurité dans ${deptName}${deptCode ? ` (${deptCode})` : ""}`}
          description="Une gamme complète pour répondre à vos besoins : agents qualifiés, cynophile, SSIAP, rondes, protection renforcée, événementiel, audit."
          services={services}
        />
      </AnimateOnScroll>

      {useCases.length > 0 ? (
        <AnimateOnScroll>
          <UseCasesSection cases={useCases} />
        </AnimateOnScroll>
      ) : null}

      {mainCities.length > 0 ? (
        <AnimateOnScroll>
          <MainCitiesSection cities={mainCities} />
        </AnimateOnScroll>
      ) : null}

      {whyUs.length > 0 ? (
        <AnimateOnScroll>
          <section className="bg-muted/20 py-14 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-5xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                  Pourquoi Basic Protection Privée dans {deptName} ?
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Encadrement, réactivité, conformité et qualité opérationnelle.
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-5xl">
                <TrustElements elements={whyUs} />
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      ) : null}

      {faq.length > 0 ? (
        <AnimateOnScroll>
          <FAQAccordion
            title={`Questions fréquentes — sécurité privée dans ${deptName}`}
            description="Avant de demander un devis : délais, organisation, qualité, conformité et types de missions."
            items={faq}
          />
        </AnimateOnScroll>
      ) : null}

      <AnimateOnScroll>
        <CTASection
          id="contact"
          title={`Obtenez une proposition de sécurité dans ${deptName}`}
          description="Expliquez votre site, vos horaires et vos contraintes. Nous dimensionnons un dispositif clair et adapté."
          cta={{ label: `Devis pour ${deptName}`, href: `/devis?zone=${location.slug}#form` }}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <LocalNav currentSlug={location.slug} />
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