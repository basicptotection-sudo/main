
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

import { locationsData } from "@/lib/locations-data";
import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";

import { Breadcrumbs, AnimateOnScroll } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { ZonesFilterClient } from "@/components/zones/zones-filter-client";

export const metadata: Metadata = {
  title: "Zones d’intervention — Sécurité privée en Île-de-France",
  description:
    "Basic Protection intervient en Île-de-France : 75, 92, 93, 94, 95, 78, 77, 91. Gardiennage, rondes, SSIAP, cynophile, événementiel, audit de sûreté. Dispositifs sur mesure.",
  alternates: { canonical: `${siteConfig.url}/zones` },
};

type Zone = {
  name: string;
  href: string;
  kind: "departement" | "ville";
  code?: string;
};

function normalizeTel(phoneE164?: string, fallback?: string) {
  if (phoneE164) return `tel:${phoneE164}`;
  const raw = (fallback ?? "").replace(/\s/g, "");
  return raw ? `tel:${raw}` : "tel:";
}

export default function ZonesHubPage() {
  const heroImage =
    PlaceHolderImages.find((p) => p.id === "zones-hub") ??
    PlaceHolderImages.find((p) => p.id === "hero");

  const phoneHref = normalizeTel((siteConfig.contact as any).phoneE164, siteConfig.contact.phone);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Zones d’intervention", href: "/zones" },
  ];

  // `locationsData` est la source unique pour les départements.
  const zones: Zone[] = locationsData
    .map((loc) => ({
      name: loc.name,
      href: `/zones/${loc.slug}`,
      kind: 'departement' as 'departement', // Corrigé : ces entrées sont des départements
      code: loc.name.match(/\((\d+)\)/)?.[1],
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));

  return (
    <div className="bg-background text-foreground">
      {/* HERO épuré */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          {heroImage?.imageUrl ? (
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `url(${heroImage.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>

        <div className="relative container mx-auto max-w-6xl px-4 py-14 md:py-18">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />

            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Île-de-France • Déploiement rapide • Dispositifs encadrés
              </span>
            </div>

            <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Zones d’intervention <span className="text-primary">en Île-de-France</span>
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              Nous intervenons sur l’ensemble de l’IDF (75, 92, 93, 94, 95, 78, 77, 91) avec des dispositifs
              adaptés à chaque zone : gardiennage, rondes, SSIAP, cynophile, événementiel, audit.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {["75", "92", "93", "94", "95", "78", "77", "91"].map((d) => (
                <Badge key={d} variant="secondary">
                  IDF {d}
                </Badge>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-xl font-semibold">
                <Link href="/devis">
                  Demander un devis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <a href={phoneHref}>Appeler</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <AnimateOnScroll>
        <section className="container mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="h-4 w-4 text-primary" />
                  Départements IDF
                </CardTitle>
                <CardDescription>
                  Pages dédiées par département : enjeux locaux, usages, dispositifs types.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4 text-primary" />
                  Zones locales & villes
                </CardTitle>
                <CardDescription>
                  Pages ciblées par zone : quartiers, pôles d’activité, logistique, chantiers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Adaptation terrain
                </CardTitle>
                <CardDescription>
                  Flux, horaires, accès, risques : on dimensionne selon votre réalité opérationnelle.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recherche + grille */}
          <ZonesFilterClient zones={zones} />
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="container mx-auto max-w-6xl px-4 pb-14 md:pb-16">
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/services" className="block">
              <Card className="h-full rounded-2xl transition hover:bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-base">Voir tous les services</CardTitle>
                  <CardDescription>
                    Agent qualifié, cynophile, SSIAP, rondier, protection renforcée, événementiel, audit.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/contact" className="block">
              <Card className="h-full rounded-2xl transition hover:bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-base">Parler à un responsable</CardTitle>
                  <CardDescription>
                    Besoin rapide ou contexte sensible : échange direct et cadrage du dispositif.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </AnimateOnScroll>

      <section className="container mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div className="text-center text-sm text-muted-foreground">
          Une question rapide ?{" "}
          <a className="underline underline-offset-4 hover:text-foreground" href={phoneHref}>
            Appelez-nous
          </a>{" "}
          ou écrivez à{" "}
          <a
            className="underline underline-offset-4 hover:text-foreground"
            href={`mailto:${siteConfig.contact.email}`}
          >
            {siteConfig.contact.email}
          </a>
          .
        </div>
      </section>
    </div>
  );
}
