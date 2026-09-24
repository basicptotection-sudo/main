import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { locationsData } from "@/lib/locations-data";
import { citiesData } from "@/lib/cities-data";
import { siteConfig } from "@/lib/config";
import { ZonesFilterClient, type Zone } from "@/components/zones/zones-filter-client";

const description = "Depuis Plaisir, Basic Protection Privée accompagne vos projets de sécurité dans les huit départements d’Île-de-France. Retrouvez votre département ou votre ville.";
export const metadata: Metadata = {
  title: "Notre présence — Sécurité privée en Île-de-France",
  description,
  alternates: { canonical: `${siteConfig.url}/zones` },
  openGraph: { title: "Proches de vous. Partout en Île-de-France.", description, url: `${siteConfig.url}/zones`, images: [{ url: "/images/zones/securite-privee-hauts-de-seine.webp", alt: "Notre présence en Île-de-France" }] },
};

export default function ZonesHubPage() {
  const departments: Zone[] = locationsData.map(location => ({
    name: location.name.replace(/\s*\(\d+\)/, ""),
    href: `/zones/${location.slug}`,
    kind: "departement",
    code: location.name.match(/\((\d+)\)/)?.[1],
    detail: location.mainCities.slice(0, 3).map(city => city.name).join(" · "),
  }));
  const cities: Zone[] = citiesData.map(city => ({
    name: city.title.replace(/Sécurité Privée\s/i, ""),
    href: `/villes/${city.slug}`,
    kind: "ville" as const,
    code: city.department.match(/\((\d+)\)/)?.[1],
    detail: city.department,
  })).sort((a, b) => a.name.localeCompare(b.name, "fr"));

  return (
    <>
      <section className="zones-hero" aria-labelledby="zones-title">
        <div className="zones-hero-visual"><Image src="/images/zones/securite-privee-hauts-de-seine.webp" alt="Quartier d’affaires de La Défense en Île-de-France" fill priority sizes="(max-width: 767px) 100vw, 60vw" className="object-cover" /><div className="zones-hero-overlay" /></div>
        <div className="premium-shell relative z-10">
          <nav aria-label="Fil d’Ariane" className="flex items-center gap-3 pt-8 text-[11px] text-white/60"><Link href="/" className="hover:text-white">Accueil</Link><span aria-hidden="true">/</span><span aria-current="page">Notre présence</span></nav>
          <div className="zones-hero-copy"><p className="premium-eyebrow text-[#d9c6a3]">Un ancrage local. Une présence régionale.</p><h1 id="zones-title" className="mt-7 font-headline text-[clamp(2.7rem,5.4vw,5.3rem)] font-medium leading-[1.07] tracking-[-0.05em]">Proches de vous.<br /><span className="premium-serif text-[#d9c6a3]">Partout en<br className="hidden sm:block" /> Île-de-France.</span></h1><p className="mt-7 max-w-md text-base leading-relaxed text-white/70">De votre siège social à votre prochain événement, nous organisons une protection adaptée à vos lieux et à leurs enjeux.</p><a href="#territoires" className="premium-button premium-button-gold mt-9">Trouver votre territoire <ArrowDown size={17} /></a></div>
          <div className="zones-photo-caption"><MapPin size={13} /><span>La Défense · Hauts-de-Seine</span></div>
        </div>
      </section>
      <div className="border-b bg-card"><div className="premium-shell grid gap-6 py-8 sm:grid-cols-3 sm:gap-8">{[{ value: "08", label: "départements franciliens", caption: "Une couverture régionale" }, { value: "78", label: "notre ancrage dans les Yvelines", caption: "Depuis Plaisir" }, { value: "01", label: "dispositif pensé pour votre site", caption: "Une approche sur mesure" }].map(item => <div key={item.value} className="flex items-center gap-5"><span className="font-headline text-4xl font-light tracking-tight text-[#9c8056]">{item.value}</span><div><p className="text-sm font-medium">{item.label}</p><p className="mt-1 text-xs text-muted-foreground">{item.caption}</p></div></div>)}</div></div>

      <section id="territoires" className="premium-shell premium-section" aria-labelledby="territories-title">
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end"><div><p className="premium-eyebrow text-muted-foreground">01 — Nos territoires</p><h2 id="territories-title" className="premium-title mt-5">Votre sécurité<br />commence ici.</h2></div><p className="max-w-md leading-relaxed text-muted-foreground lg:justify-self-end">Retrouvez nos interventions près de chez vous. Explorez les départements ou recherchez directement votre ville.</p></div>
        <ZonesFilterClient zones={[...departments, ...cities]} />
      </section>

      <section className="border-y bg-card premium-section" aria-labelledby="local-title"><div className="premium-shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20"><div className="relative aspect-[5/4] overflow-hidden"><Image src="/images/a-propos-basic-protection.webp" alt="Un accompagnement de proximité pour votre projet de sécurité" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" /><div className="absolute bottom-0 left-0 bg-[#101c2d] px-7 py-5 text-white"><p className="premium-eyebrow text-[#d9c6a3]">Notre point d’ancrage</p><p className="mt-2 font-headline text-xl">Plaisir, Yvelines.</p></div></div><div><p className="premium-eyebrow text-muted-foreground">02 — La proximité, concrètement</p><h2 id="local-title" className="premium-title mt-5">Connaître le terrain.<br /><span className="premium-serif">Comprendre vos enjeux.</span></h2><p className="mt-6 leading-relaxed text-muted-foreground">Un immeuble de bureaux, un chantier ou une réception ne se protègent pas de la même façon. Nous prenons en compte vos accès, vos horaires et votre environnement pour dimensionner chaque mission.</p><div className="mt-8 space-y-5 border-t pt-6">{["Un échange direct pour préciser votre besoin", "Des moyens adaptés aux contraintes de votre site", "Des consignes et un suivi structurés"].map((text, index) => <p key={text} className="flex gap-4 text-sm"><span className="text-xs text-[#9c8056]">0{index + 1}</span>{text}</p>)}</div><Link href="/services" className="premium-text-link mt-8">Découvrir nos expertises <ArrowUpRight size={17} /></Link></div></div></section>

      <section className="premium-dark premium-section"><div className="premium-shell flex flex-col justify-between gap-10 lg:flex-row lg:items-center"><div><p className="premium-eyebrow text-[#d9c6a3]">Un projet près de chez vous ?</p><h2 className="premium-title mt-5 text-white">Un lieu à protéger.<br />Commençons par en parler.</h2><p className="mt-5 max-w-xl leading-relaxed text-white/60">Votre commune n’apparaît pas dans la liste ? Contactez notre équipe pour étudier votre besoin et les possibilités d’intervention.</p></div><div className="flex shrink-0 flex-col items-start gap-6"><Link href="/devis" className="premium-button premium-button-gold">Présenter votre projet <ArrowUpRight size={18} /></Link><a href={`tel:${siteConfig.contact.phoneE164}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-[#d9c6a3]"><Phone size={16} />{siteConfig.contact.phone}</a></div></div></section>
    </>
  );
}
