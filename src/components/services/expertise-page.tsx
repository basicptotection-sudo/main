import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, ClipboardCheck, Eye, KeyRound, MapPin, Phone, Plus, ShieldCheck } from "lucide-react";
import { servicesData, type Service } from "@/lib/services-data";
import { expertisePresentations } from "@/lib/expertise-presentations";
import { siteConfig } from "@/lib/config";
import { sectorsData } from "@/lib/secteurs-data";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import ServiceJsonLd from "@/components/seo/service-json-ld";
import styles from "./qualified-agent-page.module.css";

const sectorSlugs: Record<string, string> = {
  "Sièges sociaux & bureaux": "sieges-sociaux-bureaux",
  "Sites industriels & entrepôts": "industrie-logistique",
  "Chantiers & BTP": "chantiers-sites-btp",
  "Retail & centres commerciaux": "luxe-retail-hotellerie",
  "Sites publics & institutionnels": "sites-sensibles-institutionnels",
  "Immobilier résidentiel": "immobilier-residentiel",
  "Sites industriels": "industrie-logistique",
  "Zones de stockage & plateformes": "industrie-logistique",
  "Événements en extérieur": "evenementiel-culture",
  "Centres commerciaux (ERP)": "luxe-retail-hotellerie",
  "Immeubles de bureaux (IGH)": "sieges-sociaux-bureaux",
  "Hôtels & établissements recevant du public": "luxe-retail-hotellerie",
  "Salles de spectacle & événementiel": "evenementiel-culture",
  "Zones d’activités": "industrie-logistique",
  "Chantiers en construction": "chantiers-sites-btp",
  "Parcs commerciaux": "luxe-retail-hotellerie",
  "Sièges sociaux (ETI / grands comptes)": "sieges-sociaux-bureaux",
  "Sites industriels & sensibles": "industrie-logistique",
  "Campus & sites critiques": "sites-sensibles-institutionnels",
};

export function ExpertisePage({ service }: { service: Service }) {
  const presentation = expertisePresentations[service.slug];
  const quoteHref = `/devis?service=${service.slug}`;
  const breadcrumbs = [{ label: "Accueil", href: "/" }, { label: "Services", href: "/services" }, { label: service.title, href: `/services/${service.slug}` }];
  const faq = [...(service.page?.faqLong ?? []), ...service.faq].filter((item, index, all) => all.findIndex(other => other.question === item.question) === index);
  const icons = [KeyRound, Eye, ShieldCheck, ClipboardCheck];
  const missions = presentation.missions.map((item, index) => ({ ...item, icon: icons[index % icons.length] }));
  const commitments = [
    { title: "Une préparation partagée", description: "Vos contraintes, vos priorités et les contours de la mission sont précisés ensemble." },
    { title: "Des responsabilités définies", description: "Les interlocuteurs, les consignes et les modalités de coordination sont identifiés dès le départ." },
    { title: "Un suivi documenté", description: "Les observations et les actions alimentent un suivi clair, utile à vos décisions." },
    { title: "Des ajustements concertés", description: "Le dispositif est réévalué avec vous lorsque le contexte ou les besoins évoluent." },
  ];
  const complementary = (service.page?.relatedServices ?? []).filter(slug => slug !== service.slug).slice(0, 3).flatMap(slug => {
    const related = servicesData.find(item => item.slug === slug);
    const visual = expertisePresentations[slug];
    return related && visual ? [{ title: related.title, slug, image: visual.image, text: related.shortDescription }] : [];
  });
  return <div className={styles.page}>
    <ServiceJsonLd service={service} breadcrumbs={breadcrumbs} />
    <section className={styles.hero} aria-labelledby="expertise-title">
      <div className={styles.heroVisual}><Image src={presentation.image} alt={service.title} fill priority sizes="(max-width: 767px) 100vw, 60vw" className="object-cover" /></div><div className={styles.heroShade} />
      <div className="premium-shell relative"><div className="pt-6"><Breadcrumbs items={breadcrumbs} variant="onDark" /></div>
        <div className={styles.heroCopy}><p className="premium-eyebrow text-[#d9c6a3]"><span className={styles.line} />{presentation.eyebrow}</p><h1 id="expertise-title">{presentation.title}<br /><span className="premium-serif text-[#d9c6a3]">{presentation.accent}</span></h1><p className={styles.heroLead}>{presentation.lead}</p><p className={styles.heroText}>{service.shortDescription}</p><div className="mt-8 flex flex-wrap items-center gap-6"><Link href={quoteHref} className="premium-button premium-button-gold">Étudier mon besoin <ArrowUpRight size={18} aria-hidden="true" /></Link><a href="#missions" className={styles.lightLink}>Découvrir les missions <ArrowDown size={16} aria-hidden="true" /></a></div></div>
        <div className={styles.heroFoot}><span>Prévenir. Protéger. Rassurer.</span><span className="flex items-center gap-2"><MapPin size={14} aria-hidden="true" />Yvelines & Île-de-France</span></div>
      </div>
    </section>
    <nav className={styles.navigation} aria-label="Dans cette prestation"><div className="premium-shell"><a href="#missions">01 — Les missions</a><a href="#engagements">02 — Nos engagements</a><a href="#methode">03 — La méthode</a><a href="#questions">04 — Vos questions</a><Link href={quoteHref}>Votre devis <ArrowUpRight size={15} aria-hidden="true" /></Link></div></nav>
    <section id="missions" className="premium-shell premium-section" aria-labelledby="missions-title">
      <div className={styles.intro}><div><p className="premium-eyebrow text-muted-foreground">01 — Au cœur de votre mission</p><h2 id="missions-title" className="premium-title mt-5">{presentation.introTitle}<br /><span className="premium-serif">{presentation.introAccent}</span></h2></div><div><p className={styles.introLead}>{presentation.intro}</p><p className={styles.bodyText}>{service.description}</p></div></div>
      <div className={styles.missions}>{missions.map(({icon: Icon, title, text}, i) => <article key={title}><div className={styles.missionTop}><Icon size={27} strokeWidth={1.3} aria-hidden="true" /><span>0{i+1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className={styles.scope}><ShieldCheck size={23} strokeWidth={1.4} className="shrink-0 text-[#9c8056]" aria-hidden="true" /><p><strong>Un cadre clair, dès le départ.</strong> Le périmètre, les interlocuteurs et les modalités de suivi sont définis avec vous avant le début de la mission.</p></div>
    </section>
    <section id="engagements" className={styles.commitment} aria-labelledby="commitment-title"><div className="premium-shell premium-section"><div className={styles.commitmentGrid}><div className={styles.portrait}><Image src={presentation.image} alt={service.title} fill sizes="(max-width: 767px) 100vw, 45vw" className="object-cover object-top" /><div className={styles.portraitCaption}><span>Basic Protection Privée</span><p>Le sérieux dans la posture.<br /><em>L’exigence dans l’action.</em></p></div></div><div className={styles.commitmentCopy}><p className="premium-eyebrow text-muted-foreground">02 — L’exigence Basic Protection</p><h2 id="commitment-title" className="premium-title mt-5">{presentation.commitment}<br /><span className="premium-serif">{presentation.commitmentAccent}</span></h2><p className={styles.bodyText}>{presentation.commitmentText}</p><ul className={styles.checks}>{(service.whyUs?.length ? service.whyUs : commitments).map(item => <li key={item.title}><Check size={17} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ul></div></div></div></section>
    <section className="premium-shell premium-section" aria-labelledby="benefits-title"><div className={styles.intro}><div><p className="premium-eyebrow text-muted-foreground">Ce que cela change pour vous</p><h2 id="benefits-title" className="premium-title mt-5">Une protection visible.<br /><span className="premium-serif">Des bénéfices concrets.</span></h2></div><p className={styles.bodyText}>Des moyens adaptés à votre contexte, des priorités partagées et une organisation lisible pour vos équipes.</p></div><div className={styles.benefits}>{service.benefits.map((benefit, i) => <article key={benefit.title}><span>0{i+1}</span><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}</div></section>
    <section id="methode" className="premium-dark premium-section" aria-labelledby="method-title"><div className="premium-shell"><div className={styles.intro}><div><p className="premium-eyebrow text-[#d9c6a3]">03 — Une mission bien préparée</p><h2 id="method-title" className="premium-title mt-5">De votre premier besoin<br /><span className="premium-serif text-[#d9c6a3]">au suivi sur le terrain.</span></h2></div><p className="max-w-sm text-sm leading-7 text-slate-300">{service.method.description}</p></div><ol className={styles.steps}>{service.method.steps.map((step, i) => <li key={step.title}><span>0{i+1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol><div className={styles.methodFooter}><span>Des consignes claires. Un suivi régulier. Un interlocuteur à vos côtés.</span><Link href={quoteHref} className="premium-text-link text-[#d9c6a3]">Préparer votre mission <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div></section>
    <section className="premium-shell premium-section" aria-labelledby="sectors-title"><div className={styles.intro}><div><p className="premium-eyebrow text-muted-foreground">Vos lieux, nos missions</p><h2 id="sectors-title" className="premium-title mt-5">À chaque environnement,<br /><span className="premium-serif">la juste attention.</span></h2></div><p className={styles.bodyText}>Les modalités de la mission s’adaptent à votre environnement, aux usages des lieux et aux personnes qui les fréquentent.</p></div><div className={styles.sectors}>{service.sectors.map(sector => { const definition = sectorsData.find(s => s.slug === sectorSlugs[sector.name] || s.name === sector.name); return definition ? <Link key={sector.name} href={`/secteurs/${definition.slug}`}>{sector.name}<ArrowUpRight size={18} aria-hidden="true" /></Link> : <span key={sector.name}>{sector.name}</span>; })}</div></section>
    <section id="questions" className={styles.faqSection} aria-labelledby="faq-title"><div className="premium-shell premium-section"><div className={styles.faqGrid}><div><p className="premium-eyebrow text-muted-foreground">04 — Avant de commencer</p><h2 id="faq-title" className="premium-title mt-5">Vos questions.<br /><span className="premium-serif">Nos réponses.</span></h2><p className={styles.bodyText}>Une situation particulière ? Parlons-en directement.</p><a href={`tel:${siteConfig.contact.phoneE164}`} className="premium-text-link mt-7"><Phone size={16} aria-hidden="true" />{siteConfig.contact.phone}</a></div><div>{faq.map(item => <details key={item.question} className={styles.question}><summary>{item.question}<Plus size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></div></div></section>
    <section className="premium-shell premium-section" aria-labelledby="related-title"><div className={styles.relatedHead}><div><p className="premium-eyebrow text-muted-foreground">Aller plus loin</p><h2 id="related-title" className="premium-title mt-5">Une protection<br /><span className="premium-serif">qui se complète.</span></h2></div><Link href="/services" className="premium-text-link">Toutes nos expertises <ArrowUpRight size={17} aria-hidden="true" /></Link></div><div className={styles.related}>{complementary.map(item => <Link key={item.slug} href={`/services/${item.slug}`} className={styles.relatedCard}><div className={styles.relatedImage}><Image src={item.image} alt={item.title} fill sizes="(max-width: 639px) 100vw, 33vw" className="object-cover" /><span><ArrowUpRight size={20} aria-hidden="true" /></span></div><h3>{item.title}</h3><p>{item.text}</p></Link>)}</div></section>
    <section className={styles.contact} aria-labelledby="contact-title"><div className="premium-shell"><div className={styles.contactInner}><div><p className="premium-eyebrow text-[#d9c6a3]">Votre projet mérite une attention particulière</p><h2 id="contact-title" className="premium-title mt-5">Confiez-nous votre sécurité.<br /><span className="premium-serif text-[#d9c6a3]">Concentrez-vous sur l’essentiel.</span></h2><p>Partagez votre contexte, votre calendrier et vos priorités.<br />Construisons un dispositif à votre mesure.</p></div><div className="flex flex-col items-start gap-6"><Link href={quoteHref} className="premium-button premium-button-gold">Demander mon devis <ArrowUpRight size={18} aria-hidden="true" /></Link><a href={`tel:${siteConfig.contact.phoneE164}`} className={styles.lightLink}><Phone size={16} aria-hidden="true" />{siteConfig.contact.phone}</a></div></div></div></section>
  </div>;
}
