
import type { Metadata } from 'next';
import Link from 'next/link';

import { environmentsData } from '@/lib/environments-data';
import { siteConfig } from '@/lib/config';
import { HeroSection, Breadcrumbs, AnimateOnScroll } from '@/components/shared';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  title: "Environnements d'intervention | Sécurité Privée",
  description: "Découvrez nos expertises par environnement : sièges sociaux, bureaux, et autres secteurs spécifiques.",
  alternates: {
    canonical: `${siteConfig.url}/environnements`,
  },
};

export default function EnvironnementsHubPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero');

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Environnements", href: "/environnements" },
  ];

  return (
    <div className="bg-background text-foreground">
      <HeroSection
        title="Expertise par Environnement"
        description="Chaque secteur a ses propres enjeux de sécurité. Nous adaptons nos dispositifs aux contraintes spécifiques des sièges sociaux, des sites de luxe, des chantiers et bien plus encore."
        cta1={{ label: "Voir les environnements", href: "#environments" }}
        cta2={{ label: "Demander un devis", href: "/devis", variant: 'secondary' }}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
        imageUrl={heroImage?.imageUrl}
        imageHint="security team"
      />
      
      <AnimateOnScroll>
        <section id="environments" className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">
              Nos secteurs d'expertise
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explorez nos solutions de sécurité conçues sur mesure pour les défis uniques de chaque environnement.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {environmentsData.map((env) => (
              <Link href={`/environnements/${env.slug}`} key={env.slug} className="group block">
                <Card className="h-full overflow-hidden rounded-2xl border-border bg-background transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <CardHeader className="p-6">
                    <CardTitle className="flex items-center justify-between text-lg">
                      {env.heroTitle}
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {env.heroDescription}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
