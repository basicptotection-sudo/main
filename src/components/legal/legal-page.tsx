import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, Mail, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { siteConfig } from "@/lib/config";
import styles from "./legal-page.module.css";

export type LegalSection = { id: string; title: string; content: ReactNode };
type Props = { kind: "legal" | "privacy"; introduction: ReactNode; sections: LegalSection[] };
export function LegalPage({ kind, introduction, sections }: Props) {
  const privacy = kind === "privacy";
  const title = privacy ? "Politique de confidentialité" : "Mentions légales";
  const Icon = privacy ? ShieldCheck : FileText;
  return <div className={styles.page}>
    <header className={styles.hero}><div className="premium-shell"><Breadcrumbs items={[{label:"Accueil",href:"/"},{label:title}]} variant="onDark" /><div className={styles.heroContent}><div><p className="premium-eyebrow text-[#d9c6a3]">Basic Protection Privée · Informations</p><h1>{privacy ? "Politique de" : "Mentions"}<br /><span className="premium-serif text-[#d9c6a3]">{privacy ? "confidentialité." : "légales."}</span></h1><p className={styles.subtitle}>{privacy ? "Comprendre l’utilisation de vos données et les moyens d’exercer vos droits." : "Retrouvez les informations sur l’éditeur, l’hébergement et les conditions d’utilisation de ce site."}</p></div><div className={styles.emblem} aria-hidden="true"><Icon size={70} strokeWidth={0.8} /><span>{privacy ? "Vos données & vos droits" : "Identité & informations"}</span></div></div><div className={styles.heroFoot}><span>{privacy ? "Protection des données personnelles" : "Informations relatives au site"}</span><span>{privacy ? "Texte mis à jour le 25 mai 2024" : "basic-protection.fr"}</span></div></div></header>
    <div className="premium-shell"><div className={styles.layout}><aside className={styles.aside}><nav aria-label={`Sommaire — ${title}`}><p className="premium-eyebrow text-muted-foreground">Dans cette page</p><ol>{sections.map((section,i)=><li key={section.id}><a href={`#${section.id}`}><span>{String(i+1).padStart(2,"0")}</span>{section.title}</a></li>)}</ol></nav><div className={styles.contact}><Mail size={23} strokeWidth={1.3} aria-hidden="true" /><h2>Une question ?</h2><p>Notre équipe est à votre écoute.</p><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}<ArrowUpRight size={16} aria-hidden="true" /></a></div></aside><article className={styles.article}><div className={styles.introduction}>{introduction}</div>{sections.map((section,i)=><section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`} className={styles.section}><div className={styles.sectionHeading}><span>{String(i+1).padStart(2,"0")}</span><h2 id={`${section.id}-title`}>{section.title}</h2></div><div className={styles.content}>{section.content}</div></section>)}</article></div></div>
    <div className={styles.related}><div className="premium-shell"><div><p className="premium-eyebrow text-muted-foreground">Pour aller plus loin</p><p>{privacy ? "Les informations sur notre société." : "La protection de vos données personnelles."}</p></div><Link href={privacy ? "/mentions-legales" : "/politique-de-confidentialite"} className="premium-text-link">{privacy ? "Mentions légales" : "Politique de confidentialité"}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
  </div>;
}
