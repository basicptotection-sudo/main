// src/app/environnements/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import { environmentsData } from "@/lib/environments-data";
import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";

import { HeroSection, Breadcrumbs, AnimateOnScroll, CTASection } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ArrowRight, ShieldCheck, ClipboardCheck, Target, MapPin } from "lucide-react";

function toCanonical(path: string) {
  const base = siteConfig?.url?.replace(/\/$/, "") || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const metadata: Metadata = {
  title: "Environnements d’intervention | Sécurité privée en Île-de-France",
  description:
    "Découvrez nos solutions de sécurité privée adaptées à chaque environnement : sièges sociaux, bureaux, chantiers, commerces, sites sensibles, événements… Dispositifs sur mesure, encadrés et traçables.",
  alternates: {
    canonical: toCanonical("/environnements"),
  },
  openGraph: {
    title: "Environnements d’intervention | Basic Protection Privée",
    description:
      "Solutions de sécurité privée adaptées à chaque environnement : bureaux, chantiers, commerces, sites sensibles, événements… Dispositifs sur mesure en Île-de-France.",
    url: toCanonical("/environnements"),
    siteName: siteConfig?.name || "Basic Protection Privée",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Environnements d’intervention | Basic Protection Privée",
    description:
      "Sécurité privée par environnement : solutions sur mesure, encadrées et traçables en Île-de-France.",
  },
};

export default function EnvironnementsHubPage() {
  const heroImage =
    PlaceHolderImages.find((p) => p.id === "environments-hero") ||
    PlaceHolderImages.find((p) => p.id === "hero");

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Environnements", href: "/environnements" },
  ];

  return (
    <div className="bg-background text-foreground">
      <HeroSection
        title="Sécurité privée par environnement"
        description="Chaque secteur a ses enjeux : flux, accès, public, horaires, sensibilité du site. Nous adaptons nos dispositifs pour sécuriser efficacement, sans perturber votre activité."
        cta1={{ label: "Voir les environnements", href: "#environments" }}
        cta2={{ label: "Demander un devis", href: "/devis", variant: "secondary" }}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
        imageUrl={heroImage?.imageUrl}
        imageAlt="Sécurité privée adaptée à chaque environnement"
        imageHint={heroImage?.imageHint ?? "security team"}
      />

      {/* Intro + promesse */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Approche sur-mesure
              </Badge>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                Un dispositif pensé pour votre contexte, pas un “pack” standard.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Nous cadrons la mission en amont (objectifs, contraintes, accès, risques) puis nous mettons en place une
                exécution terrain encadrée : consignes claires, supervision et reporting.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/services">Découvrir nos services</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Poser une question</Link>
                </Button>
              </div>
            </div>

            {/* Méthode (UX + crédibilité) */}
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="border bg-card">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="bg-primary/10 rounded-xl p-3">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Analyse & cadrage</CardTitle>
                    <CardDescription className="mt-1">
                      Flux, accès, public, horaires, points sensibles : on cartographie avant d’agir.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border bg-card">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="bg-primary/10 rounded-xl p-3">
                    <ClipboardCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Consignes & procédures</CardTitle>
                    <CardDescription className="mt-1">
                      Positionnements, contrôles, main courante, reporting : une exécution claire et traçable.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border bg-card">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="bg-primary/10 rounded-xl p-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Supervision & continuité</CardTitle>
                    <CardDescription className="mt-1">
                      Suivi opérationnel, ajustements si besoin, continuité de service : priorité à la sérénité.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Grid environnements */}
      <AnimateOnScroll>
        <section id="environments" className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Environnements
              </Badge>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
                Nos secteurs d’expertise
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Explorez nos solutions par environnement : chaque page détaille les risques fréquents, les bonnes
                pratiques et l’approche recommandée.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
              {environmentsData.map((env) => (
                <Link
                  href={`/environnements/${env.slug}`}
                  key={env.slug}
                  className="group block"
                >
                  <Card className="h-full overflow-hidden rounded-2xl border-border bg-background transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <CardHeader className="p-6">
                      <CardTitle className="flex items-center justify-between gap-4 text-lg">
                        <span className="line-clamp-1">{env.heroTitle}</span>
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </CardTitle>

                      <CardDescription className="mt-2 line-clamp-3">
                        {env.heroDescription}
                      </CardDescription>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="gap-2">
                          <ShieldCheck className="w-4 h-4" />
                          Sur-mesure
                        </Badge>
                        <Badge variant="secondary" className="gap-2">
                          <ClipboardCheck className="w-4 h-4" />
                          Reporting
                        </Badge>
                        <Badge variant="secondary" className="gap-2">
                          <MapPin className="w-4 h-4" />
                          Île-de-France
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="px-6 pb-6 pt-0">
                      <p className="text-sm text-muted-foreground">
                        Voir les recommandations, les dispositifs types et les cas d’usage.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* CTA intermédiaire (conversion) */}
            <div className="mx-auto mt-12 max-w-4xl">
              <CTASection
                title="Vous ne savez pas quel environnement choisir ?"
                description="Décrivez votre site (activité, accès, horaires, public). On vous oriente vers le dispositif adapté."
                cta={{ label: "Demander un devis", href: "/devis" }}
              />
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* SEO content (court mais utile) */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary">
                Pourquoi raisonner “par environnement” ?
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p>
                  Les risques et les priorités varient fortement selon le contexte : un siège social implique souvent
                  un contrôle d’accès discret, des procédures visiteurs et une supervision fluide ; un chantier exige
                  plutôt une prévention des intrusions, des rondes et des mesures anti-vol ; un commerce doit protéger
                  les personnes et les flux sans dégrader l’expérience client.
                </p>
                <p>
                  Notre approche consiste à adapter la posture, les consignes et le niveau de contrôle à votre
                  environnement — pour une sécurité efficace, mesurable et durable.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link href="/devis">Demander un devis</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/services">Voir toutes les prestations</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
