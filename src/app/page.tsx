import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Users, Calendar, BarChart } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { siteConfig } from '@/lib/config';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about');

  const services = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
      title: 'Surveillance & Gardiennage',
      description: 'Protection 24/7 de vos sites par des agents qualifiés et dissuasifs.',
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: 'Sécurité Événementielle',
      description: 'Gestion des foules, contrôle d’accès et sécurisation de vos événements.',
    },
    {
      icon: <Calendar className="w-12 h-12 text-primary" />,
      title: 'Intervention sur Alarme',
      description: 'Réponse rapide et efficace suite à un déclenchement d\'alarme.',
    },
    {
      icon: <BarChart className="w-12 h-12 text-primary" />,
      title: 'Audit & Conseil en Sûreté',
      description: 'Analyse de vos risques et recommandations pour optimiser votre sécurité.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[70vh] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
            Votre Partenaire Confiance pour une Sécurité Inégalée
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Basic Protection Privée offre des solutions de sécurité sur-mesure pour les entreprises et les particuliers exigeants.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="#services">Découvrir nos services</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="#contact">Obtenir un Devis</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
              Des Solutions de Sécurité Complètes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Nous adaptons nos services à vos besoins spécifiques pour une tranquillité d'esprit totale.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  {service.icon}
                  <CardTitle className="mt-4 font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-2xl">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Qui sommes-nous ?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Fondée sur des valeurs de rigueur, de professionnalisme et d'intégrité, Basic Protection Privée est votre allié pour la protection de vos biens et de vos personnes.
              </p>
              <p className="mt-4 text-muted-foreground">
                Notre équipe est composée d'agents certifiés, formés aux techniques les plus récentes et équipés pour faire face à toutes les situations. Nous nous engageons à fournir un service d'excellence et une réactivité sans faille.
              </p>
              <Button asChild className="mt-6 font-bold" size="lg">
                <Link href="#contact">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
            Contactez-nous pour un devis personnalisé
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour analyser vos besoins et vous proposer la meilleure solution de sécurité.
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-8 text-lg">
             <div className="flex items-center gap-3">
                <strong>Email:</strong> <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">{siteConfig.contact.email}</a>
            </div>
            <div className="flex items-center gap-3">
                <strong>Téléphone:</strong> <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">{siteConfig.contact.phone}</a>
            </div>
          </div>
          <Button asChild size="lg" className="mt-8 font-bold">
            <a href={`mailto:${siteConfig.contact.email}?subject=Demande de devis`}>Demander un Devis</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
