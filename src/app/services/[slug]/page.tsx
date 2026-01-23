import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { servicesData, Service } from "@/lib/services-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/config";

import {
  HeroSection,
  ProcessSteps,
  SectorsGrid,
  FAQAccordion,
  CTASection,
  Breadcrumbs,
  BenefitsSection,
  AnimateOnScroll,
} from "@/components/shared";

import ServiceJsonLd from "@/components/seo/service-json-ld";
import { Badge } from "@/components/ui/badge";

type ServicePageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

function toCanonical(path: string) {
  return `${siteConfig.url}${path}`;
}

function buildMetaDescription(service: Service) {
  // meta description courte (évite les textes longs tronqués)
  const base = service.shortDescription || service.title;
  const suffix = " Intervention Île-de-France : 78, 75, 92, 93, 94, 95, 77, 91.";
  const text = `${base}.${suffix}`;
  return text.length > 170 ? `${text.slice(0, 167)}…` : text;
}

function cityLinksForService(slug: string) {
  // Optionnel : liens “villes stratégiques” (à adapter si tu veux)
  const map: Record<string, { name: string; href: string }[]> = {
    "securite-evenementielle": [
      { name: "Paris 8", href: "/villes/paris-8-75008" },
      { name: "Paris 16", href: "/villes/paris-16-75016" },
      { name: "Saint-Denis", href: "/villes/saint-denis-93200" },
    ],
    "protection-rapprochee": [
      { name: "Paris 8", href: "/villes/paris-8-75008" },
      { name: "Paris 16", href: "/villes/paris-16-75016" },
      { name: "Neuilly-sur-Seine", href: "/villes/neuilly-sur-seine-92200" },
    ],
    "agent-cynophile": [
      { name: "Aubervilliers", href: "/villes/aubervilliers-93300" },
      { name: "Saint-Denis", href: "/villes/saint-denis-93200" },
      { name: "Rungis", href: "/villes/rungis-94150" },
    ],
    "audit-conseil-surete": [
      { name: "La Défense", href: "/villes/la-defense-92400" },
      { name: "Saclay", href: "/villes/saclay-91400" },
      { name: "Boulogne-Billancourt", href: "/villes/boulogne-billancourt-92100" },
    ],
  };

  return map[slug] ?? [];
}

function serviceContextBlocks(service: Service) {
  // Bloc SEO/Conversion : texte “sur-mesure” par service
  const city = siteConfig.business.address.city;
  const dept = siteConfig.business.address.postalCode?.slice(0, 2);

  const common = {
    whenTitle: "Quand choisir ce service ?",
    scopeTitle: "Ce que couvre la prestation",
  };

  switch (service.slug) {
    case "agent-securite-qualifie":
      return {
        ...common,
        when:
          "Quand vous avez besoin d’une présence dissuasive, d’un contrôle d’accès (visiteurs, livraisons), de rondes et d’un reporting fiable. Idéal pour bureaux, commerces, sites techniques et résidences.",
        scope:
          "Contrôle d’accès, rondes, prévention des incidents, gestion des anomalies, application des consignes, tenue de main courante, transmission des consignes et coordination si besoin.",
      };

    case "agent-cynophile":
      return {
        ...common,
        when:
          "Quand la dissuasion doit être maximale : chantiers, sites isolés, grands périmètres, zones de stockage. Le binôme homme-chien renforce la détection et réduit les risques d’intrusion.",
        scope:
          "Rondes sur périmètre, sécurisation des points sensibles, levée de doute, surveillance nocturne, détection précoce, procédure d’alerte et mise en sécurité selon consignes.",
      };

    case "agent-incendie-ssiap":
      return {
        ...common,
        when:
          "Quand la réglementation impose une présence SSIAP (ERP/IGH) ou lorsque la prévention incendie est critique : centres commerciaux, immeubles de bureaux, hôtels, salles de spectacle.",
        scope:
          "Rondes techniques, vérifications SSI, gestion des alarmes, assistance à personnes, registre de sécurité, procédures d’évacuation, coordination avec les secours.",
      };

    case "agent-rondier":
      return {
        ...common,
        when:
          "Quand vous recherchez une sécurité mobile et économique : passages à horaires variables, levée de doute, interventions sur alarme. Adapté aux entrepôts, zones d’activités, chantiers, commerces fermés la nuit.",
        scope:
          "Planification de rondes, points de contrôle, levée de doute, sécurisation temporaire, compte rendu détaillé, coordination avec forces de l’ordre selon protocole.",
      };

    case "protection-rapprochee":
      return {
        ...common,
        when:
          "Quand une personne exposée doit être sécurisée sans perturber son quotidien : dirigeants, VIP, familles, délégations. Discrétion, anticipation, gestion d’itinéraires et protocoles de crise.",
        scope:
          "Évaluation du risque, plan de protection, reconnaissances, sécurisation des déplacements, gestion des accès, coordination événementielle, adaptation en temps réel.",
      };

    case "securite-evenementielle":
      return {
        ...common,
        when:
          "Quand l’image, la fluidité et la maîtrise des accès sont essentielles : galas, lancements, défilés, événements corporate. Gestion des flux, zones VIP, accréditations et prévention.",
        scope:
          "Plan de sécurité, accueil et filtrage, zones sensibles, coordination avec l’organisation, briefings, reporting, ajustements selon l’évolution de l’événement.",
      };

    case "audit-conseil-surete":
      return {
        ...common,
        when:
          "Quand vous voulez une vision 360° : humain, technique et organisationnel. Idéal pour sièges, IGH, sites sensibles, logistique, campus. Objectif : réduire le risque et optimiser le budget.",
        scope:
          "Immersion, cartographie des risques, analyse des vulnérabilités, rapport priorisé et chiffré, aide au cahier des charges et accompagnement à la mise en œuvre.",
      };

    default:
      return {
        ...common,
        when:
          "Quand vous souhaitez un dispositif adapté à votre site, vos horaires, vos flux et votre niveau de risque. Nous cadrons la mission, dimensionnons le dispositif et assurons le suivi.",
        scope:
          "Analyse du besoin, consignes, déploiement d’équipes qualifiées, reporting et ajustements selon vos contraintes opérationnelles.",
      };
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return {};

  return {
    title: `${service.title} | ${siteConfig.name}`,
    description: buildMetaDescription(service),
    keywords: service.keywords,
    alternates: {
      canonical: toCanonical(`/services/${service.slug}`),
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const heroImage = PlaceHolderImages.find((p) => p.id === service.heroImageId) ?? PlaceHolderImages.find((p) => p.id === "hero");
  const phoneHref = `tel:${(siteConfig.contact as any).phoneE164 ?? siteConfig.contact.phone.replace(/\s/g, "")}`;

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.title, href: `/services/${service.slug}` },
  ];

  const blocks = serviceContextBlocks(service);
  const cityLinks = cityLinksForService(service.slug);

  return (
    <div className="bg-background text-foreground">
      <ServiceJsonLd service={service} breadcrumbs={breadcrumbItems} />

      <HeroSection
        title={service.title}
        description={service.shortDescription || service.description}
        cta1={{ label: "Demander un devis", href: "/devis" }}
        cta2={{ label: "Appeler", href: phoneHref, variant: "secondary" }}
        imageUrl={heroImage?.imageUrl}
        imageAlt={heroImage?.description ?? `${service.title} — ${siteConfig.name}`}
        imageHint={heroImage?.imageHint}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} className="py-0 mb-4" />}
      />

      <AnimateOnScroll>
        <section className="container mx-auto max-w-5xl px-4 py-10 md:py-12">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border p-6 md:p-7">
              <h2 className="font-headline text-xl font-semibold">{blocks.whenTitle}</h2>
              <p className="mt-2 text-muted-foreground">{blocks.when}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["78", "75", "92", "93", "94", "95", "77", "91"].map((d) => (
                  <Badge key={d} variant="secondary">
                    Île-de-France {d}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border p-6 md:p-7">
              <h2 className="font-headline text-xl font-semibold">{blocks.scopeTitle}</h2>
              <p className="mt-2 text-muted-foreground">{blocks.scope}</p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-primary-foreground"
                  href="/devis"
                >
                  Demander un devis
                </Link>
                <a
                  className="inline-flex items-center justify-center rounded-md border px-5 py-2.5"
                  href={phoneHref}
                >
                  Appeler
                </a>
              </div>
            </div>
          </div>

          {(cityLinks.length > 0) && (
            <div className="mt-6 rounded-2xl border p-6">
              <h3 className="font-headline text-lg font-semibold">Exemples de pages locales</h3>
              <p className="mt-2 text-muted-foreground">
                Des pages adaptées aux enjeux : luxe, bureaux, chantiers, logistique, événements.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cityLinks.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted/50"
                  >
                    {c.name}
                  </Link>
                ))}
                <Link
                  href="/villes"
                  className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted/50"
                >
                  Voir toutes les villes
                </Link>
              </div>
            </div>
          )}
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <BenefitsSection
          title="Vos avantages clés"
          description={`Découvrez les bénéfices concrets de notre service : ${service.title.toLowerCase()}.`}
          benefits={service.benefits}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ProcessSteps title={service.method.title} description={service.method.description} steps={service.method.steps} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <SectorsGrid sectors={service.sectors} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FAQAccordion
          title="Questions fréquentes"
          description={`Les réponses à vos questions sur ${service.title.toLowerCase()}.`}
          items={service.faq}
        />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <CTASection
          id="contact"
          title="Obtenez une proposition claire et adaptée"
          description="Décrivez votre site, vos horaires et vos contraintes : nous revenons vers vous avec une proposition structurée."
          cta={{ label: "Demander un devis", href: "/devis" }}
        />
      </AnimateOnScroll>
    </div>
  );
}
