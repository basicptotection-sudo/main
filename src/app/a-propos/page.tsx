// src/app/a-propos/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { siteConfig } from "@/lib/config";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  HeroSection,
  Breadcrumbs,
  AnimateOnScroll,
  CTASection,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Award,
  ShieldCheck,
  Users,
  Eye,
  Target,
  ClipboardCheck,
  Building2,
  MapPin,
  Phone,
} from "lucide-react";

function toCanonical(path: string) {
  const base = siteConfig?.url?.replace(/\/$/, "") || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const metadata: Metadata = {
  title: "À propos | Basic Protection Privée",
  description:
    "Basic Protection Privée : une agence de sécurité privée en Île-de-France, fondée sur la rigueur opérationnelle, la discrétion et la confiance. Découvrez notre mission, nos valeurs et notre méthode.",
  alternates: {
    canonical: toCanonical("/a-propos"),
  },
  openGraph: {
    title: "À propos | Basic Protection Privée",
    description:
      "Une sécurité maîtrisée : rigueur, discrétion, confiance. Découvrez notre vision, notre méthode et nos engagements en Île-de-France.",
    url: toCanonical("/a-propos"),
    siteName: siteConfig?.name || "Basic Protection Privée",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos | Basic Protection Privée",
    description:
      "Rigueur, discrétion, confiance : découvrez l’agence et sa méthode.",
  },
};

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <Card className="text-center bg-muted/30 border-0">
    <CardHeader className="items-center">
      <div className="bg-primary/10 rounded-full p-3 mb-2">{icon}</div>
      <p className="text-4xl font-bold font-headline text-primary">{value}</p>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);

const Feature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex gap-4">
    <div className="shrink-0 mt-1">
      <div className="bg-primary/10 rounded-xl p-3">{icon}</div>
    </div>
    <div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  </div>
);

export default function AboutPage() {
  const heroImage =
    PlaceHolderImages.find((p) => p.id === "about-hero") ||
    PlaceHolderImages.find((p) => p.id === "security-hero");
  const founderImage =
    PlaceHolderImages.find((p) => p.id === "founder-portrait") ||
    PlaceHolderImages.find((p) => p.id === "portrait");

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
  ];

  const values = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-primary" />,
      title: "Rigueur",
      description:
        "Cadrage précis, consignes claires, exécution maîtrisée et traçabilité. La sécurité ne tolère pas l’approximation.",
    },
    {
      icon: <Eye className="w-7 h-7 text-primary" />,
      title: "Discrétion",
      description:
        "Protéger sans exposer. Des postures adaptées, une présence efficace et non intrusive, selon le contexte et le public.",
    },
    {
      icon: <Users className="w-7 h-7 text-primary" />,
      title: "Confiance",
      description:
        "Transparence, communication et continuité de service. Un partenaire fiable sur qui vous pouvez compter.",
    },
  ];

  const methodSteps = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "1. Analyse du besoin",
      description:
        "Objectifs, contraintes, risques, flux, horaires, points sensibles : on cartographie avant d’agir.",
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-primary" />,
      title: "2. Dispositif & consignes",
      description:
        "Plan d’action, positionnements, procédures, contrôles, main courante et modalités de reporting.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "3. Mise en place terrain",
      description:
        "Agents qualifiés, brief clair, supervision opérationnelle et ajustements en temps réel si besoin.",
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "4. Suivi & amélioration",
      description:
        "Bilan, KPI, retours clients, recommandations : on améliore le dispositif mission après mission.",
    },
  ];

  return (
    <div className="bg-background">
      <HeroSection
        title="Une agence à taille humaine, une exigence de grand compte."
        description="Basic Protection Privée accompagne entreprises, commerces et événements en Île-de-France avec une sécurité pensée, pilotée et traçable. Notre différence : la rigueur opérationnelle, la discrétion terrain et la qualité du suivi."
        cta1={{ label: "Nos services", href: "/services" }}
        cta2={{
          label: "Demander un devis",
          href: "/devis",
          variant: "secondary",
        }}
        imageUrl={heroImage?.imageUrl}
        imageAlt="Agents de sécurité Basic Protection Privée"
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      />

      {/* Intro / Mission */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                Notre mission
              </Badge>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Une sécurité maîtrisée, du cadrage au reporting.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Nous avons créé Basic Protection Privée pour répondre à une
                exigence simple : des dispositifs fiables, encadrés et adaptés
                aux réalités du terrain. Chaque mission est pensée comme un
                projet : objectifs, consignes, supervision et compte-rendu.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 text-left">
                <Feature
                  icon={<Building2 className="w-6 h-6 text-primary" />}
                  title="Une approche sur-mesure"
                  description="Chaque site est différent : accès, public, flux, horaires, niveau de risque. On s’adapte, on documente, on sécurise."
                />
                <Feature
                  icon={<ClipboardCheck className="w-6 h-6 text-primary" />}
                  title="Méthode & traçabilité"
                  description="Consignes claires, main courante, points de contrôle et reporting : vous savez ce qui est fait, quand, et comment."
                />
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Values */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">
                Nos valeurs
              </Badge>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Rigueur. Discrétion. Confiance.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Trois principes simples qui guident notre recrutement, notre
                organisation et nos interventions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v) => (
                <Card key={v.title} className="text-center shadow-lg">
                  <CardHeader className="items-center">
                    <div className="bg-primary/10 rounded-full p-4 mb-4">
                      {v.icon}
                    </div>
                    <CardTitle className="text-xl font-headline">
                      {v.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{v.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Method */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">
                Notre méthode
              </Badge>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Une exécution terrain, pilotée comme un dispositif.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Objectif : limiter l’imprévu. On anticipe, on formalise, on
                supervise. Et on améliore à chaque mission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {methodSteps.map((s) => (
                <Card key={s.title} className="border bg-card">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className="bg-primary/10 rounded-xl p-3">{s.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{s.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">
                        {s.description}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild>
                <Link href="/devis">Demander un devis</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services">Voir nos services</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Founder / Story */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <Badge variant="secondary" className="not-prose mb-4">
                  Notre histoire
                </Badge>
                <h2 className="text-primary !mb-2">Une expérience terrain, une vision claire.</h2>
                <p className="text-muted-foreground !mt-0 !mb-6">
                  Une structure à taille humaine, conçue pour être réactive et
                  fiable, sans compromis sur l’encadrement.
                </p>

                <blockquote>
                  “La meilleure sécurité n’est pas la plus visible : c’est la
                  mieux pensée. Une consigne utile, un agent bien briefé, une
                  supervision active… et un client serein.”
                </blockquote>

                <p>
                  Notre objectif est simple : apporter une sécurité qui rassure
                  réellement. Cela passe par une préparation sérieuse, une
                  présence adaptée, et un suivi transparent. Nous privilégions
                  la qualité des équipes, la stabilité des missions et la
                  continuité de service.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <Button asChild>
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/devis">Obtenir une proposition</Link>
                  </Button>
                </div>
              </div>

              <div className="order-first md:order-last">
                {founderImage ? (
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={founderImage.imageUrl}
                      alt="Dirigeant Basic Protection Privée"
                      fill
                      className="object-cover"
                      data-ai-hint={founderImage.imageHint}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                  </div>
                ) : (
                  <Card className="p-8">
                    <p className="text-muted-foreground">
                      Ajoute une image “founder-portrait” dans PlaceHolderImages
                      pour afficher le portrait ici.
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Stats */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">
                Indicateurs
              </Badge>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Des engagements mesurables.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Ces chiffres peuvent être ajustés selon ta réalité (ou remplacés
                par des preuves : avis, logos clients, études de cas).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard
                icon={<ShieldCheck className="w-8 h-8 text-primary" />}
                value="500+"
                label="Missions réalisées"
              />
              <StatCard
                icon={<Users className="w-8 h-8 text-primary" />}
                value="50+"
                label="Clients accompagnés"
              />
              <StatCard
                icon={<Award className="w-8 h-8 text-primary" />}
                value="100%"
                label="Agents agréés CNAPS"
              />
              <StatCard
                icon={<ClipboardCheck className="w-8 h-8 text-primary" />}
                value="98%"
                label="Satisfaction (interne)"
              />
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Local / Contact strip (SEO local + conversion) */}
      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <Card className="overflow-hidden border bg-card">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="p-8 lg:col-span-2">
                  <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary">
                    Intervention en Île-de-France
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Gardiennage, sécurité événementielle, rondes, contrôle
                    d’accès : nous construisons un dispositif adapté à votre
                    site, vos horaires et vos contraintes.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-xl p-3">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Paris • 92 • 93 • 94 • IDF
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-xl p-3">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Réponse rapide • Devis clair • Suivi de mission
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Button asChild>
                      <Link href="/devis">Demander un devis</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/services">Découvrir nos prestations</Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/30 p-8 flex items-center">
                  <div className="w-full">
                    <p className="text-sm font-medium text-foreground">
                      Besoin d’un dispositif adapté ?
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Donne-nous le contexte (site, horaires, public, enjeux).
                      On te propose un cadrage simple et une mise en place
                      sécurisée.
                    </p>
                    <div className="mt-6">
                      <Button asChild variant="secondary" className="w-full">
                        <Link href="/contact">Parler à un responsable</Link>
                      </Button>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground text-center">
                      Réponse sous 24h ouvrées (ajuste si besoin)
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          title="Prêt à travailler avec un partenaire fiable ?"
          description="Expliquez votre besoin : nous construisons un dispositif clair, piloté, et adapté à votre site."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>
    </div>
  );
}
