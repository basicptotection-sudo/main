"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseContext } from "@/firebase";
import { ArrowUpRight, Check, CheckCircle2, Loader2, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { sendEmail } from "@/ai/flows/send-email-flow";

type ServiceOption = { slug: string; title: string };
type Props = { searchParams: Record<string, string | string[] | undefined>; services: ServiceOption[] };
const requestTypes = { site: "Un site à protéger", evenement: "Un événement", vip: "Une protection rapprochée", cynophile: "Une mission cynophile", incendie: "La sécurité incendie", autre: "Un autre besoin" };
const priorities = { standard: "Projet à planifier", prioritaire: "Besoin prioritaire", immediate: "Dès que possible" };
const optionalNumber = z.string().refine(value => !value || /^\d+(\.\d+)?$/.test(value) && Number(value) > 0, "Indiquez un nombre positif.").optional();
const schema = z.object({
  fullName: z.string().trim().min(2, "Indiquez votre nom et votre prénom.").max(120),
  email: z.string().trim().email("Indiquez une adresse e-mail valide."),
  phone: z.string().trim().refine(value => /^[+\d\s().-]+$/.test(value) && value.replace(/\D/g, "").length >= 10 && value.replace(/\D/g, "").length <= 15, "Indiquez un numéro valide (10 à 15 chiffres)."),
  company: z.string().trim().max(160).optional(),
  serviceOfInterest: z.string().min(1, "Sélectionnez une expertise."),
  requestType: z.enum(["site", "evenement", "vip", "cynophile", "incendie", "autre"]),
  urgency: z.enum(["standard", "prioritaire", "immediate"]),
  locationCity: z.string().trim().max(160).optional(),
  preferredDate: z.string().optional(),
  durationHours: optionalNumber,
  expectedPeople: z.string().refine(value => !value || /^\d+$/.test(value) && Number(value) > 0, "Indiquez un nombre entier positif.").optional(),
  message: z.string().trim().min(30, "Décrivez votre projet en au moins 30 caractères.").max(1200, "Limitez votre message à 1 200 caractères."),
  consent: z.boolean().refine(value => value, "Veuillez confirmer avoir pris connaissance de la politique de confidentialité."),
});
type Values = z.infer<typeof schema>;
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]!));

export default function DevisPageClient({ searchParams, services }: Props) {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const serviceParam = typeof searchParams.service === "string" ? searchParams.service : "";
  const selectedService = services.find(service => service.slug.toLowerCase() === serviceParam.toLowerCase() || service.title.toLowerCase() === serviceParam.toLowerCase())?.title || "";
  const { register, handleSubmit, watch, setValue, setError: setFieldError, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { fullName: "", email: "", phone: "", company: "", serviceOfInterest: selectedService, requestType: "site", urgency: "standard", locationCity: "", preferredDate: "", durationHours: "", expectedPeople: "", message: "", consent: false } });
  useEffect(() => { if (selectedService) setValue("serviceOfInterest", selectedService); }, [selectedService, setValue]);
  const values = watch();
  const fieldError = (name: keyof Values) => errors[name] && <p id={`quote-${name}-error`} role="alert" className="mt-2 text-xs text-destructive">{errors[name]?.message}</p>;
  const accessibility = (name: keyof Values) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `quote-${name}-error` : undefined });

  async function onSubmit(data: Values) {
    setError("");
    if (!services.some(service => service.title === data.serviceOfInterest)) { setFieldError("serviceOfInterest", { message: "Sélectionnez une expertise proposée." }); return; }
    if (!firebase?.firestore) { setError("Le formulaire est momentanément indisponible. Appelez-nous ou écrivez-nous pour nous présenter votre projet."); return; }
    try {
      await addDoc(collection(firebase.firestore, "lead_requests"), { ...data, submissionDate: new Date().toISOString(), source: "devis_page" });
    } catch {
      setError("Votre demande n’a pas pu être enregistrée. Vos informations sont conservées dans le formulaire : vous pouvez réessayer ou nous contacter directement.");
      return;
    }
    setSaved(true);
    const rows = [ ["Nom", data.fullName], ["E-mail", data.email], ["Téléphone", data.phone], ["Entreprise", data.company], ["Expertise", data.serviceOfInterest], ["Type de besoin", requestTypes[data.requestType]], ["Priorité", priorities[data.urgency]], ["Ville", data.locationCity], ["Date souhaitée", data.preferredDate], ["Durée (heures)", data.durationHours], ["Personnes attendues", data.expectedPeople], ["Projet", data.message] ];
    try {
      const notification = await sendEmail({ from: "contact@basic-protection.fr", to: siteConfig.contact.email, reply_to: data.email, subject: `[Devis BPP] ${data.serviceOfInterest} - ${data.fullName}`, html: `<div style="font-family:sans-serif"><h1>Nouvelle demande de devis</h1>${rows.map(([label, value]) => `<p style="white-space:pre-wrap"><strong>${label} :</strong> ${escapeHtml(value || "Non renseigné")}</p>`).join("")}</div>` });
      if (notification?.id) router.push("/merci");
    } catch {
      // The lead is already saved. Do not invite a duplicate submission if notification fails.
    }
  }

  function input(name: "fullName" | "email" | "phone" | "company" | "locationCity" | "preferredDate" | "durationHours" | "expectedPeople", label: string, options: { type?: string; placeholder?: string; autoComplete?: string; required?: boolean } = {}) {
    return <div><label htmlFor={`quote-${name}`} className="contact-label">{label}{options.required ? <span aria-hidden="true"> *</span> : <span className="contact-optional">Facultatif</span>}</label><input id={`quote-${name}`} type={options.type || "text"} placeholder={options.placeholder} autoComplete={options.autoComplete} aria-required={options.required || undefined} className="contact-input" {...register(name)} {...accessibility(name)} />{fieldError(name)}</div>;
  }

  return <>
    <section className="premium-shell pb-12 pt-8 md:pb-16"><nav aria-label="Fil d’Ariane" className="flex gap-3 text-[11px] text-muted-foreground"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><span aria-current="page">Votre devis</span></nav><div className="mt-12 grid gap-7 lg:mt-16 lg:grid-cols-[1.5fr_0.7fr] lg:items-end"><div><p className="premium-eyebrow text-[#9c8056]">Une proposition à votre mesure</p><h1 className="mt-5 font-headline text-[clamp(2.6rem,5vw,4.8rem)] font-medium leading-[1.06] tracking-[-0.05em]">Votre projet est unique.<br /><span className="premium-serif">Sa protection aussi.</span></h1></div><p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:pb-2">Quelques précisions pour comprendre votre environnement et construire une proposition adaptée à vos enjeux.</p></div><div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t pt-5 text-[11px] text-muted-foreground">{["Des moyens adaptés à votre site", "Une étude de vos besoins", "Un échange avec notre équipe"].map(text => <span key={text} className="flex items-center gap-2"><Check size={14} className="text-[#9c8056]" />{text}</span>)}</div></section>
    <section className="premium-shell pb-20 md:pb-28"><div className="grid items-start gap-8 lg:grid-cols-[1.5fr_0.8fr] lg:gap-12">
      {saved ? <div role="status" className="border bg-card p-8 sm:p-12"><CheckCircle2 size={40} strokeWidth={1.2} className="text-[#9c8056]" /><h2 className="premium-title mt-6">Votre demande est enregistrée.</h2><p className="mt-5 text-muted-foreground">Merci pour ces précisions. Vous pouvez également joindre notre équipe pour échanger directement sur votre projet.</p><a href={`tel:${siteConfig.contact.phoneE164}`} className="premium-text-link mt-8">{siteConfig.contact.phone} <ArrowUpRight size={17} /></a></div> : <form noValidate onSubmit={handleSubmit(onSubmit)} aria-label="Demande de devis" className="border bg-card p-6 sm:p-9 lg:p-10"><fieldset disabled={isSubmitting} className="min-w-0 disabled:opacity-70">
        <section aria-labelledby="quote-need"><div className="quote-section-heading"><span>01</span><div><h2 id="quote-need">Votre besoin</h2><p>Le point de départ de notre proposition.</p></div></div><div className="mt-7 space-y-6"><div><label htmlFor="quote-service" className="contact-label">L’expertise recherchée *</label><select id="quote-service" className="contact-input" aria-required="true" {...register("serviceOfInterest")} {...accessibility("serviceOfInterest")}><option value="">Choisir une expertise</option>{services.map(service => <option key={service.slug} value={service.title}>{service.title}</option>)}</select>{fieldError("serviceOfInterest")}</div><div className="grid gap-6 sm:grid-cols-2"><div><label htmlFor="quote-type" className="contact-label">Le type de projet *</label><select id="quote-type" className="contact-input" {...register("requestType")}>{Object.entries(requestTypes).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><div><label htmlFor="quote-urgency" className="contact-label">Votre calendrier *</label><select id="quote-urgency" className="contact-input" {...register("urgency")}>{Object.entries(priorities).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div></div>{values.urgency === "immediate" && <p role="status" className="border-l-2 border-[#b79c73] bg-muted/40 p-4 text-xs leading-relaxed">Pour un besoin immédiat, appelez-nous au <a href={`tel:${siteConfig.contact.phoneE164}`} className="underline underline-offset-4">{siteConfig.contact.phone}</a> afin de vérifier nos disponibilités.</p>}</div></section>
        <section aria-labelledby="quote-mission" className="mt-10 border-t pt-9"><div className="quote-section-heading"><span>02</span><div><h2 id="quote-mission">Votre mission</h2><p>Les détails utiles, même si tout n’est pas encore défini.</p></div></div><div className="mt-7 space-y-6"><div className="grid gap-6 sm:grid-cols-2">{input("locationCity", "Ville d’intervention", { placeholder: "Ex. : Versailles", autoComplete: "address-level2" })}{input("preferredDate", "Date souhaitée", { type: "date" })}{input("durationHours", "Durée estimée en heures", { placeholder: "Ex. : 8" })}{input("expectedPeople", "Personnes attendues", { placeholder: "Pour un événement, si connu" })}</div><div><label htmlFor="quote-message" className="contact-label">Le contexte de votre projet *</label><textarea id="quote-message" rows={5} maxLength={1200} aria-required="true" className="contact-input min-h-36 resize-y leading-relaxed" placeholder="Type de lieu, horaires, accès à surveiller, contraintes particulières… Décrivez ce qui compte pour vous." {...register("message")} {...accessibility("message")} /><div className="mt-2 flex justify-between gap-4 text-[10px] text-muted-foreground"><span>30 caractères minimum</span><span>{values.message.length} / 1 200</span></div>{fieldError("message")}</div></div></section>
        <section aria-labelledby="quote-details" className="mt-10 border-t pt-9"><div className="quote-section-heading"><span>03</span><div><h2 id="quote-details">Faisons connaissance</h2><p>Pour vous recontacter et préciser votre projet.</p></div></div><div className="mt-7 grid gap-6 sm:grid-cols-2">{input("fullName", "Nom et prénom", { placeholder: "Votre nom complet", autoComplete: "name", required: true })}{input("company", "Entreprise", { placeholder: "Votre organisation", autoComplete: "organization" })}{input("email", "Adresse e-mail", { type: "email", placeholder: "vous@entreprise.fr", autoComplete: "email", required: true })}{input("phone", "Téléphone", { type: "tel", placeholder: "Votre numéro", autoComplete: "tel", required: true })}</div></section>
        <div className="mt-9 border-t pt-7"><label htmlFor="quote-consent" className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground"><input id="quote-consent" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#101c2d]" aria-required="true" {...register("consent")} {...accessibility("consent")} /><span>J’ai pris connaissance de la <Link href="/politique-de-confidentialite" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">politique de confidentialité<span className="sr-only"> (nouvel onglet)</span></Link> et j’accepte que mes informations soient utilisées pour traiter ma demande. *</span></label>{fieldError("consent")}<p className="mt-5 text-[10px] text-muted-foreground">* Champs obligatoires. Cette demande ne vaut pas réservation de prestation.</p>{error && <p role="alert" className="mt-5 border-l-2 border-destructive p-4 text-sm text-destructive">{error}</p>}<button type="submit" className="premium-button mt-6 w-full justify-between disabled:cursor-wait">{isSubmitting ? "Enregistrement en cours…" : "Demander ma proposition"}{isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <ArrowUpRight size={18} />}</button></div>
      </fieldset></form>}
      <aside className="space-y-6 lg:sticky lg:top-36"><div className="premium-dark p-7 sm:p-9"><div className="flex items-center justify-between"><p className="premium-eyebrow text-[#d9c6a3]">Votre projet, en bref</p><ShieldCheck size={24} strokeWidth={1.2} className="text-[#d9c6a3]" /></div><h2 className="mt-6 font-headline text-3xl font-medium tracking-tight">Les contours de<br /><span className="premium-serif text-[#d9c6a3]">votre demande.</span></h2><dl className="mt-8">{[["Expertise", values.serviceOfInterest || "À sélectionner"], ["Projet", requestTypes[values.requestType]], ["Localisation", values.locationCity || "À préciser ensemble"], ["Calendrier", priorities[values.urgency]], ["Date souhaitée", values.preferredDate ? values.preferredDate.split("-").reverse().join("/") : "À définir"]].map(([label, value]) => <div key={label} className="border-t border-white/15 py-4"><dt className="text-[10px] uppercase tracking-[0.12em] text-white/45">{label}</dt><dd className="mt-2 break-words text-sm text-white/90">{value}</dd></div>)}</dl><p className="mt-5 text-xs leading-relaxed text-white/50">Chaque dispositif est étudié selon votre environnement, vos horaires et les moyens nécessaires.</p></div><div className="border p-7 sm:p-9"><p className="premium-eyebrow text-[#9c8056]">Besoin d’être guidé ?</p><p className="mt-4 font-headline text-xl tracking-tight">Commençons par en parler.</p><a href={`tel:${siteConfig.contact.phoneE164}`} className="premium-text-link mt-5"><Phone size={16} />{siteConfig.contact.phone}<ArrowUpRight size={16} /></a><p className="mt-4 text-[11px] text-muted-foreground">{siteConfig.business.openingHours}</p><Link href="/contact" className="mt-5 inline-block text-xs underline underline-offset-4">Toutes nos coordonnées</Link></div></aside>
    </div></section>
    <section className="border-t bg-card py-16 md:py-20"><div className="premium-shell"><p className="premium-eyebrow text-[#9c8056]">Et ensuite ?</p><h2 className="premium-title mt-5">Une demande.<br /><span className="premium-serif">Un accompagnement concret.</span></h2><div className="mt-10 grid gap-8 md:grid-cols-3">{[["Nous étudions votre besoin", "Votre demande nous permet de comprendre le lieu, le contexte et les premières contraintes."], ["Nous précisons ensemble", "Un échange permet de compléter les informations utiles et de définir les moyens adaptés."], ["Vous recevez une proposition", "Le périmètre, l’organisation et les conditions de la prestation sont précisés dans votre devis."]].map(([title, text], index) => <div key={title} className="border-t pt-6"><span className="text-xs text-[#9c8056]">0{index + 1}</span><h3 className="mt-4 font-headline text-xl tracking-tight">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div></div></section>
  </>;
}
