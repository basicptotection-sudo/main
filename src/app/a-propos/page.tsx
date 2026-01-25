
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/lib/config';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  HeroSection,
  Breadcrumbs,
  AnimateOnScroll,
  CTASection,
} from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, ShieldCheck, Users, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À Propos de Basic Protection Privée',
  description:
    'Découvrez notre histoire, nos valeurs et notre engagement. Une agence de sécurité privée fondée sur la rigueur, la discrétion et la confiance, au service de nos clients en Île-de-France.',
  alternates: {
    canonical: '/a-propos',
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

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'about-hero');
  const founderImage = PlaceHolderImages.find((p) => p.id === 'founder-portrait');

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'À Propos', href: '/a-propos' },
  ];

  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: 'Rigueur',
      description: 'Cadrage précis, consignes claires, exécution sans faille et traçabilité. La sécurité ne tolère pas l’approximation.',
    },
    {
      icon: <Eye className="w-8 h-8 text-primary" />,
      title: 'Discrétion',
      description: 'Protéger sans exposer. Nos agents savent se fondre dans l’environnement pour une sécurité efficace mais non intrusive.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Confiance',
      description: 'Une relation basée sur la transparence, la communication et un engagement total pour la sérénité de nos clients.',
    },
  ];

  return (
    <div className="bg-background">
      <HeroSection
        title="L’exigence, notre première protection."
        description="Plus qu'un prestataire de sécurité, Basic Protection Privée est un partenaire engagé, fondé sur une vision claire : la rigueur opérationnelle et la confiance sont les piliers d'une véritable tranquillité d'esprit."
        cta1={{ label: 'Nos Services', href: '/services' }}
        cta2={{ label: 'Demander un devis', href: '/devis', variant: 'secondary' }}
        imageUrl={heroImage?.imageUrl}
        imageAlt="Équipe de Basic Protection Privée"
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      />

      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Notre Mission : une sécurité pensée, maîtrisée et pilotée.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Nous avons créé Basic Protection Privée pour répondre à une demande simple mais essentielle : des dispositifs de sécurité fiables, pilotés par des interlocuteurs qui comprennent les enjeux du terrain. Nous refusons la logique du "volume" pour nous concentrer sur la qualité de chaque mission, du cadrage initial au reporting final.
              </p>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Nos Valeurs Fondamentales</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="text-center shadow-lg">
                  <CardHeader className="items-center">
                    <div className="bg-primary/10 rounded-full p-4 mb-4">{value.icon}</div>
                    <CardTitle className="text-xl font-headline">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-primary !mb-2">Le mot du fondateur</h2>
                <p className="text-muted-foreground !mt-0 !mb-6">John Doe, Directeur des Opérations</p>
                
                <blockquote>
                  "Après 15 ans sur le terrain, j'ai constaté que la meilleure sécurité n'est pas la plus visible, mais la mieux pensée. J'ai fondé Basic Protection Privée sur ce principe : chaque agent, chaque consigne, chaque ronde doit avoir un objectif clair. Notre fierté, c'est la satisfaction de nos clients et la stabilité de nos équipes."
                </blockquote>
                <p>
                  Fort d'une expérience complète en tant qu'agent, chef de site puis coordinateur d'opérations pour des groupes internationaux, John Doe a souhaité créer une structure à taille humaine, où la réactivité et la qualité du management priment. Son ambition : faire de Basic Protection Privée la référence en matière de sécurité fiable et sur-mesure en Île-de-France.
                </p>
                <Button asChild className="not-prose">
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
              <div className="order-first md:order-last">
                {founderImage && (
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={founderImage.imageUrl}
                      alt="Fondateur de Basic Protection Privée"
                      fill
                      className="object-cover"
                      data-ai-hint={founderImage.imageHint}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

       <AnimateOnScroll>
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard icon={<ShieldCheck className="w-8 h-8 text-primary" />} value="500+" label="Missions réussies" />
              <StatCard icon={<Users className="w-8 h-8 text-primary" />} value="50+" label="Clients fidèles" />
              <StatCard icon={<Award className="w-8 h-8 text-primary" />} value="100%" label="Agents agréés CNAPS" />
              <StatCard icon={<ShieldCheck className="w-8 h-8 text-primary" />} value="98%" label="Taux de satisfaction" />
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          title="Prêt à travailler avec un partenaire de confiance ?"
          description="Contactez-nous pour analyser vos besoins et découvrez comment notre exigence peut devenir votre meilleure protection."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>
    </div>
  );
}
