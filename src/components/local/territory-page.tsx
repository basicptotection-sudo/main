import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, ClipboardList, MapPin, Plus } from 'lucide-react';
import type { City } from '@/lib/cities-data';
import type { LocalEditorial } from '@/lib/local-editorials';
import { servicesData } from '@/lib/services-data';
import { getZoneSlugByDeptCode } from '@/lib/zones-helpers';
import CityJsonLd from '@/components/seo/city-json-ld';
import styles from './territory.module.css';

export default function TerritoryPage({ city, editorial: e }: { city: City; editorial: LocalEditorial }) {
  const zone = getZoneSlugByDeptCode(e.department);
  const quote = `/devis?ville=${encodeURIComponent(city.slug)}`;
  const breadcrumbs = [{ label: 'Accueil', href: '/' }, { label: 'Notre présence', href: '/zones' }, { label: e.name, href: `/villes/${e.slug}` }];
  return <div className={styles.page}>
    <CityJsonLd city={city} breadcrumbs={breadcrumbs} description={e.description} />
    <section className={styles.hero}>
      <div className="premium-shell">
        <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}><Link href="/">Accueil</Link><span aria-hidden="true">/</span><Link href="/zones">Notre présence</Link><span aria-hidden="true">/</span><span aria-current="page">{e.name}</span></nav>
        <div className={styles.heroGrid}>
          <div><p className="premium-eyebrow text-[#d9c6a3]">Sécurité privée · {e.name}</p><h1>{e.heading}</h1><p className={styles.intro}>{e.intro}</p><div className={styles.actions}><Link href={quote} className="premium-button premium-button-gold">Étudier mon besoin <ArrowUpRight size={18} aria-hidden="true" /></Link><a href="#organisation" className={styles.jump}>Préparer la mission <ArrowDown size={16} aria-hidden="true" /></a></div></div>
          <aside className={styles.brief} aria-labelledby="brief-title"><ClipboardList size={30} strokeWidth={1.2} aria-hidden="true" /><h2 id="brief-title">{e.briefTitle}</h2><ul>{e.brief.map(item => <li key={item}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul><p><MapPin size={15} aria-hidden="true" /> {city.department}</p></aside>
        </div>
      </div>
    </section>
    <section className="premium-shell premium-section" aria-labelledby="context-title">
      <div className={styles.context}><div><p className="premium-eyebrow text-[#9c8056]">Le territoire et votre activité</p><h2 id="context-title" className="premium-title mt-5">{e.contextTitle}</h2></div><div><p className={styles.body}>{e.context}</p><div className={styles.sources}>{e.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (nouvel onglet)</span></a>)}<span>Repères vérifiés le <time dateTime={e.updatedAt}>{e.updatedAt.split('-').reverse().join('/')}</time></span></div></div></div>
      <div id="organisation" className={styles.sections}>{e.sections.map((section, index) => <article key={section.title}><span className={styles.number}>0{index + 1}</span><h2>{section.title}</h2><p className={styles.body}>{section.text}</p></article>)}</div>
    </section>
    <section className={styles.services}><div className="premium-shell"><p className="premium-eyebrow text-[#d9c6a3]">Les moyens à examiner ensemble</p><div className={styles.serviceGrid}>{e.services.map(item => { const service = servicesData.find(service => service.slug === item.slug); return service && <Link key={item.slug} href={`/services/${item.slug}`}><ArrowUpRight size={22} aria-hidden="true" /><h2>{service.title}</h2><p>{item.text}</p></Link>; })}</div></div></section>
    <section className="premium-shell premium-section" aria-label={`Préparer une prestation à ${e.name}`}><div className={styles.questions}><p className="premium-eyebrow text-[#9c8056]">Préciser votre projet</p><div>{e.faq.map(item => <details key={item.question} className="contact-faq group border-b first:border-t"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-headline text-lg tracking-tight">{item.question}<Plus size={17} aria-hidden="true" className="shrink-0 text-[#9c8056] group-open:rotate-45" /></summary><p className="pb-6 text-sm leading-relaxed text-muted-foreground">{item.answer}</p></details>)}</div></div></section>
    <section className={styles.cta}><div className="premium-shell"><h2 className="premium-title">{e.cta}</h2><Link href={quote} className="premium-button bg-[#101c2d] text-white">Présenter ma demande <ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>
    <nav className={`premium-shell ${styles.footerLinks}`} aria-label="Poursuivre votre recherche">{zone && <Link href={`/zones/${zone}`}>Sécurité privée · {city.department} <ArrowUpRight size={15} aria-hidden="true" /></Link>}<Link href="/zones">Les territoires d’Île-de-France <ArrowUpRight size={15} aria-hidden="true" /></Link><Link href="/contact">Contacter Basic Protection <ArrowUpRight size={15} aria-hidden="true" /></Link></nav>
  </div>;
}
