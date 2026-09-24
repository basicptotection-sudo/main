import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDown, ShieldCheck, MapPin, ClipboardCheck, Plus, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { servicesData } from "@/lib/services-data";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import styles from "./services.module.css";

const title = "Services de sécurité privée en Île-de-France | Basic Protection Privée";
const description = "Gardiennage, agents cynophiles, SSIAP, rondes, sécurité événementielle et audit de sûreté. Découvrez nos six expertises en Île-de-France.";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, type: "website", url: `${siteConfig.url}/services`, images: [{ url: "/images/services/services-securite-privee.avif", alt: "Basic Protection Privée — nos expertises" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/services/services-securite-privee.avif"] },
};

const expertise = [
  { slug: "agent-securite-qualifie", title: "Gardiennage & surveillance", image: "/images/securite-privee-gardiennage.webp", tag: "Présence & vigilance", text: "Protéger vos espaces, accueillir vos visiteurs et maîtriser les accès. Une présence rassurante au cœur de votre quotidien.", uses: "Entreprises · Commerces · Résidences" },
  { slug: "agent-cynophile", title: "Sécurité cynophile", image: "/images/agent-cynophile.webp", tag: "Détection & dissuasion", text: "La complémentarité d’un agent et de son chien pour renforcer la surveillance de vos sites et de leurs abords.", uses: "Chantiers · Entrepôts · Sites industriels" },
  { slug: "agent-incendie-ssiap", title: "Sécurité incendie · SSIAP", image: "/images/securite-incendie.webp", tag: "Prévention & intervention", text: "Anticiper les risques, surveiller les installations et accompagner les personnes avec des agents SSIAP adaptés à votre site.", uses: "ERP · Immeubles · Établissements" },
  { slug: "agent-rondier", title: "Rondes & interventions", image: "/images/agent-rondier.webp", tag: "Mobilité & réactivité", text: "Des passages de contrôle et des interventions sur alarme pour veiller sur vos locaux, même en votre absence.", uses: "Bureaux · Sites isolés · Parkings" },
  { slug: "securite-evenementielle", title: "Sécurité événementielle", image: "/images/service-securite-evenementielle.webp", tag: "Discrétion & coordination", text: "Un accueil maîtrisé, des flux organisés et une vigilance discrète pour laisser toute la place à votre événement.", uses: "Galas · Lancements · Événements privés" },
  { slug: "audit-conseil-surete", title: "Audit & conseil en sûreté", image: "/images/service-audit-conseil.webp", tag: "Analyse & stratégie", text: "Identifier vos vulnérabilités et concevoir un plan de protection cohérent avec votre activité, vos priorités et vos contraintes.", uses: "Diagnostic · Préconisations · Plan d’action" },
];
const steps = [
  { title: "Comprendre votre contexte", text: "Votre site, vos usages, vos contraintes : nous commençons par écouter et identifier les enjeux de la mission." },
  { title: "Construire le bon dispositif", text: "Profils des agents, horaires, consignes et organisation : chaque détail est défini dans une proposition claire." },
  { title: "Assurer le suivi sur le terrain", text: "Encadrement, remontées d’information et ajustements : votre protection évolue avec vos besoins." },
];
const questions = [
  { question: "Quel service choisir pour mon site ?", answer: "Le choix dépend de votre activité, de la configuration des lieux et des risques à couvrir. Gardiennage, rondes, cynophile ou SSIAP peuvent se compléter. Décrivez-nous votre site : nous vous aidons à définir un dispositif adapté." },
  { question: "Peut-on associer plusieurs prestations ?", answer: "Oui. Un même dispositif peut combiner présence sur site, rondes, prévention incendie et conseil en sûreté. Les prestations sont coordonnées selon les besoins et les contraintes de votre mission." },
  { question: "Dans quelles zones intervenez-vous ?", answer: "Basés à Plaisir dans les Yvelines, nous intervenons à Paris et dans les huit départements d’Île-de-France, selon la nature de la mission et les disponibilités de nos équipes." },
  { question: "Comment obtenir une proposition ?", answer: "Contactez-nous par téléphone ou via le formulaire de devis. Précisez le lieu, les dates, les horaires et votre besoin. Ces informations nous permettent de préparer une proposition adaptée." },
];

export default function ServicesHubPage() {
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` }] },
    { "@type": "ItemList", name: "Services de sécurité privée", itemListElement: servicesData.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, url: `${siteConfig.url}/services/${s.slug}` })) },
  ] };
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className={styles.hero} aria-labelledby="services-heading">
        <div className={styles.heroImage}><Image src="/images/services/services-securite-privee.avif" alt="Un professionnel de la sécurité en costume, attentif à son environnement" fill priority sizes="(max-width: 767px) 100vw, 60vw" className="object-cover object-top" /></div>
        <div className={styles.heroShade} />
        <div className="premium-shell relative">
          <div className="pt-6"><Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Services" }]} variant="onDark" /></div>
          <div className={styles.heroCopy}>
            <p className="premium-eyebrow text-[#d9c6a3]"><span className={styles.line} />Nos expertises</p>
            <h1 id="services-heading">Votre sérénité.<br />Notre <span className="premium-serif text-[#d9c6a3]">mission.</span></h1>
            <p className={styles.lead}>Une présence juste. Une protection précise.</p>
            <p className={styles.heroText}>Du quotidien aux moments d’exception, nous concevons la sécurité qui vous ressemble. Six expertises, une même exigence sur le terrain.</p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link href="/devis" className="premium-button premium-button-gold">Parlons de votre projet <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a href="#expertises" className={styles.discover}>Explorer nos services <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className={styles.heroFoot}><span>Protection humaine. Engagement quotidien.</span><span className="flex items-center gap-2"><MapPin size={14} aria-hidden="true" /> Plaisir · Île-de-France</span></div>
        </div>
      </section>
      <div className={styles.trust}><div className="premium-shell grid gap-7 py-7 md:grid-cols-3">
        {[{ icon: ShieldCheck, title: "Des agents qualifiés", text: "Les compétences adaptées à votre mission" }, { icon: ClipboardCheck, title: "Un dispositif sur mesure", text: "Des consignes précises, un suivi structuré" }, { icon: MapPin, title: "Un ancrage local", text: "Une équipe proche de vos enjeux" }].map(({ icon: Icon, title: label, text }) => <div key={label} className="flex items-center gap-4"><Icon size={27} strokeWidth={1.3} className="shrink-0 text-[#9c8056]" aria-hidden="true" /><div><p className="text-sm font-semibold">{label}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p></div></div>)}
      </div></div>
      <section id="expertises" className="premium-shell premium-section" aria-labelledby="expertises-title">
        <div className={styles.sectionHead}><div><p className="premium-eyebrow text-muted-foreground">01 — Une protection à votre mesure</p><h2 id="expertises-title" className="premium-title mt-5">Chaque contexte est unique.<br /><span className="premium-serif">Votre sécurité aussi.</span></h2></div><p className={styles.intro}>Sécuriser un lieu, accompagner un événement ou anticiper un risque : découvrez l’expertise qui répond à votre besoin.</p></div>
        <nav aria-label="Parcourir les expertises" className={styles.jumpNav}><a href="#services-terrain">01 — Sécurité au quotidien <ArrowDown size={15} aria-hidden="true" /></a><a href="#services-premium">02 — Événementiel & conseil <ArrowDown size={15} aria-hidden="true" /></a></nav>
        {[{ id: "services-terrain", label: "Sur le terrain", title: "Protéger votre quotidien", items: expertise.slice(0, 4) }, { id: "services-premium", label: "À vos côtés", title: "Accompagner vos enjeux singuliers", items: expertise.slice(4) }].map((group, groupIndex) => <div id={group.id} key={group.id} className={styles.serviceGroup}><div className={styles.groupHead}><h3>{group.title}</h3><span>{group.label}</span></div><div className={styles.grid}>{group.items.map((s, i) => <Link href={`/services/${s.slug}`} key={s.slug} className={styles.card} aria-label={`Découvrir : ${s.title}`}><div className={styles.cardImage}><Image src={s.image} alt={s.title} fill sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 620px" className="object-cover" /><div className={styles.cardShade} /><span className={styles.cardNumber}>0{groupIndex * 4 + i + 1}</span><span className={styles.cardTag}>{s.tag}</span><span className={styles.cardArrow}><ArrowUpRight size={22} aria-hidden="true" /></span></div><div className={styles.cardBody}><h4>{s.title}</h4><p>{s.text}</p><div className={styles.cardUses}>{s.uses}</div></div></Link>)}</div></div>)}
        <div className={styles.help}><p>Vous hésitez entre plusieurs expertises ? <span>Construisons ensemble le bon dispositif.</span></p><a href={`tel:${siteConfig.contact.phoneE164}`} className="premium-text-link shrink-0">Échanger avec notre équipe <ArrowUpRight size={17} aria-hidden="true" /></a></div>
      </section>
      <section className="premium-dark premium-section" aria-labelledby="method-title"><div className="premium-shell grid gap-14 lg:grid-cols-2 lg:gap-24"><div><p className="premium-eyebrow text-[#d9c6a3]">02 — Notre méthode</p><h2 id="method-title" className="premium-title mt-5">La rigueur dans les détails.<br /><span className="premium-serif text-[#d9c6a3]">La confiance dans la durée.</span></h2><p className="mt-7 max-w-md text-sm leading-7 text-slate-300">Au-delà d’une prestation, un accompagnement. Nous préparons chaque mission avec soin et gardons le lien tout au long de son exécution.</p><Link href="/a-propos" className="premium-text-link mt-8 text-[#d9c6a3]">Découvrir notre engagement <ArrowUpRight size={18} aria-hidden="true" /></Link></div><ol className={styles.steps}>{steps.map((step, i) => <li key={step.title}><span>0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div></section>
      <section className="premium-shell premium-section" aria-labelledby="faq-title"><div className={styles.faqLayout}><div><p className="premium-eyebrow text-muted-foreground">03 — Vos questions</p><h2 id="faq-title" className="premium-title mt-5">Tout commence par<br /><span className="premium-serif">un échange.</span></h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Quelques repères pour préparer votre projet de sécurité.</p></div><div>{questions.map(q => <details key={q.question} className={styles.question}><summary>{q.question}<Plus size={18} aria-hidden="true" /></summary><p>{q.answer}</p></details>)}</div></div></section>
      <section className={styles.cta} aria-labelledby="project-title"><div className="premium-shell"><div className={styles.ctaInner}><div><p className="premium-eyebrow text-muted-foreground">Votre prochain pas</p><h2 id="project-title" className="premium-title mt-5">Parlons de ce qui compte.<br /><span className="premium-serif">Nous veillons sur le reste.</span></h2><p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">Un site à protéger, un événement à préparer, un dispositif à repenser ? Donnons ensemble forme à votre projet.</p></div><div className="flex flex-col items-start gap-6"><Link href="/devis" className="premium-button premium-dark">Construire mon projet <ArrowUpRight size={19} aria-hidden="true" /></Link><a href={`tel:${siteConfig.contact.phoneE164}`} className="flex items-center gap-3 text-sm"><Phone size={16} aria-hidden="true" />{siteConfig.contact.phone}</a><Link href="/zones" className="premium-text-link text-muted-foreground">Nos zones d’intervention <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></div></section>
    </div>
  );
}
