"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseContext } from "@/firebase";
import { ArrowUpRight, CheckCircle2, Clock3, Loader2, Mail, MapPin, Phone, Plus } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { sendEmail } from "@/ai/flows/send-email-flow";

const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Indiquez votre nom et votre prénom.").max(120),
  email: z.string().trim().email("Indiquez une adresse e-mail valide."),
  company: z.string().trim().max(160).optional(),
  phone: z.string().trim().max(40).optional(),
  subject: z.enum(["devis", "gardiennage", "evenementiel", "incendie", "autre"]),
  message: z.string().trim().min(10, "Précisez votre besoin en quelques mots (10 caractères minimum).").max(5000, "Votre message doit rester inférieur à 5 000 caractères."),
});
type ContactFormValues = z.infer<typeof contactFormSchema>;
const subjects = { devis: "Demande de devis", gardiennage: "Gardiennage et surveillance", evenementiel: "Sécurité événementielle", incendie: "Sécurité incendie", autre: "Autre demande" };
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]!));

function ContactForm() {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema), defaultValues: { fullName: "", email: "", company: "", phone: "", subject: "devis", message: "" } });

  async function onSubmit(data: ContactFormValues) {
    setError("");
    if (!firebase?.firestore) { setError("Le formulaire est momentanément indisponible. Vous pouvez nous joindre par téléphone ou par e-mail."); return; }
    try {
      await addDoc(collection(firebase.firestore, "contact_requests"), { ...data, submissionDate: new Date().toISOString() });
    } catch {
      setError("Votre demande n’a pas pu être enregistrée. Réessayez ou contactez-nous directement par téléphone ou par e-mail.");
      return;
    }
    setSaved(true);
    try {
      const notification = await sendEmail({ from: "contact@basic-protection.fr", to: siteConfig.contact.email, reply_to: data.email, subject: `[Contact BPP] ${subjects[data.subject]} - ${data.fullName}`, html: `<div style="font-family:sans-serif"><h1>Nouvelle demande de contact</h1><p><strong>Nom :</strong> ${escapeHtml(data.fullName)}</p><p><strong>Email :</strong> ${escapeHtml(data.email)}</p><p><strong>Téléphone :</strong> ${escapeHtml(data.phone || "Non renseigné")}</p><p><strong>Entreprise :</strong> ${escapeHtml(data.company || "Non renseignée")}</p><p><strong>Sujet :</strong> ${subjects[data.subject]}</p><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p></div>` });
      if (notification?.id) router.push("/merci");
    } catch {
      // The request is already saved; keep the confirmation and prevent duplicate submissions.
    }
  }

  const fieldError = (name: keyof ContactFormValues) => errors[name] && <p id={`${name}-error`} className="mt-2 text-xs text-destructive" role="alert">{errors[name]?.message}</p>;
  const accessibility = (name: keyof ContactFormValues) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `${name}-error` : undefined });
  if (saved) return <div role="status" className="flex min-h-96 flex-col justify-center py-12"><CheckCircle2 size={36} strokeWidth={1.2} className="text-[#9c8056]" /><h3 className="mt-6 font-headline text-3xl tracking-tight">Votre demande est enregistrée.</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Merci de nous avoir présenté votre projet. Pour échanger directement avec notre équipe, vous pouvez également nous appeler.</p><a href={`tel:${siteConfig.contact.phoneE164}`} className="premium-text-link mt-7 self-start">{siteConfig.contact.phone} <ArrowUpRight size={17} /></a></div>;
  return <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-8" aria-label="Votre demande de contact">
    <fieldset disabled={isSubmitting} className="space-y-6 disabled:opacity-70">
      <div className="grid gap-6 sm:grid-cols-2"><div><label htmlFor="fullName" className="contact-label">Nom et prénom <span aria-hidden="true">*</span></label><input id="fullName" autoComplete="name" placeholder="Votre nom complet" aria-required="true" className="contact-input" {...register("fullName")} {...accessibility("fullName")} />{fieldError("fullName")}</div><div><label htmlFor="email" className="contact-label">Adresse e-mail <span aria-hidden="true">*</span></label><input id="email" type="email" autoComplete="email" placeholder="vous@entreprise.fr" aria-required="true" className="contact-input" {...register("email")} {...accessibility("email")} />{fieldError("email")}</div></div>
      <div className="grid gap-6 sm:grid-cols-2"><div><label htmlFor="phone" className="contact-label">Téléphone <span className="contact-optional">Facultatif</span></label><input id="phone" type="tel" autoComplete="tel" placeholder="Votre numéro" className="contact-input" {...register("phone")} {...accessibility("phone")} />{fieldError("phone")}</div><div><label htmlFor="company" className="contact-label">Entreprise <span className="contact-optional">Facultatif</span></label><input id="company" autoComplete="organization" placeholder="Votre organisation" className="contact-input" {...register("company")} {...accessibility("company")} />{fieldError("company")}</div></div>
      <div><label htmlFor="subject" className="contact-label">Votre besoin <span aria-hidden="true">*</span></label><select id="subject" className="contact-input" aria-required="true" {...register("subject")} {...accessibility("subject")}>{Object.entries(subjects).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>{fieldError("subject")}</div>
      <div><label htmlFor="message" className="contact-label">Parlez-nous de votre projet <span aria-hidden="true">*</span></label><textarea id="message" rows={5} maxLength={5000} placeholder="Le lieu, les dates, le type de site ou d’événement… Quelques précisions nous aideront à vous répondre." aria-required="true" className="contact-input min-h-36 resize-y leading-relaxed" {...register("message")} {...accessibility("message")} />{fieldError("message")}</div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">Les champs marqués d’un * sont obligatoires. Vos informations servent à traiter votre demande. Consultez notre <Link href="/politique-de-confidentialite" className="underline underline-offset-4 hover:text-foreground">politique de confidentialité</Link>.</p>
      {error && <p role="alert" className="border-l-2 border-destructive bg-destructive/5 p-4 text-sm text-destructive">{error}</p>}
      <button type="submit" className="premium-button w-full justify-between disabled:cursor-wait">{isSubmitting ? "Enregistrement en cours…" : "Envoyer ma demande"}{isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <ArrowUpRight size={18} />}</button>
    </fieldset>
  </form>;
}

export default function ContactPageClient() {
  const address = siteConfig.business.address;
  return <>
    <section className="premium-shell pb-12 pt-8 md:pb-16">
      <nav aria-label="Fil d’Ariane" className="flex gap-3 text-[11px] text-muted-foreground"><Link href="/" className="hover:text-foreground">Accueil</Link><span aria-hidden="true">/</span><span aria-current="page">Contact</span></nav>
      <div className="mt-12 flex flex-col justify-between gap-7 lg:mt-16 lg:flex-row lg:items-end"><div><p className="premium-eyebrow text-[#9c8056]">Faisons connaissance</p><h1 className="mt-5 font-headline text-[clamp(2.7rem,5.2vw,5rem)] font-medium leading-[1.06] tracking-[-0.05em]">Votre sérénité commence<br className="hidden xl:block" /> <span className="premium-serif">par un échange.</span></h1></div><p className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:pb-2">Un site à protéger, un événement à préparer, une question à éclaircir. Prenons le temps de comprendre votre besoin.</p></div>
    </section>
    <section className="premium-shell pb-20 md:pb-28" aria-label="Nous contacter"><div className="grid lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="premium-dark flex flex-col p-7 sm:p-10 lg:p-12"><p className="premium-eyebrow text-[#d9c6a3]">Un contact direct</p><h2 className="mt-6 font-headline text-3xl font-medium tracking-tight sm:text-4xl">À votre écoute.<br /><span className="premium-serif text-[#d9c6a3]">À vos côtés.</span></h2><p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">Notre équipe vous accompagne depuis Plaisir, dans les Yvelines, et partout en Île-de-France.</p>
      <div className="mt-10 border-t border-white/15"><a href={`tel:${siteConfig.contact.phoneE164}`} className="contact-direct"><Phone size={20} strokeWidth={1.3} /><span className="min-w-0 flex-1"><span className="contact-direct-label">Appelez-nous</span><span className="mt-2 block font-headline text-2xl tracking-tight">{siteConfig.contact.phone}</span></span><ArrowUpRight size={18} /></a><a href={`mailto:${siteConfig.contact.email}`} className="contact-direct"><Mail size={20} strokeWidth={1.3} /><span className="min-w-0 flex-1"><span className="contact-direct-label">Écrivez-nous</span><span className="mt-2 block break-all text-xs sm:text-sm">{siteConfig.contact.email}</span></span><ArrowUpRight size={18} /></a><div className="contact-direct"><Clock3 size={20} strokeWidth={1.3} /><div><span className="contact-direct-label">Nos horaires</span><p className="mt-2 text-sm">{siteConfig.business.openingHours}</p></div></div></div>
      <div className="mt-auto pt-12"><div className="flex gap-4"><MapPin size={21} strokeWidth={1.3} className="shrink-0 text-[#d9c6a3]" /><div><p className="text-sm">{address.street}<br />{address.postalCode} {address.city}</p><a href={siteConfig.business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-5 border-b border-white/25 pb-2 text-xs text-[#d9c6a3]">Voir l’itinéraire <ArrowUpRight size={16} /><span className="sr-only"> (nouvel onglet)</span></a></div></div></div>
      </aside>
      <div className="border border-t-0 bg-card p-7 sm:p-10 lg:border-l-0 lg:border-t lg:p-12"><div className="flex items-center gap-3"><span className="h-px w-6 bg-[#b79c73]" /><p className="premium-eyebrow text-muted-foreground">Votre projet, en quelques mots</p></div><h2 className="mt-5 font-headline text-3xl font-medium tracking-tight">Ouvrons la conversation.</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Décrivez votre besoin. Nous pourrons vous orienter vers un dispositif adapté.</p><ContactForm /></div>
    </div></section>
    <section className="border-t bg-card py-16 md:py-20"><div className="premium-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20"><div><p className="premium-eyebrow text-[#9c8056]">Avant notre premier échange</p><h2 className="premium-title mt-5">Quelques repères.<br /><span className="premium-serif">Pour bien commencer.</span></h2><Link href="/zones" className="premium-text-link mt-7">Découvrir nos zones d’intervention <ArrowUpRight size={16} /></Link></div><div>{[
      ["Quelles informations nous transmettre ?", "Le lieu d’intervention, le type de site ou d’événement, les dates et les horaires souhaités sont un bon point de départ. Précisez aussi les accès, le public attendu ou les contraintes particulières, si vous les connaissez."],
      ["Vous souhaitez un devis détaillé ?", "Vous pouvez présenter votre besoin ici ou utiliser notre formulaire de devis pour décrire votre projet plus précisément."],
      ["Où intervenons-nous ?", "Basés à Plaisir, nous intervenons dans les huit départements d’Île-de-France. La localisation et les caractéristiques de votre site nous permettent d’étudier le dispositif adapté."],
    ].map(([question, answer], index) => <details key={question} className="contact-faq group border-b" open={index === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-headline text-lg tracking-tight">{question}<Plus size={17} className="shrink-0 text-[#9c8056] transition-transform group-open:rotate-45" /></summary><div className="pb-6 text-sm leading-relaxed text-muted-foreground"><p>{answer}</p>{index === 1 && <Link href="/devis" className="premium-text-link mt-4">Préparer mon devis <ArrowUpRight size={16} /></Link>}</div></details>)}</div></div></section>
  </>;
}
