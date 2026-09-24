import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, MapPin, Phone, Plus, ShieldCheck } from "lucide-react";
import { citiesData, type City, type CityFocus } from "@/lib/cities-data";
import { servicesData, type Service } from "@/lib/services-data";
import { siteConfig } from "@/lib/config";
import CityJsonLd from "@/components/seo/city-json-ld";
import FaqJsonLd from "@/components/seo/faq-json-ld";
import { deptCodeFromCity } from "@/lib/cities-helpers";
import { getZoneSlugByDeptCode } from "@/lib/zones-helpers";

type PageProps = { params: Promise<{ slug: string }> };
type UseCase = { icon: string; title: string; content: string };
type FaqItem = { question: string; answer: string };
function cityDisplayName(title: string) { return title.replace(/^Sécurité Privée\s*/i, "").trim(); }
const focusLabels: Record<CityFocus, string> = { luxe: "Luxe & accueil", bureaux: "Bureaux", chantiers: "Chantiers", logistique: "Logistique", événementiel: "Événementiel", résidentiel: "Résidentiel", tech: "Sites technologiques", industrie: "Industrie" };

function buildCityContent(city: City) {
  const focus = city.focus ?? [];

  const heroTitle = `${city.title} — Sécurité privée & dispositifs adaptés`;

  const heroDescription =
    city.intro ??
    (focus.includes("luxe")
      ? "Sécurité haut de gamme, posture irréprochable et gestion maîtrisée des flux pour environnements premium."
      : focus.includes("logistique")
      ? "Sécurisation des flux, quais, entrepôts et accès sensibles avec un dispositif structuré et traçable."
      : focus.includes("chantiers")
      ? "Prévention des intrusions et vols, surveillance nocturne et rondes sur sites en travaux."
      : focus.includes("événementiel")
      ? "Contrôle d’accès, gestion des flux et sécurisation des zones sensibles pour événements."
      : "Surveillance, contrôle d’accès et prévention avec une organisation claire et pilotée.");

  const useCases: UseCase[] =
    city.useCases ??
    ([
      focus.includes("bureaux") && {
        icon: "Building2",
        title: "Bureaux & sites tertiaires",
        content:
          "Contrôle d’accès, gestion visiteurs et prestataires, rondes et reporting.",
      },
      focus.includes("luxe") && {
        icon: "Gem",
        title: "Luxe & environnements sensibles",
        content:
          "Discrétion, posture premium et prévention sans altérer l’image de marque.",
      },
      focus.includes("logistique") && {
        icon: "Warehouse",
        title: "Logistique & stockage",
        content:
          "Contrôle des accès, prévention des intrusions et sécurisation des flux.",
      },
      focus.includes("chantiers") && {
        icon: "HardHat",
        title: "Chantiers & sites techniques",
        content: "Surveillance nocturne, prévention des vols et rondes dissuasives.",
      },
      focus.includes("événementiel") && {
        icon: "Users",
        title: "Événementiel",
        content: "Accueil, filtrage et gestion des flux selon le dispositif défini.",
      },
      focus.includes("résidentiel") && {
        icon: "Home",
        title: "Résidentiel & copropriétés",
        content: "Présence rassurante, rondes et prévention des incivilités.",
      },
    ].filter(Boolean) as UseCase[]);

  const orderedServices: Service[] = [
    "agent-securite-qualifie",
    "agent-rondier",
    focus.includes("événementiel") && "securite-evenementielle",
    "audit-conseil-surete",
  ]
    .filter(Boolean)
    .map((slug) => servicesData.find((s) => s.slug === slug))
    .filter(Boolean) as Service[];

  const cityName = cityDisplayName(city.title);

  const faq: FaqItem[] = [
    {
      question: `Intervenez-vous rapidement à ${cityName} ?`,
      answer:
        "Oui. Selon la mission, une solution temporaire peut être mise en place rapidement avant un dispositif pérenne.",
    },
    {
      question: "Comment choisissez-vous le bon dispositif ?",
      answer:
        "Après analyse du site : flux, horaires, contraintes, risques et objectifs.",
    },
    {
      question: "Assurez-vous un suivi qualité ?",
      answer:
        "Oui. Reporting, supervision et ajustements continus sont intégrés à nos prestations.",
    },
  ];

  const whyUs = [
    {
      icon: "ShieldCheck",
      title: "Dispositif cadré",
      description: "Consignes claires et pilotage opérationnel.",
    },
    {
      icon: "FileText",
      title: "Traçabilité",
      description: "Main courante et rapports utiles.",
    },
    { icon: "Zap", title: "Réactivité", description: "Adaptation rapide selon les besoins." },
    { icon: "Lock", title: "Discrétion", description: "Posture et confidentialité adaptées." },
  ];

  return { heroTitle, heroDescription, useCases, orderedServices, faq, whyUs };
}

/* ----------------------------------
   SSG / SEO
----------------------------------- */

export async function generateStaticParams() {
  return citiesData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const city = citiesData.find((c) => c.slug === slug);
  if (!city) return {};

  const content = buildCityContent(city);

  return {
    title: city.title,
    description: content.heroDescription,
    keywords: city.keywords,
    alternates: { canonical: `${siteConfig.url}/villes/${city.slug}` },
  };
}

/* ----------------------------------
   UI Blocks
----------------------------------- */


export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesData.find(city => city.slug === slug);
  if (!city) notFound();
  const content = buildCityContent(city);
  const name = cityDisplayName(city.title);
  const postalCode = slug.match(/-(\d{5})$/)?.[1] || "";
  const deptCode = deptCodeFromCity(city);
  const zoneSlug = deptCode ? getZoneSlugByDeptCode(deptCode) : null;
  const nearby = citiesData.filter(other => other.slug !== slug && deptCodeFromCity(other) === deptCode).sort((a, b) => cityDisplayName(a.title).localeCompare(cityDisplayName(b.title), "fr"));
  const similar = citiesData.filter(other => deptCodeFromCity(other) !== deptCode && other.focus.some(focus => city.focus.includes(focus))).sort((a, b) => cityDisplayName(a.title).localeCompare(cityDisplayName(b.title), "fr")).slice(0, 8);
  const breadcrumbs = [{ label: "Accueil", href: "/" }, { label: "Notre présence", href: "/zones" }, ...(zoneSlug ? [{ label: city.department, href: `/zones/${zoneSlug}` }] : []), { label: name, href: `/villes/${slug}` }];
  return <>
    <CityJsonLd city={city} breadcrumbs={breadcrumbs} />
    <FaqJsonLd items={content.faq} />
    <section className="border-b"><div className="premium-shell"><nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-8 text-[11px] text-muted-foreground"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><Link href={zoneSlug ? `/zones/${zoneSlug}` : "/zones"}>{city.department}</Link><span aria-hidden="true">/</span><span aria-current="page">{name}</span></nav>
      <div className="city-hero-grid"><div className="min-w-0"><p className="premium-eyebrow text-[#9c8056]">Sécurité privée · {postalCode}</p><h1 className="city-title mt-6 font-headline font-medium leading-[1.06] tracking-[-0.05em]">{name}.<br /><span className="premium-serif">La sérénité,<br />au quotidien.</span></h1><p className="mt-7 max-w-lg text-sm leading-relaxed text-muted-foreground">{content.heroDescription}</p><div className="mt-8 flex flex-wrap items-center gap-6"><Link href="/devis" className="premium-button bg-[#101c2d] text-white hover:bg-[#26364b]">Étudier votre projet <ArrowUpRight size={17} /></Link><a href="#besoins" className="premium-text-link">Notre approche <ArrowDown size={15} /></a></div>{city.focus.length > 0 && <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t pt-5">{city.focus.map(focus => <span key={focus} className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{focusLabels[focus]}</span>)}</div>}</div>
      <div className="city-hero-photo"><Image src="/images/securite-privee-gardiennage.webp" alt="Un agent de sécurité en tenue professionnelle" fill priority sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover object-[65%_center]" /><div className="absolute inset-0 bg-gradient-to-t from-[#101c2d]/85 via-transparent to-transparent" /><div className="absolute bottom-7 left-7 right-7 text-white"><p className="premium-eyebrow text-[#d9c6a3]">Basic Protection Privée</p><p className="mt-3 font-headline text-2xl tracking-tight">Une présence discrète.<br />Une attention constante.</p></div><div className="absolute right-5 top-5 border border-white/30 bg-[#101c2d]/65 px-4 py-3 text-xs text-white">{postalCode}</div></div></div>
    </div></section>

    <section id="besoins" className="premium-shell premium-section"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"><div><p className="premium-eyebrow text-[#9c8056]">01 — Votre environnement</p><h2 className="premium-title mt-5">À chaque lieu,<br /><span className="premium-serif">la juste protection.</span></h2></div><div><p className="font-headline text-2xl font-medium leading-snug tracking-tight">À {name}, nous partons de votre réalité.</p><p className="mt-5 text-sm leading-relaxed text-muted-foreground">Les accès, les horaires, les personnes présentes et les contraintes d’exploitation définissent votre besoin. Nous prenons ces éléments en compte pour organiser une présence adaptée, avec des consignes précises et un suivi régulier.</p></div></div>
      {content.useCases.length > 0 && <div className="mt-12 grid gap-8 md:grid-cols-2">{content.useCases.map((item, index) => <article key={item.title} className="border-t pt-6"><div className="flex items-center gap-4"><span className="text-xs text-[#9c8056]">0{index + 1}</span><h3 className="font-headline text-xl font-medium tracking-tight">{item.title}</h3></div><p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{item.content}</p></article>)}</div>}
    </section>

    <section id="services" className="premium-dark premium-section"><div className="premium-shell"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="premium-eyebrow text-[#d9c6a3]">02 — Les expertises adaptées</p><h2 className="premium-title mt-5 text-white">Prévenir. Protéger.<br /><span className="premium-serif text-[#d9c6a3]">Vous accompagner.</span></h2></div><Link href="/services" className="inline-flex items-center gap-5 border-b border-white/30 pb-3 text-xs text-white/80">Toutes nos expertises <ArrowUpRight size={17} /></Link></div><div className="mt-12 grid gap-x-10 md:grid-cols-2">{content.orderedServices.map((service, index) => <Link key={service.slug} href={`/services/${service.slug}`} className="territory-service group"><div className="flex justify-between text-[#d9c6a3]"><span className="text-xs">0{index + 1}</span><ArrowUpRight size={20} /></div><h3 className="mt-6 font-headline text-2xl font-medium tracking-tight">{service.title}</h3><p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60">{service.shortDescription}</p><span className="mt-auto block pt-6 text-xs text-[#d9c6a3]">Découvrir cette expertise</span></Link>)}</div></div></section>

    <section className="premium-shell py-16 md:py-20"><div className="flex items-center gap-3"><ShieldCheck size={20} className="text-[#9c8056]" strokeWidth={1.3} /><p className="premium-eyebrow text-muted-foreground">La qualité dans chaque détail</p></div><div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{content.whyUs.map(item => <div key={item.title} className="border-t pt-6"><h2 className="font-headline text-xl tracking-tight">{item.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p></div>)}</div></section>

    <section className="border-y bg-card premium-section"><div className="premium-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><div><p className="premium-eyebrow text-[#9c8056]">03 — Notre présence locale</p><h2 className="premium-title mt-5">Ici.<br /><span className="premium-serif">Et à vos côtés.</span></h2><div className="mt-7 flex items-center gap-3 text-sm"><MapPin size={19} className="text-[#9c8056]" />{city.department}</div><p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">Votre activité s’étend sur plusieurs communes ? Retrouvez notre présence dans le département pour préparer votre dispositif.</p>{zoneSlug && <Link href={`/zones/${zoneSlug}`} className="premium-text-link mt-7">Explorer le département <ArrowUpRight size={17} /></Link>}</div><div><h3 className="font-headline text-xl tracking-tight">Également dans le département</h3><div className="mt-5 grid gap-x-8 sm:grid-cols-2">{nearby.map(other => <Link key={other.slug} href={`/villes/${other.slug}`} className="territory-city"><span>{cityDisplayName(other.title)}</span><ArrowUpRight size={16} className="shrink-0 text-[#9c8056]" /></Link>)}</div><Link href="/zones" className="premium-text-link mt-7">Voir toute notre présence <ArrowUpRight size={16} /></Link></div></div></section>

    <section className="premium-shell premium-section"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><div><p className="premium-eyebrow text-[#9c8056]">04 — Avant de commencer</p><h2 className="premium-title mt-5">Vos questions.<br /><span className="premium-serif">Nos repères.</span></h2></div><div>{content.faq.map(item => <details key={item.question} className="contact-faq group border-b first:border-t"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-headline text-lg tracking-tight">{item.question}<Plus size={17} className="shrink-0 text-[#9c8056] transition-transform group-open:rotate-45" /></summary><p className="pb-6 text-sm leading-relaxed text-muted-foreground">{item.answer}</p></details>)}</div></div></section>

    <section className="premium-dark py-16 md:py-24"><div className="premium-shell flex flex-col justify-between gap-9 lg:flex-row lg:items-center"><div><p className="premium-eyebrow text-[#d9c6a3]">Votre projet à {name}</p><h2 className="premium-title mt-5 text-white">Parlons de votre lieu.<br /><span className="premium-serif text-[#d9c6a3]">Pensons sa protection.</span></h2><p className="mt-6 max-w-lg text-sm leading-relaxed text-white/60">Un site, un événement ou une nouvelle organisation : décrivez votre besoin et construisons une réponse adaptée.</p></div><div className="flex shrink-0 flex-col items-start gap-6"><Link href="/devis" className="premium-button premium-button-gold">Présenter mon projet <ArrowUpRight size={18} /></Link><a href={`tel:${siteConfig.contact.phoneE164}`} className="flex items-center gap-3 text-sm text-white/80"><Phone size={16} />{siteConfig.contact.phone}</a></div></div></section>
    {similar.length > 0 && <section className="premium-shell py-12 md:py-16"><h2 className="font-headline text-xl tracking-tight">Des besoins similaires ailleurs en Île-de-France</h2><p className="mt-3 text-xs text-muted-foreground">Retrouvez nos interventions dans des environnements comparables au vôtre.</p><div className="mt-6 flex flex-wrap gap-x-7 gap-y-4 border-t pt-5">{similar.map(other => <Link key={other.slug} href={`/villes/${other.slug}`} className="text-xs text-muted-foreground hover:text-foreground">{cityDisplayName(other.title)}</Link>)}</div></section>}
  </>;
}
