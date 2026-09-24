import Image from "next/image";
import { ClipboardCheck, Eye, FileCheck2, Users, ShieldCheck, CalendarCheck, Radio, Flag, Search, ListChecks, ArrowRight } from "lucide-react";
import styles from "./article-blocks.module.css";

type Topic = "agency" | "event" | "rules";
const guides = {
  agency: { label: "Le guide en un regard", title: "Choisir sur des preuves concrètes", items: [{ icon: FileCheck2, title: "Vérifier", text: "Réunir les documents et références utiles." }, { icon: Users, title: "Questionner", text: "Comprendre l’encadrement et la continuité du service." }, { icon: ClipboardCheck, title: "Comparer", text: "Examiner le périmètre, les moyens et le devis." }] },
  event: { label: "Le fil conducteur", title: "Trois temps, une même coordination", items: [{ icon: CalendarCheck, title: "Avant", text: "Définir le périmètre, les postes et les consignes." }, { icon: Radio, title: "Pendant", text: "Maîtriser les accès et partager les informations." }, { icon: Flag, title: "Après", text: "Encadrer la sortie et tirer les enseignements." }] },
  rules: { label: "Les repères essentiels", title: "Des documents à une organisation claire", items: [{ icon: FileCheck2, title: "Documents", text: "Identifier les justificatifs à demander au prestataire." }, { icon: ShieldCheck, title: "Intervenants", text: "Distinguer l’entreprise, ses dirigeants et les agents." }, { icon: ListChecks, title: "Mission", text: "Formaliser le périmètre et les consignes du site." }] },
};
export function ArticleOverview({ topic }: { topic: Topic }) {
  const guide = guides[topic];
  return <section className={styles.overview} aria-label={guide.title}><div className={styles.eyebrow}><Eye size={17} aria-hidden="true" />{guide.label}</div><p className={styles.title}>{guide.title}</p><div className={styles.cards}>{guide.items.map(({icon:Icon,title,text})=><div key={title}><Icon size={27} strokeWidth={1.4} aria-hidden="true" /><p className={styles.cardTitle}>{title}</p><p>{text}</p></div>)}</div></section>;
}
const photos = {
  agency: { src: "/images/securite-privee-gardiennage.webp", alt: "Agent en tenue de sécurité sur site", caption: "Sur le terrain, la qualité repose sur des consignes comprises et un encadrement identifié." },
  event: { src: "/images/service-securite-evenementielle.webp", alt: "Agent de sécurité dans un espace événementiel", caption: "Accueil, circulation et vigilance : préparer les postes permet de coordonner les équipes." },
  rules: { src: "/images/service-audit-conseil.webp", alt: "Examen de documents pour préparer une mission de sécurité", caption: "Rassembler les documents et préciser les responsabilités avant le début de la mission." },
};
export function ArticlePhoto({ topic }: { topic: Topic }) {
  const photo = photos[topic];
  return <figure className={styles.figure}><div><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 100vw, 760px" className="object-cover" /></div><figcaption><span>Sur le terrain</span>{photo.caption}</figcaption></figure>;
}
const workflows = {
  agency: ["Décrire le besoin", "Examiner les preuves", "Comparer les offres", "Cadrer la mission"],
  event: ["Repérer le site", "Attribuer les postes", "Briefer les équipes", "Faire le bilan"],
  rules: ["Identifier l’entreprise", "Réunir les justificatifs", "Préciser les missions", "Conserver le dossier"],
};
export function ArticleWorkflow({ topic }: { topic: Topic }) {
  return <section className={styles.workflow} aria-label="Parcours pratique"><div className={styles.eyebrow}><Search size={17} aria-hidden="true" />Passer à l’action</div><ol>{workflows[topic].map((step,i)=><li key={step}><span>{String(i+1).padStart(2,"0")}</span><strong>{step}</strong>{i<3 && <ArrowRight size={16} aria-hidden="true" />}</li>)}</ol></section>;
}
export function ArticleTip({ children }: { children: React.ReactNode }) {
 return <blockquote className={styles.tip}><ClipboardCheck size={22} strokeWidth={1.5} aria-hidden="true" /><div>{children}</div></blockquote>;
}
