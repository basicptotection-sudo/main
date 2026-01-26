
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  HeroSection,
  Breadcrumbs,
  AnimateOnScroll,
  CTASection,
  ProcessSteps,
  FAQAccordion,
} from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { servicesData, type Service } from '@/lib/services-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { siteConfig } from '@/lib/config';
import { getLucideIcon } from '@/lib/icons';

export const metadata: Metadata = {
  title: 'Sécurité des Sièges Sociaux & Bureaux | Sécurité Privée en IDF',
  description:
    'Sécurité privée pour sièges sociaux et bureaux : contrôle d’accès, surveillance, rondes et dispositifs sur mesure en Île-de-France.',
  alternates: {
    canonical: '/environnements/sieges-sociaux-bureaux',
  },
};

const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
    </div>
);


export default function SiegesSociauxPage() {
    const heroImage = PlaceHolderImages.find((p) => p.id === 'zone-hauts-de-seine');

    const breadcrumbItems = [
        { label: 'Accueil', href: '/' },
        { label: 'Sièges Sociaux & Bureaux', href: '/environnements/sieges-sociaux-bureaux' },
    ];

    const enjeux = [
        {
            icon: 'Award',
            title: 'Image de marque et posture irréprochable',
            description: 'Dans un environnement corporate, l’agent de sécurité est souvent le premier contact. Tenue, posture, et langage sont essentiels.',
        },
        {
            icon: 'Users',
            title: 'Gestion des flux complexes',
            description: 'Entrées/sorties massives, visiteurs, prestataires, livraisons. Une mauvaise gestion crée des risques humains et sécuritaires.',
        },
        {
            icon: 'Lock',
            title: 'Confidentialité et données sensibles',
            description: 'Sites abritant directions, R&D ou infrastructures critiques. La sécurité humaine devient un maillon clé de la protection.',
        },
        {
            icon: 'Activity',
            title: 'Continuité d’activité',
            description: 'Intrusion, conflit ou incident peuvent perturber l’activité. Le dispositif doit prévenir, absorber et gérer sans désorganiser le site.',
        }
    ];

    const missions = [
        { icon: 'Fingerprint', title: 'Contrôle d’accès', description: 'Accueil et orientation, vérification des autorisations, gestion des badges et registres, filtrage discret et efficace.' },
        { icon: 'Radio', title: 'Surveillance et rondes', description: 'Rondes intérieures/extérieures, vérification des zones sensibles, prévention des risques et surveillance en horaires décalés.' },
        { icon: 'AlertTriangle', title: 'Gestion des incidents', description: 'Application des consignes, levée de doute, coordination avec les responsables, et rédaction de rapports complets (main courante).' },
        { icon: 'ShieldCheck', title: 'Sécurité renforcée', description: 'Agents expérimentés, coordination avec systèmes de contrôle d’accès, et intervention en renfort sur sites sensibles.' },
    ];

    const services = ['agent-securite-qualifie', 'agent-rondier', 'agent-incendie-ssiap', 'audit-conseil-surete']
        .map(slug => servicesData.find(s => s.slug === slug))
        .filter((s): s is Service => !!s)
        .map(service => ({
            icon: service.icon,
            title: service.title,
            description: service.shortDescription,
            href: `/services/${service.slug}`,
    }));

    const useCases = [
        { title: 'Siège social à La Défense', description: 'Accueil sécurisé multi-entrées, gestion des flux employés/visiteurs, surveillance en horaires étendus et reporting quotidien pour la direction.' },
        { title: 'Immeuble de bureaux multi-entreprises', description: 'Contrôle d’accès mutualisé, coordination avec syndic et gestionnaire, gestion des prestataires techniques, et rondes nocturnes/week-end.' },
        { title: 'Bureaux directionnels sensibles', description: 'Discrétion maximale, agents expérimentés, procédures strictes et traçabilité complète des accès pour protéger les informations stratégiques.' },
    ];

    const methode = {
        title: "Notre méthode : claire, structurée, maîtrisée",
        description: "De l'analyse à l'action, un processus rigoureux pour renforcer la sûreté de vos sites tertiaires.",
        steps: [
            { icon: 'FileSearch', title: '1. Analyse du site', description: 'Étude de la configuration, des flux, des horaires réels, des zones sensibles et des contraintes internes pour un diagnostic précis.' },
            { icon: 'ShieldCheck', title: '2. Définition du dispositif', description: 'Construction d\'un dispositif proportionné, évolutif, conforme à la réglementation et aligné avec votre image de marque.' },
            { icon: 'Users', title: '3. Déploiement et pilotage', description: 'Agents formés et briefés, consignes écrites, supervision opérationnelle et points réguliers avec vos équipes.' },
            { icon: 'TrendingUp', title: '4. Suivi qualité et ajustements', description: 'Rapports exploitables, indicateurs concrets et ajustements du dispositif en fonction de l’évolution de votre activité.' },
        ]
    };

    const whyUs = [
        { icon: 'Briefcase', title: 'Une posture professionnelle', description: 'Nos agents représentent votre entreprise autant qu’ils la protègent. Leur savoir-être est une priorité.' },
        { icon: 'BookOpen', title: 'Une organisation cadrée', description: 'Consignes claires, hiérarchie définie, et responsabilités assumées pour une prestation sans zones d\'ombre.' },
        { icon: 'FileText', title: 'Une traçabilité réelle', description: 'Mains courantes, rapports, remontées terrain exploitables : vous savez ce qui se passe sur votre site.' },
        { icon: 'Zap', title: 'Une vraie réactivité', description: 'Notre structure permet une adaptation rapide en cas de changement de contexte ou de besoin de renfort.' },
        { icon: 'Award', title: 'Une conformité totale', description: 'Respect strict de la réglementation, des obligations légales et des conventions en vigueur.' },
    ];

    const faqItems = [
        { question: "Intervenez-vous rapidement sur un site tertiaire ?", answer: "Oui. Selon la criticité, une solution temporaire peut être mise en place rapidement, avant de déployer le dispositif pérenne défini ensemble." },
        { question: "Vos agents sont-ils formés aux environnements corporate ?", answer: "Oui. La posture, la communication, la discrétion et la gestion de publics variés font partie intégrante de notre processus de sélection et de formation." },
        { question: "Proposez-vous des dispositifs évolutifs ?", answer: "Absolument. Le dispositif est conçu pour être flexible et peut évoluer (horaires, effectifs, missions) selon votre activité et les risques." },
        { question: "Assurez-vous un suivi dans le temps ?", answer: "Oui. La supervision, le reporting et les points d'ajustement réguliers sont inclus dans notre approche pour garantir une amélioration continue." },
    ];


    return (
        <div className="bg-background">
            <HeroSection
                title="Sécurité des Sièges Sociaux & Bureaux"
                description="Dispositifs de sécurité privée adaptés aux environnements tertiaires exigeants."
                cta1={{ label: 'Demander un devis', href: '/devis' }}
                cta2={{ label: 'Nos services', href: '/services', variant: 'secondary' }}
                imageUrl={heroImage?.imageUrl}
                imageAlt="Sécurité dans un immeuble de bureaux moderne"
                imageHint={heroImage?.imageHint}
                breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
            />

            <AnimateOnScroll>
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <p className="font-headline text-lg md:text-xl text-muted-foreground">
                            La sécurité d’un siège social ou d’un immeuble de bureaux ne se limite pas à une simple présence. Elle engage l’image de l’entreprise, la protection des collaborateurs, la continuité d’activité et la confidentialité des données. Entre flux quotidiens, visiteurs, prestataires et exigences de discrétion, les environnements tertiaires nécessitent une approche structurée, fluide et professionnelle.
                        </p>
                    </div>
                </section>
            </AnimateOnScroll>

            <AnimateOnScroll>
                <section className="py-16 md:py-24 bg-muted/20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <SectionHeader title="Les enjeux spécifiques des sièges sociaux et bureaux" />
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {enjeux.map(item => {
                                const Icon = getLucideIcon(item.icon);
                                return (
                                <Card key={item.title} className="text-center bg-background">
                                    <CardHeader className="items-center">
                                        <div className="bg-primary/10 rounded-full p-3 mb-2"><Icon className="w-8 h-8 text-primary"/></div>
                                        <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">{item.description}</p>
                                    </CardContent>
                                </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>

            <AnimateOnScroll>
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <SectionHeader title="Typologie des missions en environnement tertiaire" description="Selon la configuration de votre site, nous mettons en place des missions ciblées, complémentaires et évolutives." />
                        <div className="mt-12 space-y-8">
                          {missions.map(item => {
                            const Icon = getLucideIcon(item.icon);
                            return (
                                <div key={item.title} className="flex items-start gap-6">
                                    <div className="flex-shrink-0 mt-1">
                                        <Icon className="w-10 h-10 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">{item.title}</h3>
                                        <p className="mt-1 text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            )
                          })}
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>
            
            <AnimateOnScroll>
                <section className="py-16 md:py-24 bg-muted/20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <SectionHeader title="Nos services de sécurité pour bureaux et sièges sociaux" description="Chaque environnement tertiaire est différent. C’est pourquoi nous combinons plusieurs expertises pour un dispositif sur mesure."/>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {services.map((service) => (
                                <Link key={service.href} href={service.href} className="block h-full">
                                    <Card className="h-full transition hover:shadow-lg bg-background">
                                        <CardHeader>
                                            <CardTitle className="text-base">{service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">{service.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <p className="text-sm text-muted-foreground">👉 Le dispositif est dimensionné sur mesure, jamais standardisé.</p>
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>
            
            <AnimateOnScroll>
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <SectionHeader title="Exemples de cas d’usage concrets" />
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {useCases.map(item => (
                                <Card key={item.title} className="bg-background">
                                    <CardHeader>
                                        <CardTitle>{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>

            <AnimateOnScroll>
                <ProcessSteps {...methode} />
            </AnimateOnScroll>
            
            <AnimateOnScroll>
                 <section className="py-16 md:py-24 bg-muted/20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <SectionHeader title="Pourquoi nous confier la sécurité de vos bureaux ?" />
                        <div className="mt-12 max-w-4xl mx-auto space-y-8">
                            {whyUs.map(item => {
                                const Icon = getLucideIcon(item.icon);
                                return (
                                <div key={item.title} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1 bg-background rounded-full p-3">
                                        <Icon className="w-6 h-6 text-primary"/>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                                        <p className="text-muted-foreground mt-1">{item.description}</p>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </AnimateOnScroll>
            
            <AnimateOnScroll>
                <FAQAccordion
                    title="Questions fréquentes – Sécurité des bureaux"
                    description="Les réponses à vos questions les plus courantes sur la sécurisation des environnements tertiaires."
                    items={faqItems}
                />
            </AnimateOnScroll>

            <AnimateOnScroll>
                <CTASection
                    title="Besoin d’un dispositif de sécurité pour vos bureaux ?"
                    description="Chaque siège social a ses propres contraintes. Expliquez-nous votre contexte : nous dimensionnons une solution claire, professionnelle et adaptée à vos enjeux."
                    cta={{ label: "Demander un devis", href: "/devis" }}
                />
            </AnimateOnScroll>

        </div>
    